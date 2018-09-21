import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./elements/login";
import Header from "./elements/header";
import PlanTrip from "./elements/plantrip";
import Map from "./elements/map";

class Plan extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <div>
                <Login />
                <Header />
                <PlanTrip />
                <Map />
            </div>
        );
    }
}

export default Plan;