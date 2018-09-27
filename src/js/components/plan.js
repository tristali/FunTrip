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
                <Login 
                    state={this.props.state}
                    handleLoginOrSignupState={this.props.handleLoginOrSignupState}
                    handleLoginOrSignupEnter={this.props.handleLoginOrSignupEnter}
                    handleLoginAndSignupInputChange={this.props.handleLoginAndSignupInputChange}
                    handleFacebookLogin={this.props.handleFacebookLogin}
                    handleGoogleLogin={this.props.handleGoogleLogin}    
                />
                <Header 
                    handleMenuState={this.props.handleMenuState} 
                    menu={this.props.state.menu}
                    handleSignout={this.props.handleSignout}
                />
                <PlanTrip />
                <Map 
                    state={this.props.state}
                />
            </div>
        );
    }
}

export default Plan;