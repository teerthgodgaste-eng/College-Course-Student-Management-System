import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import './styles/style.scss';

// Layout wrapper component to get current route info
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Get current page name from route
  const getPageName = () => {
    const path = location.pathname;
    if (path.startsWith('/students/')) return 'Student Details';
    if (path.startsWith('/courses/')) return 'Course Details';
    if (path === '/students') return 'Students';
    if (path === '/courses') return 'Courses';
    if (path === '/attendance') return 'Attendance';
    if (path === '/dashboard') return 'Dashboard';
    return 'Dashboard';
  };

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      <Navbar onMenuClick={handleMenuClick} currentPage={getPageName()} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

// Attendance placeholder page
const Attendance = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-header-title">Attendance</h1>
        <p className="page-header-description">
          Attendance tracking and management
        </p>
      </div>
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
        </div>
        <h3 className="empty-state-title">Attendance Module</h3>
        <p className="empty-state-description">
          This feature is coming soon. You can currently view attendance percentages in the student management section.
        </p>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
