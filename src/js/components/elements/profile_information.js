import React, { Component } from "react";
import ReactDOM from "react-dom";
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
        console.log(this.state);
        let allTripArray;
        let allPlan = this.props.state.user.plan;
        let allTrip = this.state.all_trip;
        if (allPlan && allTrip) {
            console.log("aaa");
            allTripArray = [];
            allPlan.map((item, index) => {
                console.log(allTrip[item]);
                allTripArray.push(
                    <AllTrip
                        name={allTrip[item].name}
                        start={allTrip[item].start}
                        end={allTrip[item].end}
                        id={allTrip[item].plan_id}
                        key={`all_trip_${index}`}
                        state={this.props.state}
                    />
                );
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
                                onClick={this.props.handleOpenAddPlan}
                            >
                                <div />
                            </div>
                        </div>
                        <div>
                            <div className="photo">
                                <div
                                    style={{
                                        backgroundImage: `url(${
                                            this.props.state.user.photoURL
                                        })`
                                    }}
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
                                        <div>
                                            <ul>
                                                <li>20</li>
                                                <li>待出發</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>20</li>
                                                <li>回憶錄</li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <ul className="clearfix">{allTripArray}</ul>
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
        this.state = {};
        this.handleOpenThisPlan = this.handleOpenThisPlan.bind(this);
    }
    render() {
        return (
            <li className={this.props.id}>
                <div onClick={() => this.handleOpenThisPlan(this.props.id)}>
                    <ul>
                        <li>{this.props.name}</li>
                        <li>{`${this.props.start}-${this.props.end}`}</li>
                        <li>
                            <div />
                        </li>
                    </ul>
                </div>
            </li>
        );
    }
    handleOpenThisPlan(plan_id) {
        window.location = `plan?id=${plan_id}`;
    }
}
