import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlanTripTop from "./plantrip_top";
import PlanTripBottom from "./plantrip_bottom";
import CreactPlanTrip from "./creact_plantrip";
import app from "../../lib";
import "../../../scss/plantrip.scss";
import * as firebase from "firebase";

/* Information 輸入框 */
const INFORMATION_OBJ = {
    time: ["預計時間"],
    lodge: ["住宿資訊", "入住時間", "退房時間"],
    bonus: ["優惠資訊"],
    wishlist: ["願望清單"],
    ticket: ["票務資訊"],
    general: ["服務地址", "服務電話", "營業時間", "官方網站"],
    remarks: ["附註事項"]
};

class PlanTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 檢視當前行程類別 */
            category: "All",
            /* 當前為關閉 "hide" 新增 "Add" 或修改 "Edit" 行程狀態 */
            creact_plantrip: "hide",
            /* 當前行程各景點資料 */
            allDetailedObj: "",
            /* 當前行程總天數 */
            totalDay: "",
            /* 當前行程名稱 */
            name: "",
            /* 當前行程起始日期 */
            start: "",
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.addPlanTrip = this.addPlanTrip.bind(this);
        this.editPlanTrip = this.editPlanTrip.bind(this);
        this.handleHideCreactPlanTrip = this.handleHideCreactPlanTrip.bind(
            this
        );
        this.changeCreactPlantripState = this.changeCreactPlantripState.bind(
            this
        );
    }
    render() {
        return (
            <div className="plantrip clearfix">
                <div>
                    <PlanTripTop
                        handleCategoryChange={this.handleCategoryChange}
                        state={this.state}
                    />
                    <PlanTripBottom
                        addPlanTrip={this.addPlanTrip}
                        editPlanTrip={this.editPlanTrip}
                        state={this.state}
                    />
                </div>
                <div className={this.state.creact_plantrip}>
                    <CreactPlanTrip
                        creactPlantrip={this.state.creact_plantrip}
                        handleHideCreactPlanTrip={this.handleHideCreactPlanTrip}
                        state={this.props.state}
                        planTripState={this.state}
                        changeCreactPlantripState={
                            this.changeCreactPlantripState
                        }
                    />
                </div>
            </div>
        );
    }

    handleCategoryChange(category_name) {
        this.setState({ category: category_name });
    }

    addPlanTrip(thisPlan) {
        const mapDOM = app.get(".map");
        const thisPlanDetailedDOM = app.get(
            `.all_plan_detailed>div#${thisPlan}`
        );
        app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });
        thisPlanDetailedDOM.classList.add("current");
        this.setState({ creact_plantrip: "Add" });
        mapDOM.classList.add("creact_plantrip");
        console.log(thisPlanDetailedDOM);
    }

    editPlanTrip(thisPlan) {
        const mapDOM = app.get(".map");
        const thisPlanDetailedDOM = app.get(`#${thisPlan}`);
        app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });
        thisPlanDetailedDOM.classList.add("current");
        this.setState({ creact_plantrip: "Edit" });
        mapDOM.classList.add("creact_plantrip");
        /* 設定現有資料到編輯 */
        /* 填入經緯度 */
        app.get("input.search_input").id = app.get(`#${thisPlan} li.text`).id;

        /* information 各項目 */
        let OverviewObjKey = Object.keys(INFORMATION_OBJ);
        for (let i = 0; i < OverviewObjKey.length; i++) {
            let OverviewCategoryArray = INFORMATION_OBJ[OverviewObjKey[i]];
            for (let j = 0; j < OverviewCategoryArray.length; j++) {
                let thisInformationDOM = app.get(
                    `#${thisPlan} li.${OverviewObjKey[i]}_${j}`
                );
                if (thisInformationDOM) {
                    /* 將有資料的 li 增加 current class */
                    app.get(
                        `ul.${OverviewObjKey[i]} li:nth-child(${j + 1})`
                    ).classList.add("current");
                    /* 將有資料的 information 項目填入 edit 的 information 中 */
                    app.get(
                        `ul.${OverviewObjKey[i]} li:nth-child(${j +
                            1}) div.textarea`
                    ).innerHTML = thisInformationDOM.innerHTML.split(
                        "&lt;br /&gt;"
                    )[1];
                }
            }
        }
    }

    handleHideCreactPlanTrip() {
        const mapDOM = app.get(".map");
        this.setState({ creact_plantrip: "hide" });
        mapDOM.classList.remove("creact_plantrip");
        app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });
    }

    /* 改變 this.state.creact_plantrip */
    changeCreactPlantripState(value) {
        this.setState({ creact_plantrip: value });
    }

    componentDidMount() {
        /* 抓取 Database 所有此旅程資料 */
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const planPath = firebase
                    .database()
                    .ref("plans/-LNyxY4e2Gs0k6Q-IDOx");
                planPath.on("value", snapshot => {
                    const plan = snapshot.val();
                    this.setState({
                        allDetailedObj: plan.detailed,
                        totalDay: plan.day,
                        name: plan.name,
                        start: plan.start
                    });
                });
            }
        });
    }
}

export default PlanTrip;
