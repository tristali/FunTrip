import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import Login from "./elements/login";
import Header from "./elements/header";
import PlanTrip from "./plan/plantrip";
import Map from "./plan/map";
import AddPlanTrip from "./elements/add_plantrip";
import Popup from "./elements/popup";
import Loading from "./loading";
import app from "../lib";
import { DB } from "../library/firebase";

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
            current_tab: "#D_0",

            /* 當前點選的景點第幾天 */
            current_day: null,
            /* 當前點選的第幾個景點 */
            current_attraction: "",
            /* 當前景點資訊 */
            current_information: "",
            /* 當前景點資訊 */
            current_map_center: "",

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
                {google && (
                    <Map
                        state={this.props.state}
                        planState={this.state}
                        handleStateChange={this.props.handleStateChange}
                        handlePlanStateChange={this.handlePlanStateChange}
                    />
                )}
            </div>
        );
    }

    /* 刪除 */
    handleDelCreactPlanTrip() {
        this.setState({
            creact_plantrip: "hide"
        });
        this.props.handleStateChange({
            popup: "hide",
            popup_state: ""
        });
        const currentPlanID = this.props.state.current_plan;
        /* 把資料推進 Database */
        let path = `plans/${currentPlanID}/detailed`;

        /* day and number */
        const thisDayNumberArray = app
            .get(".all_plan_detailed > div.current")
            .id.split("_");

        let data = this.state.all_detailed_obj;

        data[thisDayNumberArray[1]].splice(thisDayNumberArray[3], 1);
        DB.set(path, data);

        this.setState({
            current_day: "",
            current_attractio: "",
            current_information: ""
        });

        this.props.handleStateChange({
            map: "plantrip_open",
            splan_trip: "",
            plan_trip_width: "hide_creact_plantrip"
        });
    }

    /* 改變 state 狀態 
    { 
        stateName : 要改變的 state 名稱, 
        value : 要改變這個 state 名稱得值
    } 
    */
    handlePlanStateChange(object) {
        let keys = Object.keys(object);
        for (let i = 0; i < keys.length; i++) {
            let thisState = {};
            thisState[keys[i]] = object[keys[i]];
            this.setState(thisState);
        }
        // let thisState = {};
        // thisState[props.stateName] = props.value;
        // this.setState(thisState);
    }

    /* 刪除旅程 */
    handleDelTrip() {
        this.props.handleStateChange({
            plan_trip: "hide",
            map: "",
            popup: "hide",
            popup_state: ""
        });
        /* 上傳此 ID */
        let uid = this.props.state.user.uid;
        let planArray;
        let key = this.props.state.current_plan;
        /* 上傳此旅程 ID 到此使用者資料 */
        const userPath = `users/${uid}`;
        DB.once(userPath, snapshot => {
            /* 先確定要刪除的 value index */
            planArray = snapshot.val().plan;
            let index = planArray.indexOf(key);
            if (index > -1) {
                planArray.splice(index, 1);
            }

            // const path = `users/${uid}`;
            const data = { plan: planArray };
            DB.update(userPath, data);
        });

        /* 刪除此旅程資訊 */
        const path = `plans/${key}`;
        DB.remove(path);

        this.props.handleStateChange({
            loading: true
        });
        this.setState({ redirect: true });
    }

    componentDidMount() {
        let thisEnvironment = this;
        let uid = this.props.state.user.uid;
        if (uid) {
            let redirectState = true;
            /* 判斷 plan href 是否有 plan id */
            if (!location.href.includes("?id=")) {
                this.setState({ redirect: true });
            } else {
                let thisPlanId = this.props.state.current_plan;
                const path = `/plans/${thisPlanId}`;
                DB.on(path, function(snapshot) {
                    if (snapshot.val().author === uid) {
                        redirectState = false;
                    }
                });
            }

            this.props.handleStateChange({
                loading: true
            });
            updatePlanInformation(thisEnvironment);
            this.setState({ redirect: redirectState });
        }
    }

    componentDidUpdate(prevProps) {
        /* 抓取 Database 所有此旅程資料 */
        if (
            prevProps.state.current_plan !== this.props.state.current_plan ||
            prevProps.state.user.uid !== this.props.state.user.uid
        ) {
            let thisEnvironment = this;
            let uid = this.props.state.user.uid;
            if (uid) {
                let redirectState = false;
                /* 判斷 plan href 是否有 plan id */
                if (!location.href.includes("?id=")) {
                    redirectState = true;
                } else {
                    let thisPlanId = this.props.state.current_plan;
                    redirectState = true;

                    const path = `/plans/${thisPlanId}`;
                    DB.on(path, function(snapshot) {
                        if (snapshot.val().author === uid) {
                            redirectState = false;
                        }
                    });
                }

                this.props.handleStateChange({
                    loading: true
                });
                updatePlanInformation(thisEnvironment);
                this.setState({ redirect: redirectState });
            }
        }
    }
}

export default Plan;

function updatePlanInformation(thisEnvironment) {
    const path = `plans/${thisEnvironment.props.state.current_plan}`;
    DB.on(path, snapshot => {
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
        plan_trip: "",
        map: "plantrip_open"
    });
}
