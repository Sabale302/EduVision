import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CardContent, CardHeader, CardTitle } from '../components/Card';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:7002/api/manage-users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:7002/api/manage-users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter(user => user.id !== id));
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/role-permissions/${id}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="border-black w-auto">
            <div className="p-5 rounded shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 mb-2 text-slate-800 text-xl font-semibold">
                        <Users className="w-6 h-6" />
                        Manage Users
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow space-y-6">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Enter group to be added"
                            className="px-4 py-2 w-96"
                        />
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                        >
                            Search
                        </Button>
                    </div>
                    {/* Users Table */}
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full ">
                            <thead>
                                <tr className="bg-[#8165FC] text-white">
                                    <th className="px-6 py-3 text-left w-96">User Name</th>
                                    <th className="px-6 py-3 text-left w-96">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(user => (
                                    <tr key={user.id} className="border-t">
                                        <td className="px-6 py-4">{user.username}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => handleEdit(user.id)}
                                                    className="bg-teal-500 hover:bg-teal-600 text-white"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(user.id)}
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

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-9">
                        <Button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4"
                        >
                            Previous
                        </Button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <Button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 ${currentPage === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-blue-500 text-white-700 hover:bg-blue-400'
                                        }`}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </div>

                        <Button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4"
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </div>
        </div>
    );
};

export default ManageUsers;
