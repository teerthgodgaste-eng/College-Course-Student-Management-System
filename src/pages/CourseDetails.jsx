import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, BookOpen, Building2, Clock, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { useStudents } from '../hooks/useStudents';
import CourseForm from '../components/CourseForm';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, updateCourse, deleteCourse } = useCourses();
  const { students } = useStudents();
  
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const course = getCourseById(id);
  const enrolledStudents = course ? students.filter(s => s.course === course.name) : [];

  if (!course) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">
            <AlertCircle size={32} />
          </div>
          <h3 className="empty-state-title">Course Not Found</h3>
          <p className="empty-state-description">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/courses')}>
            <ArrowLeft size={18} />
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = (formData) => {
    updateCourse(course.id, formData);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    deleteCourse(course.id);
    navigate('/courses');
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { status: 'success', label: 'Eligible' };
    if (percentage >= 60) return { status: 'warning', label: 'Warning' };
    return { status: 'danger', label: 'Detained' };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/courses')}
          style={{ marginBottom: 'var(--space-2)' }}
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>
        
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-surface-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-navy-900)',
            }}>
              <BookOpen size={40} />
            </div>
            <div>
              <h1 className="page-header-title" style={{ marginBottom: '0.5rem' }}>
                {course.name}
              </h1>
              <p className="page-header-description">
                {course.code}
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        {/* Course Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Course Information</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)' }}>
                <Building2 size={20} style={{ color: 'var(--color-text-muted)', marginTop: '0.125rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                    Department
                  </div>
                  <div style={{ fontWeight: 'var(--font-medium)' }}>
                    {course.department}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)' }}>
                <Clock size={20} style={{ color: 'var(--color-text-muted)', marginTop: '0.125rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                    Duration
                  </div>
                  <div style={{ fontWeight: 'var(--font-medium)' }}>
                    {course.duration}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)' }}>
                <Users size={20} style={{ color: 'var(--color-text-muted)', marginTop: '0.125rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                    Enrolled Students
                  </div>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-navy-900)' }}>
                    {enrolledStudents.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Stats */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Enrollment Statistics</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  Total Students
                </span>
                <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)' }}>
                  {enrolledStudents.length}
                </span>
              </div>

              {enrolledStudents.length > 0 && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                      Average Attendance
                    </span>
                    <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)' }}>
                      {(enrolledStudents.reduce((sum, s) => sum + s.attendance, 0) / enrolledStudents.length).toFixed(1)}%
                    </span>
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: 'var(--space-2)',
                    paddingTop: 'var(--space-3)',
                    marginTop: 'var(--space-2)',
                    borderTop: '1px solid var(--color-border)'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                        Eligible
                      </div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--color-success)' }}>
                        {enrolledStudents.filter(s => s.attendance >= 75).length}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                        Warning
                      </div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--color-warning)' }}>
                        {enrolledStudents.filter(s => s.attendance >= 60 && s.attendance < 75).length}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                        Detained
                      </div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--color-danger)' }}>
                        {enrolledStudents.filter(s => s.attendance < 60).length}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Students List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Enrolled Students</h3>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => navigate('/students')}
          >
            View All Students
          </button>
        </div>
        <div className="card-body">
          {enrolledStudents.length === 0 ? (
            <div className="empty-state" style={{ padding: 'var(--space-4)' }}>
              <div className="empty-state-icon">
                <Users size={24} />
              </div>
              <p className="empty-state-description">No students enrolled in this course yet</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Enrollment No.</th>
                    <th>Semester</th>
                    <th>Attendance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents.map(student => {
                    const statusInfo = getAttendanceStatus(student.attendance);
                    return (
                      <tr 
                        key={student.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/students/${student.id}`)}
                      >
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: 'var(--radius-full)',
                              background: 'linear-gradient(135deg, var(--color-indigo-700), var(--color-indigo-500))',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 'var(--font-semibold)',
                              fontSize: 'var(--text-xs)',
                            }}>
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 'var(--font-medium)' }}>{student.name}</span>
                          </div>
                        </td>
                        <td>{student.enrollmentNumber}</td>
                        <td>Semester {student.semester}</td>
                        <td>
                          <span style={{ fontWeight: 'var(--font-semibold)' }}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-${statusInfo.status}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <CourseForm
          course={course}
          onSubmit={handleEdit}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" style={{ maxWidth: '28rem' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Course</h2>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-2)', backgroundColor: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: 'var(--radius-md)' }}>
                <AlertCircle size={20} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
                <div style={{ fontSize: 'var(--text-sm)' }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    Are you sure you want to delete <strong>{course.name}</strong>?
                  </p>
                  {enrolledStudents.length > 0 && (
                    <p style={{ color: 'var(--color-danger)', fontWeight: 'var(--font-medium)' }}>
                      Warning: {enrolledStudents.length} student(s) are currently enrolled in this course.
                    </p>
                  )}
                </div>
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
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
