import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Pagination,
    IconButton,
    CircularProgress
} from '@mui/material';
import { Users } from 'lucide-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;
    const navigate = useNavigate();

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
        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    <Users className="w-6 h-6" /> Manage Users
                </Typography>

                <Box display="flex" gap={2} sx={{ marginBottom: 2 }}>
                    <TextField fullWidth label="Search user" variant="outlined" />
                    <Button variant="contained" color="primary">Search</Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#8165FC' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(user.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default ManageUsers;
