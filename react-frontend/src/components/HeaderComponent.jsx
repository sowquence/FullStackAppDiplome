import React from 'react';
import {Link} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
                    <div>
                        <a href="/" className="navbar-brand offset-md-3 h1">Управление студенчискими тренировками </a>
                    </div>

                    <Link to={"/students"} style={{marginLeft: "1000px"}}
                          className=" btn btn-secondary">Студенты</Link> {"\t "}
                    <Link to={"/profiles"} style={{marginLeft: "10px"}}
                          className=" btn btn-secondary">Рейтинг</Link>
                    <Link to={"/my_gyms"} style={{marginLeft: "10px"}}
                          className=" btn btn-secondary" >Отслеживаемые тренировки</Link>
                    <Link to={"/gyms"} style={{marginLeft: "10px"}}
                          className=" btn btn-secondary" >Добавить тренировку</Link>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;