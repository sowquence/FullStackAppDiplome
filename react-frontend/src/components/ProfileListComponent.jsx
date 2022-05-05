import React, {useEffect, useState} from 'react';
import ProfileService from "../services/ProfileService";
import ContestService from "../services/ContestService";

const ProfileListComponent = () => {

    const [profile, setProfile] = useState([]);
    const [gyms,setGyms] = useState([]);

    const [gymProgress,setGymProgress] = useState([]);
    const [studentContestsCount, setStudentContestsCount] = useState([]);


    const [startDate, setStartDate] = useState("");

    useEffect(() => {
        getAllProfiles();
        getAllGyms();
    }, [])

    const getAllProfiles = () => {
        ProfileService.getAllProfiles().then((response) => {
            setProfile(response.data)
            console.log(response.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const getAllGyms = () => {
        ContestService.getGyms().then((response)=>{
            setGyms(response.data)
            console.log(response.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const getContestForDate = (contests) => {
        let count = contests.length
        if (count < 10) return <td style={{backgroundColor:"red"}}>{count}</td>
        else return <td>{count}</td>
    }
//10 контестов, 6 динамики, 4 Бин поиска, 7 геометрии
    const countDynamic = (profileId) =>{
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === 'DYNAMICS=' ?  prgress = gym.gymProgresses  : console.log("2") )

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId)
                count =  prgress[i].points
        }

        if (count < 6) return <td style={{backgroundColor:"red"}}>{count}</td>
        else return <td>{count}</td>
    }

    const countBinSearch = (profileId) =>{
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === 'BINARY=' ?  prgress = gym.gymProgresses  : console.log("2") )

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId)
                count = prgress[i].points
        }

        if (count < 4) return <td style={{backgroundColor:"red"}}>{count}</td>
        else return <td>{count}</td>
    }

    const countGeometry = (profileId) =>{
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === 'GEOMETRY' ?  prgress = gym.gymProgresses  : console.log("2") )

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId)
                count = prgress[i].points
        }
        if (count < 7) return <td style={{backgroundColor:"red"}}>{count}</td>
        else return <td>{count}</td>
    }

    const renderTable = () => {
        return profile.map(
            profiles =>
                <tr key={profiles.id}>
                    <td>{profiles.student.fullName}</td>
                    <td>{profiles.student.groupId}</td>
                    <td>{profiles.handle}</td>
                    {getContestForDate(profiles.studentContests)}
                    {countDynamic(profiles.id)}
                    {countBinSearch(profiles.id)}
                    {countGeometry(profiles.id)}
                    <td>{profiles.monthTasks}</td>
                    <td>{profiles.rating}</td>
                </tr>
        )
    }

    return (
        <div className="container">
            <h2 className="text-center">Rating list</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>ГРУППА</th>
                    <th>ХЭНДЛ</th>
                    <th>КОНТЕСТОВ РЕШЕНО</th>
                    <th>ДИНАМИКА</th>
                    <th>БИН.ПОИСК</th>
                    <th>ГЕОМЕТРИЯ</th>
                    <th>ЗАДАЧ ЗА МЕСЯЦ</th>
                    <th>РЕЙТИНГ</th>
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