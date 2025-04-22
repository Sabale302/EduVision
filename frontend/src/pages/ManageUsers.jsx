import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, TextField, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box, Pagination, IconButton, CircularProgress, Card, CardHeader, CardContent, Grid
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
        const response = await fetch('https://eduvision-r00l.onrender.com/api/manage-users');
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
      const response = await fetch(`https://eduvision-r00l.onrender.com/api/manage-users/${id}`, {
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
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Card sx={{ p: 3 }}>
        <CardHeader
          avatar={<Users className="w-6 h-6 text-gray-700" />}
          title="Manage System Users"
          titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
        />
        <CardContent>
          <Typography variant="subtitle1" mb={3}>
            View, update, and manage user accounts.
          </Typography>

          <Grid container spacing={2} alignItems="center" mb={3}>
            <Grid item xs={12} md={8}>
              <TextField fullWidth label="Search user by name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button fullWidth variant="contained">
                Search
              </Button>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#8165FC' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell align="right">
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

          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageUsers;