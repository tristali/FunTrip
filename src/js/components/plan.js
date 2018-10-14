import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./elements/login";
import Header from "./elements/header";
import PlanTrip from "./elements/plantrip";
import Map from "./elements/map";
import AddPlanTrip from "./elements/add_plantrip";
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

            /* map 地圖顯示資料 */
            map_center: {
                lat: 23.6,
                lng: 121
            },
            map_zoom: 8,
            locations: ""
        };
        this.handlePlanStateChange = this.handlePlanStateChange.bind(this);
    }
    render() {
        return (
            <div>
                <Login
                    state={this.props.state}
                    handleLoginOrSignupState={
                        this.props.handleLoginOrSignupState
                    }
                    handleLoginOrSignupEnter={
                        this.props.handleLoginOrSignupEnter
                    }
                    handleLoginAndSignupInputChange={
                        this.props.handleLoginAndSignupInputChange
                    }
                    handleFacebookLogin={this.props.handleFacebookLogin}
                    handleGoogleLogin={this.props.handleGoogleLogin}
                />
                <AddPlanTrip
                    state={this.props.state}
                    handleStateChange={this.props.handleStateChange}
                />
                <Header
                    handleMenuState={this.props.handleMenuState}
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleStateChange={this.props.handleStateChange}
                />
                <PlanTrip
                    state={this.props.state}
                    handleStateChange={this.props.handleStateChange}
                    handleDelTrip={this.props.handleDelTrip}
                    planState={this.state}
                    handlePlanStateChange={this.handlePlanStateChange}
                />
                <Map state={this.props.state} planState={this.state} />
            </div>
        );
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

    componentDidUpdate(prevProps) {
        /* 抓取 Database 所有此旅程資料 */
        if (prevProps.state.current_plan !== this.props.state.current_plan) {
            /* 抓取 Database 所有此旅程資料 */
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    const planPath = firebase
                        .database()
                        .ref(`plans/${this.props.state.current_plan}`);
                    planPath.on("value", snapshot => {
                        const plan = snapshot.val();

                        this.setState({
                            all_detailed_obj: plan.detailed,
                            totalDay: plan.day,
                            name: plan.name,
                            start: plan.start,
                            end: plan.end,
                            all_day_array: plan.all_day_array,
                            all_week_array: plan.all_week_array
                        });

                        /* 抓取第一個景點經緯度 */
                        const allDetailedObj = plan.detailed;
                        if (allDetailedObj) {
                            const detailedKeyArray = Object.keys(
                                allDetailedObj
                            );
                            let thisDayPlanDetailsCount = 0;

                            for (let i = 0; i < detailedKeyArray.length; i++) {
                                let detailedObj =
                                    allDetailedObj[detailedKeyArray[i]];
                                if (detailedObj.day == 1) {
                                    thisDayPlanDetailsCount += 1;
                                    if (thisDayPlanDetailsCount === 1) {
                                        this.setState({
                                            map_center: detailedObj.location,
                                            map_zoom: 9
                                        });
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }

        /* 判斷使用者是否有同意分享目前座標權限 */
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    map_center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
            });
        }
    }
}

export default Plan;
