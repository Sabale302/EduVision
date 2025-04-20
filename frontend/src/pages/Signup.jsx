import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box, MenuItem, CircularProgress } from '@mui/material';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://eduvision-r00l.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate('/login');
            } else {
                alert(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Signup failed. Please try again.');
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
                    Signup
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
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                    {/* Improved Select Field */}
                    <TextField
                        fullWidth
                        select
                        label="Role"
                        variant="outlined"
                        margin="normal"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        sx={{
                            textAlign: 'left',
                            "& .MuiOutlinedInput-root": {
                                borderRadius: '8px',
                            }
                        }}
                    >
                        {['Student', 'Faculty', 'HOD', 'TPO', 'Admin', 'Superadmin', 'Principal'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Signup Button with CircularProgress */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2, padding: '10px', fontSize: '16px', borderRadius: '8px' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
                    </Button>
                </form>

                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Already have an account?{' '}
                    <Button variant="text" onClick={() => navigate('/login')}>
                        Login here
                    </Button>
                </Typography>

            </Paper>
        </Box>
    );
};

export default Signup;
