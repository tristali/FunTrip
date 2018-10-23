import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_date.scss";
import PlanTripDate from "./plantrip_date";
import PlanTripSchedule from "./plantrip_schedule";

const PlanTripBottom = props => {
    return (
        <div className="bottom">
            {/* 判斷當前是否有旅程資料 */ props.planState.all_day_array && (
                <PlanTripDate
                    // state={props.planTripState}
                    planState={props.planState}
                    handlePlanStateChange={props.handlePlanStateChange}
                />
            )}
            <PlanTripSchedule
                addPlanTrip={props.addPlanTrip}
                editPlanTrip={props.editPlanTrip}
                planTripState={props.planTripState}
                planState={props.planState}
                handlePlanStateChange={props.handlePlanStateChange}
                handleStateChange={props.handleStateChange}
            />
        </div>
    );
};

export default PlanTripBottom;
