import React, {useEffect, useState} from 'react';
import ProfileService from "../services/ProfileService";
import {Link} from "react-router-dom";

const AdditionalOlympiads = () => {

    const [profilesRes, setProfilesRes] = useState([]);

    const [studentsProfiles, setStudentsProfiles] = useState([]);
    const [listOlimpiads, setListOlimpiads] = useState([]);

    const getAllProfiles = () => {
        ProfileService.getAllProfiles().then((response) => {
            setStudentsProfiles(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const loadStudentsRes = () => {
        studentsProfiles.map(pr => {
            setProfilesRes(s => {
                return [
                    ...s,
                    {
                        id: pr.id,
                        group: pr.student.groupId,
                        handle: pr.handle,
                        name: pr.student.fullName,
                        res: listOlimpiads
                    }
                ]
            })
        })
    }

    const renderOlimps = () => {
        return listOlimpiads.map(
            olimp => <th colSpan="3">{olimp.gymTag}</th>
        )
    }
    const renderOlimpCrit = () => {
        return listOlimpiads.map(
            olimp =>
                <>
                    <th>Участвовал</th>
                    <th>Решено</th>
                    <th>Дорешено</th>
                </>
        )
    }
    const renderInputOlimpCrit = (profile) => {
        return listOlimpiads.map(
            (olimp, i) =>
                <>
                    <td>
                        <input
                            id={i}
                            type="number"
                            className="form-control"
                            autoComplete="off"
                            value={profile.res[i].resses.check}
                            onChange={(e) => inputOlimpHandler(e, "check", profile.id, olimp)}
                        />
                    </td>
                    <td>
                        <input
                            id={i}
                            type="number"
                            className="form-control"
                            autoComplete="off"
                            value={profile.res[i].resses.solved}
                            onChange={(e) => inputOlimpHandler(e, "solved", profile.id, olimp)}
                        />
                    </td>
                    <td>
                        <input
                            id={i}
                            type="number"
                            className="form-control"
                            autoComplete="off"
                            value={profile.res[i].resses.resolved}
                            onChange={(e) => inputOlimpHandler(e, "resolved", profile.id, olimp)}
                        />
                    </td>
                </>
        )
    }
    const renderTable = () => {
        return profilesRes.map(
            profile =>
                <tr key={profile.id}>
                    <td>{profile.name}</td>
                    <td>{profile.group}</td>
                    <td>{profile.handle}</td>
                    {renderInputOlimpCrit(profile)}
                </tr>
        )
    }

    const save = () => {
        localStorage.setItem("profileOlimpRes", JSON.stringify(profilesRes))
    }

    const inputOlimpHandler = (e, prop, id, olimp) => {
        e.preventDefault()
        let index = e.target.id;
        setProfilesRes(s => {
            const newProfileRes = s.slice();

            if (prop === "check")
                newProfileRes.find(r => r.id === id).res[index].resses.check = e.target.value;
            if (prop === "solved")
                newProfileRes.find(r => r.id === id).res[index].resses.solved = e.target.value;
            if (prop === "resolved")
                newProfileRes.find(r => r.id === id).res[index].resses.resolved = e.target.value;

            return newProfileRes;
        })
    }

    useEffect(() => {
        if (localStorage.getItem("OlimpTags")) {
            setListOlimpiads(JSON.parse(localStorage.getItem("OlimpTags")))
        }
        if (localStorage.getItem("profileOlimpRes"))
            setProfilesRes(JSON.parse(localStorage.getItem("profileOlimpRes")))

        getAllProfiles();
    }, [])

    return (
        <div className="container">
            <button
                className="btn btn-primary"
                onClick={() => save()}
                style={{marginLeft: "10px", marginBottom: "30px"}}
            >
                Сохранить
            </button>
            <h3 className="text-center mt-5 mb-3">Дополнительные Олимпиады</h3>
            <Link to={"/settings/additional-ol-criteria"} style={{marginLeft: "10px"}}
                  className="btn btn-secondary mb-3">Настрийки критериев по дополнительным олимпиадам</Link>
            {
                profilesRes.length === studentsProfiles.length ? '' :
                    <button
                        className="btn btn-info mb-3"
                        onClick={() => {
                            loadStudentsRes()
                        }}
                        style={{marginLeft: "10px", marginBottom: "30px"}}
                    >
                        Обновить студентов и олимпиады
                    </button>
            }
            <table className="table table-bordered table-striped">
                <thead className="text-center">
                <tr>
                    <th rowSpan="2">ФИО</th>
                    <th rowSpan="2">ГРУППА</th>
                    <th rowSpan="2">ХЭНДЛ</th>
                    {renderOlimps()}
                </tr>
                <tr>{renderOlimpCrit()}</tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>
    );
};

export default AdditionalOlympiads;
