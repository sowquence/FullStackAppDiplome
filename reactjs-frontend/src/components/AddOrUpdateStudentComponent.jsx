import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import StudentService from "../services/StudentService";

const AddOrUpdateStudentComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [handle, setHandle] = useState('');
    const [emailID, setEmailID] = useState('');

    const navigate = useNavigate();

    const {id} = useParams();

    const saveOrUpdateStudent = (e) => {
        e.preventDefault();

        const student = {
            firstName,
            lastName,
            groupId,
            handle,
            emailID
        }

        if (id){
            StudentService.updateStudentById(id,student).then((response) => {
                console.log(response.data)
                navigate('/students')
            }).catch(error => {
                console.log(error)
            })
        } else {
            StudentService.createStudent(student).then((response) => {
                console.log(response.data)
                navigate('/students')
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        if (id) {
            StudentService.getStudentById(id).then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setGroupId(response.data.groupId)
                setHandle(response.data.handle)
                setEmailID(response.data.emailID)
            }).catch(err => {
                console.log(err)
            })
        }
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
                                    <label className="form-label">Handle:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter codeforces handle"
                                        name="nickname"
                                        className="form-control"
                                        value={handle}
                                        onChange={(e) => setHandle(e.target.value)}
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
                                <button className="btn btn-success" onClick={
                                    (e) => saveOrUpdateStudent(e)}>Save</button>
                                <Link to="/students" className="btn btn-danger">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrUpdateStudentComponent;