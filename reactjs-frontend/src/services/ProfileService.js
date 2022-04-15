import axios from "axios";

const STUDENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/profiles';

class ProfileService{

    getAllProfiles() {
        return axios.get(STUDENT_BASE_REST_API_URL);
    }
}
export default new ProfileService();