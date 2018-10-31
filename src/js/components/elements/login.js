import React, { Component } from "react";
import "../../../scss/login.scss";
import * as firebase from "firebase";
import { DB } from "../../library/firebase";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 登入或註冊狀態 */
            login_or_signup: "login"
        };
        this.handleLoginOrSignupState = this.handleLoginOrSignupState.bind(
            this
        );
        this.handleLoginAndSignupInputChange = this.handleLoginAndSignupInputChange.bind(
            this
        );
        /* Log in and Sign up */
        this.handleLoginOrSignupEnter = this.handleLoginOrSignupEnter.bind(
            this
        );
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }
    /* Determine if the user chooses to Login or Signup */
    handleLoginOrSignupState(tab_name) {
        this.setState({ login_or_signup: tab_name });
    }
    /* Login and Signup data input change this.state.user  */
    handleLoginAndSignupInputChange(e) {
        const userDetailKey = Object.keys(this.props.state.user);
        const userDetailState = {};
        userDetailKey.forEach(i => {
            userDetailState[i] = this.props.state.user[i];
            if (i == e.currentTarget.id) {
                userDetailState[i] = e.currentTarget.value;
            }
        });
        this.props.handleAppStateChange({
            user: userDetailState
        });
    }
    /* check the Login and Signup information before sending the information */
    handleLoginOrSignupEnter() {
        const thisStateUser = this.props.state.user;

        if (!thisStateUser.email || !thisStateUser.password) {
            alert("OOOpps! 有欄位忘記填囉!");
        } else if (
            !thisStateUser.email.match(
                /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
            )
        ) {
            alert("OOOpps! E-Mail 格式有誤!");
        } else if (!thisStateUser.password.match(/.{6,}/)) {
            alert("OOOpps! 密碼至少需要六碼歐!");
        } else {
            if (this.state.login_or_signup === "login") {
                /* Login */
                const promise = DB.signInWithEmailAndPassword(thisStateUser);
                promise.catch(function(e) {
                    if (
                        e.message ==
                        "The password is invalid or the user does not have a password."
                    ) {
                        alert(
                            "您好，此信箱已註冊為會員，再麻煩您使用 google 登入"
                        );
                    }
                });
            } else if (this.state.login_or_signup === "signup") {
                /* Signup */
                if (!thisStateUser.name) {
                    alert("OOOpps! 有欄位忘記填囉!");
                } else {
                    const promise = DB.createUserWithEmailAndPassword(
                        thisStateUser
                    );
                    promise
                        .then(function() {
                            DB.setMemberInformation(thisStateUser);
                        })
                        .catch(function(e) {
                            if (
                                e.message ==
                                "The email address is already in use by another account."
                            ) {
                                alert(
                                    "您好，此信箱已註冊為會員，再麻煩您使用 google 登入"
                                );
                            }
                        });
                }
            }
        }
    }
    /* Facebook Login */
    handleFacebookLogin() {
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope("email");
        DB.signInWithPopup(provider, "Facebook", "/?width=640");
    }

    /* Google Login */
    handleGoogleLogin() {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        DB.signInWithPopup(provider, "Google");
    }
    render() {
        let login = this.state.login_or_signup === "login" ? "current" : null;
        let signup = this.state.login_or_signup === "signup" ? "current" : null;
        return (
            <div
                className={`login_and_signup ${
                    this.props.state.login_and_signup
                }`}
            >
                <div className={this.state.login_or_signup}>
                    <div>
                        <ul className="clearfix tab">
                            <li
                                className={`${login} login`}
                                onClick={() =>
                                    this.handleLoginOrSignupState("login")
                                }
                            >
                                LOG IN
                            </li>
                            <li
                                className={`${signup} signup`}
                                onClick={() =>
                                    this.handleLoginOrSignupState("signup")
                                }
                            >
                                SIGN UP
                            </li>
                        </ul>
                        <ul className="enter_information">
                            <li>
                                <input
                                    id="name"
                                    value={this.props.state.user.name}
                                    onChange={
                                        this.handleLoginAndSignupInputChange
                                    }
                                    type="text"
                                    placeholder="請輸入姓名"
                                />
                            </li>
                            <li>
                                <input
                                    id="email"
                                    value={this.props.state.user.email}
                                    onChange={
                                        this.handleLoginAndSignupInputChange
                                    }
                                    type="email"
                                    placeholder="example@funtrip.com"
                                />
                            </li>
                            <li>
                                <input
                                    id="password"
                                    value={this.props.state.user.password}
                                    onChange={
                                        this.handleLoginAndSignupInputChange
                                    }
                                    type="password"
                                    placeholder="請輸入密碼(至少六碼)"
                                />
                            </li>
                        </ul>
                        <ul className="login_via">
                            <li
                                id="fb_login"
                                onClick={this.handleFacebookLogin}
                            >
                                使用 Facebook 登入
                            </li>
                            <li
                                id="google_login"
                                onClick={this.handleGoogleLogin}
                            >
                                使用 Google 登入
                            </li>
                        </ul>
                    </div>
                    <div
                        className="enter"
                        onClick={this.handleLoginOrSignupEnter}
                    />
                </div>
            </div>
        );
    }
}
export default Login;
