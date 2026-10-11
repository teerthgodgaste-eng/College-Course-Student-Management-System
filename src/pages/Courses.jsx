import { useState, useMemo } from 'react';
import { Plus, Search, AlertCircle, Trash2 } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import CourseForm from '../components/CourseForm';
import { useCourses } from '../hooks/useCourses';
import { useStudents } from '../hooks/useStudents';

const Courses = () => {
  const { courses, addCourse, updateCourse, deleteCourse, checkCourseCodeExists } = useCourses();
  const { students } = useStudents();
  
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  // Get unique departments for filter
  const departments = useMemo(() => {
    const uniqueDepts = [...new Set(courses.map(c => c.department))];
    return uniqueDepts.sort();
  }, [courses]);

  // Add enrolled count to courses
  const coursesWithCount = useMemo(() => {
    return courses.map(course => ({
      ...course,
      enrolledCount: students.filter(s => s.course === course.name).length,
    }));
  }, [courses, students]);

  // Filter and search courses
  const filteredCourses = useMemo(() => {
    return coursesWithCount.filter(course => {
      const matchesSearch = 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = !filterDepartment || course.department === filterDepartment;
      
      return matchesSearch && matchesDepartment;
    });
  }, [coursesWithCount, searchQuery, filterDepartment]);

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDeleteClick = (course) => {
    setDeletingCourse(course);
  };

  const handleDeleteConfirm = () => {
    if (deletingCourse) {
      deleteCourse(deletingCourse.id);
      setDeletingCourse(null);
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingCourse) {
      // Check if course code already exists (excluding current course)
      if (formData.code !== editingCourse.code && checkCourseCodeExists(formData.code)) {
        alert('Course code already exists');
        return;
      }
      updateCourse(editingCourse.id, formData);
    } else {
      // Check if course code already exists
      if (checkCourseCodeExists(formData.code)) {
        alert('Course code already exists');
        return;
      }
      addCourse(formData);
    }
    setShowForm(false);
    setEditingCourse(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-header-title">Courses</h1>
        <p className="page-header-description">
          Manage course information and track enrollment
        </p>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={handleAddCourse}>
            <Plus size={18} />
            Add Course
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
              placeholder="Search by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search courses"
            />
          </div>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            aria-label="Filter by department"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div style={{ marginBottom: 'var(--space-3)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
        Showing {filteredCourses.length} of {courses.length} courses
      </div>

      {/* Content */}
      {filteredCourses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <AlertCircle size={32} />
          </div>
          <h3 className="empty-state-title">No courses found</h3>
          <p className="empty-state-description">
            {searchQuery || filterDepartment
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first course'}
          </p>
          {!searchQuery && !filterDepartment && (
            <button className="btn btn-primary" onClick={handleAddCourse}>
              <Plus size={18} />
              Add Course
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-3)' }}>
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEditCourse}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Forms and Modals */}
      {showForm && (
        <CourseForm
          course={editingCourse}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {deletingCourse && (
        <div className="modal-backdrop" onClick={() => setDeletingCourse(null)}>
          <div className="modal" style={{ maxWidth: '28rem' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Course</h2>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-2)', backgroundColor: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: 'var(--radius-md)' }}>
                <AlertCircle size={20} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
                <div style={{ fontSize: 'var(--text-sm)' }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    Are you sure you want to delete <strong>{deletingCourse.name}</strong>?
                  </p>
                  {deletingCourse.enrolledCount > 0 && (
                    <p style={{ color: 'var(--color-danger)', fontWeight: 'var(--font-medium)' }}>
                      Warning: {deletingCourse.enrolledCount} student(s) are currently enrolled in this course.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setDeletingCourse(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
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

export default Courses;
