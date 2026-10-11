import { Users, BookOpen, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="card" 
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-surface-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-navy-900)'
          }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div className="card-title" style={{ marginBottom: '0.25rem' }}>
              {course.name}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              {course.code}
            </div>
          </div>
        </div>
        <div className="table-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="table-action-btn"
            onClick={() => onEdit(course)}
            aria-label="Edit course"
          >
            <Edit size={16} />
          </button>
          <button
            className="table-action-btn danger"
            onClick={() => onDelete(course)}
            aria-label="Delete course"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              Department
            </span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
              {course.department}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              Duration
            </span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
              {course.duration}
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingTop: 'var(--space-2)',
            marginTop: 'var(--space-1)',
            borderTop: '1px solid var(--color-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={16} style={{ color: 'var(--color-text-muted)' }} />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                Enrolled Students
              </span>
            </div>
            <span style={{ 
              fontSize: 'var(--text-lg)', 
              fontWeight: 'var(--font-semibold)',
              color: 'var(--color-navy-900)'
            }}>
              {course.enrolledCount || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
