import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_top.scss";

const PlanTripTop = () =>{
    return(
        <div className="top">
            <div className="del">
                <div>del</div>
            </div>
            <div className="top_text">
                <div className="title_date">
                    <ul>
                        <li className="title">日本沖繩五日遊</li>
                        <li className="date">09/20/2018-10/02/2018</li>
                    </ul>
                </div>
                <div className="tab">
                    <ul className="clearfix">
                        <li className="current">All</li>
                        <li>Transport</li>
                        <li>Lodge</li>
                        <li>Food</li>
                        <li>Activity</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlanTripTop;