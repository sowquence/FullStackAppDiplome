import axios from "axios";

const GYM_LIST_BASE_API_URL = "https://codeforces.com/api/contest.list?gym=true";
const CONTEST_BASE_API_URL = "http://localhost:8080/api/v1/contests";

class ContestService {

    getGyms() {
        return axios.get(CONTEST_BASE_API_URL)
    }

    saveGym(gymId, tag) {
        return axios.post(CONTEST_BASE_API_URL + "/" + gymId, tag);
    }

    getListAllGym() {
        return axios.get(GYM_LIST_BASE_API_URL);
    }

}

export default new ContestService();