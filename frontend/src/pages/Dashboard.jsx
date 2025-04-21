import { Card, CardContent, CardHeader, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dashboardCards } from '../components/DashboardCard';

export const Dashboard = () => {
  const navigate = useNavigate();

  // Get the JWT token from local storage
  const token = localStorage.getItem('token');
  const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const userRole = tokenData.role;

  const getAccessibleDashboards = (role) => {
    const roleBasedDashboards = {
      Superadmin: ["Placement Dashboard", "Student Profile Dashboard", "Student Performance Dashboard", "Faculty Analytical Dashboard", "HOD Dashboard", "Principal Dashboard", "Financial Dashboard"],
      Admin: ["Placement Dashboard", "Student Profile Dashboard", "Student Performance Dashboard", "Faculty Analytical Dashboard", "HOD Dashboard", "Principal Dashboard", "Financial Dashboard"],
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

  const handleDashboardClick = (card) => {
    if (card.isPowerBI) {
      window.open(card.link, '_blank');
    } else {
      navigate(card.link);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1100, mx: 'auto', my: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="text.primary" mb={4}>
        Dashboard
      </Typography>

      <Card sx={{ p: 3, mb: 4 }}>
        <CardHeader
          title={
            <Typography variant="h5">
              Available Dashboards
            </Typography>
          }
          subheader="Click on a dashboard to view insights"
        />
        <CardContent>
          <Grid container spacing={3}>
            {accessibleDashboards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.title}>
                <Card
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    textAlign: 'center',
                    transition: '0.3s',
                    '&:hover': { boxShadow: 6, transform: 'scale(1.03)' },
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDashboardClick(card)}
                >
                  <CardHeader
                    title={
                      <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 500, color: 'gray' }}>
                        {card.title}
                      </Typography>
                    }
                  />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                      src={card.image}
                      alt={card.title}
                      style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
