import React, {useEffect, useState} from 'react';
import ContestService from "../services/ContestService";

const GymListComponent = () => {

    const [gyms, setGyms] = useState([]);
    const [gymTags, setGymTags] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("GymTags"))
            setGymTags(JSON.parse(localStorage.getItem("GymTags")))

        getAllGyms();
    }, [])

    const getAllGyms = () => {
        ContestService.getGyms().then((response) => {
            setGyms(response.data)
            console.log(response.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const renderTable = () => {
        return gyms.map(

            (gym, i) =>

                <tr key={gym.gid}>
                    <td>{gym.gid}</td>
                    <td>{gym.id}</td>
                    <td>{gym.name}</td>
                    <td>{gymTags.find(tag =>    `${tag.id}=` === gym.tag).gymTag}</td>
                </tr>
        )
    }

    return (
        <div className="container">
            <h3 className="text-center mt-5 mb-3">Отслеживаемые Тренировки</h3>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Id тренировки</th>
                    <th>Название</th>
                    <th>Категория</th>
                </tr>
                </thead>
                <tbody>
                {renderTable()}
                </tbody>
            </table>
        </div>
    );
};

export default GymListComponent;