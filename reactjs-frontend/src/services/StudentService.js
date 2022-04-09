import axios from "axios";

const STUDENT_BASE_REST_API = 'http://localhost:8080/api/v1/students';

class StudentService{

    getAllStudents(){
        return axios.get(STUDENT_BASE_REST_API);
    }

}

export default new StudentService();