import React, {useEffect, useState} from 'react';
import ProfileService from "../services/ProfileService";

const ProfileListComponent = () => {

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        getAllProfiles();
    }, [])

    const getAllProfiles = () => {
        ProfileService.getAllProfiles().then((response) => {
            setProfile(response.data)
            console.log(response.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const renderTable = () => {
        return profile.map(
            profiles =>
                <tr key={profiles.id}>
                    <td>{profiles.handle}</td>
                    <td>{profiles.rating}</td>
                    <td>{profiles.rank}</td>
                    <td>{profiles.maxRating}</td>
                    <td>{profiles.maxRank}</td>
                </tr>
        )
    }

    return (
        <div className="container">
            <h2 className="text-center">Rating list</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Handle</th>
                    <th>Rating</th>
                    <th>Rank</th>
                    <th>Max rating</th>
                    <th>Max rank</th>
                </tr>
                </thead>
                <tbody>
                {renderTable()}
                </tbody>
            </table>
        </div>
    );
};

export default ProfileListComponent;