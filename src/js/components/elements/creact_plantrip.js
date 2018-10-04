import React, { Component } from "react";
import ReactDOM from "react-dom";
import InformationDetailed from "./creact_plantrip_information_detailed";
import app from "../../lib";
import "../../../scss/creact_plantrip.scss";

/* 行程的類別及較小類別 */
const DETAIL_CATEGORY_OBJ = {
    Transport:["transport","airplane","train","car"],
    Lodge:["lodge"],
    Food:["food","drink"],
    Activity:["activity","shopping","ticket"],
};

class CreactPlanTrip extends Component{
    constructor(props){
        super(props);
        this.state = {
            /* 當前行程類別 */
            select_category:"Transport",
            /* 當前行程小類別 */
            category_detail:"transport",
            /* 當前地點名稱 */
            lcation_name:"",
        };

        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleDetailedCategory = this.handleDetailedCategory.bind(this);
        this.handleInformationInputStateOnClick = this.handleInformationInputStateOnClick.bind(this);
        this.handleInformationInputStateOnBlur = this.handleInformationInputStateOnBlur.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSetDatebase = this.handleSetDatebase.bind(this);
    }

    render(){

        /* Create 行程類別 JSX */
        const selectCategoryArray = Object.keys(DETAIL_CATEGORY_OBJ);

        let selectCategoryArrayDOM 
            = selectCategoryArray.map((item,index)=>(
                <li key = {`select_category_${index}`} 
                    onClick = {() => this.handleSelectCategory(item)}
                    className = {this.state.select_category === item ? "current" : null}
                >
                    {item}
                </li>
            ));

        /* Create 行程小類別 JSX */
        let thisCategoryDetailArray = 
            DETAIL_CATEGORY_OBJ[this.state.select_category];

        let selectCategory 
            = this.state.select_category.toLowerCase();

        let detailedCategory 
            = this.state.category_detail;

        let thisDetailedCategoryDOM 
            = thisCategoryDetailArray.map((item,index)=>(
                <li key = {`category_detail_${index}`}
                    onClick={()=> this.handleDetailedCategory(item)}
                    className={thisDetailedCategoryClass(
                        detailedCategory,
                        selectCategory,
                        item
                    )}
                >
                    <div></div>
                </li>
            ));

        /* 行程小類別 className */
        function thisDetailedCategoryClass(currentCategory,
            category,
            item
        ){
            let current;
            currentCategory === item ? current="current" : current="";
            return `${category} ${item} ${current}`;
        }

        /* Information 輸入框 */
        const INFORMATION_OBJ = {
            lodge:["住宿資訊","入住時間","退房時間"],
            bonus:["優惠資訊"],
            wishlist:["願望清單"],
            ticket:["票務資訊"],
            general:["營業時間","服務地址","服務電話","官方網站"],
            remarks:["附註事項"],
        };

        /* 根據行程類別不需顯示的 Information 輸入框 */
        const HIDE_INFORMATION_OBJ = {
            Transport:["lodge","bonus","wishlist"],
            Lodge:["bonus","wishlist","ticket"],
            Food:["lodge","ticket"],
            Activity:["lodge"],    
        };
        
        /* Create Information 輸入框 <li> Element JSX*/
        function InformationDetailedDOM(
            item,
            handleInformationInputStateOnClick,
            handleInformationInputStateOnBlur
        ){
            return INFORMATION_OBJ[item].map((
                detailedItemName,
                index
            )=>(
                <InformationDetailed 
                    detailedItemName
                        ={detailedItemName} 
                    key={index}
                    index={index}
                    handleInformationInputStateOnClick={handleInformationInputStateOnClick}
                    handleInformationInputStateOnBlur={handleInformationInputStateOnBlur}
                    item={item}
                />
            ));
        }

        /* Create Information 輸入框 <ul> Element JSX*/
        let informationDOM = Object.keys(INFORMATION_OBJ).map((item,index)=>(
            <ul key = {`input_information_${index}`}
                className={informationClass(this.state.select_category,item)}
            >
                {InformationDetailedDOM(item,
                    this.handleInformationInputStateOnClick,
                    this.handleInformationInputStateOnBlur
                )}
            </ul>
        ));

        /* Creact Information 輸入框 <ul> Element className */
        function informationClass(currentCategory,item){
            let thisInformation;
            HIDE_INFORMATION_OBJ[currentCategory].map((i,index)=>{
                if(item === i){
                    item === i ? thisInformation="hide" : thisInformation="";
                }
            });
            return `${item} ${thisInformation}`;
        }

        return(
        // 一般不需調整新增行程時 <div> 需增加 hide
            <div className="creact_plantrip">
                <ul className="clearfix">
                    <li onClick={this.props.handleHideCreactPlanTrip}><div></div></li>
                    <li>{this.props.creactPlantrip} a node</li>
                    <li></li>
                </ul>
                <div>
                    <div className="select_category">
                        <ul className="clearfix">
                            {selectCategoryArrayDOM}
                        </ul>
                        <ul>
                            {thisDetailedCategoryDOM}
                        </ul>
                    </div>
                    <div className="input">
                        <ul>
                            <li className="location clearfix">
                                <div></div>
                                <div>
                                    <input
                                        className = "search_input"
                                        type="text" 
                                        value={this.state.lcation_name} 
                                        placeholder="請在此輸入地點名稱"
                                        onChange={this.handleLocationChange}
                                    />
                                </div>
                            </li>
                        </ul>
                        <div className="information">
                            {informationDOM}
                        </div>    
                    </div>
                    <div className="button">
                        <ul className="clearfix">
                            <li><div>Rest</div></li>
                            <li 
                                className={this.state.lcation_name? "ok" : ""}
                                onClick={this.handleSetDatebase}
                            >
                                <div>{this.props.creactPlantrip}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    /* 當行程類別被點擊時改變該類別樣式 */
    handleSelectCategory(category_name){
        this.setState({select_category:category_name});
        this.setState({category_detail:DETAIL_CATEGORY_OBJ[category_name][0]});

    }

    /* 當行程小類別被點擊時改變該小類別樣式 */
    handleDetailedCategory(category_name){
        this.setState({category_detail:category_name});
    }

    /* 當 Information 輸入框被點擊時改變該輸入框樣式 */
    handleInformationInputStateOnClick(item){
        splitItemGetCurrentElementLi(item).classList.add("current");
    }

    /* 當使用者不在關注當前的 Information 輸入框時
       判斷使用者是否已經有輸入資訊 */
    handleInformationInputStateOnBlur(item){
        if(!splitItemGetCurrentElementTextarea(item)
            .value
            .trim()
        ){
            splitItemGetCurrentElementLi(item)
                .classList
                .remove("current");
        }
    }

    /* 當使用者改變地點名稱時改變 this.state.location_name */
    handleLocationChange(e){
        this.setState({lcation_name: e.currentTarget.value});
    }

    /* Datebase 資料更新 */
    handleSetDatebase(){
        if(this.state.lcation_name){
            alert("資料更新中");
            // 連接 Datebase
            // 資料初始化
        } else {
            alert("麻煩請協助填入地點名稱，謝謝");
        }
    }
}

export default CreactPlanTrip;

/* 判斷當前的 Information 輸入框在哪一個 <li> Element 下面 */
function splitItemGetCurrentElementLi(item){
    return app.get(
        `.information>ul.${item.split("-")[0]}>li:nth-child(${Number(item.split("-")[1])+1}`
    );
}

/* 判斷當前的 Information 輸入框 Element */
function splitItemGetCurrentElementTextarea(item){
    return app.get(
        `.information>ul.${item.split("-")[0]}>li:nth-child(${Number(item.split("-")[1])+1}) textarea`
    );
}