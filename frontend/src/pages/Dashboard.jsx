import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
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
    <div className="border-black w-auto">
      <div className="p-5 rounded shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 mb-2 text-slate-800 text-xl font-semibold">
            Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {accessibleDashboards.map((card) => (
              <Card
                key={card.title}
                className="bg-white hover:shadow-lg transition-shadow overflow-hidden"
              >
                <CardContent>
                  <h3 className="text-gray-500 text-sm font-medium mb-2 text-center">
                    {card.title}
                  </h3>
                  {card.isPowerBI ? (
                    // Render Power BI iframe if the card is a Power BI dashboard
                    <iframe
                      src={card.link}
                      title={card.title}
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-64" // Adjust height as needed
                    ></iframe>
                  ) : (
                    // Render image with navigation for other dashboards
                    <button
                      onClick={() => handleDashboard(card.title)}
                      className="w-full h-full"
                    >
                      <img
                        src={card.link}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default Dashboard;
