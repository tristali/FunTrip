import React, { Component } from "react";
import ReactDOM from "react-dom";
import InformationDetailed from "./creact_plantrip_information_detailed";
import app from "../../lib";
import "../../../scss/creact_plantrip.scss";
import { DB } from "../../library/firebase";

class CreactPlanTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.list = {
            /* 根據行程類別不需顯示的 Information 輸入框 */
            HIDE_INFORMATION_OBJ: {
                Transport: ["lodge", "bonus", "wishlist"],
                Lodge: ["bonus", "wishlist", "ticket"],
                Food: ["lodge", "ticket"],
                Activity: ["lodge"]
            }
        };

        this.handleInformationInputStateOnClick = this.handleInformationInputStateOnClick.bind(
            this
        );
        this.handleInformationInputStateOnBlur = this.handleInformationInputStateOnBlur.bind(
            this
        );
        this.handleSetDatebase = this.handleSetDatebase.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    render() {
        /* Create 行程類別 JSX */
        const selectCategoryArray = Object.keys(
            this.props.list.DETAIL_CATEGORY_OBJ
        );

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
        let thisCategoryDetailArray = this.props.list.DETAIL_CATEGORY_OBJ[
            this.props.planTripState.select_category
        ];

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
            thisEnvironment,
            item,
            handleInformationInputStateOnClick,
            handleInformationInputStateOnBlur,
            handleInformationTextInput,
            planState,
            handlePlanStateChange
        ) {
            return thisEnvironment.props.list.INFORMATION_OBJ[item].map(
                (detailedItemName, index) => (
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
                        planState={planState}
                        informationCategory={`${item}_${index}`}
                        handlePlanStateChange={handlePlanStateChange}
                    />
                )
            );
        }
        /* Create Information 輸入框 <ul> Element JSX*/
        let informationDOM = Object.keys(this.props.list.INFORMATION_OBJ).map(
            (item, index) => {
                return (
                    <ul
                        key={`input_information_${index}`}
                        className={informationClass(
                            this,
                            this.props.planTripState.select_category,
                            item
                        )}
                    >
                        {InformationDetailedDOM(
                            this,
                            item,
                            this.handleInformationInputStateOnClick,
                            this.handleInformationInputStateOnBlur,
                            this.handleInformationTextInput,
                            this.props.planState,
                            this.props.handlePlanStateChange
                        )}
                    </ul>
                );
            }
        );

        /* Creact Information 輸入框 <ul> Element className */
        function informationClass(thisEnvironment, currentCategory, item) {
            let thisInformation;
            thisEnvironment.list.HIDE_INFORMATION_OBJ[currentCategory].map(
                (i, index) => {
                    if (item === i) {
                        item === i
                            ? (thisInformation = "hide")
                            : (thisInformation = "");
                    }
                }
            );
            return `${item} ${thisInformation}`;
        }

        return (
            <div className="creact_plantrip">
                <ul className="clearfix">
                    <li onClick={this.props.handleHideCreactPlanTrip}>
                        <div />
                    </li>
                    <li>{this.props.creactPlantrip} a location</li>
                    <li
                        className={this.props.creactPlantrip}
                        onClick={() => this.props.handlePopup("del_plan")}
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
                                            this.props.planState.lcation_name
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
                                    this.props.planState.lcation_name
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
        /* 清除 修改/新增 location 和類別 */
        this.props.handleCleanCategoryAndLcation({
            select_category: "Transport",
            category_detail: "transport"
        });

        this.props.handlePlanStateChange({
            lcation_name: "",
            current_information: {},
            current_map_center: ""
        });
    }

    /* Datebase 資料更新 */
    handleSetDatebase() {
        const currentPlanID = this.props.state.current_plan;
        if (this.props.planState.lcation_name) {
            /* name */
            const inputDOM = app.get(".search_input");

            /* category */
            const selectCategoryArray = app
                .get(".select_category>ul:nth-child(2)>li.current")
                .classList.value.split(" ");
            const selectCategory = `${selectCategoryArray[0]}_${
                selectCategoryArray[1]
            }`;

            /* day and number */
            const thisDayNumberArray = app
                .get(".all_plan_detailed > div.current")
                .id.split("_");

            /* information */
            const informationObj = {};
            setInformation({
                Obj: informationObj,
                OverviewObj: this.props.list.INFORMATION_OBJ
            });

            /* 把資料推進 Database */
            let detailedPath = `plans/${currentPlanID}/detailed`;
            let path = `${detailedPath}/${thisDayNumberArray[1]}/${
                thisDayNumberArray[3]
            }`;
            let data = {
                name: inputDOM.value,
                category: selectCategory,
                location: this.props.planState.current_map_center,
                information: informationObj
            };
            DB.set(path, data);

            /* 修改/新增行程資料清空 */

            this.props.handlePlanStateChange({
                current_information: "",
                current_day: "",
                current_attraction: "",
                lcation_name: "",
                creact_plantrip: "hide"
            });

            /* 清除 修改/新增 location 和類別 */
            this.props.handleCleanCategoryAndLcation({
                select_category: "Transport",
                category_detail: "transport"
            });

            this.props.handleAppStateChange({
                map: "plantrip_open",
                plan_trip_width: "hide_creact_plantrip"
            });
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
                if (`${OverviewObjKey[j]}_${i}` === "general_3") {
                    props.Obj[
                        `${OverviewObjKey[j]}_${i}`
                    ] = `${thisItemName}<br /><a href="${thisItemInput}" target="_blank">${thisItemInput}</a>`;
                } else if (`${OverviewObjKey[j]}_${i}` === "general_1") {
                    props.Obj[
                        `${OverviewObjKey[j]}_${i}`
                    ] = `${thisItemName}<br /><a href="tel:${thisItemInput}">${thisItemInput}</a>`;
                } else {
                    props.Obj[
                        `${OverviewObjKey[j]}_${i}`
                    ] = `${thisItemName}<br />${thisItemInput}`;
                }
            }
        }
    }
}
