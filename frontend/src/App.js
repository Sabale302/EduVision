import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Groups from './pages/groups';
import Permissions from './pages/Permissions';

function App() {
  return (
    <div className="app">
      <Router>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
