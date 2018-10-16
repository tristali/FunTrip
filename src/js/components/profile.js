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
            redirect: false
        };
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
                <Header
                    handleMenuState={this.props.handleMenuState}
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleStateChange={this.props.handleStateChange}
                />
                <ProfileInformation
                    state={this.props.state}
                    handleOpenAddPlan={this.props.handleOpenAddPlan}
                    handleStateChange={this.props.handleStateChange}
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
}

export default Profile;
