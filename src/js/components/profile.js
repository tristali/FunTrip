import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";
import Login from "./elements/login";
import Header from "./elements/header";
import ProfileInformation from "./elements/profile_information";
import AddPlanTrip from "./elements/add_plantrip";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip_display: "all",
            redirect: false
        };
        this.handleChangeTripDisplay = this.handleChangeTripDisplay.bind(this);
    }
    render() {
        console.log(this.state, "aaa");
        if (this.state.redirect) {
            return <Redirect to="/plan" />;
        }
        return (
            <div id="profile">
                <AddPlanTrip
                    state={this.props.state}
                    handleStateChange={this.props.handleStateChange}
                />
                <Header
                    handleMenuState={this.props.handleMenuState}
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleStateChange={this.props.handleStateChange}
                    handleChangeTripDisplay={this.handleChangeTripDisplay}
                />
                <ProfileInformation
                    state={this.props.state}
                    profileState={this.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleStateChange={this.props.handleStateChange}
                    handleChangeTripDisplay={this.handleChangeTripDisplay}
                />
            </div>
        );
    }
    componentDidMount() {
        /* 如果未登入轉址到 plan 頁面 */
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (!firebaseUser) {
                this.setState({ redirect: true });
            }
        });
    }

    /* 改變目前 trip_display 狀態 */
    handleChangeTripDisplay(this_category) {
        this.setState({ trip_display: this_category });
    }
}

export default Profile;
