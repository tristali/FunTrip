import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip.scss";

class PlanTrip extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <div className="plantrip">
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
            </div>
        );
    }
}

export default PlanTrip;