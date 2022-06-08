import React, {useEffect, useState} from 'react';
import ProfileService from "../services/ProfileService";
import ContestService from "../services/ContestService";
import {Box, LinearProgress, Typography} from "@mui/material";

const ProfileListComponent = () => {

    const [profile, setProfile] = useState([]); //Список профилей
    const [gyms, setGyms] = useState([]); //Список тренировок

    const [startDate, setStartDate] = useState(0)
    const [pointsToFive, setPointsToFive] = useState(1330)
    const [pointsToFour, setPointsToFour] = useState(1180)

    // const [csOneDate, setCsOneDate] = useState(0)
    // const [csTwoDate, setCsTwoDate] = useState(0)

    const [contestCrit, setContestCrit] = useState(20)
    const [arrFromToVal, setArrFromToVal] = useState()
    const [minusForShortfallContests, setMinusForShortfallContests] = useState()

    const [gymTags, setGymTags] = useState([])
    // const [olimpTags, setOlimpTags] = useState([])
    const [profileOlimpRes, setProfileOlimpRes] = useState([])

    const [targetMonthDate, setTargetMonthDate] = useState(0)
    const [contestCritMonth, setContestCritMonth] = useState()
    const [plusBallContestsMonth, setPlusBallContestsMonth] = useState()
    const [minusBallContestsMonth, setMinusBallContestsMonth] = useState()

    const [loading, setLoading] = useState(false); // индикатор загрузки

    useEffect(() => {
        if (localStorage.getItem("startDate"))
            setStartDate(new Date(localStorage.getItem("startDate")) / 1000)
        if (localStorage.getItem("pointsToFive"))
            setPointsToFive(JSON.parse(localStorage.getItem("pointsToFive")))
        if (localStorage.getItem("pointsToFour"))
            setPointsToFour(JSON.parse(localStorage.getItem("pointsToFour")))

        // if (localStorage.getItem("csOneDate"))
        //     setCsOneDate(new Date(localStorage.getItem("csOneDate")) / 1000)
        // if (localStorage.getItem("csTwoDate"))
        //     setCsTwoDate(new Date(localStorage.getItem("csTwoDate")) / 1000)

        if (localStorage.getItem("contestCrit"))
            setContestCrit(JSON.parse(localStorage.getItem("contestCrit")))
        if (localStorage.getItem("ArrFromToVal"))
            setArrFromToVal(JSON.parse(localStorage.getItem("ArrFromToVal")))
        if (localStorage.getItem("minusForShortfallContests"))
            setMinusForShortfallContests(JSON.parse(localStorage.getItem("minusForShortfallContests")))

        if (localStorage.getItem("GymTags"))
            setGymTags(JSON.parse(localStorage.getItem("GymTags")))
        // if (localStorage.getItem("OlimpTags"))
        //     setOlimpTags(JSON.parse(localStorage.getItem("OlimpTags")))
        if (localStorage.getItem("profileOlimpRes"))
            setProfileOlimpRes(JSON.parse(localStorage.getItem("profileOlimpRes")))

        if (localStorage.getItem("targetMonthDate"))
            setTargetMonthDate(new Date(localStorage.getItem("targetMonthDate")) / 1000)
        if (localStorage.getItem("contestCritMonth"))
            setContestCritMonth(JSON.parse(localStorage.getItem("contestCritMonth")))
        if (localStorage.getItem("plusBallContestsMonth"))
            setPlusBallContestsMonth(JSON.parse(localStorage.getItem("plusBallContestsMonth")))
        if (localStorage.getItem("minusBallContestsMonth"))
            setMinusBallContestsMonth(JSON.parse(localStorage.getItem("minusBallContestsMonth")))


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
            if (contests[i].ratingUpdateTimeSeconds > startDate && contests[i].ratingUpdateTimeSeconds < targetMonthDate)
                con++;
        }
        // let blabal = getAddedContests(profileId);
        return con;
    } // количество контестов с даты до (startDate)

    const getContestForMonth = (contests) => {
        let con = 0;
        for (let i = 0; i < contests.length; i++) {
            if (contests[i].ratingUpdateTimeSeconds >= targetMonthDate)
                con++;
        }
        return con;
    } // количество контестов с даты до (startDate)
    const countScoreForMonth = (monthContests) => {
        let score = 0;
        if (monthContests < contestCritMonth)
            score = -((contestCritMonth - monthContests) * minusBallContestsMonth);
        else {
            score = (monthContests - contestCritMonth) * plusBallContestsMonth;
        }
        return score;
    }
    const getListContestsForDate = (contests) => {
        let tarContests = [];
        for (let i = 0; i < contests.length; i++) {
            if (contests[i].ratingUpdateTimeSeconds >= startDate && contests[i].ratingUpdateTimeSeconds < targetMonthDate)
                tarContests.push(contests[i]);
        }
        return tarContests;
    } // массив контестов с даты (startDate)
    const countGym = (gy, profileId) => {
        let count = 0;
        let prgress = [];
        gyms.filter(gym => gym.tag === `${gy.id}=` ? prgress = gym.gymProgresses : "")

        for (let i = 0; i < prgress.length; i++) {
            if (prgress[i].profileId === profileId && prgress[i].points > count)
                count = prgress[i].points
        }
        return count;
    } // Подсчет количества тренировок

    const scoringPointsForContests = (sizeContests) => {
        let fromToVal = arrFromToVal.sort((prev, next) => next.from - prev.from)
        // console.log(fromToVal)
        let size = sizeContests;
        let tmtScore = 0;
        let tmp;
        let f = 0;
        if (sizeContests - contestCrit <= 0) {
            tmtScore = (sizeContests - contestCrit) * minusForShortfallContests
        } else {
            fromToVal.map((val, i) => {
                if (size >= fromToVal[i].from) {
                    tmp = size - fromToVal[i].from;
                    if (f === 0) {
                        tmp++;
                        f = 1;
                    }
                    tmtScore += tmp * fromToVal[i].val;
                    size = fromToVal[i].from;
                }
            })
        }
        // console.log(tmtScore)
        return tmtScore;

    } // подсчет очков за контесты плюсы и минусы
    const scoringPointsForGym = (profileId) => {
        let gyms = gymTags;
        let score;
        let conut = 0;
        let result = 0;
        let points;
        gyms.map(gym => {
            score = 0;
            points = gym.pointsGym
            conut = countGym(gym, profileId.id);
            if (conut < gym.prop.quantity)
                score = -((gym.prop.quantity - conut) * gym.prop.dedShortfall)
            else if (conut > gym.prop.quantity) {
                points.map(point => {
                    if (conut >= point.quantity) {
                        score = point.points
                    }
                })
            }
            result = result + parseInt(score);
        })
        return result;
    } // Очки за тренировки
    const scoringPointsForOlympiad = (profileId) => {
        let score = 0;
        let result = 0;
        let targetProfile = profileOlimpRes.find(pr => pr.id === profileId.id);
        console.log(targetProfile)
        targetProfile.res.map(res => {
            score = 0;
            if (parseInt(res.resses.check) === 0)
                result = result - res.prop.dedShortfall;
            else {
                let solved = parseInt(res.resses.solved) + parseInt(res.resses.resolved);
                console.log("solved " + solved)
                let points = res.pointsOlimp.sort((a, b) => a.quantity - b.quantity)
                points.map(poi => {
                    if (solved >= poi.quantity) {
                        score = parseInt(poi.points);
                    }
                })
            }
            result = result + parseInt(score);
        })
        return result;
    } // Очки за олимпиады

    const getAddedContests = (profileId) =>{
        let result = 0;
        let targetProfile = profileOlimpRes.find(pr => pr.id === profileId);
        targetProfile.res.map(tp => {
            if (parseInt(tp.resses.check) === 1)
                result += parseInt(tp.prop.bonus);
        })
        return result;
    }

    const scoringPoints = (profile) => {
        console.log(profile.handle)
        let targetContests = getListContestsForDate(profile.studentContests);

        // console.log(targetContests)
        let score = 0;
        let contForPosSeven;
        if (targetContests.length > 6)
            contForPosSeven = targetContests.slice(6);
        else contForPosSeven = targetContests;


        let cont = contForPosSeven.sort((a, b) => a.newRating < b.newRating ? 1 : -1);
        if (cont.length < 2)
            score += cont[0].newRating / 2
        else
            score += (cont[0].newRating + cont[1].newRating) / 2

        // на этом этапе score = среднее из двух лучших контестов начиная с 7
        // доп баллы за контесты и вычет баллов за не вополнение плана по контестам

        let addedContests = getAddedContests(profile.id);
        // console.log(addedContests)

        let tmpScore = scoringPointsForContests(targetContests.length + addedContests);
        score += tmpScore;

        //план по тренировкам
        let gymScore = scoringPointsForGym(profile)
        // console.log("gymScore " + gymScore)
        score += gymScore;

        //участие в олимпиадах
        let olimpScore = scoringPointsForOlympiad(profile)
        console.log("olimpScore " + olimpScore)
        score += olimpScore;

        //получение числа контестов в месяце
        let monthContests = getContestForMonth(profile.studentContests)
        let countScore = countScoreForMonth(monthContests)
        // console.log("month Score " + countScore)
        score += countScore;

        return score;
    } // полный подсчет очков ( переделать )

    const globalUpdate = async () => {
        setLoading(true)
        ProfileService.updateDataAllProfiles().then(() => {
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }
    const estimation = (score) => {
        if (score >= pointsToFive)
            return 5;
        else if (score >= pointsToFour)
            return 4;
        else return 2;
    } // расчет оценки
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
                            getContestForDate(profiles.studentContests) + getAddedContests(profiles.id) < contestCrit ?
                                <td style={{backgroundColor: "red"}}>
                                    {getContestForDate(profiles.studentContests) + getAddedContests(profiles.id)}</td> :
                                <td>{getContestForDate(profiles.studentContests) + getAddedContests(profiles.id)}</td>
                        }
                        {
                            getContestForMonth(profiles.studentContests) < contestCritMonth ?
                                <td style={{backgroundColor: "red"}}>{getContestForMonth(profiles.studentContests)}</td> :
                                <td>{getContestForMonth(profiles.studentContests)}</td>
                        }
                        {
                            gymTags.map(gT => {
                                return (
                                    countGym(gT, profiles.id) < gT.prop.quantity ?
                                        <td style={{backgroundColor: "red"}}>{countGym(gT, profiles.id)}</td> :
                                        <td>{countGym(gT, profiles.id)}</td>
                                )
                            })
                        }
                        <td>{profiles.rating}</td>
                        <td>{scoringPoints(profiles)}</td>
                        <td>{estimation(scoringPoints(profiles))}</td>
                    </tr>
            )
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">Рейтинг студентов</h2>
            <div className="row">
                <div className="form-group col-8">
                    {/*<button*/}
                    {/*    className="btn btn-primary m-2 h6"*/}
                    {/*    onClick={() => console.log(1)}*/}
                    {/*>Выгрузить в Excel*/}
                    {/*</button>*/}

                    <button
                        className="btn btn-danger m-2 h6"
                        onClick={() => globalUpdate()}
                    >Обновить все данные
                    </button>

                </div>
            </div>
            <div>
                {
                    !loading ? "" :
                        <Box sx={{width: '100%'}}>
                            <Typography className="fw-bold">Не перезагружайте страницу, данные обновляются несколько минут!</Typography>
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
                    <th>КОТЕСТОВ ЗА МЕСЯЦ</th>
                    {
                        gymTags.map(gT => {
                            return (
                                <th className="text-uppercase">{gT.gymTag}</th>
                            )
                        })
                    }
                    <th>РЕЙТИНГ</th>
                    <th>БАЛЛ</th>
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

// 1.Минусы
// -Недобор контестов (всего их должно быть 20, также обязательно 2 контеста в июне): -15 за недобранный контест ++
//
//  -Должно быть 4 динамики: -2.5 за каждую недобранную динамику ++
// -Должно быть 10 геометрий: -1 за каждую недобранную геометрию ++
// -Должно быть 4 бин поиска: -2.5 за каждый недобранный бин поиск ++
// -Контесты с 21 по 24: по +2 ++
// -Контесты с 25 по 27: по +4 ++
// -Контесты с 28 по 30: по +6 ++
// -Контесты в июне: +2, +4, +6, +8 за 3, 4, 5, 6 контестов соответственно
// -18, 19, 20 решенных геометрий: +3, +5, +12 соответственно ++
// -5, 6 решенных бин поиск: +3, +25 соответственно ++
// -7, 8, 9, 10, 11 решенных динамик: +3, +6, +11, +20, +30 соответственно ++
// 3. контесты в июне
// -Контесты в июне: +2, +4, +6, +8 за 3, 4, 5, 6 контестов соответственно
// 4. доп олимпиады
// -7 задач на внутренней олимпиаде: +60
// -6 задач на внутренней олимпиаде: +45
// -5 задач на внутренней олимпиаде: +30
// -4 задачи на внутренней олимпиаде: +15
// -3 решенных задачи на городской олимпиаде: +40
// -2 решенных задачи на городской олимпиаде: +20
// -Неучастие в внутренней олимпиаде: -50 ++
// -Неучастие в городской олимпиаде: -80 ++


// startDate                Дата Начала ++

// pointsToFive	            баллов на 5 ++
// pointsToFour             баллов на 4 ++
// csTwoDate                кс2 +
// csOneDate                кс1 +

// contestCrit                  количество контестов с даты начала +
// ArrFromToVal                 доп баллы за контесты +
// minusForShortfallContests  штраф за недобор(основные контесты) +

// GymTags                  Тренировки+
// OlimpTags                Олимпиады+

// profileOlimpRes          результатыСтудентов по олимпиадам +

// targetMonthDate          Месяц +
// contestCritMonth         Контестов за месяц +
// plusBallContestsMonth       +бал за каждый дополнительный контест в месяце +
// minusBallContestsMonth      -бал за каждый недобранный контест в месяце +


