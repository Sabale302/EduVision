import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for existing token and restore auth state on app initialization
        const checkAuthStatus = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setLoading(false);
                    return;
                }
                
                // Decode token to get user info
                const tokenPayload = JSON.parse(atob(token.split('.')[1]));
                
                // Check if token is expired
                if (tokenPayload.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setLoading(false);
                    return;
                }
                
                // Token is valid, restore auth state
                setUser({
                    userId: tokenPayload.userId,
                    role: tokenPayload.role
                });
                setIsAuthenticated(true);
                
                // Fetch permissions for the role
                await fetchPermissions(tokenPayload.role);
            } catch (error) {
                console.error('Error checking authentication status:', error);
                localStorage.removeItem('token'); // Clear potentially corrupted token
            } finally {
                setLoading(false);
            }
        };
        
        checkAuthStatus();
    }, []);

    const fetchPermissions = async (role) => {
        try {
            const token = localStorage.getItem('token');
            console.log("Fetching permissions for role:", role);
            
            const response = await fetch(`http://localhost:7002/api/role-permissions/${role}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
   
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch permissions: ${errorText}`);
            }
   
            const data = await response.json();
            console.log("Permissions received:", data);
            setPermissions(data.rolePermissions);
        } catch (error) {
            console.error('Error fetching permissions:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:7002/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const responseText = await response.text();
                throw new Error(responseText || 'Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);

            const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
            
            setUser({
                userId: tokenPayload.userId,
                role: tokenPayload.role
            });
            setIsAuthenticated(true);
            
            await fetchPermissions(tokenPayload.role);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setPermissions({});
        setIsAuthenticated(false);
    };
    
    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            permissions, 
            loading, 
            login, 
            logout,
            fetchPermissions 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};