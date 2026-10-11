import { useLocalStorage } from './useLocalStorage';

// Sample initial data
const initialStudents = [
  {
    id: '1',
    name: 'Aditya Sharma',
    enrollmentNumber: 'EN2024001',
    email: 'aditya.sharma@college.edu',
    course: 'Computer Science',
    semester: 6,
    gender: 'Male',
    attendance: 92.5,
  },
  {
    id: '2',
    name: 'Priya Patel',
    enrollmentNumber: 'EN2024002',
    email: 'priya.patel@college.edu',
    course: 'Information Technology',
    semester: 4,
    gender: 'Female',
    attendance: 78.3,
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    enrollmentNumber: 'EN2024003',
    email: 'rahul.kumar@college.edu',
    course: 'Electronics',
    semester: 5,
    gender: 'Male',
    attendance: 55.7,
  },
  {
    id: '4',
    name: 'Sneha Desai',
    enrollmentNumber: 'EN2024004',
    email: 'sneha.desai@college.edu',
    course: 'Mechanical',
    semester: 3,
    gender: 'Female',
    attendance: 88.9,
  },
  {
    id: '5',
    name: 'Arjun Singh',
    enrollmentNumber: 'EN2024005',
    email: 'arjun.singh@college.edu',
    course: 'Computer Science',
    semester: 7,
    gender: 'Male',
    attendance: 67.2,
  },
  {
    id: '6',
    name: 'Meera Reddy',
    enrollmentNumber: 'EN2024006',
    email: 'meera.reddy@college.edu',
    course: 'Civil',
    semester: 2,
    gender: 'Female',
    attendance: 95.1,
  },
];

export const useStudents = () => {
  const [students, setStudents] = useLocalStorage('cms_students', initialStudents);

  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now().toString(),
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, ...updatedData } : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const getStudentById = (id) => {
    return students.find(student => student.id === id);
  };

  const checkEnrollmentExists = (enrollmentNumber, excludeId = null) => {
    return students.some(
      student =>
        student.enrollmentNumber === enrollmentNumber &&
        student.id !== excludeId
    );
  };

  const getStudentsByCourse = (courseName) => {
    return students.filter(student => student.course === courseName);
  };

  const getAttendanceStats = () => {
    const eligible = students.filter(s => s.attendance >= 75).length;
    const warning = students.filter(s => s.attendance >= 60 && s.attendance < 75).length;
    const detained = students.filter(s => s.attendance < 60).length;
    
    return { eligible, warning, detained };
  };

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    checkEnrollmentExists,
    getStudentsByCourse,
    getAttendanceStats,
  };
};
