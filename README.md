# College Course & Student Management System

A modern, production-quality administration dashboard for managing college courses, students, and attendance tracking. Built with React, Vite, and a carefully designed editorial color system that meets WCAG AA accessibility standards.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-19.2.8-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🎯 Core Functionality
- **Dashboard**: Real-time metrics, attendance overview, course distribution, and recent student registrations
- **Student Management**: Full CRUD operations with search, filter, attendance tracking, and status badges
- **Course Management**: Course creation, editing, enrollment tracking, and student lists
- **Attendance Tracking**: Visual status indicators (Eligible ≥75%, Warning 60-74%, Detained <60%)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 Design System
- **Editorial Color Palette**: Calm, modern SaaS aesthetic with indigo brand color
- **WCAG AA Compliant**: All color combinations tested for 4.5:1+ text contrast
- **Tinted Neutrals**: Blue-slate tinted grays for visual cohesion
- **Semantic Color Usage**: Status colors (green, amber, red) used only for meaningful states
- **60/30/10 Balance**: 60% neutral, 30% structure (navy), 10% interactive (indigo)

### ♿ Accessibility
- WCAG 2.1 Level AA compliant
- Keyboard navigation throughout
- Visible focus indicators
- Semantic HTML structure
- Screen reader friendly
- See [ACCESSIBILITY_AUDIT.md](./ACCESSIBILITY_AUDIT.md) for full report

### 💾 Data Management
- localStorage persistence
- Sample data included
- Duplicate prevention
- Referential integrity maintained

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd College-Course-Student-Management-System

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Top navigation bar with breadcrumbs
│   ├── Sidebar.jsx     # Fixed left sidebar navigation
│   ├── DashboardCard.jsx
│   ├── StudentCard.jsx
│   ├── StudentForm.jsx
│   ├── CourseCard.jsx
│   └── CourseForm.jsx
├── pages/              # Route-level page components
│   ├── Dashboard.jsx
│   ├── Students.jsx
│   ├── StudentDetails.jsx
│   ├── Courses.jsx
│   └── CourseDetails.jsx
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js
│   ├── useStudents.js
│   └── useCourses.js
├── styles/             # Design system and styles
│   ├── tokens.css      # Design tokens (colors, spacing, typography)
│   └── style.scss      # Component styles
├── App.jsx             # Root component with routing
├── main.jsx            # Application entry point
└── index.css           # Global styles and resets
```

## 🎨 Design Tokens

All design tokens are centralized in `src/styles/tokens.css`:

### Color System
```css
--color-navy-900: #172554      /* Structure and headings */
--color-indigo-700: #4338CA    /* Interactive elements */
--color-indigo-50: #EEF2FF     /* Selected states */
--color-success: #15803D       /* Eligible (≥75%) */
--color-warning: #B45309       /* Warning (60-74%) */
--color-danger: #B91C1C        /* Detained (<60%) */
```

### Spacing (8px scale)
```css
--space-1: 0.5rem    /* 8px */
--space-2: 1rem      /* 16px */
--space-3: 1.5rem    /* 24px */
--space-4: 2rem      /* 32px */
```

### Typography
```css
--font-sans: 'Inter', system fonts
--text-xs to --text-4xl
--font-normal to --font-bold
```

## 🔑 Key Components

### Dashboard
- 4 metric cards (Total Students, Courses, Eligible, Need Attention)
- Recent student registrations with status badges
- Attendance overview with progress bars
- Course distribution visualization

### Student Management
- Searchable and filterable table/card view
- Add/Edit/Delete operations with validation
- Enrollment number uniqueness enforcement
- Email format validation
- Status badges based on attendance

### Course Management
- Course creation with department selection
- Enrolled student count tracking
- Course detail page with student list
- Warning when deleting courses with enrolled students

## 🗄️ Data Structure

### Student Model
```javascript
{
  id: string,
  name: string,
  enrollmentNumber: string (unique),
  email: string,
  course: string,
  semester: number (1-8),
  gender: string,
  attendance: number (0-100)
}
```

### Course Model
```javascript
{
  id: string,
  name: string,
  code: string (unique),
  department: string,
  duration: string
}
```

## 🎯 Routes

- `/dashboard` - Main dashboard with overview
- `/students` - Student list with search and filters
- `/students/:id` - Student detail page
- `/courses` - Course list with search and filters
- `/courses/:id` - Course detail page with enrolled students
- `/attendance` - Attendance tracking (placeholder)

## 🛠️ Technology Stack

- **React 19.2.8** - UI framework
- **Vite 8.3** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Lucide React** - Icon library
- **Sass** - CSS preprocessing
- **localStorage** - Data persistence

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Features
- Collapsible sidebar drawer
- Stacked form layouts
- Card view for tables
- Touch-optimized buttons (44×44px minimum)

## 🧪 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📊 Sample Data

The application includes sample data for 6 students and 6 courses. Data persists in localStorage and can be reset by clearing browser storage.

## 🔐 Security Considerations

- No authentication implemented (admin dashboard assumed to be behind auth gateway)
- No backend API (localStorage only)
- Input validation on forms
- XSS protection through React's default escaping

## 🚧 Future Enhancements

- [ ] Attendance module with calendar view
- [ ] Export to CSV/PDF
- [ ] Bulk student import
- [ ] Email notifications
- [ ] Reports and analytics
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Backend API integration
- [ ] User authentication and roles

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use functional components with hooks
- Follow existing naming conventions
- Maintain WCAG AA contrast compliance
- Use design tokens (no hardcoded colors)
- Add proper ARIA labels for accessibility

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [ACCESSIBILITY_AUDIT.md](./ACCESSIBILITY_AUDIT.md) for accessibility guidelines

## 🙏 Acknowledgments

- Design inspired by modern SaaS admin dashboards
- Icons by [Lucide](https://lucide.dev/)
- Font: [Inter](https://rsms.me/inter/) by Rasmus Andersson

---

Built with ❤️ for educational institutions
