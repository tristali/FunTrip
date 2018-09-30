import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/creact_plantrip.scss";

/* Information 輸入資訊 Component */
const InformationDetailed = ({detailedItemName,
    index,
    item,
    handleInformationInputStateOnClick,
    handleInformationInputStateOnBlur
})=>{
    return(
        <li 
            className="clearfix"
            onClick={()=>handleInformationInputStateOnClick(item+"-"+index)}
            onBlur={()=>handleInformationInputStateOnBlur(item+"-"+index)}
        >
            <div><div>{detailedItemName}</div></div>
            <div>
                <form><textarea type="text" />
                </form>
            </div>
        </li>
    );
};

export default InformationDetailed;