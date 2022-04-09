import axios from "axios";

const STUDENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/students';

class StudentService{

    getAllStudents(){
        return axios.get(STUDENT_BASE_REST_API_URL);
    }

    createStudent(student){
        return axios.post(STUDENT_BASE_REST_API_URL,student);
    }

    getStudentById(studentId){
        return axios.get(STUDENT_BASE_REST_API_URL + '/' + studentId);
    }
}

export default new StudentService();