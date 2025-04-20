import { useEffect, useState } from "react";
import { CssBaseline, Toolbar } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
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
import UpdateProfile from "./pages/updateProfile";
import Chat from "./pages/Chat";

const Chatbot = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const hideChatbot = path === "/login" || path === "/signup";

  useEffect(() => {
    if (!hideChatbot) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.setAttribute("chatbotId", "RA1DCg3ReDnD-ED0rjpU-");
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [hideChatbot]);

  return null;
};

function AppContent() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Ensuring sidebar visibility persists even after reload
  const [hideSidebar, setHideSidebar] = useState(path === "/login" || path === "/signup");

  useEffect(() => {
    setHideSidebar(path === "/login" || path === "/signup");
  }, [path]);

  return (
    <div>
      <CssBaseline />
      {!hideSidebar && <Sidebar />}
      <div className="flex flex-col flex-grow bg-gray-100">
        {!hideSidebar ? (
          <>
            <AppBar />
            <Toolbar />
          </>
        ) : null}

        <div
          style={{
            marginLeft: hideSidebar ? "0px" : "250px",
            width: hideSidebar ? "100%" : "calc(100% - 250px)"
          }}
          className={hideSidebar ? "flex justify-center items-center h-screen w-full bg-gray-100" : "p-4"}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-groups" element={<ManageGroups />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/faculty-information" element={<FacultyInformation />} />
            <Route path="/Report" element={<FacultyReport />} />
            <Route path="/placement-data" element={<PlacementData />} />
            <Route path="/placement-form" element={<PlacementForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/role-permissions/:groupName" element={<RolePermissions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="h-screen flex">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
