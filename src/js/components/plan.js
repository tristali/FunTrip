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
            menu:"",
        };
        this.handleMenuState = this.handleMenuState.bind(this);
    }
    handleMenuState(){
        if(!this.state.menu){
            this.setState({menu:"open"});
        }else{
            this.setState({menu:""});
        }
    }
    render(){
        return(
            <div>
                <Login />
                <Header 
                    handleMenuState={this.handleMenuState} 
                    menu={this.state.menu}
                />
                <PlanTrip />
                <Map />
            </div>
        );
    }
}

export default Plan;