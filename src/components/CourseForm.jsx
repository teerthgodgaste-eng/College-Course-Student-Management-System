import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const CourseForm = ({ course = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: '',
    duration: '4 Years',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (course) {
      setFormData(course);
    }
  }, [course]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Course code is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
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
            {course ? 'Edit Course' : 'Add New Course'}
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
            <div className="form-group">
              <label htmlFor="name" className="form-label form-label-required">
                Course Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Computer Science"
              />
              {errors.name && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="code" className="form-label form-label-required">
                Course Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                className={`form-input ${errors.code ? 'error' : ''}`}
                value={formData.code}
                onChange={handleChange}
                placeholder="CS-2024"
                disabled={!!course}
              />
              {errors.code && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.code}</span>
                </div>
              )}
              {course && (
                <div className="form-helper">
                  Course code cannot be changed after creation
                </div>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="department" className="form-label form-label-required">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  className={`form-select ${errors.department ? 'error' : ''}`}
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Science">Science</option>
                  <option value="Arts">Arts</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Law">Law</option>
                </select>
                {errors.department && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.department}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="duration" className="form-label form-label-required">
                  Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  className={`form-select ${errors.duration ? 'error' : ''}`}
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                  <option value="4 Years">4 Years</option>
                  <option value="5 Years">5 Years</option>
                  <option value="6 Years">6 Years</option>
                </select>
                {errors.duration && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.duration}</span>
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
              {course ? 'Save Changes' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
