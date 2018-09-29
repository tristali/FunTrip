import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/creact_plantrip.scss";

const CreactPlanTrip = () =>{
    return(
        <div className="creact_plantrip">
            <ul className="clearfix">
                <li><div></div></li>
                <li>Add a node</li>
                <li></li>
            </ul>
            <div>
                <div className="select_category">
                    <ul className="clearfix">
                        <li className="current">Transport</li>
                        <li>Lodge</li>
                        <li>Food</li>
                        <li>Activity</li>
                    </ul>
                    <ul>
                        {/* 當前選擇需在 <ul> 增加 current*/}
                        <li className="current transport"><div></div></li>
                        <li className="transport airplane"><div></div></li>
                        <li className="transport train"><div></div></li>
                        <li className="transport car"><div></div></li>
                    </ul>
                </div>
                <div className="input">
                    <ul>
                        <li className="location clearfix">
                            <div></div><div><input type="text" placeholder="請在此輸入地點名稱"/></div>
                        </li>
                    </ul>
                    <div className="information">
                        {/* 不需要的資訊需再 <ul> 內加 hind 有資訊或是當前輸入的需加 current*/}
                        <ul className="general current">
                            <li className="clearfix current">
                                <div><div>營業時間</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                            <li className="clearfix">
                                <div><div>服務地址</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                            <li className="clearfix">
                                <div><div>服務電話</div></div><div><form><textarea type="text" /></form></div>
                            </li>  
                            <li className="clearfix">  
                                <div><div>官方網站</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                        </ul>
                        <ul className="lodge">
                            <li className="clearfix">
                                <div><div>入住時間</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                            <li className="clearfix">
                                <div><div>退房時間</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                            <li className="clearfix">
                                <div><div>房間價格</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                            <li className="clearfix">
                                <div><div>住宿資訊</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                        </ul>
                        <ul className="shopping">
                            <li className="clearfix">
                                <div><div>優惠資訊</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                        </ul>
                        <ul className="wishlist">
                            <li className="clearfix">
                                <div><div>願望清單</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                        </ul>
                        <ul className="ticket hind">
                            <li className="clearfix">
                                <div><div>購票資訊</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                        </ul>
                        <ul className="remarks">
                            <li className="clearfix">
                                <div><div>附註事項</div></div><div><form><textarea type="text" /></form></div>
                            </li>
                        </ul>
                    </div>    
                </div>
                <div className="button">
                    <ul className="clearfix">
                        <li><div>RESET</div></li>
                        {/* 如果已經有地點地址可以送出則 <li> 新增 ok */}
                        <li className="ok"><div>ADD</div></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreactPlanTrip;