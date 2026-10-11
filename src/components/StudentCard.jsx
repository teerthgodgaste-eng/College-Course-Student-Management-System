import { Mail, BookOpen, User, Trash2, Edit } from 'lucide-react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { status: 'success', label: 'Eligible' };
    if (percentage >= 60) return { status: 'warning', label: 'Warning' };
    return { status: 'danger', label: 'Detained' };
  };

  const attendanceInfo = getAttendanceStatus(student.attendance);

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, var(--color-indigo-700), var(--color-indigo-500))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'var(--font-semibold)',
            fontSize: 'var(--text-lg)'
          }}>
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="card-title" style={{ marginBottom: '0.25rem' }}>
              {student.name}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              {student.enrollmentNumber}
            </div>
          </div>
        </div>
        <div className="table-actions">
          <button
            className="table-action-btn"
            onClick={() => onEdit(student)}
            aria-label="Edit student"
          >
            <Edit size={16} />
          </button>
          <button
            className="table-action-btn danger"
            onClick={() => onDelete(student)}
            aria-label="Delete student"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)' }}>
            <Mail size={16} style={{ color: 'var(--color-text-muted)' }} />
            <span>{student.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)' }}>
            <BookOpen size={16} style={{ color: 'var(--color-text-muted)' }} />
            <span>{student.course} - Semester {student.semester}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)' }}>
            <User size={16} style={{ color: 'var(--color-text-muted)' }} />
            <span>{student.gender}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
              Attendance
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--color-navy-900)' }}>
                {student.attendance}%
              </span>
              <span className={`badge badge-${attendanceInfo.status}`}>
                {attendanceInfo.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
