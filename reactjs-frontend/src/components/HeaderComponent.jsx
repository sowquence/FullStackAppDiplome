import React from 'react';
import {Link} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="/" className="navbar-brand offset-md-3">Student Management Application </a>
                    </div>
                    <Link to={"/students"} className="offset-md-3 btn btn-secondary">Students</Link> {" || "}
                    <Link to={"/profiles"} className="btn btn-secondary">Rating</Link>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;