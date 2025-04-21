import { useState, useEffect } from "react";
import { Users, Award, BookOpen, FileText } from "lucide-react";
import { Dashboard, Settings } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { dashboardCards } from "../components/DashboardCard";

const Home = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [error, setError] = useState(null);
  const cardsCount = dashboardCards.length;

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch(
          "https://eduvision-r00l.onrender.com/api/total-users"
        );
        const data = await response.json();
        if (response.ok) {
          setTotalUsers(data.totalUsers);
        } else {
          setError(data.message);
          console.error("Server error:", data.message);
        }
      } catch (error) {
        setError("Server error");
        console.error("Fetch error:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers === null ? <CircularProgress size={24} /> : totalUsers,
      icon: <Users />,
      color: "#1976D2", // Blue
      cardBg: "#E3F2FD",
    },
    {
      title: "Active Students",
      value: "8",
      icon: <Award />,
      color: "#8E24AA", // Purple
      cardBg: "#F3E5F5",
    },
    {
      title: "Total Dashboards",
      value: cardsCount,
      icon: <BookOpen />,
      color: "#2E7D32", // Green
      cardBg: "#E8F5E9",
    },
    {
      title: "Total Reports",
      value: "156",
      icon: <FileText />,
      color: "#F57C00", // Orange
      cardBg: "#FFF3E0",
    },
  ];

  const keyFeatures = [
    {
      title: "Predict Future Trends",
      icon: <Dashboard />,
      description: "Forecast grades, research output, and budgets with AI.",
    },
    {
      title: "Anomaly Detection",
      icon: <FileText />,
      description: "Identify unusual patterns like overspending or low attendance.",
    },
    {
      title: "Resource Planning",
      icon: <Settings />,
      description: "Optimize resource allocation using historical data.",
    },
    {
      title: "Early Warnings",
      icon: <BookOpen />,
      description: "Alert on issues like dropouts or low research output.",
    },
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1100, mx: "auto", my: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="text.primary" mb={4}>
        Welcome to College Analytics Suite
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Card */}
      <Card sx={{ p: 3, mb: 4 }}>
        <CardHeader
          title={<Typography variant="h5">Institution Overview</Typography>}
        />
        <CardContent>
          <Grid container spacing={3}>
            {stats.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    width: 215,
                    textAlign: "center",
                    backgroundColor: stat.cardBg,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        bgcolor: stat.color,
                        width: 48,
                        height: 48,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h6" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Key Features Card */}
      <Card sx={{ p: 3, mb: 4 }}>
        <CardHeader
          title={<Typography variant="h5">Key Features</Typography>}
          subheader="Explore what makes our platform powerful"
        />
        <CardContent>
          <Grid container spacing={3}>
            {keyFeatures.map((feature) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 2,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#1976D2",
                      width: 48,
                      height: 48,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
