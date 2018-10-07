import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_date.scss";

const PlanTripDate = () => {
    return (
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
                            <li className="carousel_button" />
                            <li>
                                <div>
                                    <ul className="clearfix day">
                                        <li className="current">
                                            <a href="#D_1">
                                                <div>01</div>
                                                <div>WED</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#D_2">
                                                <div>02</div>
                                                <div>WED</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#D_2">
                                                <div>02</div>
                                                <div>WED</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#D_2">
                                                <div>02</div>
                                                <div>WED</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#D_2">
                                                <div>02</div>
                                                <div>WED</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#D_2">
                                                <div>02</div>
                                                <div>WED</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#D_2">
                                                <div>02</div>
                                                <div>WED</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#D_2">
                                                <div>02</div>
                                                <div>WED</div>
                                            </a>
                                        </li>
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
};

export default PlanTripDate;
