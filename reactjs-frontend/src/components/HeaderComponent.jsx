import React from 'react';
import {Link} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="/" className="navbar-brand"> Student Management Application </a>
                    </div>
                    <Link to={"/students"}>Students</Link> {" || "}
                    <Link to={"/cf_students"}>Rating</Link>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;