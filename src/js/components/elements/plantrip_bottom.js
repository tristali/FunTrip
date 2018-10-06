import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_date.scss";
import PlanTripDate from "./plantrip_date";
import PlanTripSchedule from "./plantrip_schedule";

const PlanTripBottom = ({ AddPlanTrip, EditPlanTrip }) => {
    return (
        <div className="bottom">
            <PlanTripDate />
            <PlanTripSchedule
                AddPlanTrip={AddPlanTrip}
                EditPlanTrip={EditPlanTrip}
            />
        </div>
    );
};

export default PlanTripBottom;
