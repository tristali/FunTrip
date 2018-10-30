import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingpage";
import Plan from "./components/plan";
import Profile from "./components/profile";
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
            all_plan: "",

            /* 正在編輯的旅程 */
            current_plan: "",

            /* 新增或修改旅程 */
            /* DOM 狀態 */
            add_plantrip: "hide",
            /* 旅程 ID */
            add_plantrip_id: "",

            /* Plan 顯示正在編輯旅程的景點 */
            /* DOM 狀態 */
            plan_trip: "hide",
            plan_trip_width: "hide_creact_plantrip",

            /* 選單 */
            /* DOM 狀態 */
            menu: "",

            /* 登入 */
            /* DOM 狀態 */
            login_and_signup: "",

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
        this.getGoogleMaps = this.getGoogleMaps.bind(this);
    }

    render() {
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
                                getGoogleMaps={this.getGoogleMaps}
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
        this.getGoogleMaps();
    }

    componentDidMount() {
        /* 判斷當前會員登入狀態，決定登入視窗是否顯示 */
        let thisEnvironment = this;
        DB.onAuthChanged(thisEnvironment);
        this.getGoogleMaps().then(google => {
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
    { value: 要改變 add_plantrip state 名稱得值, id: 要編輯旅程的 id } */
    handleOpenAddPlan(props) {
        let planId = "";
        if (props.value === "EDIT") {
            planId = this.state.current_plan;
        }
        this.setState({
            add_plantrip: props.value,
            add_plantrip_id: planId,
            plan_trip: "hide",
            plan_trip_width: "hide_creact_plantrip",
            menu: "",
            map: ""
        });
    }

    /* 開啟彈跳視窗，判斷是否為刪除景點 */
    handlePopup(value) {
        let plan_trip = this.state.plan_trip;
        let map = this.state.map;

        if (value !== "del_plan") {
            plan_trip = "hide";
            map = "";
        }

        this.setState({
            popup: "",
            popup_state: value,
            plan_trip: plan_trip,
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

    /* 取得 GOOGLE MAP API */
    getGoogleMaps() {
        if (!this.googleMapsPromise) {
            this.googleMapsPromise = new Promise(resolve => {
                // Add a global handler for when the API finishes loading
                window.resolveGoogleMapsPromise = () => {
                    // Resolve the promise
                    resolve(google);
                    // Tidy up
                    delete window.resolveGoogleMapsPromise;
                };

                const googleScript = document.createElement("script");
                googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${
                    config.google
                }&callback=resolveGoogleMapsPromise&libraries=places`;
                googleScript.async = true;
                googleScript.defer = true;
                document.head.insertBefore(
                    googleScript,
                    document.head.childNodes[0]
                );

                const markerScript = document.createElement("script");
                markerScript.src =
                    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
                document.head.insertBefore(
                    markerScript,
                    document.head.childNodes[1]
                );
            });
        }

        return this.googleMapsPromise;
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
