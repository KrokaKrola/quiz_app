import React from "react";
import logo from "./../../assets/logo.svg";

const Header = ({user}) => {
    return (
        <header className="Header">
            <div className="container">
                <div className="Header__wrapper">
                    <a href="/" className="Header__logo">
                        <img src={logo} alt=""/>
                        <span>Quiz app</span>
                    </a>
                    <div className="Header__profile">
                        <span className="Header__username">{user.id && user.name}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
