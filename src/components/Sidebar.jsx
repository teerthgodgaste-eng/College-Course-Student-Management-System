import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, ClipboardCheck, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    {
      to: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
    },
    {
      to: '/students',
      icon: Users,
      label: 'Students',
    },
    {
      to: '/courses',
      icon: BookOpen,
      label: 'Courses',
    },
    {
      to: '/attendance',
      icon: ClipboardCheck,
      label: 'Attendance',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">
              <BookOpen size={24} strokeWidth={2.5} />
            </div>
            <span className="sidebar-brand-text">College CMS</span>
          </div>
          
          {/* Mobile close button */}
          <button 
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <ul className="sidebar-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `sidebar-nav-link ${isActive ? 'sidebar-nav-link-active' : ''}`
                    }
                    onClick={onClose}
                  >
                    <Icon size={20} strokeWidth={2} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-text">
            <div className="sidebar-footer-version">Version 1.0.0</div>
            <div className="sidebar-footer-copyright">© 2026 College CMS</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
