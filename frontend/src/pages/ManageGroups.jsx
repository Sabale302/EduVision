import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Alert, IconButton, Box, Card, CardHeader, CardContent, Grid
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
      const response = await fetch('https://eduvision-r00l.onrender.com/api/roles');
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
      const response = await fetch('https://eduvision-r00l.onrender.com/api/roles', {
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
      const response = await fetch(`https://eduvision-r00l.onrender.com/api/roles/${groupId}`, {
        method: 'DELETE',
      });
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
    navigate(`/role-permissions/${groupName}`, { state: { groupName } });
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Card sx={{ p: 3 }}>
        <CardHeader
          avatar={<Users className="w-6 h-6 text-gray-700" />}
          title="Manage User Groups"
          titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
        />
        <CardContent>
          <Typography variant="subtitle1" mb={3}>
            Create new groups, view existing ones, and assign role-based permissions.
          </Typography>

          <Grid container spacing={2} alignItems="center" mb={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Enter New Group"
                variant="outlined"
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddGroup();
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button fullWidth variant="contained" onClick={handleAddGroup}>
                Save Group
              </Button>
            </Grid>
          </Grid>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#8165FC' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Group Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map(group => (
                  <TableRow key={group.id}>
                    <TableCell>{group.role_name}</TableCell>
                    <TableCell align="right">
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageGroups;
