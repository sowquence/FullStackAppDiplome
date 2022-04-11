import axios from "axios";

const STUDENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/students';

class StudentService {

    getAllStudents(property) {
        return axios.get(STUDENT_BASE_REST_API_URL + '/all/' + property);
    }

    createStudent(student) {
        return axios.post(STUDENT_BASE_REST_API_URL, student);
    }

    getStudentById(studentId) {
        return axios.get(STUDENT_BASE_REST_API_URL + '/' + studentId);
    }

    updateStudentById(studentId, student) {
        return axios.put(STUDENT_BASE_REST_API_URL + '/' + studentId, student);
    }

    deleteStudentById(studentId) {
        return axios.delete(STUDENT_BASE_REST_API_URL + '/' + studentId);
    }
}

export default new StudentService();