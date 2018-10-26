import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";
import Loading from "./loading";
import Header from "./elements/header";
import ProfileInformation from "./profile/profile_information";
import Popup from "./elements/popup";
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
        if (this.state.redirect) {
            return <Redirect to="/plan" />;
        }
        return (
            <div id="profile">
                <AddPlanTrip
                    state={this.props.state}
                    handleStateChange={this.props.handleStateChange}
                />
                <Popup
                    state={this.props.state}
                    handleStateChange={this.props.handleStateChange}
                    handleSignout={this.props.handleSignout}
                />
                {this.props.state.loading && <Loading />}
                <Header
                    handleMenuState={this.props.handleMenuState}
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleStateChange={this.props.handleStateChange}
                    handleChangeTripDisplay={this.handleChangeTripDisplay}
                    handlePopup={this.props.handlePopup}
                />
                <ProfileInformation
                    state={this.props.state}
                    profileState={this.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleStateChange={this.props.handleStateChange}
                    handleChangeTripDisplay={this.handleChangeTripDisplay}
                    handleStateChange={this.props.handleStateChange}
                />
            </div>
        );
    }
    componentDidMount() {
        /* 如果未登入轉址到 plan 頁面 */
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (!firebaseUser) {
                this.props.handleStateChange({
                    stateName: "loading",
                    value: true
                });
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
