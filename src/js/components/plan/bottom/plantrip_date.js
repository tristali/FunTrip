import React, { Component } from "react";
import "../../../../scss/plantrip_date.scss";
import {app} from "../../../library/lib";

class PlanTripDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 當前顯示日曆型態 */
            current_type: "Day",
            /* 抓取每張日曆寬度 */
            every_date_width: "",
            /* 當前輪播定位 */
            current_left: ""
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleCurrentType = this.handleCurrentType.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
    }
    render() {
        /* 日曆 element Array */
        let calendarArray = [];
        /* 此旅程所有日期 */
        let all_day_array = this.props.planState.all_day_array;
        /* 此旅程所有星期 */
        let all_week_array = this.props.planState.all_week_array;
        /* 抓取每張日曆寬度 */
        let everyDateWidth = this.state.every_date_width;
        /* 按照日期/星期 creact 日曆 element */
        for (let i = 0; i < all_day_array.length; i++) {
            /* 如果 Day 小於 10 補 10 位數為 0 */
            let number;
            if (i < 9) {
                number = "0" + (i + 1);
            } else {
                number = i + 1;
            }
            let top;
            let bottom;
            /* 當顯示型態 current_type 為第幾天 */
            if (this.state.current_type === "Day") {
                top = number;
                bottom = all_week_array[i];
            } else {
                /* 當顯示型態 current_type 為日期 */
                top = all_week_array[i];
                bottom = all_day_array[i].split("/")[2];
            }
            calendarArray.push(
                <li
                    key={`calendar_${i}`}
                    onClick={() => this.handleCategoryChange(`#D_${i}`)}
                    className={
                        this.props.planState.current_tab === `#D_${i}`
                            ? "current"
                            : null
                    }
                    style={{ width: everyDateWidth }}
                >
                    <a id={i}>
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
                            <ul className="clearfix all_carousel">
                                <li
                                    className="carousel_button"
                                    onClick={() => this.handleSlider("add")}
                                />
                                <li className={this.state.current_type}>
                                    <div>
                                        <ul
                                            className="clearfix day"
                                            style={{
                                                width:
                                                    everyDateWidth *
                                                    all_day_array.length,
                                                left: this.state.current_left
                                            }}
                                        >
                                            {calendarArray}
                                        </ul>
                                    </div>
                                </li>
                                <li
                                    className="carousel_button"
                                    onClick={() =>
                                        this.handleSlider("subtract")
                                    }
                                />
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
    /* 改變 current_tab 狀態 */
    handleCategoryChange(current_tab) {
        app.get(current_tab).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        let thisDay = current_tab.split("#D_")[1];
        let thisDate = this.props.planState.all_day_array[Number(thisDay)];
        let thisMonth = this.props.list.MONTH_ABBEVIATION[
            Number(thisDate.split("/")[1])
        ];
        if (this.state.current_type !== "Day") {
            this.setState({ current_type: thisMonth });
        }

        this.props.handlePlanStateChange({
            current_tab: current_tab
        });
    }
    /* 改變 current_type 狀態 */
    handleCurrentType() {
        if (this.state.current_type === "Day") {
            let thisDay = this.props.planState.current_tab.split("_")[1];
            let thisDate = this.props.planState.all_day_array[Number(thisDay)];
            let thisMonth = this.props.list.MONTH_ABBEVIATION[
                Number(thisDate.split("/")[1])
            ];
            this.setState({ current_type: thisMonth });
        } else {
            this.setState({ current_type: "Day" });
        }
    }
    /* 控制輪播移動 */
    handleSlider(AddOrSubtract) {
        /* 此旅程所有日期 */
        let all_day_array = this.props.planState.all_day_array;
        /* 當前輪播定位 */
        let currentLeft = this.state.current_left;
        /* 抓取每張日曆寬度 */
        let everyDateWidth = this.state.every_date_width;
        if (AddOrSubtract === "add") {
            currentLeft = currentLeft + everyDateWidth * 7;
        } else {
            currentLeft = currentLeft - everyDateWidth * 7;
        }
        /* 判斷修改後的 current_left 是否還可以一次看到七張日曆 */
        if (currentLeft >= 0) {
            currentLeft = 0;
        } else if (
            currentLeft * -1 >
            everyDateWidth * (all_day_array.length - 7)
        ) {
            currentLeft = everyDateWidth * (all_day_array.length - 7) * -1;
        }
        this.setState({ current_left: currentLeft });
    }
    componentDidMount() {
        const carouselBoxWidth = app.get(".all_carousel>li>div").offsetWidth;
        this.setState({ every_date_width: carouselBoxWidth / 7 });
    }
}
export default PlanTripDate;
