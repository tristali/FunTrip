import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlanTripTop from "./plantrip_top";
import PlanTripBottom from "./plantrip_bottom";
import "../../../scss/plantrip.scss";

class PlanTrip extends Component{
    constructor(props){
        super(props);
        this.state = {
            category: "All",
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }
    render(){
        return(
            <div className="plantrip">
                <PlanTripTop 
                    handleCategoryChange={this.handleCategoryChange}
                    state={this.state}
                />
                <PlanTripBottom />
            </div>
        );
    }

    handleCategoryChange(category_name){
        this.setState({category: category_name});
    }
}

export default PlanTrip;