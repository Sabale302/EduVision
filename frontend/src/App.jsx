import { CssBaseline, Toolbar } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/authContext"; // Import AuthProvider
import Sidebar from "./components/Sidebar";
import AppBar from "./components/AppBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FacultyReport from "./pages/FacultyReport";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ManageGroups from "./pages/ManageGroups";
import ManageUsers from "./pages/ManageUsers";
import RolePermissions from "./pages/RolePermissions";
import Profile from "./pages/Profile";
import FacultyInformation from "./pages/FacultyInformation";
import PlacementData from "./pages/PlacementData";
import PlacementForm from "./pages/PlacementForm";
import MainComponent from "./pages/MainComponent";
import UpdateProfile from "./pages/updateProfile";
import Chat from "./pages/Chat";

function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex min-h-screen">
      <CssBaseline />
      {!hideSidebar && <Sidebar />}
      <div className="flex flex-col flex-grow bg-gray-100">
        {!hideSidebar && <AppBar />}
        {!hideSidebar && <Toolbar />}
        <div className={hideSidebar ? "flex justify-center items-center h-screen" : "p-4"}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/manage-groups" element={<ManageGroups />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faculty-information" element={<FacultyInformation />} />
            <Route path="/Report" element={<FacultyReport />} />
            <Route path="/placement-data" element={<PlacementData />} />
            <Route path="/placement-form" element={<PlacementForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/role-permissions/:groupName" element={<RolePermissions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/db-connection" element={<MainComponent />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
