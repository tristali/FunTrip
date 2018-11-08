import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingpage";
import Plan from "./components/plan";
import Profile from "./components/profile";
import { googleMaps } from "./library/google";
import { DB } from "./library/firebase";
import { config } from "./library/config";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 會員資料 */
            user: {
                name: "",
                email: "",
                password: "",
                uid: "",
                photoURL: "",
                plan: ""
            },
            /* 所有旅程 */
            all_trip: "",

            /* 正在編輯的旅程 */
            current_trip: "",

            /* 新增或修改旅程 */
            /* DOM 狀態 hide | NEW | EDIT */
            edit_trip: "hide",
            /* 旅程 ID */
            edit_trip_id: "",

            /* Plan 顯示正在編輯旅程的景點 */
            /* DOM 狀態 */
            trip_attractions: "hide",
            trip_attractions_width: "hide_creact_plantrip",

            /* 選單 */
            /* DOM 狀態 */
            menu: "",

            /* 登入 */
            /* DOM 狀態 */
            login_and_signup: "",
            signup: false,

            /* 地圖 */
            /* DOM 狀態 */
            map: "",

            /* 彈跳視窗 */
            /* DOM 狀態 */
            popup: "hide",
            /* 當前動作狀態 */
            popup_state: "",

            /* LOADING */
            /* DOM 狀態 */
            loading: true,

            /* GOOGLE MAP API */
            google: ""
        };

        this.handleMenuState = this.handleMenuState.bind(this);
        this.handleOpenAddPlan = this.handleOpenAddPlan.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
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
                                handleAppStateChange={this.handleAppStateChange}
                                handleMenuState={this.handleMenuState}
                                handleOpenAddPlan={this.handleOpenAddPlan}
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
                                handleAppStateChange={this.handleAppStateChange}
                                handleMenuState={this.handleMenuState}
                                handleOpenAddPlan={this.handleOpenAddPlan}
                                handleSignout={this.handleSignout}
                                handlePopup={this.handlePopup}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
    componentWillMount() {
        const thisEnvironment = this;
        googleMaps.get(thisEnvironment);
    }

    componentDidMount() {
        /* 判斷當前會員登入狀態，決定登入視窗是否顯示 */
        let thisEnvironment = this;
        DB.determineAuthFirst(thisEnvironment);

        googleMaps.get(thisEnvironment).then(google => {
            this.setState({ google: google });
        });
    }

    /* 改變 App Component state 狀態 {key: value} */
    handleAppStateChange(object) {
        let keys = Object.keys(object);
        for (let i = 0; i < keys.length; i++) {
            let thisState = {};
            thisState[keys[i]] = object[keys[i]];
            this.setState(thisState);
        }
    }

    /* 判斷改變選單開合狀態 */
    handleMenuState() {
        let thisState = {};
        thisState.menu = this.state.menu ? "" : "open";
        this.setState(thisState);
    }

    /* 打開新增旅程視窗
    { value: 要改變 edit_trip state 名稱得值, id: 要編輯旅程的 id } */
    handleOpenAddPlan(props) {
        let planId = "";
        if (props.value === "EDIT") {
            planId = this.state.current_trip;
        }
        this.setState({
            edit_trip: props.value,
            edit_trip_id: planId,
            trip_attractions: "hide",
            trip_attractions_width: "hide_creact_plantrip",
            menu: "",
            map: ""
        });
    }

    /* 開啟彈跳視窗，判斷是否為刪除景點 */
    handlePopup(value) {
        let tripAttractions = this.state.trip_attractions;
        let map = this.state.map;

        if (value !== "del_plan") {
            tripAttractions = "hide";
            map = "";
        }

        this.setState({
            popup: "",
            popup_state: value,
            trip_attractions: tripAttractions,
            map: map,
            menu: ""
        });
    }

    /* 會員登出，判斷是否在 plan 頁面 */
    handleSignout() {
        DB.signOut();
        location.href.includes("plan") ? (location.href = "/plan") : null;
        this.setState({
            popup: "hide",
            popup_state: ""
        });
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
