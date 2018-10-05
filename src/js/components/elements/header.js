import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import Logo from "../../../img/funtrip_logo.svg";
import "../../../scss/header.scss";

const Header = ({ handleMenuState, menu, handleSignout, handleAddPlan }) => {
    return (
        <header>
            <ul className="clearfix">
                <li>
                    <h1>
                        <img src={Logo} />
                    </h1>
                </li>
                <li className={`menu_icon ${menu}`} onClick={handleMenuState}>
                    <div />
                    <div />
                    <div />
                </li>
            </ul>
            <div className={`menu ${menu}`}>
                <ul>
                    <li onClick={handleAddPlan}>新增旅程</li>
                    <li>
                        <NavLink to="/profile">我的旅程</NavLink>
                    </li>
                    <li onClick={handleSignout}>登出</li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
