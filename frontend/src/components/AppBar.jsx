import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/profile'); // Navigate to profile page
        handleMenuClose();    // Close the menu after navigation
    };

    const handleLogoutClick = () => {
        // Remove token from local storage
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/login');

        // Close the menu after navigation
        handleMenuClose();
    };

    return (
        <div className="flex min-h-screen">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundColor: '#382B9A',
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap color="white" sx={{ flexGrow: 1 }}>
                            C.A.S
                        </Typography>
                        <Box>
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-controls="profile-menu"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                            >
                                <AccountCircle sx={{ fontSize: 42 }} />
                            </IconButton>
                            <Menu
                                id="profile-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                MenuListProps={{
                                    sx: { backgroundColor: '#382B9A' },
                                }}
                                PaperProps={{
                                    sx: {
                                        minWidth: 150,
                                    },
                                }}
                            >
                                <MenuItem onClick={handleProfileClick} sx={{ color: 'white' }}>Profile</MenuItem>
                                <MenuItem onClick={handleLogoutClick} sx={{ color: 'white' }}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        mt: '64px',
                        ml: '200px',
                    }}
                >
                </Box>
            </Box>
        </div>
    );
};

export default App;