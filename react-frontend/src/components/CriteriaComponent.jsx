import React, {useEffect, useState} from 'react';

const CriteriaComponent = () => {

    //Доп баллы за промежуток по контестам
    const [arrFromToVal, setArrFromToVal] = useState([]);
    const addInputFromToVal = () => {
        setArrFromToVal(s => {
            return [
                ...s,
                {
                    from: 0,
                    to: 0,
                    val: 0
                }
            ];
        });
    };
    const removeInputFromToVal = () => {
        setArrFromToVal(arrFromToVal.slice(0, arrFromToVal.length - 1));
        localStorage.setItem('ArrFromToVal', JSON.stringify(arrFromToVal.slice(0, arrFromToVal.length - 1)));
    }
    const handleChangeFromToVal = (e, param) => {
        e.preventDefault();
        const index = e.target.id;
        setArrFromToVal(s => {
            const newArr = s.slice();
            if (param === "from")
                newArr[index].from = e.target.value;
            if (param === "to")
                newArr[index].to = e.target.value;
            if (param === "val")
                newArr[index].val = e.target.value;

            localStorage.setItem('ArrFromToVal', JSON.stringify(arrFromToVal));
            return newArr;
        });
    };

    //Доп баллы за тренировки
    const pointsGym = {
        quantity: 0,
        points: 0
    }
    const [arrPointsGym, setArrPointsGym] = useState(pointsGym);
    const addArrPintsGym = (id) => {
        let updatedList = arrInputGymTag.map(item => {
            if (item.id === id) {
                return {...item, pointsGym: [...item.pointsGym, arrPointsGym]};
            }
            return item;
        });
        setArrInputGymTag(updatedList)
        setArrPointsGym(pointsGym)
        localStorage.setItem('GymTags', JSON.stringify(arrInputGymTag));
    };
    const removeArrPintsGym = (id) => {
        console.log(id)

        let updatedList = arrInputGymTag.map(item => {
            if (item.id === id) {
                return {...item, pointsGym: item.pointsGym.slice(0, item.pointsGym.length - 1)};
            }
            return item;
        });
        setArrInputGymTag(updatedList)
        setArrPointsGym(pointsGym)
        localStorage.setItem('GymTags', JSON.stringify(arrInputGymTag));
    };
    const handleChangeArrPintsGym = (e, param, id) => {
        // eslint-disable-next-line array-callback-return
        arrInputGymTag.map(item => {
            if (item.id === id)
                setArrPointsGym(item.pointsGym);
        });
        console.log(arrPointsGym)

        const index = e.target.id;
        setArrPointsGym(s => {
            const newArr = s.slice();
            if (param === "quantity")
                newArr[index].quantity = e.target.value;
            if (param === "points")
                newArr[index].points = e.target.value;

            localStorage.setItem('GymTags', JSON.stringify(arrInputGymTag));
            return newArr;
        })
        setArrPointsGym(pointsGym)
    };

    //Тренировки
    const [targetGym, setTargetGym] = useState("");
    const [arrInputGymTag, setArrInputGymTag] = useState([]);
    const handleChangeInputGymTag = (e, param, id) => {
        e.preventDefault();
        const index = id;
        setArrInputGymTag(s => {
            const newArr = s.slice();
            if (param === "quantity")
                newArr[index].prop.quantity = e.target.value;
            if (param === "dedShortfall")
                newArr[index].prop.dedShortfall = e.target.value;

            localStorage.setItem('GymTags', JSON.stringify(arrInputGymTag));
            return newArr;
        });
    };
    const addInputGymTag = () => {
        setArrInputGymTag(s => {
            return [
                ...s,
                {
                    id: s.length,
                    gymTag: targetGym,
                    prop: {
                        quantity: 0,
                        dedShortfall: 0
                    },
                    pointsGym: []
                }
            ];
        });
        setTargetGym("")
        localStorage.setItem('GymTags', JSON.stringify(arrInputGymTag));
    };
    const removeInputGymTag = () => {
        setArrInputGymTag(arrInputGymTag.slice(0, arrInputGymTag.length - 1));
    };

    //Оценка
    const [pointsToFive, setPointsToFive] = useState(0);
    const [pointsToFour, setPointsToFour] = useState(0);
    const handleChangePointsToFF = (e, param) => {
        e.preventDefault();
        if (param === "five")
            setPointsToFive(e.target.value)
        if (param === "four")
            setPointsToFour(e.target.value)
    };

    //контесты
    const [contestCrit, setContestCrit] = useState(0);
    const [minusForShortfallContests, setMinusForShortfallContests] = useState(0);

    //контесты месяца
    const [contestCritMonth, setContestCritMonth] = useState(0);
    const [plusBallContestsMonth, setPlusBallContestsMonth] = useState(0);
    const [minusBallContestsMonth, setMinusBallContestsMonth] = useState(0);

    // даты
    const [startDate, setStartDate] = useState();
    const [csOneDate, setCsOneDate] = useState();
    const [csTwoDate, setCsTwoDate] = useState();
    const [targetMonthDate, setTargetMonthDate] = useState();

    const save = () => {
        localStorage.setItem('GymTags', JSON.stringify(arrInputGymTag));
        localStorage.setItem("pointsToFive", pointsToFive)
        localStorage.setItem("pointsToFour", pointsToFour)

        localStorage.setItem("contestCrit", contestCrit)
        localStorage.setItem("minusForShortfallContests", minusForShortfallContests)

        localStorage.setItem("contestCritMonth", contestCritMonth)
        localStorage.setItem("plusBallContestsMonth", plusBallContestsMonth)
        localStorage.setItem("minusBallContestsMonth", minusBallContestsMonth)

        //Dates
        localStorage.setItem("startDate", startDate)
        localStorage.setItem("csOneDate", csOneDate)
        localStorage.setItem("csTwoDate", csTwoDate)
        localStorage.setItem("targetMonthDate", targetMonthDate)
    }

    useEffect(() => {
        if (localStorage.getItem("ArrFromToVal"))
            setArrFromToVal(JSON.parse(localStorage.getItem("ArrFromToVal")))
        if (localStorage.getItem("GymTags"))
            setArrInputGymTag(JSON.parse(localStorage.getItem("GymTags")))
        if (localStorage.getItem("pointsToFive"))
            setPointsToFive(localStorage.getItem("pointsToFive"))
        if (localStorage.getItem("pointsToFour"))
            setPointsToFour(localStorage.getItem("pointsToFour"))

        if (localStorage.getItem("contestCrit"))
            setContestCrit(localStorage.getItem("contestCrit"))
        if (localStorage.getItem("minusForShortfallContests"))
            setMinusForShortfallContests(localStorage.getItem("minusForShortfallContests"))

        if (localStorage.getItem("contestCritMonth"))
            setContestCritMonth(localStorage.getItem("contestCritMonth"))
        if (localStorage.getItem("plusBallContestsMonth"))
            setPlusBallContestsMonth(localStorage.getItem("plusBallContestsMonth"))

        if (localStorage.getItem("minusBallContestsMonth"))
            setMinusBallContestsMonth(localStorage.getItem("minusBallContestsMonth"))

        //Dates
        if (localStorage.getItem("startDate"))
            setStartDate(localStorage.getItem("startDate"))
        if (localStorage.getItem("csOneDate"))
            setCsOneDate(localStorage.getItem("csOneDate"))
        if (localStorage.getItem("csTwoDate"))
            setCsTwoDate(localStorage.getItem("csTwoDate"))
        if (localStorage.getItem("targetMonthDate"))
            setTargetMonthDate(localStorage.getItem("targetMonthDate"))

    }, [])

    return (
        <div>
            <button onClick={() => save()} className="btn btn-primary">Сохранить</button>
            <h3 className="text-center mt-5 mb-3">Основные критерии</h3>

            <div className="container">

                <div className="row">
                    <h5>Критерии:</h5>

                    <div className="form-group mb-2 col-2">
                        <p className="m-0">Дата начала</p>
                        <input type="date"
                               className="form-control mb-3"
                               value={startDate}
                               onChange={(e) => setStartDate(e.target.value)}
                            // setStartDate(Math.floor(new Date(e.target.value).getTime() / 1000))}
                        />

                        <p className="m-0">Баллов на 5</p>
                        <input
                            type="text"
                            placeholder="Баллов на 5"
                            className="form-control mb-3"
                            value={pointsToFive}
                            onChange={(e) => handleChangePointsToFF(e, "five")}
                        />
                        <p className="m-0">Баллов на 4</p>
                        <input
                            type="text"
                            placeholder="Баллов на 4"
                            className="form-control mb-3"
                            value={pointsToFour}
                            onChange={(e) => handleChangePointsToFF(e, "four")}
                        />
                    </div>
                    <div className="form-group mb-2 col-2">
                        <p className="m-0">КС-1</p>
                        <input type="date"
                               className="form-control mb-3"
                               value={csOneDate}
                               onChange={
                                   (e) => setCsOneDate(e.target.value)}

                        />
                        <p className="m-0">КС-2</p>
                        <input type="date"
                               className="form-control mb-1"
                               value={csTwoDate}
                               onChange={
                                   (e) => setCsTwoDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2 col-2">
                        <p className="m-0">Количество Контестов</p>
                        <input
                            type="text"
                            placeholder="Количество Контестов"
                            className="form-control mb-3"
                            value={contestCrit}
                            onChange={(e) => setContestCrit(e.target.value)}
                        />

                        <p className="m-0">Штраф за недобор <br/> (За единицу)</p>
                        <input
                            type="text"
                            placeholder="Штраф за недобор контестов"
                            className="form-control mb-3"
                            value={minusForShortfallContests}
                            onChange={(e) => setMinusForShortfallContests(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2 col-2 text-center">
                        <div className="row">

                        </div>
                    </div>

                    <div className="form-group mb-2 col-2">
                        <p className="m-0">За определенный месяц</p>
                        <input type="month"
                               className="form-control mb-3"
                               value={targetMonthDate}
                               onChange={(e) =>
                                   setTargetMonthDate(e.target.value)}
                        />
                        <p className="m-0">Минимальное количество контестов за определенный месяц</p>
                        <input
                            type="text"
                            placeholder="Минимальное количество контестов"
                            className="form-control mb-3"
                            value={contestCritMonth}
                            onChange={(e) => setContestCritMonth(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2 col-2">
                        <div className="row">
                            <p className="m-0">+Балл за каждый дополнительный контест</p>
                            <input
                                type="text"
                                placeholder="Доб бал"
                                className="form-control col"
                                value={plusBallContestsMonth}
                                onChange={(e) => setPlusBallContestsMonth(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <p className="mt-3">-Балл за каждый недобранный контест</p>
                            <input
                                type="text"
                                placeholder="Доб бал"
                                className="form-control col"
                                value={minusBallContestsMonth}
                                onChange={(e) => setMinusBallContestsMonth(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <h5>Дополнительные критерии:</h5>
                    <div className="form-group mb-2 col-3">
                        <p>Доп баллы за контесты</p>
                        <p>От / До / +Балл за кажый</p>
                        <div className="row">
                            {arrFromToVal.map((item, i) => {
                                return (
                                    <div className="row m-0">
                                        <input
                                            id={i}
                                            type="number"
                                            placeholder="C"
                                            className="form-control col"
                                            value={item.from}
                                            onChange={(e) =>
                                                handleChangeFromToVal(e, "from")}
                                        />
                                        <input
                                            id={i}
                                            type="number"
                                            placeholder="По"
                                            className="form-control col"
                                            value={item.to}
                                            onChange={(e) =>
                                                handleChangeFromToVal(e, "to")}
                                        />
                                        <input
                                            id={i}
                                            type="number"
                                            placeholder="Балл"
                                            className="form-control col"
                                            value={item.val}
                                            onChange={(e) =>
                                                handleChangeFromToVal(e, "val")}
                                        />
                                    </div>
                                );
                            })}
                            <div className="btn-group">
                                <button className="btn btn-primary" onClick={addInputFromToVal}>+</button>
                                <button className="btn btn-danger" onClick={removeInputFromToVal}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <h5>Тренировки:</h5>
                    {arrInputGymTag.map((item) => {
                        return (
                            <div className="form-group mb-2 col-3" style={{marginRight: "10px"}}>
                                <div style={{display: "flex", placeItems: "center", textAlign: "center"}}
                                     className="mt-3">
                                    <h5>{item.gymTag}</h5>
                                </div>
                                <p className="m-0">Количество задач</p>
                                <input
                                    type="number"
                                    placeholder="Количество"
                                    className="form-control col"
                                    value={item.prop.quantity}
                                    onChange={(e) => handleChangeInputGymTag(e, "quantity", item.id)}
                                />
                                <p className="m-0 mt-2">Штраф за недобор</p>
                                <input
                                    type="number"
                                    placeholder="Количество"
                                    className="form-control col"
                                    value={item.prop.dedShortfall}
                                    onChange={(e) => handleChangeInputGymTag(e, "dedShortfall", item.id)}
                                />
                                <p className="m-0 mt-2">Доп. Баллы</p>
                                <div className="row">
                                    {
                                        item.pointsGym.map((inner, i) => {
                                            return (
                                                <div className="row m-0">
                                                    <input
                                                        id={i}
                                                        type="number"
                                                        placeholder="Количество"
                                                        className="form-control col"
                                                        value={inner.quantity}
                                                        onChange={(e) =>
                                                            handleChangeArrPintsGym(e, "quantity", item.id)}
                                                    />
                                                    <input
                                                        id={i}
                                                        type="number"
                                                        placeholder="+Балл"
                                                        className="form-control col"
                                                        value={inner.points}
                                                        onChange={(e) =>
                                                            handleChangeArrPintsGym(e, "points", item.id)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => addArrPintsGym(item.id)}>+
                                        </button>
                                        <button className="btn btn-danger"
                                                onClick={() => removeArrPintsGym(item.id)}>-
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="form-group mb-2 col-2">
                        <div className="row btn-group">
                            <input
                                type="text"
                                placeholder="Новая тренировка"
                                className="form-control col mt-lg-5"
                                value={targetGym}
                                onChange={(e) => setTargetGym(e.target.value)}
                            />
                            <button className="btn btn-primary mt-2"
                                    onClick={addInputGymTag}>Добавить тренировку
                            </button>
                            {
                                arrInputGymTag.length > 0 ?
                                    <button className="btn btn-danger mt-2"
                                            onClick={removeInputGymTag}>Удалить последнюю
                                    </button> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CriteriaComponent;