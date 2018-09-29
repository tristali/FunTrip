import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlanTripTop from "./plantrip_top";
import PlanTripBottom from "./plantrip_bottom";
import CreactPlanTrip from "./creact_plantrip";
import "../../../scss/plantrip.scss";

class PlanTrip extends Component{
    constructor(props){
        super(props);
        this.state = {
            category: "All",
            // creact_plantrip: "hide",
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }
    render(){
        return(
            <div className="plantrip clearfix">
                <div>
                    <PlanTripTop 
                        handleCategoryChange={this.handleCategoryChange}
                        state={this.state}
                    />
                    <PlanTripBottom />
                </div>
                <div>
                    <CreactPlanTrip />
                </div>
            </div>
        );
    }

    handleCategoryChange(category_name){
        this.setState({category: category_name});
    }
}

export default PlanTrip;