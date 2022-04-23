import React, {useEffect, useState} from 'react';
import ContestService from "../../services/ContestService";
import Gyms from "./Gyms";
import Pages from "./Pages";

const AllGymListComponent = () => {

    const [gyms, setGyms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [gymsPerPage] = useState(15);

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

    const lastGymIndex = currentPage * gymsPerPage;
    const firstGtmIndex = lastGymIndex - gymsPerPage;
    const currentGym = gyms.slice(firstGtmIndex, lastGymIndex);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <h1 className="text-primary"> Доступные тренировки :</h1>

            <Gyms gyms={currentGym} loading={loading}/>
            <Pages gymsPerPage={gymsPerPage} totalGyms={gyms.length} currPage={currentPage} paginate={paginate}/>

        </div>
    );

};

export default AllGymListComponent;