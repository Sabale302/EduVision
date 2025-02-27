// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home as HomeIcon, Dashboard, BarChart, PersonAdd, ExpandLess, ExpandMore, Group, GroupAdd, Chat } from '@mui/icons-material';
import { useAuth } from '../context/authContext';


const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#ffffff',
            paper: '#382B9A',
        },
        primary: {
            main: '#ffffff',
        },
        text: {
            primary: '#000000',
        },
        action: {
            hover: '#5A45CC',
        }
    },
});

const navigationItems = [
    { path: '/home', text: 'Home', icon: <HomeIcon />, pageId: 1 },
    { path: '/dashboard', text: 'Dashboard', icon: <Dashboard />, pageId: 2 },
    { path: '/chat', text: 'Chat', icon: <Chat />, pageId: 6},
    { path: '/report', text: 'Report', icon: <BarChart />, pageId: 3 },
    { path: '/placement-data', text: 'Placement Data', icon: <BarChart />, pageId: 4 },
    { path: '/placement-form', text: 'Placement Form', icon: <BarChart />, pageId: 10 },
    { path: '/faculty-information', text: 'Faculty Information', icon: <BarChart />, pageId: 5 },
];

const masterSubItems = [
    { path: '/manage-groups', text: 'Manage Groups', icon: <Group />, pageId: 7 },
    { path: '/manage-users', text: 'Manage Users', icon: <GroupAdd />, pageId: 8 },
    { path: '/db-connection', text: 'DB Connection', icon: <Group />, pageId: 9 }
];

const Sidebar = () => {
    const { permissions, loading } = useAuth();
    const [openMaster, setOpenMaster] = useState(false);
    const hasViewPermission = (pageId) => permissions[pageId]?.can_view === true;
    const anyMasterItemsVisible = masterSubItems.some(item => hasViewPermission(item.pageId));

    if (loading) return <div>Loading Sidebar...</div>;
    if (!permissions) return <div>Error loading permissions</div>;


    return (
        <ThemeProvider theme={theme}>
            <Drawer
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        background: '#382B9A',
                        color: '#ffffff',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <List>

                    {navigationItems.map((item) => (
                        hasViewPermission(item.pageId) && (
                            <ListItem button component={Link} to={item.path} key={item.path}>
                                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} primaryTypographyProps={{ color: 'white' }} />
                            </ListItem>
                        )
                    ))}
                    {anyMasterItemsVisible && (
                        <>
                            <ListItem button onClick={() => setOpenMaster(!openMaster)}>
                                <ListItemIcon sx={{ color: 'white' }}><Group /></ListItemIcon>
                                <ListItemText primary="Master" primaryTypographyProps={{ color: 'white' }} />
                                {openMaster ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openMaster} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {masterSubItems.map((item) => (
                                        hasViewPermission(item.pageId) && (
                                            <ListItem button component={Link} to={item.path} sx={{ pl: 4 }} key={item.path}>
                                                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                                <ListItemText primary={item.text} primaryTypographyProps={{ color: 'white' }} />
                                            </ListItem>
                                        )
                                    ))}
                                </List>
                            </Collapse>
                        </>
                    )}
                </List>
            </Drawer>
        </ThemeProvider>
    );
};

export default Sidebar;