import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../../scss/plantrip_date.scss";
import PlanTripDate from "./plantrip_date";
import PlanTripSchedule from "./plantrip_schedule";

class PlanTripBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.list = {
            /* 月份縮寫對照 */
            MONTH_ABBEVIATION: [
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
            ]
        };
    }
    render() {
        return (
            <div className="bottom">
                {/* 判斷當前是否有旅程資料 */ this.props.planState
                    .all_day_array && (
                    <PlanTripDate
                        // state={this.props.planTripState}
                        planState={this.props.planState}
                        handlePlanStateChange={this.props.handlePlanStateChange}
                        list = {this.list}
                    />
                )}
                <PlanTripSchedule
                    addPlanTrip={this.props.addPlanTrip}
                    editPlanTrip={this.props.editPlanTrip}
                    planTripState={this.props.planTripState}
                    planState={this.props.planState}
                    handlePlanStateChange={this.props.handlePlanStateChange}
                    handleStateChange={this.props.handleStateChange}
                    list={this.list}
                />
            </div>
        );
    }
}
export default PlanTripBottom;
