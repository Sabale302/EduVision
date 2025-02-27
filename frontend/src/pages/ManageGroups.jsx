import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageGroups = () => {
    const [groups, setGroups] = useState([]);
    const [newGroup, setNewGroup] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch groups from the backend
    const fetchGroups = async () => {
        try {
            const response = await fetch('http://localhost:7002/api/roles');
            const data = await response.json();
    
            // Sort the data by ID in ascending order
            const sortedData = data.sort((a, b) => a.id - b.id);  // Assuming 'id' is the field name
            setGroups(sortedData);
        } catch (error) {
            console.error('Failed to fetch groups:', error);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    // Handle adding a new group
    const handleAddGroup = async () => {
        if (!newGroup.trim()) {
            setError('Group name cannot be empty.');
            return;
        }

        try {
            const response = await fetch('http://localhost:7002/api/roles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role_name: newGroup.trim() }),
            });

            if (response.ok) {
                const newRole = await response.json();
                setGroups(prevGroups => [...prevGroups, newRole]);
                setNewGroup('');
                setError('');
            } else {
                setError('Failed to add group');
            }
        } catch (error) {
            console.error('Error adding group:', error);
            setError('Failed to add group');
        }
    };

    // Handle deleting a group
    const handleDeleteGroup = async (groupId) => {
    try {
        console.log('Deleting group with ID:', groupId);  // Log the ID for debugging
        const response = await fetch(`http://localhost:7002/api/roles/${groupId}`, {
            method: 'DELETE',
        });

        console.log('Delete Response:', response);  // Log the response to check status and body

        if (response.ok) {
            setGroups(groups.filter(group => group.id !== groupId));
        } else {
            const errorData = await response.json();
            setError(`Failed to delete group: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error deleting group:', error);
        setError('Failed to delete group');
    }
};

const handleEditGroup = (groupName) => {
    console.log(groupName);
    navigate(`/role-permissions/${groupName}`, { state: { groupName } });
};
    return (
        <div className="border-black w-auto">
            <div className="p-5 rounded shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 mb-2 text-slate-800 text-xl font-semibold">
                        <Users className="w-6 h-6" />
                        Manage Groups
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                    <div className="flex gap-4">
                        <Input
                            value={newGroup}
                            onChange={(e) => setNewGroup(e.target.value)}
                            placeholder="Enter group to be added"
                            className="flex-1 px-4 py-2"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleAddGroup();
                            }}
                        />
                        <Button
                            onClick={handleAddGroup}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                        >
                            Save
                        </Button>
                    </div>

                    {error && <div className="text-red-500">{error}</div>}

                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#8165FC] text-white">
                                    <th className="px-6 py-3 text-left w-96">Group Name</th>
                                    <th className="px-6 py-3 text-left w-96">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map(group => (
                                    <tr key={group.id} className="border-t">
                                        <td className="px-6 py-4">{group.role_name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => handleEditGroup(group.role_name)}
                                                    className="bg-teal-500 hover:bg-teal-600 text-white"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteGroup(group.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </div>
        </div>
    );
};

export default ManageGroups;
