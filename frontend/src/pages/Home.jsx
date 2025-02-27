import { useState, useEffect } from 'react';
import { Users, Award, BookOpen, FileText } from 'lucide-react';
import { Dashboard, Settings } from '@mui/icons-material';
import { Card, CardContent } from '../components/Card';
import { dashboardCards } from '../components/DashboardCard';


const Home = () => {
    const [totalUsers, setTotalUsers] = useState('Loading...');
    const cardsCount = dashboardCards.length;
    const [setError] = useState(null);

    // Fetch total users from the backend when the component mounts
    // Fetch total users from backend
    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await fetch('http://localhost:7002/api/total-users');
                const data = await response.json();
                if (response.ok) {
                    setTotalUsers(data.totalUsers);
                } else {
                    setError(data.message);
                    console.error('Server error:', data.message);
                }
            } catch (error) {
                setError('Server error');
                console.error('Fetch error:', error);
            }
        };

        fetchTotalUsers();
    }, [setError]);

    const stats = [
        { title: 'Total Users', value: totalUsers, icon: Users, color: 'bg-blue-500' },
        { title: 'Active Students', value: '8', icon: Award, color: 'bg-purple-500' },
        { title: 'Total Dashboards', value: cardsCount, icon: BookOpen, color: 'bg-green-500' },
        { title: 'Total Reports', value: '156', icon: FileText, color: 'bg-orange-500' }
    ];

    const keyFeatures = [
        { title: 'Predict Future Trends', icon: Dashboard, description: 'Forecast grades, research output, and budgets with AI.' },
        { title: 'Anomaly Detection', icon: FileText, description: 'Identify unusual patterns like overspending or low attendance.' },
        { title: 'Resource Planning', icon: Settings, description: 'Optimize resource allocation using historical data.' },
        { title: 'Early Warnings', icon: BookOpen, description: 'Alert on issues like dropouts or low research output.' }
    ];

    return (
        <div className="p-8 max-w-full mx-auto bg-gray-100 rounded-lg shadow-lg">
            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to College Analytics Suite</h2>
                <p className="text-gray-600">Your comprehensive solution for educational data analysis and insights</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map(stat => (
                    <Card key={stat.title} className={`hover:shadow-lg transition-shadow ${stat.color}`}>
                        <CardContent className="p-6 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-sm font-medium">{stat.title}</h3>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Key Features */}
            <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-gray-600">Here are some of the key features of our analytics suite:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {keyFeatures.map((feature) => (
                    <Card
                    key={feature.title}
                    className="hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white rounded-lg overflow-hidden"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-blue-500 p-3 rounded-full border-4 border-blue-200">
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 text-center">{feature.title}</h3>
                            <p className="text-sm text-gray-600 mt-2 text-center">{feature.description}</p>
                            <div className="mt-4 text-center">
                            </div>
                        </CardContent>
                    </Card> 
                ))}
            </div>
        </div>
    );
};

export default Home;