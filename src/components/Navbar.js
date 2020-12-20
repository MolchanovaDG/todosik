import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = () => (
    // <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
    //     <div className="navbar-brand">
    //         Note App
    //     </div>

    //     <ul className="navbar-nav">
    //         <li className="nav-item">
    //             <NavLink
    //                 className="nav-link"
    //                 to="/"
    //                 exact
    //             >
    //                 Главная
    //             </NavLink>
    //         </li>
    //         <li className="nav-item">
    //             <NavLink
    //                 className="nav-link"
    //                 to="/about"
    //             >
    //                 Информация
    //             </NavLink>
    //         </li>
    //     </ul>
    // </nav>

    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="navbar-brand">
            Note App
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink
                    className="nav-link"
                    to="/"
                >
                Главная
                </NavLink>
                <NavLink
                    className="nav-link"
                    to="/about"
                >
                Информация
                </NavLink>
                <NavLink
                    className="nav-link"
                    to="/auth"
                >
                Войти
                </NavLink>

            </div>
        </div>
    </nav>
)
