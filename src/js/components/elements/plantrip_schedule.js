import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_schedule.scss";
import PlanTripAllDetails from "./plantrip_all_details";

/* 月份縮寫對照 */
const MONTH_ABBEVIATION = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

class PlanTripSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let PlanTripDayArray = [];
        for (let i = 1; i < Number(this.props.planState.totalDay) + 1; i++) {
            let number;
            if (i < 10) {
                number = "0" + i;
            } else {
                number = i;
            }
            PlanTripDayArray.push(
                <PlanTripDay
                    key={`PlanTripDay_${i}`}
                    editPlanTrip={this.props.editPlanTrip}
                    addPlanTrip={this.props.addPlanTrip}
                    planState={this.props.planState}
                    number={number}
                    day={i}
                    handlePlanStateChange={this.props.handlePlanStateChange}
                    handleStateChange={this.props.handleStateChange}
                />
            );
        }
        return (
            <div className={`schedule ${this.props.state.category}`}>
                {PlanTripDayArray}
            </div>
        );
    }
}

export default PlanTripSchedule;

class PlanTripDay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let thisDate = this.props.planState.all_day_array[this.props.day - 1];
        let year = thisDate.split("/")[0];
        let month = MONTH_ABBEVIATION[Number(thisDate.split("/")[1]) - 1];
        let date = thisDate.split("/")[2];
        return (
            <div id={`D_${this.props.day}`}>
                <h3 className="clearfix">
                    <div>{`Day${this.props.number}`}</div><div>-</div>
                    <div>{`${month} ${date} , ${year}`}</div>
                </h3>
                <PlanTripAllDetails
                    planState={this.props.planState}
                    editPlanTrip={this.props.editPlanTrip}
                    addPlanTrip={this.props.addPlanTrip}
                    day={this.props.day}
                    handleLocations={this.props.handleLocations}
                    handlePlanStateChange={this.props.handlePlanStateChange}
                    handleStateChange={this.props.handleStateChange}
                />
            </div>
        );
    }
}
