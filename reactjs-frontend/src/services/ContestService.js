import axios from "axios";

const GYM_LIST_BASE_API_URL = "https://codeforces.com/api/contest.list?gym=true";

class ContestService{

    getListAllGym(){
        return axios.get(GYM_LIST_BASE_API_URL);
    }

}
export default new ContestService();