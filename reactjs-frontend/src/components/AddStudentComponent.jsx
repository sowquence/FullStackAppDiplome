import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import StudentService from "../services/StudentService";

const AddStudentComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [nickname, setNickname] = useState('');
    const [emailID, setEmailID] = useState('');

    const navigate = useNavigate();

    const {id} = useParams();

    const saveStudent = (e) => {
        e.preventDefault();

        const student = {
            firstName,
            lastName,
            groupId,
            nickname,
            emailID
        }

        StudentService.createStudent(student).then((response) => {
            console.log(response.data)
            navigate('/students')
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        StudentService.getStudentById(id).then((response) => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setGroupId(response.data.groupId)
            setNickname(response.data.nickname)
            setEmailID(response.data.emailID)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const title = () =>{
        if(id)
            return <h2 className="text-center">Update Student</h2>
        else
            return <h2 className="text-center">Add Student</h2>
    };


    return (
        <div>
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Group:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter group"
                                        name="groupId"
                                        className="form-control"
                                        value={groupId}
                                        onChange={(e) => setGroupId(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Nickname:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter nickname"
                                        name="nickname"
                                        className="form-control"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        name="emailID"
                                        className="form-control"
                                        value={emailID}
                                        onChange={(e) => setEmailID(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-success" onClick={(e) => saveStudent(e)}>Save</button>
                                <Link to="/students" className="btn btn-danger">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStudentComponent;