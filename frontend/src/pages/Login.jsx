import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";
import { TextField, Button, Typography, Paper, CircularProgress, Box } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { fetchPermissions } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:7002/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const responseText = await response.text();
                throw new Error(`Login failed: ${response.status} ${response.statusText} - ${responseText}`);
            }

            const data = await response.json();
            alert('Login successful!');
            localStorage.setItem('token', data.token);

            let tokenPayload;
            try {
                tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
            } catch (error) {
                console.error("Invalid token:", error);
                alert("Invalid login response. Please try again.");
                return;
            }

            if (fetchPermissions && typeof fetchPermissions === 'function') {
                await fetchPermissions(tokenPayload.role);
            } else {
                console.warn("fetchPermissions function is not available.");
            }

            navigate('/home');
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="min-h-screen flex items-center justify-center bg-gray-100">
            <Paper elevation={3} sx={{ padding: 4, width: 350, textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Login"}
                    </Button>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Don't have an account?{' '}
                    <Button variant="text" onClick={() => navigate('/signup')}>
                        Sign up here
                    </Button>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
