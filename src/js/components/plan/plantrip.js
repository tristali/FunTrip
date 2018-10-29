import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlanTripTop from "./top/plantrip_top";
import PlanTripBottom from "./bottom/plantrip_bottom";
import CreactPlanTrip from "./creact_plantrip";
import app from "../../lib";
import "../../../scss/plantrip.scss";

class PlanTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 檢視當前行程類別 */
            category: "All",
            /* 當前行程類別 */
            select_category: "Transport",
            /* 當前行程小類別 */
            category_detail: "transport"
        };
        this.list = {
            /* 行程的類別及較小類別 */
            DETAIL_CATEGORY_OBJ: {
                Transport: ["transport", "airplane", "train", "car"],
                Lodge: ["lodge"],
                Food: ["food", "drink"],
                Activity: ["activity", "shopping", "ticket"]
            },
            /* Information 輸入框 */
            INFORMATION_OBJ: {
                time: ["預計時間"],
                lodge: ["住宿資訊", "最早入住", "最晚退房"],
                bonus: ["優惠資訊"],
                wishlist: ["願望清單"],
                ticket: ["票務資訊"],
                general: ["所在地址", "服務電話", "營業時間", "官方網站"],
                remarks: ["附註事項"]
            }
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
                        state={this.props.state}
                        handleCategoryChange={this.handleCategoryChange}
                        planTripState={this.state}
                        handleDelTrip={this.props.handleDelTrip}
                        planState={this.props.planState}
                        handleStateChange={this.props.handleStateChange}
                        handleOpenAddPlan={this.props.handleOpenAddPlan}
                        handlePopup={this.props.handlePopup}
                    />
                    <PlanTripBottom
                        addPlanTrip={this.addPlanTrip}
                        editPlanTrip={this.editPlanTrip}
                        planTripState={this.state}
                        planState={this.props.planState}
                        handlePlanStateChange={this.props.handlePlanStateChange}
                        handleStateChange={this.props.handleStateChange}
                    />
                </div>
                <div className={this.props.planState.creact_plantrip}>
                    <CreactPlanTrip
                        planState={this.props.planState}
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
                        handlePlanStateChange={this.props.handlePlanStateChange}
                        list={this.list}
                    />
                </div>
            </div>
        );
    }

    handleCategoryChange(category_name) {
        this.setState({ category: category_name });
    }

    /* 新增景點 顯示為目前點擊景點資料 
    {
        day : 天數 index,
        index : 景點 index
    }
    */
    addPlanTrip(props) {
        this.props.handlePlanStateChange({
            current_information: "",
            current_day: props.day,
            current_attraction: props.index
        });

        this.setState({
            select_category: "Transport",
            category_detail: "transport"
        });

        this.props.handlePlanStateChange({
            lcation_name: "",
            creact_plantrip: "Add"
        });

        this.props.handleStateChange({
            plan_trip_width: "",
            map: "plantrip_creactplantrip_open"
        });
    }

    /* 改變 修改景點 顯示為目前點擊景點資料 
    {
        day : 天數 index,
        index : 景點 index
    }
    */
    editPlanTrip(props) {
        let currentAttractionDetail = this.props.planState.all_detailed_obj[
            props.day
        ][props.index];

        this.props.handlePlanStateChange({
            current_informatione: "",
            current_day: props.day,
            current_attraction: props.index,
            lcation_name: "",
            creact_plantrip: "Edit"
        });

        this.setState({
            select_category: "Transport",
            category_detail: "transport"
        });

        //no// this.props.handlePlanStateChange({
        //     stateName: "creact_plantrip",
        //     value: "hide"
        // });

        /* 設定現有資料到編輯 */
        /* 填入經緯度及 location_name */

        let currentAttractionCategory = currentAttractionDetail.category;

        /* 大類別 */
        let selectCategory =
            currentAttractionCategory.split("_")[0][0].toUpperCase() +
            currentAttractionCategory.split("_")[0].slice(1);

        /* 小類別 */
        let categoryDetail = currentAttractionCategory.split("_")[1];

        this.setState({
            select_category: selectCategory,
            category_detail: categoryDetail
        });

        this.props.handlePlanStateChange({
            lcation_name: currentAttractionDetail.name,
            current_map_center: currentAttractionDetail.location
        });

        /* information 各項目 */
        let OverviewObjKey = Object.keys(this.list.INFORMATION_OBJ);
        for (let i = 0; i < OverviewObjKey.length; i++) {
            let OverviewCategoryArray = this.list.INFORMATION_OBJ[
                OverviewObjKey[i]
            ];
            for (let j = 0; j < OverviewCategoryArray.length; j++) {
                let currentAttractionInformation =
                    currentAttractionDetail.information;

                this.props.handlePlanStateChange({
                    current_information: currentAttractionInformation
                });
            }
        }

        this.props.handleStateChange({
            plan_trip_width: "",
            map: "plantrip_creactplantrip_open"
        });
    }

    /* 隱藏新增 / 修改 (回上一頁)) */
    handleHideCreactPlanTrip() {

        this.props.handlePlanStateChange({
            creact_plantrip: "hide",
            current_day: "",
            current_attraction: ""
        });

        this.props.handleStateChange({
            map: "plantrip_open",
            plan_trip_width: "hide_creact_plantrip"
        });
    }

    /* CreactPlanTrip */
    /* 當行程類別被點擊時改變該類別樣式 */
    handleSelectCategory(category_name) {
        this.setState({ select_category: category_name });
        this.setState({
            category_detail: this.list.DETAIL_CATEGORY_OBJ[category_name][0]
        });
    }

    /* 當行程小類別被點擊時改變該小類別樣式 */
    handleDetailedCategory(category_name) {
        this.setState({ category_detail: category_name });
    }

    /* 當使用者改變地點名稱時改變 this.props.planTripState.location_name */
    handleLocationChange(e) {

        this.props.handlePlanStateChange({
            lcation_name: e.currentTarget.value
        });
    }

    /* 改變 this.state.creact_plantrip */
    changeCreactPlantripState(value) {

        this.props.handlePlanStateChange({
            creact_plantrip: value
        });
    }

    /* 清除 修改/新增 location 和類別 */
    handleCleanCategoryAndLcation(props) {
        this.setState({
            select_category: props.select_category,
            category_detail: props.category_detail
        });
 
        this.props.handlePlanStateChange({
            lcation_name: props.lcation_name
        });
    }
}

export default PlanTrip;
