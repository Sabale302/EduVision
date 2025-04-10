import { useState, useEffect } from "react";
import { Users, Award, BookOpen, FileText } from "lucide-react";
import { Dashboard, Settings } from "@mui/icons-material";
import { Box, Grid, Typography, Card, CardContent, Avatar, Paper,} from "@mui/material";
import { dashboardCards } from "../components/DashboardCard";

const Home = () => {
  const [totalUsers, setTotalUsers] = useState("Loading...");
  const [setError] = useState(null);
  const cardsCount = dashboardCards.length;

  // Fetch total users from the backend
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch("https://eduvision-r00l.onrender.com:7002/api/total-users");
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
    { title: "Total Users", value: totalUsers, icon: <Users />, color: "#2196F3" },
    { title: "Active Students", value: "8", icon: <Award />, color: "#9C27B0" },
    { title: "Total Dashboards", value: cardsCount, icon: <BookOpen />, color: "#4CAF50" },
    { title: "Total Reports", value: "156", icon: <FileText />, color: "#FF9800" },
  ];

  const keyFeatures = [
    { title: "Predict Future Trends", icon: <Dashboard />, description: "Forecast grades, research output, and budgets with AI." },
    { title: "Anomaly Detection", icon: <FileText />, description: "Identify unusual patterns like overspending or low attendance." },
    { title: "Resource Planning", icon: <Settings />, description: "Optimize resource allocation using historical data." },
    { title: "Early Warnings", icon: <BookOpen />, description: "Alert on issues like dropouts or low research output." },
  ];

  return (
    <Box sx={{ p: 4, maxWidth: "100%", mx: "auto", bgcolor: "#F5F5F5", borderRadius: 2 }}>
      {/* Welcome Section */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Welcome to College Analytics Suite
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your comprehensive solution for educational data analysis and insights.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card sx={{ p: 2, borderRadius: 2, textAlign: "center", transition: "0.3s", "&:hover": { boxShadow: 6, transform: "scale(1.05)" } }}>
              <CardContent>
                <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48, mx: "auto", mb: 2 }}>
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

      {/* Key Features */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Key Features
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here are some of the key features of our analytics suite:
        </Typography>
      </Box>

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
              <Avatar sx={{ bgcolor: "#1976D2", width: 48, height: 48, mx: "auto", mb: 2 }}>
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
    </Box>
  );
};

export default Home;
