import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingpage";
import Plan from "./components/plan";
import Profile from "./components/profile";
import { DB } from "./library/firebase";

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
            /* 記錄此使用者所有 plan */
            all_plan: "",
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
            loading: true,
            google:"",
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
                                handleMenuState={this.handleMenuState}
                                menu={this.state.menu}
                                handleOpenAddPlan={this.handleOpenAddPlan}
                                handleAppStateChange={this.handleAppStateChange}
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
                                handleMenuState={this.handleMenuState}
                                menu={this.state.menu}
                                handleOpenAddPlan={this.handleOpenAddPlan}
                                handleAppStateChange={this.handleAppStateChange}
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
            popup_state: value,
            menu: ""
        });
        if (value !== "del_plan") {
            this.setState({
                plan_trip: "hide",
                map: ""
            });
        }
    }

    /* Signout */
    handleSignout() {
        if (location.href.includes("plan")) {
            location.href = "/plan";
        }
        this.setState({
            popup: "hide",
            popup_state: ""
        });

        DB.signOut();
    }

    /* 改變 App Component state 狀態 {key: value}*/
    handleAppStateChange(object) {
        let keys = Object.keys(object);
        for (let i = 0; i < keys.length; i++) {
            let thisState = {};
            thisState[keys[i]] = object[keys[i]];
            this.setState(thisState);
        }
    }

    /* Determine if the click menu change this.state.menu */
    handleMenuState() {
        if (!this.state.menu) {
            this.setState({ menu: "open" });
        } else {
            this.setState({ menu: "" });
        }
    }

    componentDidMount() {
        /* 判斷登入狀態決定登入視窗是否顯示*/
        /* 儲存當前環境 */
        let thisEnvironment = this;
        DB.onAuthChanged(thisEnvironment);

        this.getGoogleMaps().then(google => {
            this.setState({ google: google });
        });
    }

    getGoogleMaps() {
        // If we haven't already defined the promise, define it
        if (!this.googleMapsPromise) {
            this.googleMapsPromise = new Promise(resolve => {
                // Add a global handler for when the API finishes loading
                window.resolveGoogleMapsPromise = () => {
                    // Resolve the promise
                    resolve(google);

                    // Tidy up
                    delete window.resolveGoogleMapsPromise;
                };

                // Load the Google Maps API
                const script = document.createElement("script");
                const API = "AIzaSyA6iV5lGtK4TgMFpArivccEqbAzS8kmJss";
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise&libraries=places`;
                script.async = true;
                script.defer = true;
                document.head.insertBefore(script, document.head.childNodes[0]);

                const script2 = document.createElement("script");
                script2.src =
                    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
                document.head.insertBefore(
                    script2,
                    document.head.childNodes[1]
                );
            });
        }

        // Return a promise for the Google Maps API
        return this.googleMapsPromise;
    }

    componentWillMount() {
        // Start Google Maps API loading since we know we'll soon need it
        this.getGoogleMaps();
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
