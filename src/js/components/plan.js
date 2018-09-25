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
                <Login 
                    loginOrSignup={this.props.state.loginOrSignup}
                    user={this.props.state.user}
                    handleLoginOrSignupState={this.props.handleLoginOrSignupState}
                    handleLoginOrSignupEnter={this.props.handleLoginOrSignupEnter}
                    handleLoginAndSignupInputChange={this.props.handleLoginAndSignupInputChange}
                />
                <Header 
                    handleMenuState={this.handleMenuState} 
                    menu={this.state.menu}
                    handleSignout={this.props.handleSignout}
                />
                <PlanTrip />
                <Map />
            </div>
        );
    }
}

export default Plan;