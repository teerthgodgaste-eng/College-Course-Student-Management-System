import { useState, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import StudentForm from '../components/StudentForm';
import StudentCard from '../components/StudentCard';
import { useStudents } from '../hooks/useStudents';

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent, checkEnrollmentExists } = useStudents();
  
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

  // Get unique courses for filter
  const courses = useMemo(() => {
    const uniqueCourses = [...new Set(students.map(s => s.course))];
    return uniqueCourses.sort();
  }, [students]);

  // Filter and search students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCourse = !filterCourse || student.course === filterCourse;
      
      return matchesSearch && matchesCourse;
    });
  }, [students, searchQuery, filterCourse]);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDeleteClick = (student) => {
    setDeletingStudent(student);
  };

  const handleDeleteConfirm = () => {
    if (deletingStudent) {
      deleteStudent(deletingStudent.id);
      setDeletingStudent(null);
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingStudent) {
      // Check if enrollment number already exists (excluding current student)
      if (formData.enrollmentNumber !== editingStudent.enrollmentNumber && 
          checkEnrollmentExists(formData.enrollmentNumber)) {
        alert('Enrollment number already exists');
        return;
      }
      updateStudent(editingStudent.id, formData);
    } else {
      // Check if enrollment number already exists
      if (checkEnrollmentExists(formData.enrollmentNumber)) {
        alert('Enrollment number already exists');
        return;
      }
      addStudent(formData);
    }
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { status: 'success', label: 'Eligible' };
    if (percentage >= 60) return { status: 'warning', label: 'Warning' };
    return { status: 'danger', label: 'Detained' };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-header-title">Students</h1>
        <p className="page-header-description">
          Manage student information and track attendance
        </p>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={handleAddStudent}>
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="filter-bar-group">
          <div className="search-bar">
            <Search size={18} className="search-bar-icon" />
            <input
              type="search"
              placeholder="Search by name, enrollment, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search students"
            />
          </div>

          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            aria-label="Filter by course"
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('cards')}
          >
            Cards
          </button>
        </div>
      </div>

      {/* Results count */}
      <div style={{ marginBottom: 'var(--space-3)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
        Showing {filteredStudents.length} of {students.length} students
      </div>

      {/* Content */}
      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <AlertCircle size={32} />
          </div>
          <h3 className="empty-state-title">No students found</h3>
          <p className="empty-state-description">
            {searchQuery || filterCourse
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first student'}
          </p>
          {!searchQuery && !filterCourse && (
            <button className="btn btn-primary" onClick={handleAddStudent}>
              <Plus size={18} />
              Add Student
            </button>
          )}
        </div>
      ) : viewMode === 'cards' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-3)' }}>
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleEditStudent}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <div className="table-container">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Enrollment No.</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Gender</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th style={{ width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => {
                  const statusInfo = getAttendanceStatus(student.attendance);
                  return (
                    <tr key={student.id}>
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
                      <td>{student.email}</td>
                      <td>{student.course}</td>
                      <td>{student.semester}</td>
                      <td>{student.gender}</td>
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
                      <td>
                        <div className="table-actions">
                          <button
                            className="table-action-btn"
                            onClick={() => handleEditStudent(student)}
                            aria-label="Edit student"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="table-action-btn danger"
                            onClick={() => handleDeleteClick(student)}
                            aria-label="Delete student"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Forms and Modals */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {deletingStudent && (
        <div className="modal-backdrop" onClick={() => setDeletingStudent(null)}>
          <div className="modal" style={{ maxWidth: '28rem' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Student</h2>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-2)', backgroundColor: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: 'var(--radius-md)' }}>
                <AlertCircle size={20} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  Are you sure you want to delete <strong>{deletingStudent.name}</strong>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setDeletingStudent(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
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

export default Students;
