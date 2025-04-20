import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, CircularProgress, Box } from '@mui/material';
import { useAuth } from '../context/authContext'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { fetchPermissions } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors

        try {
            const response = await fetch('https://eduvision-r00l.onrender.com/api/auth/login', {
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

            let tokenPayload;
            try {
                tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
            } catch (error) {
                console.error("Invalid token:", error);
                setError("Invalid login response. Please try again.");
                return;
            }

            if (fetchPermissions) {
                await fetchPermissions(tokenPayload.role);
            }

            navigate('/home');
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f4f4f4',
            }}
        >
            <Paper 
                elevation={6} 
                sx={{ padding: 4, width: 400, textAlign: 'center', borderRadius: 3 }}
            >
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
                        error={!!error}
                        helperText={error && "Invalid username or password"}
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
                        error={!!error}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2, padding: '10px', fontSize: '16px' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
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
