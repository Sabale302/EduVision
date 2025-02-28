import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    IconButton,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ManageGroups = () => {
    const [groups, setGroups] = useState([]);
    const [newGroup, setNewGroup] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchGroups = async () => {
        try {
            const response = await fetch('http://localhost:7002/api/roles');
            const data = await response.json();
            const sortedData = data.sort((a, b) => a.id - b.id);
            setGroups(sortedData);
        } catch (error) {
            console.error('Failed to fetch groups:', error);
            setError('Error fetching groups.');
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

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
                setError('Failed to add group.');
            }
        } catch (error) {
            console.error('Error adding group:', error);
            setError('Failed to add group.');
        }
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            console.log('Deleting group with ID:', groupId);
            const response = await fetch(`http://localhost:7002/api/roles/${groupId}`, {
                method: 'DELETE',
            });

            console.log('Delete Response:', response);

            if (response.ok) {
                setGroups(groups.filter(group => group.id !== groupId));
            } else {
                const errorData = await response.json();
                setError(`Failed to delete group: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error deleting group:', error);
            setError('Failed to delete group.');
        }
    };

    const handleEditGroup = (groupName) => {
        console.log(groupName);
        navigate(`/role-permissions/${groupName}`, { state: { groupName } });
    };

    return (
        <Box className="w-auto" sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    <Users className="w-6 h-6" /> Manage Groups
                </Typography>

                <Box display="flex" gap={2} sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Enter group to be added"
                        variant="outlined"
                        value={newGroup}
                        onChange={(e) => setNewGroup(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleAddGroup();
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddGroup}>
                        Save
                    </Button>
                </Box>

                {error && <Alert severity="error">{error}</Alert>}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#8165FC' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Group Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groups.map(group => (
                                <TableRow key={group.id}>
                                    <TableCell>{group.role_name}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEditGroup(group.role_name)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteGroup(group.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default ManageGroups;
