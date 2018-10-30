import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import Loading from "./loading";
import Header from "./elements/header";
import ProfileInformation from "./profile/profile_information";
import Popup from "./elements/popup";
import AddTrip from "./elements/add_trip";

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
                <AddTrip
                    uid={this.props.state.user.uid}
                    addTrip={this.props.state.add_trip}
                    currentPlan={this.props.state.current_trip}
                    addTripId={this.props.state.add_trip_id}
                    handleAppStateChange={this.props.handleAppStateChange}
                />
                <Popup
                    state={this.props.state}
                    handleAppStateChange={this.props.handleAppStateChange}
                    handleSignout={this.props.handleSignout}
                />
                {this.props.state.loading && <Loading />}
                <Header
                    handleMenuState={this.props.handleMenuState}
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleAppStateChange={this.props.handleAppStateChange}
                    handleChangeTripDisplay={this.handleChangeTripDisplay}
                    handlePopup={this.props.handlePopup}
                />
                <ProfileInformation
                    state={this.props.state}
                    profileState={this.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleAppStateChange={this.props.handleAppStateChange}
                    handleChangeTripDisplay={this.handleChangeTripDisplay}
                    handleAppStateChange={this.props.handleAppStateChange}
                />
            </div>
        );
    }

    componentDidMount() {
        /* 如果無登入則轉跳到 plan 頁面 */
        if (!this.props.state.user.uid) {
            this.props.handleAppStateChange({
                loading: true
            });
            this.setState({ redirect: true });
        }
    }

    componentDidUpdate(prevProps) {
        /* 如果無登入則轉跳到 plan 頁面 */
        if (prevProps.state.user.uid !== this.props.state.user.uid) {
            if (!this.props.state.user.uid) {
                this.props.handleAppStateChange({
                    loading: true
                });
                this.setState({ redirect: true });
            }
        }
    }

    /* 改變目前 trip_display 狀態 */
    handleChangeTripDisplay(this_category) {
        this.setState({ trip_display: this_category });
    }
}

export default Profile;
