import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Button } from '@mui/material';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://eduvision-r00l.onrender.com/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(() => setError('Failed to fetch user data'));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-white p-4">
      <div className="w-full max-w-md">
        <Card className="rounded-2xl shadow-xl border border-gray-200">
          <CardHeader
            avatar={<Users className="w-6 h-6 text-indigo-600" />}
            title="User Profile"
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            {error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : Object.keys(userData).length > 0 ? (
              <>
                {Object.entries(userData).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <label className="block font-semibold text-gray-700 capitalize">
                      {key.replace('_', ' ')}
                    </label>
                    <p className="text-gray-600 text-sm">{value || 'N/A'}</p>
                  </div>
                ))}
                <div className="text-center mt-6">
                  <Button
                    variant="contained"
                    color="primary"
                    className="rounded-xl text-white"
                    onClick={() => navigate('/updateprofile')}
                  >
                    Update Profile
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600">Loading...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
