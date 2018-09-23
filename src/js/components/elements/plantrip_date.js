import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_date.scss";

const PlanTripDate = () =>{
    return(
        <div className="date">
            <ul className="clearfix">
                <li className="types_of">
                    <div>
                        <div>Day</div>
                    </div>
                </li>
                <li className="date_detail">
                    <div>
                        <ul className="clearfix">
                            <li className="carousel_button"></li>
                            <li>
                                <div>
                                    <ul className="clearfix day">
                                        <li className="current"><div>01</div><div>WED</div></li>
                                        <li><div>02</div><div>WED</div></li>
                                        <li><div>03</div><div>THU</div></li>
                                        <li><div>04</div><div>FRI</div></li>
                                        <li><div>05</div><div>SAT</div></li>
                                        <li><div>06</div><div>SUN</div></li>
                                        <li><div>07</div><div>MON</div></li>
                                        <li><div>08</div><div>TUE</div></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="carousel_button"></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default PlanTripDate;