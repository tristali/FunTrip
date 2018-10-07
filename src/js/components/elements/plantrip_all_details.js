import React, { Component } from "react";
import ReactDOM from "react-dom";
import app from "../../lib";

class PlanTripAllDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        /* 處理景點資料 */
        const allDetailedObj = this.props.allDetailedObj;
        let planDetailsDOM = [];
        /* 如果有景點資料 */
        if (allDetailedObj) {
            const detailedKeyArray = Object.keys(allDetailedObj);
            let thisDayPlanDetailsCount = 0;
            for (let i = 0; i < detailedKeyArray.length; i++) {
                let detailedObj = allDetailedObj[detailedKeyArray[i]];
                if (detailedObj.day == this.props.day) {
                    const detailedCategoryArray = detailedObj.category.split(
                        "_"
                    );
                    thisDayPlanDetailsCount += 1;
                    planDetailsDOM.push(
                        <PlanTripDetails
                            name={detailedObj.name}
                            category={`${detailedCategoryArray[0]} ${
                                detailedCategoryArray[1]
                            }`}
                            location={`lat_${detailedObj.location.lat}_lng_${
                                detailedObj.location.lng
                            }`}
                            informationObj={detailedObj.information}
                            editPlanTrip={this.props.editPlanTrip}
                            index={thisDayPlanDetailsCount}
                            day={this.props.day}
                            time={detailedObj.information.time_0}
                            itemID={detailedObj.itemID}
                        />
                    );
                }
            }
            planDetailsDOM.push(
                <div
                    className="add"
                    onClick={() =>
                        this.props.addPlanTrip(
                            `D_${this.props.day}_NO_${thisDayPlanDetailsCount +
                                1}`
                        )
                    }
                    id={`D_${this.props.day}_NO_${thisDayPlanDetailsCount + 1}`}
                >
                    <ul className="clearfix location">
                        <li className="time" />
                        <li className="type_icon">
                            <div />
                        </li>
                        <li className="text">新增景點</li>
                    </ul>
                </div>
            );
        } else {
            planDetailsDOM.push(
                <div
                    className="add"
                    onClick={() =>
                        this.props.addPlanTrip(`D_${this.props.day}_NO_1`)
                    }
                    id={`D_${this.props.day}_NO_1`}
                >
                    <ul className="clearfix location">
                        <li className="time" />
                        <li className="type_icon">
                            <div />
                        </li>
                        <li className="text">新增景點</li>
                    </ul>
                </div>
            );
        }
        return <div className="all_plan_detailed">{planDetailsDOM}</div>;
    }
}
export default PlanTripAllDetails;

class PlanTripDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const informationObj = this.props.informationObj;
        const informationKeyArray = Object.keys(informationObj);
        let PlanInformationDOM = [];
        for (let i = 0; i < informationKeyArray.length; i++) {
            let informationContent = informationObj[informationKeyArray[i]];
            PlanInformationDOM.push(
                <PlanInformation
                    class={informationKeyArray[i]}
                    informationContent={informationContent}
                />
            );
        }
        /* 如果有預計時間的話只顯示預計時間 */
        let checkTime = () => {
            if (this.props.time) {
                return this.props.time.split(">")[1];
            }
        };

        return (
            <div
                className={this.props.category}
                id={`D_${this.props.day}_NO_${this.props.index}`}
            >
                <ul className="clearfix location" id={this.props.itemID}>
                    <li className="time">{checkTime()}</li>
                    <li className="type_icon">
                        <div />
                    </li>
                    <li className="text" id={this.props.location}>
                        {this.props.name}
                    </li>
                    <li
                        className="edit"
                        onClick={() =>
                            this.props.editPlanTrip(
                                `D_${this.props.day}_NO_${this.props.index}`
                            )
                        }
                    />
                </ul>
                <div className="clearfix remarks">
                    <div>
                        <ul>{PlanInformationDOM}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

class PlanInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <li className={this.props.class}>
                {this.props.informationContent}
            </li>
        );
    }
}
