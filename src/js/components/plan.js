import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import Login from "./elements/login";
import Header from "./elements/header";
import PlanTrip from "./elements/plantrip";
import Map from "./elements/map";
import AddPlanTrip from "./elements/add_plantrip";
import Popup from "./elements/popup";
import Loading from "./loading";
import app from "../lib";
import * as firebase from "firebase";

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 當前行程各景點資料 */
            all_detailed_obj: "",
            /* 當前行程總天數 */
            totalDay: "",
            /* 當前行程名稱 */
            name: "",
            /* 當前行程起始日期 */
            start: "",
            /* 當前行程結束日期 */
            end: "",
            /* 當前行程所有日期 */
            all_day_array: "",
            /* 當前行程所有星期 */
            all_week_array: "",
            /* 當前為關閉 "hide" 新增 "Add" 或修改 "Edit" 行程狀態 */
            creact_plantrip: "hide",
            /* 當前顯示日曆第幾天 */
            current_day: "#D_1",

            /* 搜尋景點框 */
            lcation_name: "",

            /* map 地圖顯示資料 */
            map_center: {
                lat: 23.6,
                lng: 121
            },
            map_zoom: 8,
            locations: "",
            redirect: false
        };
        this.handlePlanStateChange = this.handlePlanStateChange.bind(this);
        this.handleDelTrip = this.handleDelTrip.bind(this);
        this.handleDelCreactPlanTrip = this.handleDelCreactPlanTrip.bind(this);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/profile" />;
        }
        return (
            <div>
                <Login
                    state={this.props.state}
                    handleStateChange={this.props.handleStateChange}
                />
                <AddPlanTrip
                    state={this.props.state}
                    handleStateChange={this.props.handleStateChange}
                />
                <Popup
                    state={this.props.state}
                    handleStateChange={this.props.handleStateChange}
                    handleSignout={this.props.handleSignout}
                    handleDelCreactPlanTrip={this.handleDelCreactPlanTrip}
                    handleDelTrip={this.handleDelTrip}
                />
                {/* {this.props.state.loading && <Loading />} */}
                <Header
                    handleMenuState={this.props.handleMenuState}
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleStateChange={this.props.handleStateChange}
                    handlePopup={this.props.handlePopup}
                />
                <PlanTrip
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleStateChange={this.props.handleStateChange}
                    planState={this.state}
                    handlePlanStateChange={this.handlePlanStateChange}
                    handlePopup={this.props.handlePopup}
                />
                <Map
                    state={this.props.state}
                    planState={this.state}
                    handleStateChange={this.props.handleStateChange}
                    handlePlanStateChange={this.handlePlanStateChange}
                />
            </div>
        );
    }

    /* 刪除 */
    handleDelCreactPlanTrip() {
        this.setState({
            creact_plantrip: "hide"
        });
        this.props.handleStateChange({
            stateName: "popup",
            value: "hide"
        });
        this.props.handleStateChange({
            stateName: "popup_state",
            value: ""
        });
        const currentPlanID = this.props.state.current_plan;
        /* 把資料推進 Database */
        let detailedPath = `plans/${currentPlanID}/detailed`;

        /* day and number */
        const thisDayNumberArray = app
            .get(".all_plan_detailed > div.current")
            .id.split("_");

        let all_detailed_obj = this.state.all_detailed_obj;

        all_detailed_obj[thisDayNumberArray[1]].splice(
            thisDayNumberArray[3],
            1
        );

        firebase
            .database()
            .ref(`${detailedPath}`)
            .set(all_detailed_obj);
        /* 修改/新增行程資料清空 */
        app.cleanCreactPlanTrip();
        app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });

        this.props.handleStateChange({
            stateName: "map",
            value: "plantrip_open"
        });
        this.props.handleStateChange({
            stateName: "plan_trip_width",
            value: "hide_creact_plantrip"
        });
    }

    /* 改變 state 狀態 
    { 
        stateName : 要改變的 state 名稱, 
        value : 要改變這個 state 名稱得值
    } 
    */
    handlePlanStateChange(props) {
        let thisState = {};
        thisState[props.stateName] = props.value;
        this.setState(thisState);
    }

    /* 刪除旅程 */
    handleDelTrip() {
        this.props.handleStateChange({
            stateName: "plan_trip",
            value: "hide"
        });
        this.props.handleStateChange({
            stateName: "map",
            value: ""
        });
        this.props.handleStateChange({
            stateName: "popup",
            value: "hide"
        });
        this.props.handleStateChange({
            stateName: "popup_state",
            value: ""
        });
        /* 上傳此 ID */
        let uid = this.props.state.user.uid;
        let planArray;
        let key = this.props.state.current_plan;
        /* 上傳此旅程 ID 到此使用者資料 */
        firebase
            .database()
            .ref(`users/${uid}`)
            .once("value", snapshot => {
                /* 先確定要刪除的 value index */
                planArray = snapshot.val().plan;
                let index = planArray.indexOf(key);
                if (index > -1) {
                    planArray.splice(index, 1);
                }
                firebase
                    .database()
                    .ref(`users/${uid}`)
                    .update({ plan: planArray });
            });
        /* 上傳此旅程資訊 */
        firebase
            .database()
            .ref(`plans/${key}`)
            .remove();
        this.props.handleStateChange({
            stateName: "loading",
            value: true
        });
        this.setState({ redirect: true });
    }

    componentDidMount() {
        let thisEnvironment = this;
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                let redirectState = false;
                /* 判斷 plan href 是否有 plan id */
                if (!location.href.includes("?id=")) {
                    redirectState = true;
                } else {
                    let thisPlanId = this.props.state.current_plan;
                    redirectState = true;
                    firebase
                        .database()
                        .ref("/plans/")
                        .on("value", function(snapshot) {
                            Object.keys(snapshot.val()).map(planId => {
                                /* 如果有這個旅行且作者為此使用者 則 redirectState = false */
                                if (planId === thisPlanId) {
                                    firebase
                                        .database()
                                        .ref("/plans/" + thisPlanId)
                                        .on("value", function(snapshot) {
                                            if (
                                                snapshot.val() &&
                                                snapshot.val().author ===
                                                    firebaseUser.uid
                                            ) {
                                                redirectState = false;
                                            }
                                        });
                                }
                            });
                        });
                }
                this.props.handleStateChange({
                    stateName: "loading",
                    value: true
                });
                updatePlanInformation(thisEnvironment);
                this.setState({ redirect: redirectState });
            }
        });
    }

    componentDidUpdate(prevProps) {
        /* 抓取 Database 所有此旅程資料 */
        if (prevProps.state.current_plan !== this.props.state.current_plan) {
            /* 抓取 Database 所有此旅程資料 */
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    let thisEnvironment = this;
                    updatePlanInformation(thisEnvironment);
                }
            });
        }
    }
}

export default Plan;

function updatePlanInformation(thisEnvironment) {
    const planPath = firebase
        .database()
        .ref(`plans/${thisEnvironment.props.state.current_plan}`);
    planPath.on("value", snapshot => {
        const plan = snapshot.val();
        if (plan) {
            thisEnvironment.setState({
                all_detailed_obj: plan.detailed,
                totalDay: plan.day,
                name: plan.name,
                start: plan.start,
                end: plan.end,
                all_day_array: plan.all_day_array,
                all_week_array: plan.all_week_array
            });
            console.log(plan.detailed);
            /* 抓取第一個景點經緯度 */
            // const allDetailedObj = plan.detailed;
            // if (allDetailedObj) {
            //     const detailedKeyArray = Object.keys(allDetailedObj);
            //     let thisDayPlanDetailsCount = 0;

            //     for (let i = 0; i < detailedKeyArray.length; i++) {
            //         let detailedObj = allDetailedObj[detailedKeyArray[i]];
            //         if (detailedObj.day == 1) {
            //             thisDayPlanDetailsCount += 1;
            //             if (thisDayPlanDetailsCount === 1) {
            //                 thisEnvironment.setState({
            //                     map_center: detailedObj.location,
            //                     map_zoom: 9
            //                 });
            //             }
            //         }
            //     }
            // }
            //else if (navigator.geolocation) {
            //     /* 判斷使用者是否有同意分享目前座標權限 */
            //     navigator.geolocation.getCurrentPosition(position => {
            //         thisEnvironment.setState({
            //             map_center: {
            //                 lat: position.coords.latitude,
            //                 lng: position.coords.longitude
            //             },
            //             map_zoom: 8
            //         });
            //     });
            // }
        }
    });

    thisEnvironment.props.handleStateChange({
        stateName: "plan_trip",
        value: ""
    });
    thisEnvironment.props.handleStateChange({
        stateName: "map",
        value: "plantrip_open"
    });
}
