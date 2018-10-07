import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_date.scss";
import PlanTripDate from "./plantrip_date";
import PlanTripSchedule from "./plantrip_schedule";

const PlanTripBottom = props => {
    return (
        <div className="bottom">
            <PlanTripDate />
            <PlanTripSchedule
                addPlanTrip={props.addPlanTrip}
                editPlanTrip={props.editPlanTrip}
                state={props.state}
            />
        </div>
    );
};

export default PlanTripBottom;
