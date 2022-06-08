import React, {useEffect, useState} from 'react';
import StudentService from "../services/StudentService";
import {Link} from "react-router-dom";


const StudentListComponent = () => {

    const [students, setStudents] = useState([]);

    const [sort, setSort] = useState(["Стандарт", "ФИО", "ГРУППА", "ХЭНДЛ", "ПОЧТА"]);
    const Add = sort.map(Add => Add);

    let sortVal = "0";

    const handleSortTypeChange = (e) => {
        if (sort[e.target.value] === "Стандарт")
            sortVal = 0;
        if (sort[e.target.value] === "ФИО")
            sortVal = 1;
        if (sort[e.target.value] === "ГРУППА")
            sortVal = 2;
        if (sort[e.target.value] === "ХЭНДЛ")
            sortVal = 3;
        if (sort[e.target.value] === "ПОЧТА")
            sortVal = 4;
        getAllStudents(sortVal);
    }

    useEffect(() => {
        getAllStudents(0);
    }, [])

    const getAllStudents = (sort_val) => {
        StudentService.getAllStudents(sort_val).then((response) => {
            setStudents(response.data)
            console.log(response.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteStudent = (studentId) => {
        StudentService.deleteStudentById(studentId).then((response) => {
            getAllStudents(sortVal);
        }).catch((error) => {
            console.log(error)
        })
        console.log(studentId);
    }

    const renderTable = () => {
        return students.map(
            students =>
                <tr key={students.id}>
                    <td>{students.fullName}</td>
                    <td>{students.groupId}</td>
                    <td>{students.handle}</td>
                    <td>{students.emailID}</td>
                    <td className="text-center">
                        <Link
                            className="btn btn-secondary"
                            to={`/edit-student/${students.id}`}
                            style={{marginLeft: "10px"}}
                        >
                            ОБНОВИТЬ
                        </Link>
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteStudent(students.id)}
                            style={{marginLeft: "10px"}}
                        >
                            УДАЛИТЬ
                        </button>
                    </td>
                </tr>
        )
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">Список студентов</h2>
            <div className="row ">
                <Link to="/add-student" className="col-md-2 btn btn-primary mb-2">Добавить Студента</Link>
                <div className="col-md-10 d-flex justify-content-end">
                    <h5 className="mt-2 m-2">Сортировка</h5>
                    <select onChange={e => handleSortTypeChange(e)}>
                        {
                            Add.map((sort, key) => <option key={key} value={key}>{sort}</option>)
                        }
                    </select>
                </div>
            </div>

            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>ГРУППА</th>
                    <th>ХЭНДЛ</th>
                    <th>ПОЧТА</th>
                    <th></th>
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