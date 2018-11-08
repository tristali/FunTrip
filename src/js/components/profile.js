import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Loading from "./loading";
import Header from "./elements/header";
import ProfileInformation from "./profile/profile_information";
import Popup from "./elements/popup";
import EditTrip from "./elements/edit_trip";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 旅行中 | 待出發 | 回憶錄 狀態 */
            trip_display: "all",
            redirect: false
        };
        this.handleChangeTripDisplay = this.handleChangeTripDisplay.bind(this);
        this.handleNoLogin = this.handleNoLogin.bind(this);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/plan" />;
        }
        return (
            <div id="profile">
                <EditTrip
                    uid={this.props.state.user.uid}
                    editTrip={this.props.state.edit_trip}
                    currentPlan={this.props.state.current_trip}
                    editTripId={this.props.state.edit_trip_id}
                    handleAppStateChange={this.props.handleAppStateChange}
                />
                <Popup
                    popup={this.props.state.popup}
                    popupState={this.props.state.popup_state}
                    handleAppStateChange={this.props.handleAppStateChange}
                    handleSignout={this.props.handleSignout}
                />
                {/* {this.props.state.loading && <Loading />} */}
                <Header
                    menu={this.props.state.menu}
                    handleMenuState={this.props.handleMenuState}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleAppStateChange={this.props.handleAppStateChange}
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
        this.handleNoLogin();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.state.user.uid !== this.props.state.user.uid) {
            this.handleNoLogin();
        }
    }

    /* 改變目前 trip_display 狀態 */
    handleChangeTripDisplay(this_category) {
        this.setState({ trip_display: this_category });
    }

    /* 會員無登入轉址到 plan 頁面 */
    handleNoLogin() {
        if (!this.props.state.user.uid) {
            this.props.handleAppStateChange({
                loading: true
            });
            this.setState({ redirect: true });
        }
        if (this.props.state.signup) {
            this.setState({ redirect: false });
        }
    }
}

export default Profile;
