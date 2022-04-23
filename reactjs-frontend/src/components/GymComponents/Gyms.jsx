import React from 'react';

const Gyms = ({gyms, loading}) => {

    if (loading) {
        return <h2>Загрузка...</h2>
    }
    return (
        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
            {gyms.map(
                gym =>
                    <tr key={gym.id}>
                        <td>{gym.id}</td>
                        <td>{gym.name}</td>
                    </tr>
            )}
            </tbody>
        </table>
    );
};

export default Gyms;