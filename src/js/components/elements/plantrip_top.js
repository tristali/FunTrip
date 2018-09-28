import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/plantrip_top.scss";

const PlanTripTop = ({
    handleCategoryChange,
    state
}) =>{
    
    const categoryArray = ["All","Transport","Lodge","Food","Activity"];
    let categoryArrayDOM = categoryArray.map((item,index) => (
        <li key = {`category_${index}`}
            onClick={() => handleCategoryChange(item)} 
            className={state.category === item ? "current" : null}
        >{item}</li>
    ));

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
                        {categoryArrayDOM}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlanTripTop;