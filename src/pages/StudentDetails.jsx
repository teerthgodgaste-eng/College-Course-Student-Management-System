import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, BookOpen, User, Calendar, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import StudentForm from '../components/StudentForm';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, updateStudent, deleteStudent } = useStudents();
  
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const student = getStudentById(id);

  if (!student) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">
            <AlertCircle size={32} />
          </div>
          <h3 className="empty-state-title">Student Not Found</h3>
          <p className="empty-state-description">
            The student you're looking for doesn't exist or has been removed.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/students')}>
            <ArrowLeft size={18} />
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { status: 'success', label: 'Eligible' };
    if (percentage >= 60) return { status: 'warning', label: 'Warning' };
    return { status: 'danger', label: 'Detained' };
  };

  const statusInfo = getAttendanceStatus(student.attendance);

  const handleEdit = (formData) => {
    updateStudent(student.id, formData);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    deleteStudent(student.id);
    navigate('/students');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/students')}
          style={{ marginBottom: 'var(--space-2)' }}
        >
          <ArrowLeft size={18} />
          Back to Students
        </button>
        
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, var(--color-indigo-700), var(--color-indigo-500))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'var(--font-bold)',
              fontSize: 'var(--text-3xl)',
            }}>
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="page-header-title" style={{ marginBottom: '0.5rem' }}>
                {student.name}
              </h1>
              <p className="page-header-description">
                {student.enrollmentNumber}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setShowEditForm(true)}
            >
              <Edit size={18} />
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
        {/* Personal Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Personal Information</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)' }}>
                <Mail size={20} style={{ color: 'var(--color-text-muted)', marginTop: '0.125rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                    Email Address
                  </div>
                  <div style={{ fontWeight: 'var(--font-medium)' }}>
                    {student.email}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)' }}>
                <User size={20} style={{ color: 'var(--color-text-muted)', marginTop: '0.125rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                    Gender
                  </div>
                  <div style={{ fontWeight: 'var(--font-medium)' }}>
                    {student.gender}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)' }}>
                <BookOpen size={20} style={{ color: 'var(--color-text-muted)', marginTop: '0.125rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                    Course
                  </div>
                  <div style={{ fontWeight: 'var(--font-medium)' }}>
                    {student.course}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)' }}>
                <Calendar size={20} style={{ color: 'var(--color-text-muted)', marginTop: '0.125rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                    Semester
                  </div>
                  <div style={{ fontWeight: 'var(--font-medium)' }}>
                    Semester {student.semester}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Attendance</h3>
          </div>
          <div className="card-body">
            <div style={{ textAlign: 'center', padding: 'var(--space-3)' }}>
              <div style={{ fontSize: '4rem', fontWeight: 'var(--font-bold)', color: 'var(--color-navy-900)', lineHeight: 1 }}>
                {student.attendance}%
              </div>
              <div style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <span className={`badge badge-${statusInfo.status}`} style={{ fontSize: 'var(--text-sm)', padding: '0.5rem 1rem' }}>
                  {statusInfo.label}
                </span>
              </div>
              
              {/* Progress bar */}
              <div style={{ width: '100%', height: '0.75rem', backgroundColor: 'var(--color-surface-muted)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginTop: 'var(--space-4)' }}>
                <div style={{
                  width: `${student.attendance}%`,
                  height: '100%',
                  backgroundColor: statusInfo.status === 'success' ? 'var(--color-success)' : 
                                   statusInfo.status === 'warning' ? 'var(--color-warning)' : 
                                   'var(--color-danger)',
                  transition: 'width var(--transition-base)',
                }} />
              </div>

              {/* Attendance thresholds */}
              <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-surface-muted)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Required for eligibility:</span>
                    <span style={{ fontWeight: 'var(--font-semibold)' }}>75%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Warning threshold:</span>
                    <span style={{ fontWeight: 'var(--font-semibold)' }}>60%</span>
                  </div>
                  {student.attendance < 75 && (
                    <div style={{ 
                      marginTop: 'var(--space-2)', 
                      paddingTop: 'var(--space-2)', 
                      borderTop: '1px solid var(--color-border)',
                      color: student.attendance < 60 ? 'var(--color-danger)' : 'var(--color-warning)',
                      fontWeight: 'var(--font-medium)'
                    }}>
                      {student.attendance < 60 
                        ? `Need ${(60 - student.attendance).toFixed(1)}% to reach warning threshold`
                        : `Need ${(75 - student.attendance).toFixed(1)}% to become eligible`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <StudentForm
          student={student}
          onSubmit={handleEdit}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" style={{ maxWidth: '28rem' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Student</h2>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-2)', backgroundColor: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: 'var(--radius-md)' }}>
                <AlertCircle size={20} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  Are you sure you want to delete <strong>{student.name}</strong>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
