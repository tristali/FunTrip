import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/login.scss";

const Login = ({ 
    state,
    handleLoginOrSignupState, 
    handleLoginOrSignupEnter, 
    handleLoginAndSignupInputChange,
    handleFacebookLogin,
    handleGoogleLogin,
}) =>{
    return(
        <div className="login_and_signup">
            <div className="login">
                <div>
                    <ul className="clearfix tab">
                        <li className={`${state.loginOrSignup.login} login`} onClick={handleLoginOrSignupState}>LOG IN</li>
                        <li className={`${state.loginOrSignup.signup} signup`} onClick={handleLoginOrSignupState}>SIGN UP</li>
                    </ul>
                    <ul className="enter_information">
                        <li><input id="name" value={state.user.name} onChange={handleLoginAndSignupInputChange} type="text" placeholder="請輸入姓名" /></li>
                        <li><input id="email" value={state.user.email} onChange={handleLoginAndSignupInputChange} type="email" placeholder="example@funtrip.com" /></li>
                        <li><input id="password" value={state.user.password} onChange={handleLoginAndSignupInputChange} type="password" placeholder="請輸入密碼(至少六碼)" /></li>
                    </ul>
                    <ul className="login_via">
                        <li id="fb_login" onClick={handleFacebookLogin}>使用 Facebook 登入</li>
                        <li id="google_login" onClick={handleGoogleLogin}>使用 Google 登入</li>
                    </ul>
                </div>
                <div className="enter" onClick={handleLoginOrSignupEnter}></div>
            </div>
        </div>
    );
};

export default Login;