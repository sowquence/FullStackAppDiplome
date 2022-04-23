import React from 'react';
import {Link} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
                    <div>
                        <a href="/" className="navbar-brand offset-md-3">Student Management Application </a>
                    </div>
                    <Link to={"/students"} style={{marginLeft: "1000px"}}
                          className=" btn btn-secondary">Students</Link> {"\t "}
                    <Link to={"/profiles"} style={{marginLeft: "10px"}}
                          className=" btn btn-secondary">Rating</Link>
                    <Link to={"/gyms"} style={{marginLeft: "10px"}}
                          className=" btn btn-secondary" >Gyms</Link>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;