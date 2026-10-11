import { useLocalStorage } from './useLocalStorage';

// Sample initial data
const initialCourses = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS-2024',
    department: 'Engineering',
    duration: '4 Years',
  },
  {
    id: '2',
    name: 'Information Technology',
    code: 'IT-2024',
    department: 'Engineering',
    duration: '4 Years',
  },
  {
    id: '3',
    name: 'Electronics',
    code: 'EC-2024',
    department: 'Engineering',
    duration: '4 Years',
  },
  {
    id: '4',
    name: 'Mechanical',
    code: 'ME-2024',
    department: 'Engineering',
    duration: '4 Years',
  },
  {
    id: '5',
    name: 'Civil',
    code: 'CV-2024',
    department: 'Engineering',
    duration: '4 Years',
  },
  {
    id: '6',
    name: 'Electrical',
    code: 'EE-2024',
    department: 'Engineering',
    duration: '4 Years',
  },
];

export const useCourses = () => {
  const [courses, setCourses] = useLocalStorage('cms_courses', initialCourses);

  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now().toString(),
    };
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  const updateCourse = (id, updatedData) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === id ? { ...course, ...updatedData } : course
      )
    );
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const getCourseById = (id) => {
    return courses.find(course => course.id === id);
  };

  const checkCourseCodeExists = (code, excludeId = null) => {
    return courses.some(
      course => course.code === code && course.id !== excludeId
    );
  };

  return {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    checkCourseCodeExists,
  };
};
