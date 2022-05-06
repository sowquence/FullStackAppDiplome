import React, {useEffect, useState} from 'react';
import ContestService from "../services/ContestService";

const GymListComponent = () => {

    const [gyms, setGyms] = useState([]);

    useEffect(() => {
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
            gym =>
                <tr key={gym.gid}>
                    <td>{gym.gid}</td>
                    <td>{gym.id}</td>
                    <td>{gym.name}</td>
                </tr>
        )
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">Мои Тренировки</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Id тренировки</th>
                    <th>Название</th>
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