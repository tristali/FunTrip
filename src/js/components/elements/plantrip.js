import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlanTripTop from "./plantrip_top";
import PlanTripBottom from "./plantrip_bottom";
import "../../../scss/plantrip.scss";

class PlanTrip extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <div className="plantrip">
                <PlanTripTop />
                <PlanTripBottom />
            </div>
        );
    }
}

export default PlanTrip;