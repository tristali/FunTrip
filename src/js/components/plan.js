import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./elements/login";
import Header from "./elements/header";
import PlanTrip from "./elements/plantrip";
import Map from "./elements/map";
import AddPlanTrip from "./elements/add_plantrip";

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log(this.state, "----");
        return (
            <div>
                <Login
                    state={this.props.state}
                    handleLoginOrSignupState={
                        this.props.handleLoginOrSignupState
                    }
                    handleLoginOrSignupEnter={
                        this.props.handleLoginOrSignupEnter
                    }
                    handleLoginAndSignupInputChange={
                        this.props.handleLoginAndSignupInputChange
                    }
                    handleFacebookLogin={this.props.handleFacebookLogin}
                    handleGoogleLogin={this.props.handleGoogleLogin}
                />
                <AddPlanTrip
                    state={this.props.state}
                    handleStateChange={this.props.handleStateChange}
                />
                <Header
                    handleMenuState={this.props.handleMenuState}
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                />
                <PlanTrip state={this.props.state} />
                <Map state={this.props.state} />
            </div>
        );
    }
}

export default Plan;
