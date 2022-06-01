import React, {useEffect, useState} from 'react';
import ProfileService from "../services/ProfileService";
import ContestService from "../services/ContestService";
import {Box, LinearProgress, Typography} from "@mui/material";
import {ReactDimmer} from "react-dimmer";
import {Settings} from "./Settings";

const ProfileListComponent = () => {

    const [profile, setProfile] = useState([]); //Список профилей
    const [gyms, setGyms] = useState([]); //Список тренировок

    const [monthContests, setMonthContests] = useState([]);

    const [startDate, setStartDate] = useState(0); //Дата начала
    const [controlPeriodOne, setControlPeriodOne] = useState(0); //Контрольный Срок 1
    const [controlPeriodTwo, setControlPeriodTwo] = useState(0); //Контрольный Срок 2
    const [geomCrit, setGeomCrit] = useState(7); //Количество Геометрии
    const [binCrit, setBinCrit] = useState(4); //Количество Бинарного поиска
    const [dynCrit, setDynCrit] = useState(6); //Количество динамики
    const [contestCrit, setContestCrit] = useState(20); //Количество Контестов
    const [geomBall, setGeomBall] = useState(1);//Баллов за каждую геометрию
    const [binBall, setBinBall] = useState(5);//Баллов за каждую бинарку
    const [dynBall, setDynBall] = useState(2);//Баллов за каждую динамику

    // -Недобор контестов (всего их должно быть 20, также обязательно 2 контеста в июне): -15 за недобранный контест
    //                              контесты в июне?!?!?!??!
    //минус балл за недобранный контест
    const [minusPointWinningContest, setMinusPointWinningContest] = useState(15)

    // -Должно быть 4 динамики: -2.5 за каждую недобранную динамику +-
    // -Должно быть 10 геометрий: -1 за каждую недобранную геометрию +-
    // -Должно быть 4 бин поиска: -2.5 за каждый недобранный бин поиск +-
    //минус балл за недобранную динамику
    const [minusPointWinningDyn, setMinusPointWinningDyn] = useState(2.5)
    //минус балл за недобранную геометрию
    const [minusPointWinningGeo, setMinusPointWinningGeo] = useState(1)
    //минус балл за недобранную бинарку
    const [minusPointWinningBin, setMinusPointWinningBin] = useState(2.5)

    //    плюс балл с N до K контеста
    //  -Контесты с 21 по 24: по +2 +-
    //  -Контесты с 25 по 27: по +4 +-
    //  -Контесты с 28 по 30: по +6 +-
    const [plusNtoKBallOne, setPlusNtoKBallOne] = useState([{from: 21, to: 24, val: 2}])
    const [plusNtoKBallTwo, setPlusNtoKBallTwo] = useState([{from: 25, to: 27, val: 4}])
    const [plusNtoKBallThree, setPlusNtoKBallThree] = useState([{from: 28, to: 30, val: 6}])

    // -Контесты в июне: +2, +4, +6, +8 за 3, 4, 5, 6 контестов соответственно
    const [plusPointContestsMonth, setPlusPointContestsMonth] = useState([
        {val: 3, points: 2},
        {val: 4, points: 4},
        {val: 5, points: 6},
        {val: 6, points: 8}
    ])

    const [minContestsMonth, setMinContestsMonth] = useState(2);

    // -18, 19, 20 решенных геометрий: +3, +5, +12 соответственно +-
    const [plusPointGeo, setPlusPointGeo] = useState([
        {val: 18, points: 3},
        {val: 19, points: 5},
        {val: 20, points: 12}
    ])

    // -5, 6 решенных бин поиск: +3, +25 соответственно +-
    const [plusPointBin, setPlusPointBin] = useState([
        {val: 5, points: 3},
        {val: 6, points: 25}
    ])

    // -7, 8, 9, 10, 11 решенных динамик: +3, +6, +11, +20, +30 соответственно +-
    const [plusPointDyn, setPlusPointDyn] = useState([
        {val: 7, points: 3},
        {val: 8, points: 6},
        {val: 9, points: 11},
        {val: 10, points: 20},
        {val: 11, points: 30}
    ])

    // -7 задач на внутренней олимпиаде: +60 +-
    // -6 задач на внутренней олимпиаде: +45 +-
    // -5 задач на внутренней олимпиаде: +30 +-
    // -4 задачи на внутренней олимпиаде: +15 +-
    const [plusPointInternalOlympiad, setPointInternalOlympiad] = useState([
        {val: 4, points: 15},
        {val: 5, points: 30},
        {val: 6, points: 45},
        {val: 7, points: 60}
    ])
    // -3 решенных задачи на городской олимпиаде: +40 +-
    // -2 решенных задачи на городской олимпиаде: +20 +-
    const [plusPointUrbanOlympiad, setPointUrbanOlympiad] = useState([
        {val: 2, points: 20},
        {val: 3, points: 40}
    ])

    // -Неучастие в внутренней олимпиаде: -50 +-
    const [minusNonParticipationInternalOlympiad, setMinusNonParticipationInternalOlympiad] = useState(50)

    // -Неучастие в городской олимпиаде: -80 +-
    const [minusNonParticipationUrbanOlympiad, setMinusNonParticipationUrbanOlympiad] = useState(80)

    const [fivePoints, setFivePoints] = useState(1330)
    const [fourPoints, setFourPoints] = useState(1180)

    const [loading, setLoading] = useState(false); // индикатор загрузки
    const [isMenuOpen, setMenu] = useState(false); // меню настроек

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

    const getListContestsForDate = (contests) => {
        let tarContests = [];
        for (let i = 0; i < contests.length; i++) {
            if (contests[i].ratingUpdateTimeSeconds >= startDate)
                tarContests.push(contests[i]);
        }
        return tarContests;
    }

    const countDynamic = (profileId) => {
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === 'DYNAMICS=' ? prgress = gym.gymProgresses : "")

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId && prgress[i].points > count)
                count = prgress[i].points
        }
        return count;
    }

    const countBinSearch = (profileId) => {
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === 'BINARY=' ? prgress = gym.gymProgresses : "")

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId && prgress[i].points > count)
                count = prgress[i].points
        }
        return count;
    }

    const countGeometry = (profileId) => {
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === 'GEOMETRY=' ? prgress = gym.gymProgresses : "")

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId && prgress[i].points > count)
                count = prgress[i].points
        }
        return count;
    }


    const scoringPointsForContests = (sizeContests) => {
        let size = sizeContests;
        let tmtScore = 0;
        let tmp;
        let f = 0;
        if (size >= plusNtoKBallThree[0].from) {
            tmp = size - plusNtoKBallThree[0].from;
            if (f===0){
                tmp++;
                f = 1;
            }
            tmtScore += tmp * plusNtoKBallThree[0].val;
            size = plusNtoKBallThree[0].from;
        }
        if (size >= plusNtoKBallTwo[0].from) {
            tmp = size - plusNtoKBallTwo[0].from;
            if (f===0){
                tmp++;
                f = 1;
            }
            tmtScore += tmp * plusNtoKBallTwo[0].val;
            size = plusNtoKBallTwo[0].from;
        }
        if (size >= plusNtoKBallOne[0].from) {
            tmp = size - plusNtoKBallOne[0].from;
            if (f===0){
                tmp++;
            }
            tmtScore += tmp * plusNtoKBallOne[0].val;
        }
        console.log("Score = " + tmtScore)
        return tmtScore;

    }

    const scoringPoints = (profile) => {
        let targetContests = getListContestsForDate(profile.studentContests);
        let score = 0;
        let contForPosSeven = targetContests.slice(7);

        let cont = contForPosSeven.sort((a, b) => a.newRating < b.newRating ? 1 : -1);
        if (cont.length < 2)
            score += cont[0].newRating / 2
        else
            score += (cont[0].newRating + cont[1].newRating) / 2


        // на этом этапе score = среднее из двух лучших контестов начиная с 7

        // доп баллы за контесты
        let tmpScore = scoringPointsForContests(targetContests.length);
        score += tmpScore;

        //вычет баллов за не вополнение плана по контестам
        let mis = 0;
        if (targetContests.length < contestCrit){
            let minus = contestCrit - targetContests.length;
            mis = minus * minusPointWinningContest;
        }
        score = score - mis;

        //вычет баллов за не вополнение плана по бинпоиску
        let bincount = countBinSearch(profile.id);
        let binmis = 0;
        if (bincount < binCrit){
            let minus = binCrit - bincount;
            binmis = minus * minusPointWinningBin;
        }
        score = score - binmis;

        //вычет баллов за не вополнение плана по динамике
        let dyncount = countDynamic(profile.id);
        let dynmis = 0;
        if (dyncount < dynCrit){
            let minus = binCrit - dyncount;
            dynmis = minus * minusPointWinningDyn;
        }
        score = score - dynmis;

        //вычет баллов за не вополнение плана по геометрия
        let geocount = countDynamic(profile.id);
        let geomis = 0;
        if (geocount < geomCrit){
            let minus = geomCrit - geocount;
            geomis = minus * minusPointWinningGeo;
        }
        score = score - geomis;

        // score += profile.monthTasks
        // score += countGeometry(profile.id) * geomBall;
        // score += countBinSearch(profile.id) * binBall;
        // score += countDynamic(profile.id) * dynBall;
        // score += getContestForDate(profile.studentContests)

        return score;
    }

    const globalUpdate = async () => {
        setLoading(true)
        ProfileService.updateDataAllProfiles().then(() => {
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const estimation = (score) => {
        if (score >= fivePoints)
            return 5;
        else if (score >= fourPoints)
            return 4;
        else return 2;
    }

    // const handleOnExport = () => {
    //
    //     let elem = document.getElementById('table-to-xls').outerHTML;
    //
    //     var HtmlToJsonString = JSON.stringify(elem);
    //
    //     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //
    //     const ws = XLSX.utils.json_to_sheet(HtmlToJsonString);
    //     const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    //     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //     const data = new Blob([excelBuffer], {type: fileType});
    //     FileSaver.saveAs(data, 'Рейтинг Олимпиадников.xlsx');
    // }


    const handleMenu = () => {
        setMenu((prevState) => !prevState);
    };

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
                        <td>{scoringPoints(profiles)}</td>
                        <td>1</td>
                        <td>2</td>
                        {/*<td>{estimation(scoringPoints(profiles))}</td>*/}
                    </tr>
            )
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">Рейтинг студентов</h2>
            <div className="row">
                <div className="form-group col-8">

                    <button className="btn btn-primary m-2 h6 "
                            onClick={handleMenu}>Настройки критериев
                    </button>

                    <button
                        className="btn btn-primary m-2 h6"
                        // onClick={() => handleOnExport()}
                    >Выгрузить в Excel
                    </button>

                    <button
                        className="btn btn-danger m-2 h6"
                        onClick={() => globalUpdate()}
                    >Обновить все данные
                    </button>

                </div>


                <Settings
                    isMenuOpen={isMenuOpen} handle={handleMenu} setStartDate={setStartDate}
                    startDate={startDate} setContestCrit={setContestCrit} contestCrit={contestCrit}
                    geomCrit={geomCrit} setGeomCrit={setGeomCrit} geomBall={geomBall}
                    setGeomBall={setGeomBall} binCrit={binCrit} setBinCrit={setBinCrit}
                    binBall={binBall} setBinBall={setBinBall} dynCrit={dynCrit}
                    setDynCrit={setDynCrit} dynBall={dynBall} setDynBall={setDynBall}
                    setControlPeriodOne={setControlPeriodOne} setControlPeriodTw={setControlPeriodTwo}
                    minusPointWinningContest={minusPointWinningContest}
                    setMinusPointWinningContest={setMinusPointWinningContest}
                    minusPointWinningDyn={minusPointWinningDyn} setMinusPointWinningDyn={setMinusPointWinningDyn}
                    minusPointWinningGeo={minusPointWinningGeo} setMinusPointWinningGeo={setMinusPointWinningGeo}
                    minusPointWinningBin={minusPointWinningBin} setMinusPointWinningBin={setMinusPointWinningBin}
                    plusNtoKBallOne={plusNtoKBallOne} setPlusNtoKBallOne={setPlusNtoKBallOne}
                    plusNtoKBallTwo={plusNtoKBallTwo} setPlusNtoKBallTwo={setPlusNtoKBallTwo}
                    plusNtoKBallThree={plusNtoKBallThree} setPlusNtoKBallThree={setPlusNtoKBallThree}
                    plusPointContestsMonth={plusPointContestsMonth}
                    setPlusPointContestsMonth={setPlusPointContestsMonth}
                    plusPointGeo={plusPointGeo} setPlusPointGeo={setPlusPointGeo}
                    plusPointBin={plusPointBin} setPlusPointBin={setPlusPointBin}
                    plusPointDyn={plusPointDyn} setPlusPointDyn={setPlusPointDyn}
                    plusPointInternalOlympiad={plusPointInternalOlympiad}
                    setPointInternalOlympiad={setPointInternalOlympiad}
                    plusPointUrbanOlympiad={plusPointUrbanOlympiad} setPointUrbanOlympiad={setPointUrbanOlympiad}
                    minusNonParticipationInternalOlympiad={minusNonParticipationInternalOlympiad}
                    setMinusNonParticipationInternalOlympiad={setMinusNonParticipationInternalOlympiad}
                    minusNonParticipationUrbanOlympiad={minusNonParticipationUrbanOlympiad}
                    setMinusNonParticipationUrbanOlympiad={setMinusNonParticipationUrbanOlympiad}
                    fivePoints={fivePoints} setFivePoints={setFivePoints} fourPoints={fourPoints}
                    setFourPoints={setFourPoints}
                    minContestsMonth={minContestsMonth} setMinContestsMonth={setMinContestsMonth}
                />

                <ReactDimmer
                    isOpen={isMenuOpen}
                    exitDimmer={setMenu}
                    zIndex={100}
                    blur={1.5}
                />
            </div>
            <div>
                {
                    !loading ? "" :
                        <Box sx={{width: '100%'}}>
                            <Typography>Не перезагружайте страницу!!!</Typography>
                            <LinearProgress/>
                        </Box>
                }
            </div>
            <table id="table-to-xls" className="table table-bordered table-striped">
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
                    <th>КС1</th>
                    <th>КС2</th>
                    <th>Оценка</th>
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
