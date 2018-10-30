import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlanTripAllDetails from "./plantrip_all_details";

class PlanTripDay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let thisDate = this.props.planState.all_day_array[this.props.day];
        let year = thisDate.split("/")[0];
        let month = this.props.list.MONTH_ABBEVIATION[
            Number(thisDate.split("/")[1]) - 1
        ];
        let date = thisDate.split("/")[2];
        return (
            <div id={`D_${this.props.day}`}>
                <h3 className="clearfix">
                    <div>{`Day${this.props.number}`}</div>
                    <div>-</div>
                    <div>{`${month} ${date} , ${year}`}</div>
                </h3>
                <PlanTripAllDetails
                    planState={this.props.planState}
                    editPlanTrip={this.props.editPlanTrip}
                    day={this.props.day}
                    handleLocations={this.props.handleLocations}
                    handlePlanStateChange={this.props.handlePlanStateChange}
                    handleAppStateChange={this.props.handleAppStateChange}
                />
            </div>
        );
    }
}

export default PlanTripDay;
