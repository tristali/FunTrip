import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import "../../../scss/add_plan_trip.scss";
import { DB } from "../../library/firebase";

class AddPlanTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip_name: "",
            start_date: this.getToday(),
            day: "",
            today: this.getToday(),
            all_day_array: "",
            redirect: false,
            plan_id: ""
        };
        this.list = {
            /* 星期對照表 */
            WEEK_ARRAY: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
        };
        this.handleAddPlan = this.handleAddPlan.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getToday = this.getToday.bind(this);
        this.handleCloseAddPlan = this.handleCloseAddPlan.bind(this);
    }

    render() {
        let addPlantrip = this.props.addPlantrip;
        if (this.state.redirect) {
            return <Redirect to={`/plan?id=${this.state.plan_id}`} />;
        }
        return (
            <div
                className={`login_and_signup add_plan_trip ${addPlantrip}`}
                onClick={this.handleCloseAddPlan}
            >
                <div>
                    <div>
                        <ul className="clearfix tab">
                            <li>{addPlantrip} TRIP</li>
                        </ul>
                        <ul className="enter_information">
                            <li>
                                <input
                                    id="trip_name"
                                    value={this.state.trip_name}
                                    onChange={e =>
                                        this.handleInputChange(e, "trip_name")
                                    }
                                    type="text"
                                    placeholder="請輸入旅程名稱"
                                />
                            </li>
                            <li>
                                <input
                                    id="start_date"
                                    value={this.state.start_date}
                                    onChange={e =>
                                        this.handleInputChange(e, "start_date")
                                    }
                                    type="date"
                                    min={this.state.today}
                                />
                            </li>
                            <li>
                                <input
                                    id="day"
                                    value={this.state.day}
                                    onChange={e =>
                                        this.handleInputChange(e, "day")
                                    }
                                    type="number"
                                    placeholder="請輸入旅程天數"
                                    min="1"
                                    max="99"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="enter" onClick={this.handleAddPlan} />
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        let addPlantrip = this.props.addPlantrip;
        /* 抓取目前旅程 Database 資料到新增編輯彈跳視窗 */
        if (prevProps.addPlantrip !== addPlantrip) {
            if (addPlantrip === "EDIT") {
                let thisEnvironment = this;
                const path = `plans/${this.props.currentPlan}`;
                DB.on(path, snapshot => {
                    let start = "";
                    snapshot
                        .val()
                        .start.split("/")
                        .map(item => {
                            start += `-${item}`;
                        });
                    thisEnvironment.setState({
                        trip_name: snapshot.val().name,
                        start_date: start.substring(1),
                        day: snapshot.val().day
                    });
                });
            }
            if (addPlantrip === "NEW") {
                this.setState({
                    trip_name: "",
                    start_date: this.getToday(),
                    day: ""
                });
            }
        }
    }

    /* 關閉新增旅程 */
    handleCloseAddPlan(e) {
        if (e.target.className.split(" ")[0] === "login_and_signup") {
            this.props.handleAppStateChange({
                add_plantrip: "hide"
            });
            if (location.href.includes("plan")) {
                this.props.handleAppStateChange({
                    plan_trip: "",
                    map: "plantrip_open"
                });
            }
        }
    }

    /* 新增旅程推到 database */
    handleAddPlan() {
        let state = this.state;
        let addPlantrip = this.props.addPlantrip;
        let addPlantripId = this.props.add_plantrip_id;
        if (!state.trip_name || !state.start_date || !state.day) {
            alert("OOOpps! 有欄位忘記填囉!");
        } else {
            /* 第一天 */
            let startDate = state.start_date;
            /* 最後一天 */
            let lastDate = new Date(startDate).addDays(Number(state.day - 1));
            lastDate = getDate(lastDate, "/");
            startDate = changeSymbol({
                string: startDate,
                before: "-",
                after: "/"
            });

            /* 存每一天 */
            let allDayArray = [];
            /* 每一天對照星期 */
            let allWeekArray = [];
            for (let i = 0; i < state.day; i++) {
                let thisDate = new Date(startDate).addDays(i);
                allDayArray.push(getDate(thisDate, "/"));
                allWeekArray.push(this.list.WEEK_ARRAY[thisDate.getDay()]);
            }

            /* 上傳此 ID */
            let uid = this.props.uid;
            let planArray;
            let key;
            if (addPlantripId && addPlantrip === "EDIT") {
                /* 編輯旅程 */
                key = addPlantripId;
                this.props.handleAppStateChange({
                    plan_trip: "",
                    map: "plantrip_open"
                });
            } else {
                /* 新增旅程 */
                key = DB.pushKey("plans/");

                /* 上傳此旅程 ID 到此使用者資料 */
                DB.once(`users/${uid}`, snapshot => {
                    if (snapshot.val().plan) {
                        planArray = snapshot.val().plan;
                    } else {
                        planArray = [];
                    }
                    planArray.push(key);

                    const path = `users/${uid}`;
                    const data = { plan: planArray };
                    DB.update(path, data);
                });

                this.props.handleAppStateChange({
                    current_plan: key
                });
                this.setState({
                    plan_id: key
                });
            }

            this.props.handleAppStateChange({
                add_plantrip: "hide"
            });
            if (addPlantripId && addPlantrip === "EDIT") {
                /* 上傳此旅程資訊 */
                const path = `plans/${key}`;
                const data = {
                    name: state.trip_name,
                    start: startDate,
                    end: lastDate,
                    day: state.day,
                    author: uid,
                    plan_id: key,
                    all_day_array: allDayArray,
                    all_week_array: allWeekArray
                };
                DB.update(path, data);
            } else {
                /* 上傳此旅程資訊 */
                const path = `plans/${key}`;
                const data = {
                    name: state.trip_name,
                    start: startDate,
                    end: lastDate,
                    day: state.day,
                    author: uid,
                    plan_id: key,
                    all_day_array: allDayArray,
                    all_week_array: allWeekArray
                };
                DB.set(path, data);
            }

            if (addPlantrip === "NEW") {
                this.setState({
                    redirect: true
                });

                this.props.handleAppStateChange({
                    loading: true
                });
            }
        }
    }

    /* 抓取今天的日期為最小值 */
    getToday() {
        let date = new Date();
        return getDate(date, "-");
    }

    /* 如果 input 改變 及 判斷天數是否介於 1-99 */
    handleInputChange(e, item) {
        if (item === "day") {
            if (e.currentTarget.value < 1) {
                e.currentTarget.value = 1;
            }
            if (e.currentTarget.value > 99) {
                e.currentTarget.value = 99;
            }
        }
        let thisState = {};
        thisState[item] = e.currentTarget.value;
        this.setState(thisState);
    }
}
export default AddPlanTrip;

/* 把日跟月補到兩位數 */
function beTwoDigitNumber(number) {
    if (number < 10) {
        number = `0${number}`;
    }
    return number;
}

/* 取日期 */
function getDate(date, path) {
    let thisMonth = date.getMonth() + 1;
    let thisDate = date.getDate();
    thisMonth = beTwoDigitNumber(thisMonth);
    thisDate = beTwoDigitNumber(thisDate);
    let dateString = `${date.getFullYear()}${path}${thisMonth}${path}${thisDate}`;

    return dateString;
}

/* 改變字串中間符號 */
function changeSymbol(props) {
    let stringArray = props.string.split(props.before);
    props.string = "";
    for (let i = 0; i < stringArray.length; i++) {
        props.string += props.after + stringArray[i];
    }
    props.string = props.string.slice(1);
    return props.string;
}

/* 計算結束日期 
https://cythilya.github.io/2017/05/17/javascript-date-add-days/ 
*/
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};
