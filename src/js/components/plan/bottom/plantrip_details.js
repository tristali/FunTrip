import React, { Component } from "react";

class PlanTripDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleMapDisplay = this.handleMapDisplay.bind(this);
        this.handleRemarksToggle = this.handleRemarksToggle.bind(this);
    }
    render() {
        const informationObj = this.props.informationObj;
        const informationKeyArray = Object.keys(informationObj);
        let PlanInformationDOM = [];
        for (let i = 0; i < informationKeyArray.length; i++) {
            let informationContent = informationObj[informationKeyArray[i]];
            PlanInformationDOM.push(
                <li
                    key={`plan_information_DOM_${i}`}
                    className={informationKeyArray[i]}
                    dangerouslySetInnerHTML={{ __html: informationContent }}
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
                className={
                    this.props.planState.current_day === this.props.day &&
                    this.props.planState.current_attraction === this.props.index
                        ? `${this.props.category} current`
                        : this.props.category
                }
                id={`D_${this.props.day}_NO_${this.props.index}`}
                onClick={() =>
                    this.handleMapDisplay({
                        day: this.props.day,
                        index: this.props.index
                    })
                }
            >
                <ul className="clearfix location">
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
                            this.props.editPlanTrip({
                                day: this.props.day,
                                index: this.props.index,
                                action: "Edit"
                            })
                        }
                    />
                </ul>
                <div className="clearfix remarks">
                    <div onClick={this.handleRemarksToggle}>
                        <ul>{PlanInformationDOM}</ul>
                    </div>
                </div>
            </div>
        );
    }

    /* 改變 map 顯示為目前點擊景點 
    { day : 天數 index, index : 景點 index } */
    handleMapDisplay(props) {
        let map_center = this.props.planState.all_detailed_obj[props.day][
            props.index
        ].location;

        this.props.handlePlanStateChange({
            map_center: map_center,
            map_zoom: 17
        });
    }

    /* 判斷展開或收起景點資訊 */
    handleRemarksToggle(e) {
        if (!e.currentTarget.className) {
            e.currentTarget.className = "expand";
        } else {
            e.currentTarget.className = "";
        }
    }

    componentDidMount() {
        this.props.handleAppStateChange({
            loading: false
        });
    }
}

export default PlanTripDetails;
