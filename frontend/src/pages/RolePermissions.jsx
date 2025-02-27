import { Check, X } from 'lucide-react';
import { CardHeader, CardTitle, CardContent } from '../components/Card';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const RolePermissionManager = () => {
    const [operations] = useState([
        { id: 1, name: 'View' },
        { id: 2, name: 'Create' },
        { id: 3, name: 'Update' },
        { id: 4, name: 'Delete' },
        { id: 5, name: 'Print' },
    ]);

    const [pages] = useState([
        { id: 1, name: 'Home' },
        { id: 2, name: 'Dashboard' },
        { id: 3, name: 'Report' },
        { id: 4, name: 'Placement Data' },
        { id: 5, name: 'Faculty Information' },
        { id: 6, name: 'Login' },
        { id: 7, name: 'Manage Groups' },
        { id: 8, name: 'Manage Users' },
        { id: 9, name: 'DB Connection' },
        {id:10, name:'Placement Form'},
    ]);

    const [rolePermissions, setRolePermissions] = useState({});
    const [showPopup, setShowPopup] = useState({
        visible: false,
        success: true,
        message: '',
    });

    const location = useLocation();
    const [groupName, setGroupName] = useState('');

    // Retrieve groupName from location state
    useEffect(() => {
        const newGroupName = location.state?.groupName || '';
        setGroupName(newGroupName);
    }, [location.state]);

    // Fetch role permissions from backend
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await fetch(`http://localhost:7002/api/role-permissions/${groupName}`);
                if (response.ok) {
                    const data = await response.json();
                    setRolePermissions(data.rolePermissions || {});
                } else {
                    console.error('Failed to fetch permissions');
                }
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        };

        if (groupName) fetchPermissions();
    }, [groupName]);

    // Ensure all pages have default permissions
    useEffect(() => {
        setRolePermissions(prev => {
            const updatedPermissions = { ...prev };
            pages.forEach(page => {
                if (!updatedPermissions[page.id]) {
                    updatedPermissions[page.id] = {
                        can_view: true,
                        can_create: false,
                        can_update: false,
                        can_delete: false,
                        can_print: false,
                    };
                }
            });
            return updatedPermissions;
        });
    }, [pages]);

    const togglePermission = (pageId, operationName) => {
        setRolePermissions(prev => ({
            ...prev,
            [pageId]: {
                ...prev[pageId],
                [operationName]: !prev[pageId]?.[operationName],
            },
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:7002/api/role-permissions/${groupName}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rolePermissions }),
            });

            const successMessage = response.ok
                ? 'Permissions saved successfully!'
                : 'Failed to save permissions. Please try again.';

            setShowPopup({ visible: true, success: response.ok, message: successMessage });
        } catch (error) {
            console.error('Error saving permissions:', error);
            setShowPopup({ visible: true, success: false, message: 'An error occurred while saving permissions.' });
        } finally {
            setTimeout(() => setShowPopup({ visible: false, success: true, message: '' }), 3000);
        }
    };

    return (
        <div className="relative w-full">
            {showPopup.visible && (
                <div
                    className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 z-50 px-6 py-3 rounded shadow-lg text-center ${
                        showPopup.success
                            ? 'bg-green-100 border border-green-400 text-green-700'
                            : 'bg-red-100 border border-red-400 text-red-700'
                    }`}
                >
                    {showPopup.message}
                </div>
            )}
            <div className="p-5 rounded shadow-lg">
                <CardHeader>
                    <CardTitle>Group Permissions Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#8165FC] text-white">
                                    <th className="p-4 text-left border">Permissions</th>
                                    {operations.map(operation => (
                                        <th key={operation.id} className="p-4 text-center border">
                                            {operation.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {pages.map(page => (
                                    <tr key={page.id} className="hover:bg-gray-50">
                                        <td className="p-4 border">
                                            <div className="font-medium">{page.name}</div>
                                        </td>
                                        {operations.map(operation => (
                                            <td key={operation.id} className="p-4 border text-center">
                                                <button
                                                    onClick={() =>
                                                        togglePermission(
                                                            page.id,
                                                            `can_${operation.name.toLowerCase()}`
                                                        )
                                                    }
                                                    className={`p-2 rounded-full transition-colors ${
                                                        rolePermissions[page.id]?.[
                                                            `can_${operation.name.toLowerCase()}`
                                                        ]
                                                            ? 'bg-green-100 hover:bg-green-200'
                                                            : 'bg-red-100 hover:bg-red-200'
                                                    }`}
                                                >
                                                    {rolePermissions[page.id]?.[`can_${operation.name.toLowerCase()}`] ? (
                                                        <Check className="w-5 h-5 text-green-600" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-red-600" />
                                                    )}
                                                </button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button onClick={() => window.history.back()} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
                            Back
                        </button>
                        <button onClick={handleSaveChanges} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            Save Changes
                        </button>
                    </div>
                </CardContent>
            </div>
        </div>
    );
};

export default RolePermissionManager;
