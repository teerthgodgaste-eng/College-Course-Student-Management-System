import { Search, Menu, ChevronRight, BookOpen } from 'lucide-react';

const Navbar = ({ onMenuClick, currentPage = 'Dashboard' }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button 
          className="navbar-menu-btn" 
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="navbar-brand">
          <div className="navbar-brand-icon">
            <BookOpen size={20} strokeWidth={2.5} />
          </div>
          <span>College CMS</span>
        </div>

        <div className="navbar-breadcrumb">
          <span>Home</span>
          <span className="navbar-breadcrumb-separator">
            <ChevronRight size={16} />
          </span>
          <span className="navbar-breadcrumb-item">{currentPage}</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-search">
          <Search size={18} className="navbar-search-icon" />
          <input
            type="search"
            placeholder="Search students, courses..."
            aria-label="Search"
          />
        </div>

        <div className="navbar-profile" tabIndex={0}>
          <div className="navbar-profile-avatar">AD</div>
          <span className="navbar-profile-name">Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
