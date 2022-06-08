import * as React from "react";
import {Link, Route, Routes} from "react-router-dom";
import AdditionalOlympiads from "./AdditionalOlympiads";
import AllGymListComponent from "./GymComponents/AllGymListComponent";
import GymListComponent from "./GymListComponent";
import CriteriaComponent from "./CriteriaComponent";
import AdditionalOlCriteriaComponent from "./additionalOlCriteriaComponent";

const Settings = () => {
    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">Настройки</h2>

            <div className="row">
                <div className="form-group col-8">
                    <Link to={"/settings/"} style={{marginLeft: "10px"}}
                          className="btn btn-primary">Основные критерии</Link>
                    <Link to={"/settings/additional"} style={{marginLeft: "10px"}}
                          className="btn btn-info">Доп Олимпиады</Link>
                    <Link to={"/settings/my_gyms"} style={{marginLeft: "10px"}}
                          className="btn btn-info">Отслеживаемые тренировки</Link>
                    <Link to={"/settings/gyms"} style={{marginLeft: "10px"}}
                          className="btn btn-warning">Добавить тренировку</Link>
                </div>

                <div className="container">
                    <hr/>
                    <Routes>
                        <Route path="/" exact element={<CriteriaComponent/>}/>
                        {/*<Route path="criteria" element={<CriteriaComponent/>}/>*/}
                        <Route path="additional" element={<AdditionalOlympiads/>}/>
                        <Route path="gyms" element={<AllGymListComponent/>}/>
                        <Route path="my_gyms" element={<GymListComponent/>}/>
                        <Route path="additional-ol-criteria" element={<AdditionalOlCriteriaComponent/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};
export default Settings;

// export const Settings = ({
//                              isMenuOpen,
//                              handle, setStartDate, setContestCrit, contestCrit,
//                              geomCrit, setGeomCrit, geomBall, setGeomBall, binCrit, setBinCrit, binBall, setBinBall,
//                              dynCrit, setDynCrit, dynBall, setDynBall, setControlPeriodOne, setControlPeriodTwo,
//                              minusPointWinningContest,setMinusPointWinningContest,
//                              minusPointWinningDyn,setMinusPointWinningDyn,
//                              minusPointWinningGeo,setMinusPointWinningGeo,
//                              minusPointWinningBin,setMinusPointWinningBin,
//                              plusNtoKBallOne, setPlusNtoKBallOne,
//                              plusNtoKBallTwo, setPlusNtoKBallTwo,
//                              plusNtoKBallThree, setPlusNtoKBallThree,
//                              plusPointContestsMonth,setPlusPointContestsMonth,
//                              plusPointGeo,setPlusPointGeo,
//                              plusPointBin,setPlusPointBin,
//                              plusPointDyn,setPlusPointDyn,
//                              plusPointInternalOlympiad,setPointInternalOlympiad,
//                              plusPointUrbanOlympiad,setPointUrbanOlympiad,
//                              minusNonParticipationInternalOlympiad,setMinusNonParticipationInternalOlympiad,
//                              minusNonParticipationUrbanOlympiad,setMinusNonParticipationUrbanOlympiad,
//                              fivePoints,setFivePoints,fourPoints,setFourPoints,
//                              minContestsMonth, setMinContestsMonth
//                          }) => {
//     return (
//         <div>
//
//             <h1 className="text-center mt-5 mt-5 mb-3">Настройки критериев</h1>
//             <div className="container">
//                 <div className="row">
//                     <h5>Критерии:</h5>
//                     <div className="form-group mb-2 col-2">
//                         <p className="m-0">Дата начала</p>
//                         <input type="date"
//                                className="form-control mb-3"
//                                onChange={(e) =>
//                                    setStartDate(Math.floor(new Date(e.target.value).getTime() / 1000))}
//                         />
//
//                         <p className="m-0" >Баллов на 5</p>
//                         <input
//                             type="text"
//                             placeholder="Баллов на 5"
//                             className="form-control mb-3"
//                             value={fivePoints}
//                             onChange={(e) => setFivePoints(e.target.value)}
//                         />
//                         <p className="m-0" >Баллов на 4</p>
//                         <input
//                             type="text"
//                             placeholder="Баллов на 4"
//                             className="form-control mb-3"
//                             value={fourPoints}
//                             onChange={(e) => setFourPoints(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group mb-2 col-2">
//                         <p className="m-0">За определенный месяц</p>
//                         <input type="month"
//                                className="form-control mb-3"
//                             // onChange={(e) => //TODO сделать
//                             //     setStartDate(Math.floor(new Date(e.target.value).getTime() / 1000))}
//
//                         />
//                         <p className="m-0">Минимальное количество контестов</p>
//                         <input
//                             type="text"
//                             placeholder="Минимальное количество контестов"
//                             className="form-control mb-3"
//                             value={minContestsMonth}
//                             onChange={(e) => setMinContestsMonth(e.target.value)}
//                         />
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointContestsMonth[0].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointContestsMonth[0].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointContestsMonth[1].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointContestsMonth[1].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointContestsMonth[2].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointContestsMonth[2].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointContestsMonth[3].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointContestsMonth[3].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="form-group mb-2 col-2">
//                         <p className="m-0">Количество Контестов</p>
//                         <input
//                             type="text"
//                             placeholder="Количество Контестов"
//                             className="form-control mb-3"
//                             value={contestCrit}
//                             onChange={(e) => setContestCrit(e.target.value)}
//                         />
//
//                         <p className="m-0">Штраф за недобор <br/> (За еденицу)</p>
//                         <input
//                             type="text"
//                             placeholder="Штраф за недобор контестов"
//                             className="form-control mb-3"
//                             value={minusPointWinningContest}
//                             onChange={(e) => setMinusPointWinningContest(e.target.value)}
//                         />
//
//                         {/*<p className="m-0">КС-1</p>*/}
//                         {/*<input type="date"*/}
//                         {/*       className="form-control mb-3"*/}
//                         {/*       onChange={*/}
//                         {/*           (e) =>*/}
//                         {/*               setControlPeriodOne(Math.floor(new Date(e.target.value).getTime() / 1000))*/}
//                         {/*       }*/}
//
//                         {/*/>*/}
//                         {/*<p className="m-0">КС-2</p>*/}
//                         {/*<input type="date"*/}
//                         {/*       className="form-control mb-1"*/}
//                         {/*       onChange={*/}
//                         {/*           (e) =>*/}
//                         {/*               setControlPeriodTwo(Math.floor(new Date(e.target.value).getTime() / 1000))*/}
//                         {/*       }*/}
//                         {/*/>*/}
//                     </div>
//                     <div className="form-group mb-2 col-2 text-center">
//                         <h3>Геометрия</h3>
//                         <p className="m-0">Количество Геометрии</p>
//                         <input
//                             type="text"
//                             placeholder="Количество Геометрии"
//                             className="form-control mb-3"
//                             value={geomCrit}
//                             onChange={(e) => setGeomCrit(e.target.value)}
//                         />
//                         <p className="m-0">Коэфициент за задачу</p>
//                         <input
//                             type="text"
//                             placeholder="Коэфициент за задачу"
//                             className="form-control mb-3"
//                             value={geomBall}
//                             onChange={(e) => setGeomBall(e.target.value)}
//                         />
//                         <p className="m-0">Штраф за недобор <br/> (За еденицу)</p>
//                         <input
//                             type="text"
//                             placeholder="Штраф за недобор"
//                             className="form-control mb-3"
//                             value={minusPointWinningGeo}
//                             onChange={(e) => setMinusPointWinningGeo(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group mb-2 col-2">
//                         <h3>Бин. Поиск</h3>
//                         <p className="m-0">Количество Бин поиска</p>
//                         <input
//                             type="text"
//                             placeholder="Количество Бин поиска"
//                             className="form-control mb-3"
//                             value={binCrit}
//                             onChange={(e) => setBinCrit(e.target.value)}
//                         />
//                         <p className="m-0">Коэфициент за задачу</p>
//                         <input
//                             type="text"
//                             placeholder="Коэфициент за задачу"
//                             className="form-control mb-3"
//                             value={binBall}
//                             onChange={(e) => setBinBall(e.target.value)}
//                         />
//                         <p className="m-0">Штраф за недобор <br/> (За еденицу)</p>
//                         <input
//                             type="text"
//                             placeholder="Штраф за недобор"
//                             className="form-control mb-3"
//                             value={minusPointWinningBin}
//                             onChange={(e) => setMinusPointWinningBin(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group mb-2 col-2">
//                         <h3>Динамика</h3>
//                         <p className="m-0">Количество Динамики</p>
//                         <input
//                             type="text"
//                             placeholder="Количество Динамики"
//                             className="form-control mb-3"
//                             value={dynCrit}
//                             onChange={(e) => setDynCrit(e.target.value)}
//                         />
//                         <p className="m-0">Коэфициент за задачу</p>
//                         <input
//                             type="text"
//                             placeholder="Коэфициент за задачу"
//                             className="form-control mb-3"
//                             value={dynBall}
//                             onChange={(e) => setDynBall(e.target.value)}
//                         />
//                         <p className="m-0">Штраф за недобор <br/> (За еденицу)</p>
//                         <input
//                             type="text"
//                             placeholder="Штраф за недобор"
//                             className="form-control mb-3"
//                             value={minusPointWinningDyn}
//                             onChange={(e) => setMinusPointWinningDyn(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <hr/>
//                 <div className="row">
//                     <h5>Дополнительные баллы:</h5>
//                     <div className="form-group mb-2 col-3">
//                         <p>Доп баллы за контесты</p>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="C"
//                                 className="form-control col"
//                                 value={plusNtoKBallOne[0].from}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="По"
//                                 className="form-control col"
//                                 value={plusNtoKBallOne[0].to}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusNtoKBallOne[0].value}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="C"
//                                 className="form-control col"
//                                 value={plusNtoKBallTwo[0].from}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="По"
//                                 className="form-control col"
//                                 value={plusNtoKBallTwo[0].to}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusNtoKBallTwo[0].value}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="C"
//                                 className="form-control col"
//                                 value={plusNtoKBallThree[0].from}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="По"
//                                 className="form-control col"
//                                 value={plusNtoKBallThree[0].to}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusNtoKBallThree[0].value}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//
//
//                         <p><br/>Минус за неучастие в городской олимпиаде</p>
//                         <input
//                             type="text"
//                             placeholder="Минус"
//                             className="form-control col"
//                             value={minusNonParticipationUrbanOlympiad}
//                             onChange={(e) => setMinusNonParticipationUrbanOlympiad(e.target.value)}
//                         />
//
//                     </div>
//                     <div className="form-group mb-2 col-2">
//                         <p>За количество геометрий</p>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointGeo[0].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointGeo[0].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointGeo[1].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointGeo[1].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointGeo[2].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointGeo[2].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//
//                         <p><br/>Минус за неучастие во внутренней олимпиаде</p>
//                         <input
//                             type="text"
//                             placeholder="Минус"
//                             className="form-control col"
//                             value={minusNonParticipationInternalOlympiad}
//                             onChange={(e) => setMinusNonParticipationInternalOlympiad(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group mb-2 col-2">
//                         <p>За Бин.поиск</p>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointBin[0].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointBin[0].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointBin[1].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointBin[1].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="form-group mb-2 col-2 text-center">
//                         <p>За количество Динамики</p>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointDyn[0].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointDyn[0].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointDyn[1].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointDyn[1].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointDyn[2].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointDyn[2].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointDyn[3].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointDyn[3].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control mb-3 col"
//                                 value={plusPointDyn[4].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control mb-3 col"
//                                 value={plusPointDyn[4].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="form-group mb-2 col-2">
//                         <p className="m-0">Доп Олимпиады</p>
//
//                         <p className="m-0">Городская</p>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointUrbanOlympiad[0].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointUrbanOlympiad[0].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control mb-3 col"
//                                 value={plusPointUrbanOlympiad[1].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control mb-3 col"
//                                 value={plusPointUrbanOlympiad[1].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <p className="m-0">Внутренняя</p>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointInternalOlympiad[0].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointInternalOlympiad[0].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointInternalOlympiad[1].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointInternalOlympiad[1].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointInternalOlympiad[2].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointInternalOlympiad[2].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                         <div className="row">
//                             <input
//                                 type="text"
//                                 placeholder="Количество"
//                                 className="form-control col"
//                                 value={plusPointInternalOlympiad[3].val}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Балл"
//                                 className="form-control col"
//                                 value={plusPointInternalOlympiad[3].points}
//                                 // onChange={(e) => setContestCrit(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <button className="btn btn-lg btn-primary" onClick={handle}>Сохранить</button>
//             </div>
//         </div>
//     );
// };