import { useState } from 'react';

const UpdateProfile = () => {
    const [profileData, setProfileData] = useState({
        full_name: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log(token);

            const response = await fetch('https://eduvision-r00l.onrender.com/api/profile/updateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(profileData),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Update Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <input
                    type="text"
                    name="full_name"
                    value={profileData.full_name}
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    placeholder="Phone"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    placeholder="Address"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={profileData.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
