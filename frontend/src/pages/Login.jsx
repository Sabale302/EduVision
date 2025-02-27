import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from "../context/authContext"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { fetchPermissions } = useAuth(); // Fetch permissions from the context

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:7002/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials and try again.');
            }

            const data = await response.json();
            alert('Login successful!');
            // Save the token to local storage
            localStorage.setItem('token', data.token);

            // Decode the token to get the user's role
            const tokenPayload = JSON.parse(atob(data.token.split('.')[1])); // Decoding the JWT
            const userRole = tokenPayload.role;

            // Fetch permissions based on the user's role
            await fetchPermissions(userRole);

            // Redirect to the homepage or another role-specific page
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="w-1/3 p-8 rounded-xl shadow-lg border bg-white  mt-3">
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 mb-6 block w-full rounded-lg border border-gray-200 px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                        required
                    />
                </div>

                <Button type="submit" className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Login
                </Button>
            </form>

            {/* Link to Signup page */}
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
