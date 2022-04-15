import React, {useEffect, useState} from 'react';
import StudentService from "../services/StudentService";
import {Link} from "react-router-dom";


const StudentListComponent = () => {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        getAllStudents();
    }, [])

    const getAllStudents = () =>{
        StudentService.getAllStudents().then((response) => {
            setStudents(response.data)
            console.log(response.data);
        }).catch(err => {
            console.log(err)
        })
        // if (sortProperty){
        //     StudentService.getAllStudents(sortProperty).then((response) => {
        //         setStudents(response.data)
        //         console.log(response.data);
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // }else {

        // }
    }

    const deleteStudent = (studentId) =>{
        StudentService.deleteStudentById(studentId).then((response) =>{
            getAllStudents();
        }).catch((error)=>{
            console.log(error)
        })
        console.log(studentId);
    }

    const renderTable = () => {
        return students.map(
            students =>
                <tr key={students.id}>
                    <td>{students.id}</td>
                    <td>{students.firstName}</td>
                    <td>{students.lastName}</td>
                    <td>{students.groupId}</td>
                    <td>{students.handle}</td>
                    <td>{students.emailID}</td>
                    <td>

                        <Link
                            className="btn btn-info"
                            to={`/info-student/${students.id}`}
                        >
                            INFO
                        </Link>
                        <Link
                            className="btn btn-secondary"
                            to={`/edit-student/${students.id}`}
                            style={{marginLeft: "10px"}}
                        >
                            Update
                        </Link>

                        <button
                            className="btn btn-danger"
                            onClick={()=> deleteStudent(students.id)}
                            style={{marginLeft: "10px"}}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
        )
    }

    return (
        <div className="container">
            <h2 className="text-center">List Students</h2>
            <Link to="/add-student" className="btn btn-primary mb-2">Add Student</Link>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Student Id</th>
                    <th>Student First Name
                        <button
                            className="btn btn-primary"
                            onClick={(e) => getAllStudents("firstName")}
                        >^
                        </button>
                    </th>
                    <th>Student Last Name
                        <button
                            className="btn btn-primary"
                            onClick={(e) => getAllStudents("lastName")}
                        >^
                        </button>
                    </th>
                    <th>Student Group
                        <button
                            className="btn btn-primary"
                            onClick={(e) => getAllStudents("groupId")}
                        >^
                        </button>
                    </th>
                    <th>
                        Student Handle
                        <button
                            className="btn btn-primary"
                            onClick={(e) => getAllStudents("nickname")}
                        >^
                        </button>
                    </th>
                    <th>Student Email
                        <button
                           className="btn btn-primary"
                           onClick={(e) => getAllStudents("emailId")}
                        >^
                        </button>
                    </th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
        </div>
    );
};

export default StudentListComponent;