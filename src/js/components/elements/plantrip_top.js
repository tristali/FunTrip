import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_top.scss";

const PlanTripTop = props => {
    const categoryArray = ["All", "Transport", "Lodge", "Food", "Activity"];
    let categoryArrayDOM = categoryArray.map((item, index) => (
        <li
            key={`category_${index}`}
            onClick={() => props.handleCategoryChange(item)}
            className={props.state.category === item ? "current" : null}
        >
            {item}
        </li>
    ));

    return (
        <div className="top">
            <div className="del">
                <div onClick={props.handleDelTrip}>del</div>
            </div>
            <div className="top_text">
                <div className="title_date">
                    <ul>
                        <li className="title">{props.state.name}</li>
                        <li className="date">{`${props.state.start}-${
                            props.state.end
                        }`}</li>
                    </ul>
                </div>
                <div className="tab">
                    <ul className="clearfix">{categoryArrayDOM}</ul>
                </div>
            </div>
        </div>
    );
};

export default PlanTripTop;
