import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:7002/api/profile/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Failed to fetch user data');
      })
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error:', error));
  }
}, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>

        {Object.keys(userData).length > 0 ? (
          Object.entries(userData).map(([key, value]) => (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 font-bold capitalize">
                {key.replace('_', ' ')}
              </label>
              <p className="text-gray-600">{value || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;