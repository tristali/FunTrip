import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./elements/login";
import PlanTrip from "./elements/plantrip";

class Plan extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <div className="plan">
                <Login />
                <PlanTrip />
            </div>
        );
    }
}

export default Plan;