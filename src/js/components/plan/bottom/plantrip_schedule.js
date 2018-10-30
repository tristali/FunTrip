import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../../scss/plantrip_schedule.scss";
import PlanTripDay from "./plantrip_day";

class PlanTripSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let PlanTripDayArray = [];
        for (let i = 0; i < Number(this.props.planState.totalDay); i++) {
            let number;
            if (i < 9) {
                number = "0" + (i + 1);
            } else {
                number = i;
            }
            PlanTripDayArray.push(
                <PlanTripDay
                    key={`PlanTripDay_${i}`}
                    editPlanTrip={this.props.editPlanTrip}
                    planState={this.props.planState}
                    number={number}
                    day={i}
                    handlePlanStateChange={this.props.handlePlanStateChange}
                    handleAppStateChange={this.props.handleAppStateChange}
                    list={this.props.list}
                />
            );
        }
        return (
            <div className={`schedule ${this.props.planTripState.category}`}>
                {PlanTripDayArray}
            </div>
        );
    }
}

export default PlanTripSchedule;
