import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:7002/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role,
                }),
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
        }
    };


    return (
        <div className="w-1/3 p-8 rounded-xl shadow-lg border bg-white  mt-3">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Signup</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 mb-6 block w-full rounded-lg border border-gray-200 px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors">
                        <option>Student</option>
                        <option>Faculty</option>
                        <option>HOD</option>
                        <option>TPO</option>
                        <option>Admin</option>
                        <option>Superadmin</option>
                        <option>Principal</option>
                    </select>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Signup
                </button>
            </form>

            {/* Link to Login page */}
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-600 bg-white hover:underline border-none">
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
