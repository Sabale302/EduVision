import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Layout from "./components/Layout";

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
import UpdateProfile from "./pages/updateProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes under Layout */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-groups" element={<ManageGroups />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/faculty-information" element={<FacultyInformation />} />
            <Route path="/report" element={<FacultyReport />} />
            <Route path="/placement-data" element={<PlacementData />} />
            <Route path="/placement-form" element={<PlacementForm />} />
            <Route path="/role-permissions/:groupName" element={<RolePermissions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
