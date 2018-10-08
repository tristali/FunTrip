import React, { Component } from "react";
import ReactDOM from "react-dom";
import InformationDetailed from "./creact_plantrip_information_detailed";
import app from "../../lib";
import "../../../scss/creact_plantrip.scss";
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

/* 根據行程類別不需顯示的 Information 輸入框 */
const HIDE_INFORMATION_OBJ = {
    Transport: ["lodge", "bonus", "wishlist"],
    Lodge: ["bonus", "wishlist", "ticket"],
    Food: ["lodge", "ticket"],
    Activity: ["lodge"]
};

class CreactPlanTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleInformationInputStateOnClick = this.handleInformationInputStateOnClick.bind(
            this
        );
        this.handleInformationInputStateOnBlur = this.handleInformationInputStateOnBlur.bind(
            this
        );
        this.handleSetDatebase = this.handleSetDatebase.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleDelCreactPlanTrip = this.handleDelCreactPlanTrip.bind(this);
    }

    render() {
        /* Create 行程類別 JSX */
        const selectCategoryArray = Object.keys(DETAIL_CATEGORY_OBJ);

        let selectCategoryArrayDOM = selectCategoryArray.map((item, index) => (
            <li
                key={`select_category_${index}`}
                onClick={() => this.props.handleSelectCategory(item)}
                className={
                    this.props.planTripState.select_category === item
                        ? "current"
                        : null
                }
            >
                {item}
            </li>
        ));

        /* Create 行程小類別 JSX */
        let thisCategoryDetailArray =
            DETAIL_CATEGORY_OBJ[this.props.planTripState.select_category];

        let selectCategory = this.props.planTripState.select_category.toLowerCase();

        let detailedCategory = this.props.planTripState.category_detail;

        let thisDetailedCategoryDOM = thisCategoryDetailArray.map(
            (item, index) => (
                <li
                    key={`category_detail_${index}`}
                    onClick={() => this.props.handleDetailedCategory(item)}
                    className={thisDetailedCategoryClass(
                        detailedCategory,
                        selectCategory,
                        item
                    )}
                >
                    <div />
                </li>
            )
        );

        /* 行程小類別 className */
        function thisDetailedCategoryClass(currentCategory, category, item) {
            let current;
            currentCategory === item ? (current = "current") : (current = "");
            return `${category} ${item} ${current}`;
        }

        /* Create Information 輸入框 <li> Element JSX*/
        function InformationDetailedDOM(
            item,
            handleInformationInputStateOnClick,
            handleInformationInputStateOnBlur
        ) {
            return INFORMATION_OBJ[item].map((detailedItemName, index) => (
                <InformationDetailed
                    detailedItemName={detailedItemName}
                    key={index}
                    index={index}
                    handleInformationInputStateOnClick={
                        handleInformationInputStateOnClick
                    }
                    handleInformationInputStateOnBlur={
                        handleInformationInputStateOnBlur
                    }
                    item={item}
                />
            ));
        }

        /* Create Information 輸入框 <ul> Element JSX*/
        let informationDOM = Object.keys(INFORMATION_OBJ).map((item, index) => (
            <ul
                key={`input_information_${index}`}
                className={informationClass(
                    this.props.planTripState.select_category,
                    item
                )}
            >
                {InformationDetailedDOM(
                    item,
                    this.handleInformationInputStateOnClick,
                    this.handleInformationInputStateOnBlur,
                    this.handleInformationTextInput
                )}
            </ul>
        ));

        /* Creact Information 輸入框 <ul> Element className */
        function informationClass(currentCategory, item) {
            let thisInformation;
            HIDE_INFORMATION_OBJ[currentCategory].map((i, index) => {
                if (item === i) {
                    item === i
                        ? (thisInformation = "hide")
                        : (thisInformation = "");
                }
            });
            return `${item} ${thisInformation}`;
        }

        return (
            // 一般不需調整新增行程時 <div> 需增加 hide
            <div className="creact_plantrip">
                <ul className="clearfix">
                    <li onClick={this.props.handleHideCreactPlanTrip}>
                        <div />
                    </li>
                    <li>{this.props.creactPlantrip} a node</li>
                    <li
                        className={this.props.creactPlantrip}
                        onClick={this.handleDelCreactPlanTrip}
                    >
                        <div>
                            <div>del</div>
                        </div>
                    </li>
                </ul>
                <div>
                    <div className="select_category">
                        <ul className="clearfix">{selectCategoryArrayDOM}</ul>
                        <ul>{thisDetailedCategoryDOM}</ul>
                    </div>
                    <div className="input">
                        <ul>
                            <li className="location clearfix">
                                <div />
                                <div>
                                    <input
                                        className="search_input"
                                        type="text"
                                        value={
                                            this.props.planTripState
                                                .lcation_name
                                        }
                                        placeholder="請在此輸入地點名稱"
                                        onChange={
                                            this.props.handleLocationChange
                                        }
                                    />
                                </div>
                            </li>
                        </ul>
                        <div className="information">{informationDOM}</div>
                    </div>
                    <div className="button">
                        <ul className="clearfix">
                            <li>
                                <div onClick={this.handleReset}>Reset</div>
                            </li>
                            <li
                                className={
                                    this.props.planTripState.lcation_name
                                        ? "ok"
                                        : ""
                                }
                                onClick={this.handleSetDatebase}
                            >
                                <div>{this.props.creactPlantrip}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    /* 當 Information 輸入框被點擊時改變該輸入框樣式 */
    handleInformationInputStateOnClick(item) {
        splitItemGetCurrentElementLi(item).classList.add("current");
    }

    /* 當使用者不在關注當前的 Information 輸入框時
       判斷使用者是否已經有輸入資訊 */
    handleInformationInputStateOnBlur(item) {
        if (!splitItemGetCurrentElementTextarea(item).innerHTML.trim()) {
            splitItemGetCurrentElementLi(item).classList.remove("current");
        }
    }

    /* 重設 新增 / 編輯 */
    handleReset() {
        /* 修改/新增行程資料清空 */
        app.cleanCreactPlanTrip();
        /* 清除 修改/新增 location 和類別 */
        this.props.handleCleanCategoryAndLcation({
            select_category: "Transport",
            category_detail: "transport",
            lcation_name: ""
        });
        /* 改變上層 creact_plantrip state */
        this.props.changeCreactPlantripState("hide");
    }

    /* 刪除 */
    handleDelCreactPlanTrip() {
        const currentPlanID = this.props.state.current_plan;
        /* 把資料推進 Database */
        let detailedPath = `plans/${currentPlanID}/detailed`;
        /* 判斷此改變行程是否已經有id */
        let detailedKey;
        const currentPlanDOM = app.get("div.all_plan_detailed>div.current>ul")
            .id;
        if (currentPlanDOM) {
            detailedKey = currentPlanDOM;
            alert("此景點已刪除");
        } else {
            alert("無此景點可以刪除");
        }
        firebase
            .database()
            .ref(`${detailedPath}/${detailedKey}`)
            .remove();
        /* 修改/新增行程資料清空 */
        app.cleanCreactPlanTrip();
        /* 清除 修改/新增 location 和類別 */
        this.props.handleCleanCategoryAndLcation({
            select_category: "Transport",
            category_detail: "transport",
            lcation_name: ""
        });
        /* 改變上層 creact_plantrip state */
        this.props.changeCreactPlantripState("hide");
    }

    /* Datebase 資料更新 */
    handleSetDatebase() {
        const currentPlanID = this.props.state.current_plan;
        if (this.props.planTripState.lcation_name) {
            /* name */
            const inputDOM = app.get(".search_input");

            /* category */
            const selectCategoryArray = app
                .get(".select_category>ul:nth-child(2)>li.current")
                .classList.value.split(" ");
            const selectCategory = `${selectCategoryArray[0]}_${
                selectCategoryArray[1]
            }`;

            /* location */
            const locationObj = {
                lat: Number(inputDOM.id.split("_")[1]),
                lng: Number(inputDOM.id.split("_")[3])
            };

            /* day and number */
            const thisDayNumberArray = app
                .get(".all_plan_detailed > div.current")
                .id.split("_");

            /* information */
            const informationObj = {};
            setInformation({
                Obj: informationObj,
                OverviewObj: INFORMATION_OBJ
            });

            alert("資料更新中");

            /* 把資料推進 Database */
            let detailedPath = `plans/${currentPlanID}/detailed`;
            /* 判斷此改變行程是否已經有id */
            let detailedKey;
            const currentPlanDOM = app.get(
                "div.all_plan_detailed>div.current>ul"
            ).id;
            if (currentPlanDOM) {
                detailedKey = currentPlanDOM;
            } else {
                detailedKey = firebase
                    .database()
                    .ref(detailedPath)
                    .push().key;
            }
            firebase
                .database()
                .ref(`${detailedPath}/${detailedKey}`)
                .set({
                    name: inputDOM.value,
                    day: thisDayNumberArray[1],
                    number: thisDayNumberArray[3],
                    category: selectCategory,
                    itemID: detailedKey,
                    location: locationObj,
                    information: informationObj
                });

            /* 修改/新增行程資料清空 */
            app.cleanCreactPlanTrip();
            /* 清除 修改/新增 location 和類別 */
            this.props.handleCleanCategoryAndLcation({
                select_category: "Transport",
                category_detail: "transport",
                lcation_name: ""
            });
            /* 改變上層 creact_plantrip state */
            this.props.changeCreactPlantripState("hide");
        } else {
            alert("麻煩請協助填入地點名稱，謝謝");
        }
    }
}

export default CreactPlanTrip;

/* 判斷當前的 Information 輸入框在哪一個 <li> Element 下面 */
function splitItemGetCurrentElementLi(item) {
    return app.get(
        `.information>ul.${item.split("-")[0]}>li:nth-child(${Number(
            item.split("-")[1]
        ) + 1}`
    );
}

/* 判斷當前的 Information 輸入框 Element */
function splitItemGetCurrentElementTextarea(item) {
    return app.get(
        `.information>ul.${item.split("-")[0]}>li:nth-child(${Number(
            item.split("-")[1]
        ) + 1}) div.textarea`
    );
}

/* 將 Information 資料存入 Obj */
function setInformation(props) {
    const OverviewObjKey = Object.keys(props.OverviewObj);

    for (let j = 0; j < OverviewObjKey.length; j++) {
        for (let i = 0; i < props.OverviewObj[OverviewObjKey[j]].length; i++) {
            const thisItemName = props.OverviewObj[OverviewObjKey[j]][i];
            const thisItemInput = app.get(
                `.${OverviewObjKey[j]}>li:nth-child(${i + 1}) div.textarea`
            ).innerHTML;
            if (thisItemInput) {
                props.Obj[
                    `${OverviewObjKey[j]}_${i}`
                ] = `${thisItemName}<br />${thisItemInput}`;
            }
        }
    }
}
