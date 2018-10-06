import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_schedule.scss";
import * as firebase from "firebase";

class PlanTripSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDetailedObj: ""
        };
    }
    componentDidMount() {
        /* 抓取 Database 所有此旅程資料 */
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const detailedPath = firebase
                    .database()
                    .ref("plans/-LNyxY4e2Gs0k6Q-IDOx/detailed");
                detailedPath.on("value", snapshot => {
                    this.setState({ allDetailedObj: snapshot.val() });
                });
            }
        });
    }
    render() {
        console.log(this.state);

        /* 處理旅程資料 */
        const allDetailedObj = this.state.allDetailedObj;
        if (allDetailedObj) {
            const detailedKeyArray = Object.keys(allDetailedObj);
            for (let i = 0; i < detailedKeyArray.length; i++) {
                let detailedObj = allDetailedObj[detailedKeyArray[i]];
                console.log(detailedObj);
                console.log(detailedObj.name, "名字");
                console.log(detailedObj.category, "類別");
                console.log(detailedObj.location, "經緯度");
                let informationObj = detailedObj.information;
                let informationKeyArray = Object.keys(informationObj);
                for (let i = 0; i < informationKeyArray.length; i++) {
                    let informationContent =
                        informationObj[informationKeyArray[i]];
                    console.log(informationKeyArray[i], "class");
                    console.log(informationContent, "內容");
                }
            }
        }

        return (
            <div className="schedule">
                <div>
                    <h3 className="clearfix">
                        <div>Day01</div>
                        <div>Sep 19 , 2018</div>
                    </h3>
                    <div className="all_plan_detailed">
                        {/*  點選該編輯 <div> 新增 current */}
                        <div
                            className="activity ticket"
                            onClick={() => this.props.EditPlanTrip(1)}
                        >
                            <ul className="clearfix location">
                                <li className="time" />
                                <li className="type_icon">
                                    <div />
                                </li>
                                <li className="text">桃園國際機場 (T2)</li>
                                <li className="edit" />
                            </ul>
                            <div className="clearfix remarks">
                                <div>
                                    <ul>
                                        <li>中華航空 C122</li>
                                        <li>297-2585996136</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div
                            className="add"
                            onClick={() => this.props.AddPlanTrip(2)}
                        >
                            <ul className="clearfix location">
                                <li className="time" />
                                <li className="type_icon">
                                    <div />
                                </li>
                                <li className="text">新增景點</li>
                            </ul>
                        </div>
                        {/*  */}
                    </div>
                </div>
            </div>
        );
    }
}

export default PlanTripSchedule;

const PlanDetailed = () => {
    return (
        <div
            className="activity ticket"
            onClick={() => this.props.EditPlanTrip(1)}
        >
            <ul className="clearfix location">
                <li className="time" />
                <li className="type_icon">
                    <div />
                </li>
                <li className="text">桃園國際機場 (T2)</li>
                <li className="edit" />
            </ul>
            <div className="clearfix remarks">
                <div>
                    <ul>
                        <li>中華航空 C122</li>
                        <li>297-2585996136</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
