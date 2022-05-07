import React, {useEffect, useState} from 'react';
import ProfileService from "../services/ProfileService";
import ContestService from "../services/ContestService";

const ProfileListComponent = () => {

    const [profile, setProfile] = useState([]);
    const [gyms, setGyms] = useState([]);

    // const [gymProgress,setGymProgress] = useState([]);
    // const [studentContestsCount, setStudentContestsCount] = useState([]);
    const [startDate, setStartDate] = useState(0);

    const [geomCrit, setGeomCrit] = useState(7);
    const [binCrit, setBinCrit] = useState(4);
    const [dynCrit, setDynCrit] = useState(6);

    const [contestCrit, setContestCrit] = useState(10);
    //10 контестов, 6 динамики, 4 Бин поиска, 7 геометрии


    // геометрия умножаем на 1 +
    // бин поиск умножаем на 5 +
    // динамика умножаем на 2 +
    const [geomBall, setGeomBall] = useState(1);
    const [binBall, setBinBall] = useState(5);
    const [dynBall, setDynBall] = useState(2);


    useEffect(() => {
        getAllProfiles();
        getAllGyms();
    }, [])

    const getAllProfiles = () => {
        ProfileService.getAllProfiles().then((response) => {
            setProfile(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getAllGyms = () => {
        ContestService.getGyms().then((response) => {
            setGyms(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getContestForDate = (contests) => {
        let con = 0;
        for (let i = 0; i < contests.length; i++) {
            if (contests[i].ratingUpdateTimeSeconds > startDate)
                con++;
        }
        return con;
    }

    const countDynamic = (profileId) => {
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === 'DYNAMICS=' ? prgress = gym.gymProgresses : "")

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId)
                count += prgress[i].points
        }
        return count;
    }

    const countBinSearch = (profileId) => {
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === 'BINARY=' ? prgress = gym.gymProgresses : "")

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId)
                count += prgress[i].points
        }
        return count;
    }

    const countGeometry = (profileId) => {
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === 'GEOMETRY=' ? prgress = gym.gymProgresses : "")

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId)
                count += prgress[i].points
        }
        return count;
    }

    const scoringPoints = (profile) => {
        let score = 0;
        let cont = profile.studentContests.sort((a, b) => a.newRating < b.newRating ? 1 : -1);
        if (cont.length < 2)
            score += cont[0].newRating / 2
        else
            score += (cont[0].newRating + cont[1].newRating) / 2

        score += profile.monthTasks
        score += countGeometry(profile.id) * geomBall;
        score += countBinSearch(profile.id) * binBall;
        score += countDynamic(profile.id) * dynBall;

        score += getContestForDate(profile.studentContests)

        return <td>{score}</td>
    }

    const renderTable = () => {
        return profile
            .sort((a, b) => a.rating < b.rating ? 1 : -1)
            .map(
                profiles =>
                    <tr key={profiles.id}>
                        <td>{profiles.student.fullName}</td>
                        <td>{profiles.student.groupId}</td>
                        <td>{profiles.handle}</td>
                        {
                            getContestForDate(profiles.studentContests) < contestCrit ?
                                <td style={{backgroundColor: "red"}}>{getContestForDate(profiles.studentContests)}</td> :
                                <td>{getContestForDate(profiles.studentContests)}</td>
                        }
                        {
                            countDynamic(profiles.id) < dynCrit ?
                                <td style={{backgroundColor: "red"}}>{countDynamic(profiles.id)}</td> :
                                <td>{countDynamic(profiles.id)}</td>
                        }
                        {
                            countBinSearch(profiles.id) < binCrit ?
                                <td style={{backgroundColor: "red"}}>{countBinSearch(profiles.id)}</td> :
                                <td>{countBinSearch(profiles.id)}</td>
                        }
                        {
                            countGeometry(profiles.id) < geomCrit ?
                                <td style={{backgroundColor: "red"}}>{countGeometry(profiles.id)}</td> :
                                <td>{countGeometry(profiles.id)}</td>
                        }
                        <td>{profiles.monthTasks}</td>
                        <td>{profiles.rating}</td>
                        {scoringPoints(profiles)}
                    </tr>
            )
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">Рейтинг студентов</h2>
            <div className="row">
                <h5>Критерии:</h5>
                <div className="form-group mb-2 col-2">
                    <p>Количество Контестов</p>
                    <input
                        type="text"
                        placeholder="Количество Контестов"
                        className="form-control"
                        value={contestCrit}
                        onChange={(e) => setContestCrit(e.target.value)}
                    />
                    <p>Дата начала</p>
                    <input type="date" id="start" name="trip-start"
                           className="form-control"
                           onChange={(e) => setStartDate(Math.floor(new Date(e.target.value).getTime() / 1000))}
                    />
                </div>
                <div className="form-group mb-2 col-2">
                    <p>Количество Геометрии</p>
                    <input
                        type="text"
                        placeholder="Количество Геометрии"
                        className="form-control"
                        value={geomCrit}
                        onChange={(e) => setGeomCrit(e.target.value)}
                    />
                    <p>Коэфициент за задачу</p>
                    <input
                        type="text"
                        placeholder="Коэфициент за задачу"
                        className="form-control"
                        value={geomBall}
                        onChange={(e) => setGeomBall(e.target.value)}
                    />
                </div>
                <div className="form-group mb-2 col-2">
                    <p>Количество Бин поиска</p>
                    <input
                        type="text"
                        placeholder="Количество Бин поиска"
                        className="form-control"
                        value={binCrit}
                        onChange={(e) => setBinCrit(e.target.value)}
                    />
                    <p>Коэфициент за задачу</p>
                    <input
                        type="text"
                        placeholder="Коэфициент за задачу"
                        className="form-control"
                        value={binBall}
                        onChange={(e) => setBinBall(e.target.value)}
                    />
                </div>
                <div className="form-group mb-2 col-2">
                    <p>Количество Динамики</p>
                    <input
                        type="text"
                        placeholder="Количество Динамики"
                        className="form-control"
                        value={dynCrit}
                        onChange={(e) => setDynCrit(e.target.value)}
                    />
                    <p>Коэфициент за задачу</p>
                    <input
                        type="text"
                        placeholder="Коэфициент за задачу"
                        className="form-control"
                        value={dynBall}
                        onChange={(e) => setDynBall(e.target.value)}
                    />
                </div>
            </div>

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
                    <th>БАЛЛ</th>
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


// средний рейтинг за 2 контеста + //TODO а если 1?
// задачи за месяц умножаем на 1 +
// геометрия умножаем на 1 +
// бин поиск умножаем на 5 +
// динамика умножаем на 2 +
// общее колво контестов начиная с января умножаем на 1 +