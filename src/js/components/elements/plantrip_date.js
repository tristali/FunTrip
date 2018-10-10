import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_date.scss";
import app from "../../lib";

/* 月份縮寫對照 */
const MONTH_ABBEVIATION = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

class PlanTripDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_type: "Day",
            current_day: "#D_1"
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleCurrentType = this.handleCurrentType.bind(this);
    }
    render() {
        /* 日曆 element Array */
        let calendarArray = [];
        /* 此旅程所有日期 */
        let all_day_array = this.props.state.all_day_array;
        /* 此旅程所有星期 */
        let all_week_array = this.props.state.all_week_array;
        /* 按照日期/星期 creact 日曆 element */
        for (let i = 1; i < all_day_array.length + 1; i++) {
            /* 如果 Day 小於 10 補 10 位數為 0 */
            let number;
            if (i < 10) {
                number = "0" + i;
            } else {
                number = i;
            }
            let top;
            let bottom;
            /* 當顯示型態 current_type 為第幾天 */
            if (this.state.current_type === "Day") {
                top = number;
                bottom = all_week_array[i - 1];
            } else {
                /* 當顯示型態 current_type 為日期 */
                top = all_week_array[i - 1];
                bottom = all_day_array[i - 1].split("/")[2];
            }
            calendarArray.push(
                <li
                    key={`calendar_${i}`}
                    onClick={() => this.handleCategoryChange(`#D_${i}`)}
                    className={
                        this.state.current_day === `#D_${i}` ? "current" : null
                    }
                >
                    <a href={`#D_${i}`}>
                        <div>{top}</div>
                        <div>{bottom}</div>
                    </a>
                </li>
            );
        }
        return (
            <div className="date">
                <ul className="clearfix">
                    <li className="types_of">
                        <div onClick={this.handleCurrentType}>
                            <div>{this.state.current_type}</div>
                        </div>
                    </li>
                    <li className="date_detail">
                        <div>
                            <ul className="clearfix">
                                <li className="carousel_button" />
                                <li className={this.state.current_type}>
                                    <div>
                                        <ul className="clearfix day">
                                            {calendarArray}
                                        </ul>
                                    </div>
                                </li>
                                <li className="carousel_button" />
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
    /* 改變 current_day 狀態 */
    handleCategoryChange(current_day) {
        let thisDay = current_day.split("_")[1];
        let thisDate = this.props.state.all_day_array[Number(thisDay) - 1];
        let thisMonth = MONTH_ABBEVIATION[Number(thisDate.split("/")[1]) - 1];
        if (this.state.current_type !== "Day") {
            this.setState({ current_type: thisMonth });
        }
        this.setState({ current_day: current_day });
    }
    /* 改變 current_type 狀態 */
    handleCurrentType() {
        if (this.state.current_type === "Day") {
            let thisDay = app
                .get("li.date_detail div>ul>li.current>a")
                .href.split("_")[1];
            let thisDate = this.props.state.all_day_array[Number(thisDay) - 1];
            let thisMonth =
                MONTH_ABBEVIATION[Number(thisDate.split("/")[1]) - 1];
            this.setState({ current_type: thisMonth });
        } else {
            this.setState({ current_type: "Day" });
        }
    }
}
export default PlanTripDate;
