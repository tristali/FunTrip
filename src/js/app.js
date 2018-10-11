import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingpage";
import Plan from "./components/plan";
import Profile from "./components/profile";
import app from "./lib";
import * as firebase from "firebase";

/*initialize firebase*/
firebase.initializeApp(app.firebase.config);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                password: "",
                uid: "",
                photoURL: ""
            },
            /* 登入或註冊狀態 */
            login_or_signup: "signup",
            /* 選單開啟或隱藏狀態 */
            menu: "",
            current_plan: "-LORZRD_aJZOJx8v-GVU", //
            /* 新增旅程 DOM 狀態 */
            add_plantrip: "hide"
        };
        this.handleLoginOrSignupState = this.handleLoginOrSignupState.bind(
            this
        );
        this.handleLoginAndSignupInputChange = this.handleLoginAndSignupInputChange.bind(
            this
        );
        this.handleMenuState = this.handleMenuState.bind(this);

        /* Log in and Sign up */
        this.handleLoginOrSignupEnter = this.handleLoginOrSignupEnter.bind(
            this
        );
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);

        this.handleOpenAddPlan = this.handleOpenAddPlan.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    }
    render() {
        console.log(this.state);
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={LandingPage} exact />
                    <Route
                        path="/plan"
                        render={() => (
                            <Plan
                                state={this.state}
                                handleLoginOrSignupState={
                                    this.handleLoginOrSignupState
                                }
                                handleLoginOrSignupEnter={
                                    this.handleLoginOrSignupEnter
                                }
                                handleLoginAndSignupInputChange={
                                    this.handleLoginAndSignupInputChange
                                }
                                handleMenuState={this.handleMenuState}
                                menu={this.state.menu}
                                handleFacebookLogin={this.handleFacebookLogin}
                                handleGoogleLogin={this.handleGoogleLogin}
                                handleOpenAddPlan={this.handleOpenAddPlan}
                                handleStateChange={this.handleStateChange}
                            />
                        )}
                    />
                    <Route
                        path="/profile"
                        render={() => (
                            <Profile
                                state={this.state}
                                handleLoginOrSignupState={
                                    this.handleLoginOrSignupState
                                }
                                handleLoginOrSignupEnter={
                                    this.handleLoginOrSignupEnter
                                }
                                handleLoginAndSignupInputChange={
                                    this.handleLoginAndSignupInputChange
                                }
                                handleMenuState={this.handleMenuState}
                                menu={this.state.menu}
                                handleFacebookLogin={this.handleFacebookLogin}
                                handleGoogleLogin={this.handleGoogleLogin}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }

    /* 打開新增旅程視窗 */
    handleOpenAddPlan() {
        this.setState({
            add_plantrip: "",
            menu: ""
        });
    }

    /* 改變 state 狀態 
    { 
        stateName : 要改變的 state 名稱, 
        value : 要改變這個 state 名稱得值
    } 
    */
    handleStateChange(props) {
        let thisState = {};
        thisState[props.stateName] = props.value;
        this.setState(thisState);
    }

    /* Determine if the user chooses to Login or Signup */
    handleLoginOrSignupState(tab_name) {
        this.setState({ login_or_signup: tab_name });
    }

    /* Login and Signup data input change this.state.user  */
    handleLoginAndSignupInputChange(e) {
        const userDetailKey = Object.keys(this.state.user);
        const userDetailState = {};
        userDetailKey.forEach(i => {
            userDetailState[i] = this.state.user[i];
            if (i == e.currentTarget.id) {
                userDetailState[i] = e.currentTarget.value;
            }
        });
        this.setState({ user: userDetailState });
    }

    /* check the Login and Signup information before sending the information */
    handleLoginOrSignupEnter() {
        const thisStateUser = this.state.user;

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
                const promise = firebase
                    .auth()
                    .signInWithEmailAndPassword(
                        thisStateUser.email,
                        thisStateUser.password
                    );
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
                    const promise = firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            thisStateUser.email,
                            thisStateUser.password
                        );
                    promise
                        .then(function() {
                            firebase
                                .database()
                                .ref(
                                    "/users/" + firebase.auth().currentUser.uid
                                )
                                .set({
                                    name: thisStateUser.name,
                                    email: thisStateUser.email,
                                    uid: firebase.auth().currentUser.uid
                                });
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
        app.firebase_signInWithPopup(firebase, provider, "Facebook");
    }

    /* Google Login */
    handleGoogleLogin() {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        app.firebase_signInWithPopup(firebase, provider, "Google");
    }

    /* Determine if the click menu change this.state.menu */
    handleMenuState() {
        if (!this.state.menu) {
            this.setState({ menu: "open" });
        } else {
            this.setState({ menu: "" });
        }
    }

    /* Determine the login status when all components are rendered. */
    componentDidMount() {
        /* 判斷登入狀態決定登入視窗是否顯示*/
        let thisStateUser;
        firebase.auth().onAuthStateChanged(firebaseUser => {
            const loginAndSignupDOM = app.get(".login_and_signup");
            const plantripDOM = app.get(".plantrip");
            const mapDOM = app.get(".map");
            if (firebaseUser) {
                thisStateUser = Object.assign({}, this.state.user, {
                    email: firebaseUser.email,
                    uid: firebaseUser.uid,
                    password: ""
                });
                firebase
                    .database()
                    .ref("/users/" + firebaseUser.uid)
                    .on("value", function(snapshot) {
                        thisStateUser.name = snapshot.val().name;
                        if (snapshot.val().photoURL) {
                            thisStateUser.photoURL = snapshot.val().photoURL;
                        }
                    });
                this.setState({ user: thisStateUser });
                loginAndSignupDOM.classList.add("hide");
                plantripDOM.classList.remove("hide");
                mapDOM.classList.remove("hide_plantrip");
            } else {
                /* 沒有登入狀態 */
                loginAndSignupDOM.classList.remove("hide");
                plantripDOM.classList.add("hide");
                mapDOM.classList.add("hide_plantrip");
                thisStateUser = Object.assign({}, this.state.user, {
                    name: "",
                    email: "",
                    password: "",
                    uid: "",
                    photoURL: ""
                });
                this.setState({
                    user: thisStateUser,
                    menu: ""
                });
            }
        });
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
