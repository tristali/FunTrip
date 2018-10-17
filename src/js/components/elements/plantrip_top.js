import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_top.scss";

const categoryArray = ["All", "Transport", "Lodge", "Food", "Activity"];

class PlanTripTop extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let categoryArrayDOM = categoryArray.map((item, index) => (
            <li
                key={`category_${index}`}
                onClick={() => this.props.handleCategoryChange(item)}
                className={
                    this.props.state.category === item ? "current" : null
                }
            >
                {item}
            </li>
        ));
        return (
            <div className="top">
                <div className="del">
                    <div onClick={this.props.handleDelTrip}>del</div>
                </div>
                <div className="top_text">
                    <div className="title_date">
                        <ul onClick={() =>
                            this.props.handleOpenAddPlan({ value: "EDIT", id: location.href.split("?id=")[1]})}>
                            <li className="title">
                                {this.props.planState.name}
                            </li>
                            <li className="date">{`${
                                this.props.planState.start
                            } - ${this.props.planState.end}`}</li>
                        </ul>
                    </div>
                    <div className="tab">
                        <ul className="clearfix">{categoryArrayDOM}</ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default PlanTripTop;
