import { useState } from 'react';
import { Users, BookOpen, CheckCircle, AlertTriangle, Plus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { useStudents } from '../hooks/useStudents';
import { useCourses } from '../hooks/useCourses';

const Dashboard = () => {
  const navigate = useNavigate();
  const { students, getAttendanceStats } = useStudents();
  const { courses } = useCourses();

  const attendanceStats = getAttendanceStats();
  const studentsNeedingAttention = attendanceStats.warning + attendanceStats.detained;

  // Get recent students (last 5)
  const recentStudents = [...students]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 5);

  // Course distribution
  const courseDistribution = courses.map(course => {
    const enrolledCount = students.filter(s => s.course === course.name).length;
    return {
      name: course.name,
      count: enrolledCount,
    };
  });

  // Get status badge
  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { status: 'success', label: 'Eligible' };
    if (percentage >= 60) return { status: 'warning', label: 'Warning' };
    return { status: 'danger', label: 'Detained' };
  };

  // Chart colors (indigo family for course distribution)
  const chartColors = [
    'var(--color-indigo-700)',
    'var(--color-indigo-500)',
    'var(--color-navy-700)',
    'var(--color-navy-800)',
    'var(--color-border-strong)',
    'var(--color-text-muted)',
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-header-title">Dashboard</h1>
        <p className="page-header-description">
          Overview of students, courses, and attendance metrics
        </p>
        <div className="page-header-actions">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/courses')}
          >
            <Plus size={18} />
            Add Course
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/students')}
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <DashboardCard
          title="Total Students"
          value={students.length}
          icon={Users}
          trend="positive"
          trendValue={`${students.length} enrolled`}
        />
        <DashboardCard
          title="Total Courses"
          value={courses.length}
          icon={BookOpen}
          trend="positive"
          trendValue={`${courses.length} active`}
        />
        <DashboardCard
          title="Eligible Students"
          value={attendanceStats.eligible}
          icon={CheckCircle}
          trend="positive"
          trendValue={`${Math.round((attendanceStats.eligible / students.length) * 100)}% of total`}
        />
        <DashboardCard
          title="Need Attention"
          value={studentsNeedingAttention}
          icon={AlertTriangle}
          trend={studentsNeedingAttention > 0 ? 'negative' : 'positive'}
          trendValue={`${attendanceStats.warning} warning, ${attendanceStats.detained} detained`}
        />
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        {/* Recent Students */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Student Registrations</h3>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => navigate('/students')}
            >
              View All
            </button>
          </div>
          <div className="card-body">
            {recentStudents.length === 0 ? (
              <div className="empty-state" style={{ padding: 'var(--space-4)' }}>
                <div className="empty-state-icon">
                  <Users size={24} />
                </div>
                <p className="empty-state-description">No students registered yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {recentStudents.map(student => {
                  const statusInfo = getAttendanceStatus(student.attendance);
                  return (
                    <div
                      key={student.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-2)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                      onClick={() => navigate(`/students/${student.id}`)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-indigo-50)';
                        e.currentTarget.style.borderColor = 'var(--color-indigo-700)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: 'var(--radius-full)',
                          background: 'linear-gradient(135deg, var(--color-indigo-700), var(--color-indigo-500))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'var(--font-semibold)',
                          fontSize: 'var(--text-sm)',
                        }}>
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)' }}>
                            {student.name}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                            {student.course}
                          </div>
                        </div>
                      </div>
                      <span className={`badge badge-${statusInfo.status}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Attendance Overview</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {/* Attendance bars */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
                    Eligible (≥75%)
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    {attendanceStats.eligible} students ({Math.round((attendanceStats.eligible / students.length) * 100)}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '0.5rem', backgroundColor: 'var(--color-surface-muted)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(attendanceStats.eligible / students.length) * 100}%`,
                    height: '100%',
                    backgroundColor: 'var(--color-success)',
                    transition: 'width var(--transition-base)',
                  }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
                    Warning (60-74%)
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    {attendanceStats.warning} students ({Math.round((attendanceStats.warning / students.length) * 100)}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '0.5rem', backgroundColor: 'var(--color-surface-muted)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(attendanceStats.warning / students.length) * 100}%`,
                    height: '100%',
                    backgroundColor: 'var(--color-warning)',
                    transition: 'width var(--transition-base)',
                  }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
                    Detained (&lt;60%)
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    {attendanceStats.detained} students ({Math.round((attendanceStats.detained / students.length) * 100)}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '0.5rem', backgroundColor: 'var(--color-surface-muted)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(attendanceStats.detained / students.length) * 100}%`,
                    height: '100%',
                    backgroundColor: 'var(--color-danger)',
                    transition: 'width var(--transition-base)',
                  }} />
                </div>
              </div>

              {/* Legend */}
              <div style={{ 
                display: 'flex', 
                gap: 'var(--space-3)', 
                marginTop: 'var(--space-2)',
                paddingTop: 'var(--space-3)',
                borderTop: '1px solid var(--color-border)',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-success)' }} />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Eligible</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-warning)' }} />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Warning</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-danger)' }} />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Detained</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Distribution */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Course Distribution</h3>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => navigate('/courses')}
          >
            Manage Courses
          </button>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
            {courseDistribution.map((course, index) => (
              <div
                key={course.name}
                style={{
                  padding: 'var(--space-3)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-fast)',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/courses')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = chartColors[index % chartColors.length];
                  e.currentTarget.style.backgroundColor = 'var(--color-indigo-50)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <div style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: chartColors[index % chartColors.length],
                  }} />
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
                    {course.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-navy-900)' }}>
                    {course.count}
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
