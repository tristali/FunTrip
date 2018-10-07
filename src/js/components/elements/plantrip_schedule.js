import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_schedule.scss";
import PlanTripAllDetails from "./plantrip_all_details";
import app from "../../lib";
import * as firebase from "firebase";

class PlanTripSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let PlanTripDayArray = [];
        for (let i = 1; i < this.props.state.totalDay + 1; i++) {
            let number;
            if (i < 10) {
                number = "0" + i;
            } else {
                number = i;
            }
            PlanTripDayArray.push(
                <PlanTripDay
                    allDetailedObj={this.state.allDetailedObj}
                    editPlanTrip={this.props.editPlanTrip}
                    addPlanTrip={this.props.addPlanTrip}
                    state={this.props.state}
                    number={number}
                    day={i}
                />
            );
        }
        return <div className="schedule">{PlanTripDayArray}</div>;
    }
}

export default PlanTripSchedule;

class PlanTripDay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id={`D_${this.props.day}`}>
                <h3 className="clearfix">
                    <div>{`Day${this.props.number}`}</div>
                    <div>Sep 19 , 2018</div>
                </h3>
                <PlanTripAllDetails
                    allDetailedObj={this.props.state.allDetailedObj}
                    editPlanTrip={this.props.editPlanTrip}
                    addPlanTrip={this.props.addPlanTrip}
                    day={this.props.day}
                    handleLocations={this.props.handleLocations}
                />
            </div>
        );
    }
}
