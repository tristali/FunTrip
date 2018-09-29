import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_schedule.scss";

const PlanTripSchedule = () =>{
    return(
        <div className="schedule">
            <div>
                <h3 className="clearfix"><div>Day01</div><div>Sep 19 , 2018</div></h3>
                <div>
                    {/*  點選該編輯 <div> 新增 current */}
                    <div className="transport  current">
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon  "><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="transport airplane">
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="transport train">
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="transport car">
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="lodge">
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="food">
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="food drink">
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="activity">
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="activity shopping">
                        <ul className="clearfix location">
                            <li className="time">17:10</li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="activity ticket">
                        <ul className="clearfix location">
                            <li className="time"></li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">桃園國際機場 (T2)</li>
                            <li className="edit"></li>
                        </ul>
                        <div className="clearfix remarks">
                            <div>
                                <ul>
                                    <li>中華航空 C122</li>
                                    <li>297-2585996136</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="add">
                        <ul className="clearfix location">
                            <li className="time"></li>
                            <li className="type_icon"><div></div></li>
                            <li className="text">新增行程</li>
                        </ul>
                    </div>
                    {/*  */}
                </div>
            </div>
        </div>
    );
};

export default PlanTripSchedule;