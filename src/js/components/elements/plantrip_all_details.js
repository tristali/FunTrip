import React, { Component } from "react";
import ReactDOM from "react-dom";
import app from "../../lib";

class PlanTripAllDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const state = this.props.planState;
        /* 處理景點資料 */
        const allDetailedObj = state.all_detailed_obj;
        let planDetailsDOM = [];
        /* 如果有景點資料 */
        if (allDetailedObj) {
            const detailedKeyArray = Object.keys(allDetailedObj);
            let thisDayPlanDetailsCount = 0;
            for (let i = 0; i < detailedKeyArray.length; i++) {
                let detailedObj = allDetailedObj[detailedKeyArray[i]];
                if (detailedObj.day == this.props.day) {
                    const detailedCategoryArray = detailedObj.category.split(
                        "_"
                    );
                    thisDayPlanDetailsCount += 1;
                    planDetailsDOM.push(
                        <PlanTripDetails
                            key={`plan_trip_details_${i}`}
                            name={detailedObj.name}
                            category={`${detailedCategoryArray[0]} ${
                                detailedCategoryArray[1]
                            }`}
                            location={`lat_${detailedObj.location.lat}_lng_${
                                detailedObj.location.lng
                            }`}
                            informationObj={detailedObj.information}
                            editPlanTrip={this.props.editPlanTrip}
                            index={thisDayPlanDetailsCount}
                            day={this.props.day}
                            time={detailedObj.information.time_0}
                            itemID={detailedObj.itemID}
                            handlePlanStateChange={
                                this.props.handlePlanStateChange
                            }
                            handleStateChange={this.props.handleStateChange}
                        />
                    );
                }
            }
            planDetailsDOM.push(
                <div
                    key={detailedKeyArray.length}
                    className="add"
                    onClick={() =>
                        this.props.addPlanTrip(
                            `D_${this.props.day}_NO_${thisDayPlanDetailsCount +
                                1}`
                        )
                    }
                    id={`D_${this.props.day}_NO_${thisDayPlanDetailsCount + 1}`}
                >
                    <ul className="clearfix location">
                        <li className="time" />
                        <li className="type_icon">
                            <div />
                        </li>
                        <li className="text">新增景點</li>
                    </ul>
                </div>
            );
        } else {
            planDetailsDOM.push(
                <div
                    key={`D_${this.props.day}_NO_1`}
                    className="add"
                    onClick={() =>
                        this.props.addPlanTrip(`D_${this.props.day}_NO_1`)
                    }
                    id={`D_${this.props.day}_NO_1`}
                >
                    <ul className="clearfix location">
                        <li className="time" />
                        <li className="type_icon">
                            <div />
                        </li>
                        <li className="text">新增景點</li>
                    </ul>
                </div>
            );
        }
        return <div className="all_plan_detailed">{planDetailsDOM}</div>;
    }
    componentDidMount() {
        if (!this.props.planState.all_detailed_obj) {
            this.props.handleStateChange({
                stateName: "loading",
                value: false
            });
        }
    }
}
export default PlanTripAllDetails;

class PlanTripDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleMapDisplay = this.handleMapDisplay.bind(this);
        this.handleRemarksToggle = this.handleRemarksToggle.bind(this);
    }
    render() {
        const informationObj = this.props.informationObj;
        const informationKeyArray = Object.keys(informationObj);
        let PlanInformationDOM = [];
        for (let i = 0; i < informationKeyArray.length; i++) {
            let informationContent = informationObj[informationKeyArray[i]];
            PlanInformationDOM.push(
                <li
                    key={`plan_information_DOM_${i}`}
                    className={informationKeyArray[i]}
                    dangerouslySetInnerHTML={{ __html: informationContent }}
                />
            );
        }
        /* 如果有預計時間的話只顯示預計時間 */
        let checkTime = () => {
            if (this.props.time) {
                return this.props.time.split(">")[1];
            }
        };

        return (
            <div
                className={this.props.category}
                id={`D_${this.props.day}_NO_${this.props.index}`}
                onClick={() =>
                    this.handleMapDisplay(
                        `D_${this.props.day}_NO_${this.props.index}`
                    )
                }
            >
                <ul className="clearfix location" id={this.props.itemID}>
                    <li className="time">{checkTime()}</li>
                    <li className="type_icon">
                        <div />
                    </li>
                    <li className="text" id={this.props.location}>
                        {this.props.name}
                    </li>
                    <li
                        className="edit"
                        onClick={() =>
                            this.props.editPlanTrip(
                                `D_${this.props.day}_NO_${this.props.index}`
                            )
                        }
                    />
                </ul>
                <div className="clearfix remarks">
                    <div onClick={this.handleRemarksToggle}>
                        <ul>{PlanInformationDOM}</ul>
                    </div>
                </div>
            </div>
        );
    }

    /* 改變 map 顯示為目前點擊景點 */
    handleMapDisplay(id) {
        let thisLocationLatLngArray = app.get(`#${id} li.text`).id.split("_");
        let map_canter = {
            lat: Number(thisLocationLatLngArray[1]),
            lng: Number(thisLocationLatLngArray[3])
        };
        this.props.handlePlanStateChange({
            stateName: "map_center",
            value: map_canter
        });
        this.props.handlePlanStateChange({
            stateName: "map_zoom",
            value: 17
        });
    }

    /* 判斷展開或收起景點資訊 */
    handleRemarksToggle(e) {
        // console.log(e.currentTarget);
        if (!e.currentTarget.className) {
            e.currentTarget.className = "expand";
        } else {
            e.currentTarget.className = "";
        }
    }

    componentDidMount() {
        this.props.handleStateChange({
            stateName: "loading",
            value: false
        });
    }
}
