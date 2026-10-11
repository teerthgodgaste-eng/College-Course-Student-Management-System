import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const StudentForm = ({ student = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
    course: '',
    semester: '1',
    gender: 'Male',
    attendance: '75',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.enrollmentNumber.trim()) {
      newErrors.enrollmentNumber = 'Enrollment number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    const attendance = parseFloat(formData.attendance);
    if (isNaN(attendance) || attendance < 0 || attendance > 100) {
      newErrors.attendance = 'Attendance must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        attendance: parseFloat(formData.attendance),
        semester: parseInt(formData.semester),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label form-label-required">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="enrollmentNumber" className="form-label form-label-required">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  id="enrollmentNumber"
                  name="enrollmentNumber"
                  className={`form-input ${errors.enrollmentNumber ? 'error' : ''}`}
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  placeholder="EN2024001"
                  disabled={!!student}
                />
                {errors.enrollmentNumber && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.enrollmentNumber}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label form-label-required">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@college.edu"
              />
              {errors.email && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="course" className="form-label form-label-required">
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  className={`form-select ${errors.course ? 'error' : ''}`}
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option value="">Select a course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                </select>
                {errors.course && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.course}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="semester" className="form-label form-label-required">
                  Semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  className="form-select"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="gender" className="form-label form-label-required">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="attendance" className="form-label form-label-required">
                  Attendance (%)
                </label>
                <input
                  type="number"
                  id="attendance"
                  name="attendance"
                  className={`form-input ${errors.attendance ? 'error' : ''}`}
                  value={formData.attendance}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.1"
                />
                {errors.attendance && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.attendance}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {student ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
