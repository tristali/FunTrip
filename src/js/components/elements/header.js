import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import Logo from "../../../img/funtrip_logo.svg";
import "../../../scss/header.scss";
import * as firebase from "firebase";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSignout = this.handleSignout.bind(this);
    }
    render() {
        return (
            <header>
                <ul className="clearfix">
                    <li>
                        <h1>
                            <img src={Logo} />
                        </h1>
                    </li>
                    <li
                        className={`menu_icon ${this.props.state.menu}`}
                        onClick={this.props.handleMenuState}
                    >
                        <div />
                        <div />
                        <div />
                    </li>
                </ul>
                <div className={`menu ${this.props.state.menu}`}>
                    <ul>
                        <li onClick={this.props.handleOpenAddPlan}>新增旅程</li>
                        <li>
                            <NavLink to="/profile">我的旅程</NavLink>
                        </li>
                        <li onClick={this.handleSignout}>登出</li>
                    </ul>
                </div>
            </header>
        );
    }

    /* Signout */
    handleSignout() {
        firebase.auth().signOut();
    }
}
export default Header;
