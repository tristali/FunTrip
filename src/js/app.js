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
                photoURL: "",
                plan: ""
            },
            /* 當下的旅程 */
            current_plan: "",
            /* 新增修改旅程 DOM 狀態 */
            add_plantrip: "hide",
            /* 新增修改旅程 id */
            add_plantrip_id: "",
            /* 展示旅程景點 DOM 狀態 */
            plan_trip: "hide",
            plan_trip_width: "hide_creact_plantrip",
            /* 選單 DOM 狀態 */
            menu: "",
            /* 登入 DOM 狀態 */
            login_and_signup: "",
            /* 地圖 DOM 狀態 */
            map: "",
            /* 彈跳視窗 DOM 狀態 */
            popup: "hide",
            popup_state: "",
            loading: true
        };

        this.handleMenuState = this.handleMenuState.bind(this);
        this.handleOpenAddPlan = this.handleOpenAddPlan.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handlePopup = this.handlePopup.bind(this);
        this.handleSignout = this.handleSignout.bind(this);
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
                                handleMenuState={this.handleMenuState}
                                menu={this.state.menu}
                                handleOpenAddPlan={this.handleOpenAddPlan}
                                handleStateChange={this.handleStateChange}
                                handleSignout={this.handleSignout}
                                handlePopup={this.handlePopup}
                            />
                        )}
                    />
                    <Route
                        path="/profile"
                        render={() => (
                            <Profile
                                state={this.state}
                                handleMenuState={this.handleMenuState}
                                menu={this.state.menu}
                                handleOpenAddPlan={this.handleOpenAddPlan}
                                handleStateChange={this.handleStateChange}
                                handleSignout={this.handleSignout}
                                handlePopup={this.handlePopup}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }

    /* 打開新增旅程視窗
    {
        value: 要改變 add_plantrip state 名稱得值,
        id: 要編輯旅程的 id,
    } 
    */
    handleOpenAddPlan(props) {
        this.setState({
            add_plantrip: props.value,
            menu: "",
            plan_trip: "hide",
            plan_trip_width: "hide_creact_plantrip",
            map: ""
        });
        if (props.value === "EDIT") {
            this.setState({ add_plantrip_id: this.state.current_plan });
        } else {
            this.setState({ add_plantrip_id: "" });
        }
    }

    /* 改變彈跳視窗 */
    handlePopup(value) {
        this.setState({
            popup: "",
            popup_state: value
        });
    }

    /* Signout */
    handleSignout() {
        this.setState({
            popup: "hide",
            popup_state: ""
        });
        firebase.auth().signOut();
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
        /* 儲存當前環境 */
        let thisEnvironment = this;
        let thisStatePlanTrip = "hide";
        let thisStateCurrentPlan = "";
        let thisStateMap = "";
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                thisStateUser = Object.assign({}, this.state.user, {
                    email: firebaseUser.email,
                    uid: firebaseUser.uid,
                    password: "",
                    photoURL: firebaseUser.photoURL
                });
                firebase
                    .database()
                    .ref("/users/" + firebaseUser.uid)
                    .on("value", function(snapshot) {
                        thisStateUser.name = snapshot.val().name;
                        /* 較高畫質大頭貼 */
                        if (snapshot.val().photoURL) {
                            thisStateUser.photoURL = snapshot.val().photoURL;
                        }
                        if (snapshot.val().plan) {
                            thisStateUser.plan = snapshot.val().plan;
                        }
                        thisEnvironment.setState({
                            user: thisStateUser,
                            current_plan: thisStateCurrentPlan,
                            plan_trip: thisStatePlanTrip,
                            map: thisStateMap
                        });
                    });

                this.setState({
                    user: thisStateUser,
                    login_and_signup: "hide"
                });
            } else {
                /* 沒有登入狀態 */
                thisStateUser = Object.assign({}, this.state.user, {
                    name: "",
                    email: "",
                    password: "",
                    uid: "",
                    photoURL: "",
                    plan: ""
                });
                this.setState({
                    user: thisStateUser,
                    menu: "",
                    plan_trip: "hide",
                    login_and_signup: "",
                    map: ""
                });
            }
        });
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
