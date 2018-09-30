import React, { Component } from "react";
import ReactDOM from "react-dom";
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
        };

        this.handleSelectCategory 
        = this.handleSelectCategory.bind(this);

        this.handleDetailedCategory 
        = this.handleDetailedCategory.bind(this);

        this.handleInformationInputStateOnClick 
        = this.handleInformationInputStateOnClick.bind(this);

        this.handleInformationInputStateOnBlur 
        = this.handleInformationInputStateOnBlur.bind(this);
    }

    render(){

        /* Create 行程類別 JSX */
        const selectCategoryArray = Object.keys(DETAIL_CATEGORY_OBJ);

        let selectCategoryArrayDOM 
            = selectCategoryArray.map((item,index)=>(
                <li key = {`select_category_${index}`} 
                    onClick={() => this.handleSelectCategory(item)}
                    className={this.state.select_category === item ? "current" : null}
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
        
        /* Create Information 輸入框 Li Element JSX*/
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

        /* Create Information 輸入框 Ul Element JSX*/
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

        /* Creact Information 輸入框 Ul Element className */
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
                    <li><div></div></li>
                    <li>Add a node</li>
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
                                    <input type="text" placeholder="請在此輸入地點名稱"/>
                                </div>
                            </li>
                        </ul>
                        <div className="information">
                            {informationDOM}
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
    }

    handleSelectCategory(category_name){
        this.setState({select_category:category_name});
        this.setState({category_detail:DETAIL_CATEGORY_OBJ[category_name][0]});

    }

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
}

export default CreactPlanTrip;

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

/* 判斷當前的 Information 輸入框在哪一個 li Element 下面 */
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