import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import "../../../scss/profile_information.scss";
import * as firebase from "firebase";

class ProfileInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_trip: ""
        };
    }
    render() {
        /* creact 每個旅程 */
        let allTripArray;
        let allPlan = this.props.state.user.plan;
        let allTrip = this.state.all_trip;
        let finishCount = 0;
        let unfinishCount = 0;
        let triping = 0;
        let thisTripState = "";
        if (allPlan && allTrip) {
            allTripArray = [];
            allPlan.map((item, index) => {
                if (allTrip[item]) {
                    /* 已規劃且完成旅程 */
                    if (new Date() > new Date(allTrip[item].end)) {
                        finishCount += 1;
                        thisTripState = "finish";
                    } else if (new Date() <= new Date(allTrip[item].start)) {
                        /* 已規劃但未出發旅程 */
                        unfinishCount += 1;
                        thisTripState = "unfinish";
                    } else {
                        triping += 1;
                        thisTripState = "triping";
                    }

                    allTripArray.unshift(
                        <AllTrip
                            name={allTrip[item].name}
                            start={allTrip[item].start}
                            end={allTrip[item].end}
                            id={allTrip[item].plan_id}
                            key={`all_trip_${index}`}
                            state={this.props.state}
                            handleStateChange={this.props.handleStateChange}
                            thisTripState={thisTripState}
                        />
                    );
                }
            });
        }
        return (
            <div className="profile_information">
                <div className="bg">
                    <div />
                    <div />
                </div>
                <div className="box">
                    <div className="clearfix top">
                        <div>
                            <div
                                className="add_trip"
                                onClick={() =>
                                    this.props.handleOpenAddPlan({
                                        value: "NEW"
                                    })
                                }
                            >
                                <div />
                            </div>
                        </div>
                        <div>
                            <div className="photo">
                                <div
                                    style={
                                        this.props.state.user.photoURL
                                            ? {
                                                  backgroundImage: `url(${
                                                      this.props.state.user
                                                          .photoURL
                                                  })`
                                              }
                                            : null
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <div className="information">
                                <ul className="clearfix">
                                    <li>
                                        <div>{this.props.state.user.name}</div>
                                        <div>{this.props.state.user.email}</div>
                                    </li>
                                    <li className="clearfix">
                                        <div
                                            onClick={() =>
                                                this.props.handleChangeTripDisplay(
                                                    "triping"
                                                )
                                            }
                                        >
                                            <ul
                                                className={
                                                    this.props.profileState
                                                        .trip_display ===
                                                    "triping"
                                                        ? "current"
                                                        : ""
                                                }
                                            >
                                                <li>{triping}</li>
                                                <li>旅行中</li>
                                            </ul>
                                        </div>
                                        <div
                                            onClick={() =>
                                                this.props.handleChangeTripDisplay(
                                                    "unfinish"
                                                )
                                            }
                                        >
                                            <ul
                                                className={
                                                    this.props.profileState
                                                        .trip_display ===
                                                    "unfinish"
                                                        ? "current"
                                                        : ""
                                                }
                                            >
                                                <li>{unfinishCount}</li>
                                                <li>待出發</li>
                                            </ul>
                                        </div>
                                        <div
                                            onClick={() =>
                                                this.props.handleChangeTripDisplay(
                                                    "finish"
                                                )
                                            }
                                        >
                                            <ul
                                                className={
                                                    this.props.profileState
                                                        .trip_display ===
                                                    "finish"
                                                        ? "current"
                                                        : ""
                                                }
                                            >
                                                <li>{finishCount}</li>
                                                <li>回憶錄</li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <ul
                            className={`clearfix ${
                                this.props.profileState.trip_display
                            }`}
                        >
                            {allTripArray}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        /* 抓取 Database 所有此旅程資料 */
        const thisEnvironment = this;
        const planPath = firebase.database().ref("plans");
        planPath.on("value", snapshot => {
            const plan = snapshot.val();
            thisEnvironment.setState({ all_trip: plan });
        });
    }
}
export default ProfileInformation;

class AllTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            plan_id: ""
        };
        this.handleOpenThisPlan = this.handleOpenThisPlan.bind(this);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={`/plan?id=${this.state.plan_id}`} />;
        }
        return (
            <li id={this.props.id} className={this.props.thisTripState}>
                <div onClick={() => this.handleOpenThisPlan(this.props.id)}>
                    <ul className={this.props.className}>
                        <li>{this.props.name}</li>
                        <li>{`${this.props.start} - ${this.props.end}`}</li>
                        <li>
                            <div />
                        </li>
                    </ul>
                </div>
            </li>
        );
    }
    handleOpenThisPlan(plan_id) {
        this.props.handleStateChange({
            stateName: "add_plantrip",
            value: "hide"
        });
        this.props.handleStateChange({
            stateName: "current_plan",
            value: plan_id
        });
        this.setState({
            redirect: true,
            plan_id: plan_id
        });
        this.props.handleStateChange({
            stateName: "loading",
            value: true
        });
    }
    componentDidMount() {
        this.props.handleStateChange({
            stateName: "loading",
            value: false
        });
    }
}
