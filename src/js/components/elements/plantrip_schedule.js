import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_schedule.scss";

const PlanTripSchedule = () =>{
    return(
        <div className="schedule">
            <div>
                <h3 className="clearfix"><div>Day01</div><div>Sep 19 , 2018</div></h3>
                <div>
                    <div>
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li className="clearfix"><div>航班</div><div>中華航空 C122</div></li>
                                    <li className="clearfix"><div>票號</div><div>297-2585996136</div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li className="clearfix"><div>航班</div><div>中華航空 C122</div></li>
                                    <li className="clearfix"><div>票號</div><div>297-2585996136</div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanTripSchedule;