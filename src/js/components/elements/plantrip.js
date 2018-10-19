import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlanTripTop from "./plantrip_top";
import PlanTripBottom from "./plantrip_bottom";
import CreactPlanTrip from "./creact_plantrip";
import app from "../../lib";
import "../../../scss/plantrip.scss";
import * as firebase from "firebase";

/* 行程的類別及較小類別 */
const DETAIL_CATEGORY_OBJ = {
    Transport: ["transport", "airplane", "train", "car"],
    Lodge: ["lodge"],
    Food: ["food", "drink"],
    Activity: ["activity", "shopping", "ticket"]
};

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
            /* 當前行程類別 */
            select_category: "Transport",
            /* 當前行程小類別 */
            category_detail: "transport",
            /* 當前地點名稱 */
            lcation_name: ""
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

        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleDetailedCategory = this.handleDetailedCategory.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleCleanCategoryAndLcation = this.handleCleanCategoryAndLcation.bind(
            this
        );
    }
    render() {
        return (
            <div
                className={`plantrip clearfix ${this.props.state.plan_trip} ${
                    this.props.state.plan_trip_width
                }`}
            >
                <div>
                    <PlanTripTop
                        handleCategoryChange={this.handleCategoryChange}
                        state={this.state}
                        handleDelTrip={this.props.handleDelTrip}
                        planState={this.props.planState}
                        handleStateChange={this.props.handleStateChange}
                        handleOpenAddPlan={this.props.handleOpenAddPlan}
                        handlePopup={this.props.handlePopup}
                    />
                    <PlanTripBottom
                        addPlanTrip={this.addPlanTrip}
                        editPlanTrip={this.editPlanTrip}
                        state={this.state}
                        planState={this.props.planState}
                        handlePlanStateChange={this.props.handlePlanStateChange}
                        handleStateChange={this.props.handleStateChange}
                    />
                </div>
                <div className={this.props.planState.creact_plantrip}>
                    <CreactPlanTrip
                        creactPlantrip={this.props.planState.creact_plantrip}
                        handleHideCreactPlanTrip={this.handleHideCreactPlanTrip}
                        state={this.props.state}
                        planTripState={this.state}
                        changeCreactPlantripState={
                            this.changeCreactPlantripState
                        }
                        handleLocationChange={this.handleLocationChange}
                        handleSelectCategory={this.handleSelectCategory}
                        handleDetailedCategory={this.handleDetailedCategory}
                        handleCleanCategoryAndLcation={
                            this.handleCleanCategoryAndLcation
                        }
                        handleStateChange={this.props.handleStateChange}
                        handleDelCreactPlanTrip={
                            this.props.handleDelCreactPlanTrip
                        }
                        handlePopup={this.props.handlePopup}
                    />
                </div>
            </div>
        );
    }

    handleCategoryChange(category_name) {
        this.setState({ category: category_name });
    }

    addPlanTrip(thisPlan) {
        app.cleanCreactPlanTrip();
        this.setState({
            select_category: "Transport",
            category_detail: "transport",
            lcation_name: ""
        });
        this.props.handlePlanStateChange({
            stateName: "creact_plantrip",
            value: "hide"
        });
        const thisPlanDetailedDOM = app.get(
            `.all_plan_detailed>div#${thisPlan}`
        );
        app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });
        thisPlanDetailedDOM.classList.add("current");
        // this.setState({ creact_plantrip: "Add" });
        this.props.handlePlanStateChange({
            stateName: "creact_plantrip",
            value: "Add"
        });
        this.props.handleStateChange({
            stateName: "plan_trip_width",
            value: ""
        });
        this.props.handleStateChange({
            stateName: "map",
            value: "plantrip_creactplantrip_open"
        });
    }

    editPlanTrip(thisPlan) {
        app.cleanCreactPlanTrip();
        this.setState({
            select_category: "Transport",
            category_detail: "transport",
            lcation_name: ""
        });
        this.props.handlePlanStateChange({
            stateName: "creact_plantrip",
            value: "hide"
        });
        const thisPlanDetailedDOM = app.get(`#${thisPlan}`);
        app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });
        thisPlanDetailedDOM.classList.add("current");
        this.props.handlePlanStateChange({
            stateName: "creact_plantrip",
            value: "Edit"
        });
        /* 設定現有資料到編輯 */
        /* 填入經緯度及 location_name */
        const thisPlanClassArray = app.get(`#${thisPlan}`).classList;
        const thisPlanTextDOM = app.get(`#${thisPlan} li.text`);
        app.get("input.search_input").id = thisPlanTextDOM.id;
        /* 大類別 */
        let selectCategory =
            thisPlanClassArray[0][0].toUpperCase() +
            thisPlanClassArray[0].slice(1);
        /* 小類別 */
        let categoryDetail =
            thisPlanClassArray[1] === "current"
                ? thisPlanClassArray[0]
                : thisPlanClassArray[1];
        this.setState({
            lcation_name: thisPlanTextDOM.textContent,
            select_category: selectCategory,
            category_detail: categoryDetail
        });
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
                    ).innerHTML = thisInformationDOM.innerHTML.slice(8);
                }
            }
        }
        this.props.handleStateChange({
            stateName: "plan_trip_width",
            value: ""
        });
        this.props.handleStateChange({
            stateName: "map",
            value: "plantrip_creactplantrip_open"
        });
    }

    /* 隱藏新增 / 修改 (回上一頁)) */
    handleHideCreactPlanTrip() {
        this.props.handlePlanStateChange({
            stateName: "creact_plantrip",
            value: "hide"
        });
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

    /* CreactPlanTrip */
    /* 當行程類別被點擊時改變該類別樣式 */
    handleSelectCategory(category_name) {
        this.setState({ select_category: category_name });
        this.setState({
            category_detail: DETAIL_CATEGORY_OBJ[category_name][0]
        });
    }

    /* 當行程小類別被點擊時改變該小類別樣式 */
    handleDetailedCategory(category_name) {
        this.setState({ category_detail: category_name });
    }

    /* 當使用者改變地點名稱時改變 this.props.planTripState.location_name */
    handleLocationChange(e) {
        this.setState({ lcation_name: e.currentTarget.value });
    }

    /* 改變 this.state.creact_plantrip */
    changeCreactPlantripState(value) {
        this.props.handlePlanStateChange({
            stateName: "creact_plantrip",
            value: value
        });
    }

    /* 清除 修改/新增 location 和類別 */
    handleCleanCategoryAndLcation(props) {
        this.setState({
            select_category: props.select_category,
            category_detail: props.category_detail,
            lcation_name: props.lcation_name
        });
    }
}

export default PlanTrip;
