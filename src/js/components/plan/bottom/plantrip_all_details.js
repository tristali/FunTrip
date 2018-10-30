import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlanTripDetails from "./plantrip_details";

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
        if (allDetailedObj && allDetailedObj[this.props.day]) {
            const detailedKeyArray = Object.keys(allDetailedObj);
            let thisDayPlanDetailsCount = -1;

            let detailedObj = allDetailedObj[this.props.day];

            for (let i = 0; i < detailedObj.length; i++) {
                const detailedCategoryArray = detailedObj[i].category.split(
                    "_"
                );
                thisDayPlanDetailsCount += 1;
                planDetailsDOM.push(
                    <PlanTripDetails
                        planState={this.props.planState}
                        key={`trip_attractions_details_${i}`}
                        name={detailedObj[i].name}
                        category={`${detailedCategoryArray[0]} ${
                            detailedCategoryArray[1]
                        }`}
                        location={`lat_${detailedObj[i].location.lat}_lng_${
                            detailedObj[i].location.lng
                        }`}
                        informationObj={detailedObj[i].information}
                        editPlanTrip={this.props.editPlanTrip}
                        index={thisDayPlanDetailsCount}
                        day={this.props.day}
                        time={detailedObj[i].information.time_0}
                        handlePlanStateChange={this.props.handlePlanStateChange}
                        handleAppStateChange={this.props.handleAppStateChange}
                    />
                );
            }

            planDetailsDOM.push(
                <div
                    key={detailedKeyArray.length}
                    className={
                        this.props.planState.current_day === this.props.day &&
                        this.props.planState.current_attraction ===
                            thisDayPlanDetailsCount + 1
                            ? "add current"
                            : "add"
                    }
                    onClick={() =>
                        this.props.editPlanTrip({
                            day: this.props.day,
                            index: thisDayPlanDetailsCount + 1,
                            action: "Add"
                        })
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
                    key={`D_${this.props.day}_NO_0`}
                    className={
                        this.props.planState.current_day === this.props.day &&
                        this.props.planState.current_attraction === 0
                            ? "add current"
                            : "add"
                    }
                    onClick={() =>
                        this.props.editPlanTrip({
                            day: this.props.day,
                            index: 0,
                            action: "Add"
                        })
                    }
                    id={`D_${this.props.day}_NO_0`}
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
            this.props.handleAppStateChange({
                loading: false
            });
        }
    }
}
export default PlanTripAllDetails;
