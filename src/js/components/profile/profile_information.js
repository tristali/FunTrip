import React, { Component } from "react";
import ProfileAllTrip from "./profile_all_trip";
import ProfileTripCategory from "./profile_trip_category";
import {handleTripCategory} from "../../library/handle_trip_category";
import "../../../scss/profile_information.scss";

class ProfileInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleTripCategory = this.handleTripCategory.bind(this);
    }
    render() {
        let triping = 0;
        let unfinish = 0;
        let finish = 0;
        let CATEGORY_OBJ = {
            triping: [triping, "旅行中"],
            unfinish: [unfinish, "待出發"],
            finish: [finish, "回憶錄"]
        };

        /* creact 每個旅程 */
        let ProfileTripCategoryArray = [];
        let allTripArray;
        let allPlan = this.props.state.user.plan;
        let allTrip = this.props.state.all_trip;
        let thisTripState = "";

        if (allPlan && allTrip) {
            allTripArray = [];
            allPlan.map((item, index) => {
                let trip = allTrip[item];

                /* triping | unfinish | finish 判斷對照表 */
                const CATEGORY_CONDITION_ARRAY = [
                    new Date() >= new Date(trip.start) &&
                        new Date() <= new Date(trip.end),
                    new Date() < new Date(trip.start),
                    new Date() > new Date(trip.end)
                ];

                if (trip) {
                    let tripCategory = this.handleTripCategory({
                        CATEGORY_OBJ: CATEGORY_OBJ,
                        CATEGORY_CONDITION_ARRAY: CATEGORY_CONDITION_ARRAY,
                        thisTripState: thisTripState
                    });
                    CATEGORY_OBJ = tripCategory.CATEGORY_OBJ;
                    thisTripState = tripCategory.thisTripState;

                    allTripArray.unshift(
                        <ProfileAllTrip
                            state={this.props.state}
                            key={`all_trip_${index}`}
                            id={trip.plan_id}
                            name={trip.name}
                            thisTripState={thisTripState}
                            start={trip.start}
                            end={trip.end}
                            handleAppStateChange={
                                this.props.handleAppStateChange
                            }
                        />
                    );
                }
            });
        }
        for (let i = 0; i < Object.keys(CATEGORY_OBJ).length; i++) {
            ProfileTripCategoryArray.push(
                <ProfileTripCategory
                    key={`profile_trip_category${i}`}
                    index={i}
                    profileState={this.props.profileState}
                    categoryObj={CATEGORY_OBJ}
                    handleChangeTripDisplay={this.props.handleChangeTripDisplay}
                />
            );
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
                                    <li>{ProfileTripCategoryArray}</li>
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

    /* 分類旅程類別 */
    handleTripCategory(props) {
        return handleTripCategory(props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.state.all_trip !== this.props.state.all_trip) {
            if (this.props.state.all_trip === null) {
                this.props.handleAppStateChange({
                    loading: false
                });
            }
        }
    }
}

export default ProfileInformation;
