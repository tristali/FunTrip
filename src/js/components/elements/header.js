import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "../../../img/funtrip_logo.svg";
import "../../../scss/header.scss";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/profile" />;
        }
        return (
            <header>
                <ul className="clearfix">
                    <li>
                        <h1 onClick={this.handleRedirect}>
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
                        <li
                            onClick={() =>
                                this.props.handleOpenAddPlan({ value: "NEW" })
                            }
                        >
                            新增旅程
                        </li>
                        <li onClick={this.props.handleMenuState}>
                            <NavLink to="/profile">我的旅程</NavLink>
                        </li>
                        <li onClick={() => this.props.handlePopup("signout")}>
                            登出
                        </li>
                    </ul>
                </div>
            </header>
        );
    }

    handleRedirect() {
        if (location.href.includes("plan")) {
            this.setState({ redirect: true });
        }
        if (location.href.includes("profile")) {
            location.href="/profile";
        }
        this.props.handleStateChange({
            stateName: "loading",
            value: true
        });
    }
}
export default Header;
