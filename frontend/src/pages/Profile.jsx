import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Users } from 'lucide-react';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://eduvision-r00l.onrender.com:7002/api/profile/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log("Response Status:", response.status);
          if (!response.ok) throw new Error('Failed to fetch user data');
          return response.json();
        })
        .then((data) => setUserData(data))
        .catch((error) => {
          console.error('Error:', error);
          setError(error.message);
        });
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <Card sx={{ mx: 5 }}>
          <CardHeader
            avatar={<Users className="w-6 h-6 text-gray-600" />}
            title="User Profile"
            titleTypographyProps={{ variant: "h6" }}
          />

          <CardContent>
            {error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : Object.keys(userData).length > 0 ? (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
