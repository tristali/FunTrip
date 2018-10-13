import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./elements/login";
import Header from "./elements/header";
import ProfileInformation from "./elements/profile_information";
import AddPlanTrip from "./elements/add_plantrip";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="profile">
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
                    handleStateChange={this.props.handleStateChange}
                />
                <ProfileInformation
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                />
            </div>
        );
    }
}

export default Profile;
