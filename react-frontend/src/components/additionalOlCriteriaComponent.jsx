import React, {useEffect, useState} from 'react';

const AdditionalOlCriteriaComponent = () => {

    const pointsOlimp = {
        quantity: 0,
        points: 0
    }
    const [arrPointsOlimp, setArrPointsOlimp] = useState(pointsOlimp);
    const addArrPintsOlimp = (id) => {
        let updatedList = arrInputOlimpTag.map(item => {
            if (item.id === id) {
                return {...item, pointsOlimp: [...item.pointsOlimp, arrPointsOlimp]};
            }
            return item;
        });
        setArrInputOlimpTag(updatedList)
        setArrPointsOlimp(pointsOlimp)
    };
    const removeArrPintsOlimp = (id) => {
        let updatedList = arrInputOlimpTag.map(item => {
            if (item.id === id) {
                return {...item, pointsOlimp: item.pointsOlimp.slice(0, item.pointsOlimp.length - 1)};
            }
            return item;
        });
        setArrInputOlimpTag(updatedList)
        setArrPointsOlimp(pointsOlimp)
    };
    const handleChangeArrPintsOlimp = (e, param, id) => {
        // eslint-disable-next-line array-callback-return
        arrInputOlimpTag.map(item => {
            if (item.id === id)
                setArrPointsOlimp(item.pointsOlimp);
        });
        const index = e.target.id;
        setArrPointsOlimp(s => {
            const newArr = s.slice();
            if (param === "quantity")
                newArr[index].quantity = e.target.value;
            if (param === "points")
                newArr[index].points = e.target.value;
            return newArr;
        })
        setArrPointsOlimp(pointsOlimp)
    };

    const pointsResolution = {
        quantity: 0,
        points: 0
    }
    const [arrPointsResolution, setArrPointsResolution] = useState(pointsResolution);
    const addArrPintsResolution = (id) => {
        let updatedList = arrInputOlimpTag.map(item => {
            if (item.id === id) {
                return {...item, pointsResolution: [...item.pointsResolution, arrPointsResolution]};
            }
            return item;
        });
        setArrInputOlimpTag(updatedList)
        setArrPointsResolution(pointsResolution)
    };
    const removeArrPintsResolution = (id) => {
        let updatedList = arrInputOlimpTag.map(item => {
            if (item.id === id) {
                return {...item, pointsResolution: item.pointsResolution.slice(0, item.pointsResolution.length - 1)};
            }
            return item;
        });
        setArrInputOlimpTag(updatedList)
        setArrPointsResolution(pointsResolution)
    };
    const handleChangeArrPintsResolution = (e, param, id) => {
        // eslint-disable-next-line array-callback-return
        arrInputOlimpTag.map(item => {
            if (item.id === id)
                setArrPointsOlimp(item.pointsResolution);
        });
        const index = e.target.id;
        setArrPointsOlimp(s => {
            const newArr = s.slice();
            if (param === "quantity")
                newArr[index].quantity = e.target.value;
            if (param === "points")
                newArr[index].points = e.target.value;
            return newArr;
        })
        setArrPointsResolution(pointsResolution)
    };

    const [targetOlimp, setTargetOlimp] = useState("");
    const [arrInputOlimpTag, setArrInputOlimpTag] = useState([]);
    const handleChangeInputOlimpTag = (e, prop, id) => {
        e.preventDefault();
        const index = id;
        setArrInputOlimpTag(s => {
            const newArr = s.slice();
            if (prop === "dedShortfall")
                newArr[index].prop.dedShortfall = e.target.value;
            if (prop === "bonus")
                newArr[index].prop.bonus = e.target.value;
            return newArr;
        });
    };
    const addInputOlimpTag = () => {
        setArrInputOlimpTag(s => {
            return [
                ...s,
                {
                    id: s.length,
                    gymTag: targetOlimp,
                    prop: {
                        bonus: 0,
                        dedShortfall: 0
                    },
                    pointsOlimp: [],
                    pointsResolution: [],
                    resses: {
                        check:0,
                        solved:0,
                        resolved:0
                    }
                }
            ];
        });
        setTargetOlimp("")
    };
    const removeInputOlimpTag = () => {
        setArrInputOlimpTag(arrInputOlimpTag.slice(0, arrInputOlimpTag.length - 1));
    };

    const save = () => {
        localStorage.setItem('OlimpTags', JSON.stringify(arrInputOlimpTag));
        localStorage.setItem("profileOlimpRes", JSON.stringify([]))
    }

    useEffect(() => {
        if (localStorage.getItem("OlimpTags"))
            setArrInputOlimpTag(JSON.parse(localStorage.getItem("OlimpTags")))
    }, [])

    return (
        <div className="container">
            <button onClick={() => save()} className="btn btn-primary">Сохранить</button>
            <h3 className="text-center mt-5 mb-3">Настройки критериев по дополнительным олимпиадам</h3>
            <div className="row">
                <h5>Дополнительные олимпиады:</h5>
                {arrInputOlimpTag.map((item) => {
                    return (
                        <div className="form-group mb-2 col-3" style={{marginRight: "10px"}}>
                            <div style={{display: "flex", placeItems: "center", textAlign: "center"}}
                                 className="mt-3">
                                <h5>{item.gymTag}</h5>
                            </div>
                            <p className="m-0 mt-2">Контестов за участие</p>
                            <input
                                type="number"
                                placeholder="Баллов"
                                className="form-control col"
                                value={item.prop.bonus}
                                onChange={(e) => handleChangeInputOlimpTag(e,"bonus", item.id)}
                            />
                            <p className="m-0 mt-2">Штраф за неучастие</p>
                            <input
                                type="number"
                                placeholder="Штраф"
                                className="form-control col"
                                value={item.prop.dedShortfall}
                                onChange={(e) => handleChangeInputOlimpTag(e,"dedShortfall", item.id)}
                            />
                            <p className="m-0 mt-2">Доп. Баллы</p>
                            <p className="m-0 mt-2">Количество задач вместе с дорешиванием/ +Баллы</p>
                            <div className="row">
                                {
                                    item.pointsOlimp.map((inner, i) => {
                                        return (
                                            <div className="row m-0">
                                                <input
                                                    id={i}
                                                    type="number"
                                                    placeholder="Количество"
                                                    className="form-control col"
                                                    value={inner.quantity}
                                                    onChange={(e) =>
                                                        handleChangeArrPintsOlimp(e, "quantity", item.id)}
                                                />
                                                <input
                                                    id={i}
                                                    type="number"
                                                    placeholder="+Балл"
                                                    className="form-control col"
                                                    value={inner.points}
                                                    onChange={(e) =>
                                                        handleChangeArrPintsOlimp(e, "points", item.id)}
                                                />
                                            </div>
                                        )
                                    })
                                }
                                <div className="btn-group">
                                    <button className="btn btn-primary" onClick={() => addArrPintsOlimp(item.id)}>+
                                    </button>
                                    <button className="btn btn-danger"
                                            onClick={() => removeArrPintsOlimp(item.id)}>-
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
                            placeholder="Новая олимпиада"
                            className="form-control col mt-lg-5"
                            value={targetOlimp}
                            onChange={(e) => setTargetOlimp(e.target.value)}
                        />
                        <button className="btn btn-primary mt-2"
                                onClick={addInputOlimpTag}>Добавить олимпиаду
                        </button>
                        {
                            arrInputOlimpTag.length > 0 ?
                                <button className="btn btn-danger mt-2"
                                        onClick={removeInputOlimpTag}>Удалить последнюю
                                </button> : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalOlCriteriaComponent;