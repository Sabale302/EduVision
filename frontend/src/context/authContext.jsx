import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchPermissions = async (role) => {
        try {
            const token = localStorage.getItem('token');
            console.log("Fetching permissions for role:", role);
            console.log("Using token:", token);
    
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

    return (
        <AuthContext.Provider value={{ permissions, loading, fetchPermissions }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Ensure consistent export pattern
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
