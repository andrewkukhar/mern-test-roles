import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <nav className="bg-light d-flex flex-row justify-content-around align-items-center">
                <NavLink className="btn btn-dark" to="/">
                    <h1 style={{ "width": 25 + '%' }} >MERN</h1>
                </NavLink>
                <div className="" id="">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="btn btn-success nav-link px-2" to="/create">
                                Create Event
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}