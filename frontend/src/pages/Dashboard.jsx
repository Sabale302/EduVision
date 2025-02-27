import { Card, CardContent, CardHeader, Typography, Grid, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dashboardCards } from '../components/DashboardCard';

export const Dashboard = () => {
  const navigate = useNavigate();

  // Get the JWT token from local storage
  const token = localStorage.getItem('token');

  // Parse the JWT to extract the user role
  const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const userRole = tokenData.role;

  // Role-based filter for dashboard cards
  const getAccessibleDashboards = (role) => {
    const roleBasedDashboards = {
      Superadmin: [
        "Placement Dashboard",
        "Student Profile Dashboard",
        "Student Performance Dashboard",
        "Faculty Analytical Dashboard",
        "HOD Dashboard",
        "Principal Dashboard",
        "Financial Dashboard",
      ],
      Admin: [
        "Placement Dashboard",
        "Student Profile Dashboard",
        "Student Performance Dashboard",
        "Faculty Analytical Dashboard",
        "HOD Dashboard",
        "Principal Dashboard",
        "Financial Dashboard",
      ],
      Principal: ["Principal Dashboard", "Placement Dashboard", "Financial Dashboard"],
      TPO: ["Placement Dashboard"],
      Faculty: ["Faculty Analytical Dashboard", "Student Performance Dashboard"],
      HOD: ["HOD Dashboard", "Placement Dashboard", "Student Performance Dashboard"],
      Student: ["Student Performance Dashboard", "Student Profile Dashboard"],
    };
    return dashboardCards.filter((card) =>
      roleBasedDashboards[role]?.includes(card.title)
    );
  };

  const accessibleDashboards = getAccessibleDashboards(userRole);

  const handleDashboard = (title) => {
    if (title !== "Placement Dashboard") {
      navigate(`/dashboard/${title}`);
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      {/* Dashboard Header */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Dashboard
      </Typography>

      {/* Dashboard Cards Grid */}
      <Grid container spacing={3}>
        {accessibleDashboards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card sx={{ transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <CardHeader
                title={
                  <Typography variant="h6" align="center" sx={{ fontSize: 16, fontWeight: 500, color: 'gray' }}>
                    {card.title}
                  </Typography>
                }
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {card.isPowerBI ? (
                  <iframe
                    src={card.link}
                    title={card.title}
                    frameBorder="0"
                    allowFullScreen
                    style={{ width: '100%', height: '200px' }} // Adjust height as needed
                  ></iframe>
                ) : (
                  <Button
                    onClick={() => handleDashboard(card.title)}
                    sx={{
                      width: '100%',
                      height: 200,
                      padding: 0,
                      borderRadius: 1,
                      overflow: 'hidden',
                      '& img': { width: '100%', height: '100%', objectFit: 'cover' },
                    }}
                  >
                    <img src={card.link} alt={card.title} />
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
