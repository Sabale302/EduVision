import { Check, Clear } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Button,
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
    CircularProgress,
} from '@mui/material';

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
        { id: 10, name: 'Placement Form' },
    ]);

    const [rolePermissions, setRolePermissions] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState({ visible: false, success: true, message: '' });
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const location = useLocation();
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        setGroupName(location.state?.groupName || '');
    }, [location.state]);

    useEffect(() => {
        const fetchPermissions = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };

        if (groupName) fetchPermissions();
    }, [groupName]);

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
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:7002/api/role-permissions/${groupName}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rolePermissions }),
            });

            setShowPopup({
                visible: true,
                success: response.ok,
                message: response.ok ? 'Permissions saved successfully!' : 'Failed to save permissions. Try again.',
            });
        } catch (error) {
            console.error('Error saving permissions:', error);
            setShowPopup({ visible: true, success: false, message: 'Error while saving permissions.' });
        } finally {
            setLoading(false);
            setTimeout(() => setShowPopup({ visible: false, success: true, message: '' }), 3000);
        }
    };

    return (
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', bgcolor: 'grey.100' }}>
            {showPopup.visible && (
                <Paper
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        px: 3,
                        py: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        textAlign: 'center',
                        bgcolor: showPopup.success ? 'success.light' : 'error.light',
                        color: showPopup.success ? 'success.dark' : 'error.dark',
                    }}
                >
                    {showPopup.message}
                </Paper>
            )}

            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Permissions Management
            </Typography>
            <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: 'primary.light' }}>
                                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Permissions</TableCell>
                                            {operations.map(operation => (
                                                <TableCell key={operation.id} align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                                                    {operation.name}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pages.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((pageItem, index) => (
                                            <TableRow key={pageItem.id} sx={{ bgcolor: index % 2 ? 'grey.50' : 'white' }}>
                                                <TableCell sx={{ fontWeight: 'medium' }}>{pageItem.name}</TableCell>
                                                {operations.map(operation => (
                                                    <TableCell key={operation.id} align="center">
                                                        <IconButton
                                                            onClick={() => togglePermission(pageItem.id, `can_${operation.name.toLowerCase()}`)}
                                                            sx={{
                                                                color: rolePermissions[pageItem.id]?.[`can_${operation.name.toLowerCase()}`]
                                                                    ? 'success.main'
                                                                    : 'error.main',
                                                            }}
                                                        >
                                                            {rolePermissions[pageItem.id]?.[`can_${operation.name.toLowerCase()}`] ? (
                                                                <Check />
                                                            ) : (
                                                                <Clear />
                                                            )}
                                                        </IconButton>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box display="flex" justifyContent="center" mt={2}>
                                <Pagination count={Math.ceil(pages.length / rowsPerPage)} page={page} onChange={(_, value) => setPage(value)} />
                            </Box>

                            <Box mt={3} display="flex" justifyContent="space-between">
                                <Button variant="outlined" color="secondary" onClick={() => window.history.back()}>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleSaveChanges} disabled={loading}>
                                    Save Changes
                                </Button>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default RolePermissionManager;
