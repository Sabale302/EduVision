import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://eduvision-r00l.onrender.com/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setProfileData({
            full_name: data.full_name || '',
            phone: data.phone || '',
            address: data.address || '',
          });
        });
    }
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('https://eduvision-r00l.onrender.com/api/profile/updateProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Profile updated successfully!');
      navigate('/profile');
    } else {
      alert(result.error || 'Failed to update profile');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Update Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={profileData.full_name}
              onChange={handleChange}
              placeholder="e.g. Arati Pawar"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              placeholder="e.g. Pune, Maharashtra"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
