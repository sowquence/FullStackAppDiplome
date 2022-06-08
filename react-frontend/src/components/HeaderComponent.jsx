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
                    <Link to={"/students"} style={{marginLeft: "500px"}}
                          className=" btn btn-secondary">Студенты</Link> {"\t "}
                    <Link to={"/profiles"} style={{marginLeft: "10px"}}
                          className=" btn btn-secondary">Рейтинг</Link>

                    <Link to={"/settings"} style={{marginLeft: "10px"}}
                          className=" btn btn-secondary" >НАСТРОЙКИ</Link>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;