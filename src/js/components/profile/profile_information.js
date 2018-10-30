import React, { Component } from "react";
import ReactDOM from "react-dom";
import ProfileAllTrip from "./profile_all_trip";
import "../../../scss/profile_information.scss";

class ProfileInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        /* creact 每個旅程 */
        let allTripArray;
        let allPlan = this.props.state.user.plan;
        let allTrip = this.props.state.all_plan;
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
                        <ProfileAllTrip
                            name={allTrip[item].name}
                            start={allTrip[item].start}
                            end={allTrip[item].end}
                            id={allTrip[item].plan_id}
                            key={`all_trip_${index}`}
                            // state={this.props.state}
                            handleAppStateChange={
                                this.props.handleAppStateChange
                            }
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
                                    <li>
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
    // componentDidMount() {
    //     if (!this.props.state.user.plan) {
    //         this.props.handleAppStateChange({
    //             stateName: "loading",
    //             value: false
    //         });
    //     }
    // }
}
export default ProfileInformation;
