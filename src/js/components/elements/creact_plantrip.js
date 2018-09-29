import React, { Component } from "react";
import ReactDOM from "react-dom";
import app from "../../lib";
import "../../../scss/creact_plantrip.scss";

const detailCategoryObj = {
    Transport:["transport","airplane","train","car"],
    Lodge:["lodge"],
    Food:["food","drink"],
    Activity:["activity","shopping","ticket"],
};

class CreactPlanTrip extends Component{
    constructor(props){
        super(props);
        this.state = {
            select_category:"Transport",
            category_detail:"transport",
        };
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleDetailedCategory = this.handleDetailedCategory.bind(this);
    }

    render(){
        /* Create Select trip category */
        const selectCategoryArray = ["Transport","Lodge","Food","Activity"];

        let selectCategoryArrayDOM = selectCategoryArray.map((item,index)=>(
            <li key = {`select_category_${index}`} 
                onClick={() => this.handleSelectCategory(item)}
                className={this.state.select_category === item ? "current" : null}
            >{item}</li>
        ));

        /* Create Select trip category details */
        let thisCategoryDetailArray = detailCategoryObj[this.state.select_category];
        let selectCategory = this.state.select_category.toLowerCase();
        let detailedCategory = this.state.category_detail;
        let thisDetailedCategoryDOM = thisCategoryDetailArray.map((item,index)=>(
            <li key = {`category_detail_${index}`}
                onClick={()=> this.handleDetailedCategory(item)}
                className={thisDetailedCategoryClass(detailedCategory,selectCategory,item)}
            >
                <div></div>
            </li>
        ));

        /* Creact select trip category details className */
        function thisDetailedCategoryClass(currentCategory,category,item){
            let current;
            currentCategory === item ? current="current" : current="";
            return `${category} ${item} ${current}`;
        }

        /* Creact input information */
        const informationObj = {
            lodge:["住宿資訊","入住時間","退房時間","房間價格"],
            bonus:["優惠資訊"],
            wishlist:["願望清單"],
            ticket:["票務資訊"],
            general:["營業時間","服務地址","服務電話","官方網站"],
            remarks:["附註事項"],
        };

        const handleHideInformationObj = {
            Transport:["lodge","bonus","wishlist"],
            Lodge:["bonus","wishlist","ticket"],
            Food:["lodge","ticket"],
            Activity:["lodge"],    
        };

        function InformationDetailedDOM(item){
            return informationObj[item].map((item,index)=>(
                <InformationDetailed item={item} key={index}/>
            ));
        }

        let informationDOM = Object.keys(informationObj).map((item,index)=>(
            <ul key = {`input_information_${index}`}
                className={item}
                className={informationClass(this.state.select_category,item)}
            >
                {InformationDetailedDOM(item)}
            </ul>
        ));

        /* Creact information className */
        function informationClass(currentCategory,item){
            let thisInformation;
            handleHideInformationObj[currentCategory].map((i,index)=>{
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
                                <div></div><div><input type="text" placeholder="請在此輸入地點名稱"/></div>
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
        this.setState({category_detail:detailCategoryObj[category_name][0]});

    }

    handleDetailedCategory(category_name){
        this.setState({category_detail:category_name});
    }
}

export default CreactPlanTrip;

const InformationDetailed = ({item})=>{
    return(
        <li className="clearfix">
            <div><div>{item}</div></div><div><form><textarea type="text" /></form></div>
        </li>
    );
};