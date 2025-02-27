import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from "../context/authContext";
import { Input } from '../components/Input';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading
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

            // Safe JWT decoding
            let tokenPayload;
            try {
                tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
            } catch (error) {
                console.error("Invalid token:", error);
                alert("Invalid login response. Please try again.");
                return;
            }

            // Fetch permissions if function is available
            if (fetchPermissions && typeof fetchPermissions === 'function') {
                await fetchPermissions(tokenPayload.role);
            } else {
                console.warn("fetchPermissions function is not available.");
            }

            // Redirect user
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <Input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full rounded-lg border px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 mb-6 block w-full px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-blue-600 transition-colors"
                        required
                    />
                </div>

                <Button type="submit" className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-blue-600 bg-white border-none hover:underline">
                        Sign up here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
