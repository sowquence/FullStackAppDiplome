import React, {useEffect, useState} from 'react';
import ContestService from "../../services/ContestService";
import Gyms from "./Gyms";
import Pages from "./Pages";

const AllGymListComponent = () => {

    const [gyms, setGyms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [gymsPerPage] = useState(10);
    const [searchVal,setSearchVal] = useState('');

    useEffect(() => {
        getAllGyms().then(r => console.log(r)).catch(error => console.log(error))
    }, [])

    const getAllGyms = async () => {
        setLoading(true)
        ContestService.getListAllGym().then((res) => {
            setGyms(res.data.result)
            setLoading(false)
            console.log(res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }

    const searchHandler = (sVal) =>{
        setCurrentPage(1);
        setSearchVal(sVal)
    }

    const filteredGyms = gyms.filter(gym => {
        return gym.name.toLowerCase().includes(searchVal.toLowerCase());
    })

    const lastGymIndex = currentPage * gymsPerPage;
    const firstGtmIndex = lastGymIndex - gymsPerPage;
    const currentGym = filteredGyms.slice(firstGtmIndex, lastGymIndex);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <div>
                <h3 className="text-primary"> Доступные тренировки :</h3>
            </div>

            <Gyms gyms={currentGym} loading={loading} searchHandler={searchHandler}/>
            <Pages gymsPerPage={gymsPerPage} totalGyms={filteredGyms.length} currPage={currentPage} paginate={paginate}/>

        </div>
    );

};

export default AllGymListComponent;