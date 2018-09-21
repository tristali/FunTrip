import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "../../../scss/login.scss";

const Login = () =>{
    return(
        <div className="login">
            <div>
                <div>
                    <ul className="clearfix tab">
                        <li>SIGN IN</li>
                        <li className="current">SIGN UP</li>
                    </ul>
                    <ul className="enter_information">
                        <li><input id="name" type="text" placeholder="請輸入姓名" /></li>
                        <li><input id="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="example@funtrip.com" /></li>
                        <li><input id="password" type="password" pattern=".{6,}" placeholder="請輸入密碼(至少六碼)" /></li>
                    </ul>
                    <ul className="login_via">
                        <li id="fb_login">使用 Facebook 登入</li>
                        <li id="google_login">使用 Google 登入</li>
                    </ul>
                </div>
                <div className="enter"></div>
            </div>
        </div>
    );
};

export default Login;