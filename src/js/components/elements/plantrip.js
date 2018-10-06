import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlanTripTop from "./plantrip_top";
import PlanTripBottom from "./plantrip_bottom";
import CreactPlanTrip from "./creact_plantrip";
import app from "../../lib";
import "../../../scss/plantrip.scss";

class PlanTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 檢視當前行程類別 */
            category: "All",
            /* 當前為關閉 "hide" 新增 "Add" 或修改 "Edit" 行程狀態 */
            creact_plantrip: "hide"
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.AddPlanTrip = this.AddPlanTrip.bind(this);
        this.EditPlanTrip = this.EditPlanTrip.bind(this);
        this.handleHideCreactPlanTrip = this.handleHideCreactPlanTrip.bind(
            this
        );
        this.changeCreactPlantripState = this.changeCreactPlantripState.bind(
            this
        );
    }
    render() {
        return (
            <div className="plantrip clearfix">
                <div>
                    <PlanTripTop
                        handleCategoryChange={this.handleCategoryChange}
                        state={this.state}
                    />
                    <PlanTripBottom
                        AddPlanTrip={this.AddPlanTrip}
                        EditPlanTrip={this.EditPlanTrip}
                    />
                </div>
                <div className={this.state.creact_plantrip}>
                    <CreactPlanTrip
                        creactPlantrip={this.state.creact_plantrip}
                        handleHideCreactPlanTrip={this.handleHideCreactPlanTrip}
                        state={this.props.state}
                        planTripState={this.state}
                        changeCreactPlantripState={
                            this.changeCreactPlantripState
                        }
                    />
                </div>
            </div>
        );
    }

    handleCategoryChange(category_name) {
        this.setState({ category: category_name });
    }

    AddPlanTrip(index) {
        const mapDOM = app.get(".map");
        const thisPlanDetailedDOM = app.get(
            `.all_plan_detailed>div:nth-child(${index})`
        );
        app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });
        thisPlanDetailedDOM.classList.add("current");
        this.setState({ creact_plantrip: "Add" });
        mapDOM.classList.add("creact_plantrip");
        console.log(thisPlanDetailedDOM);
    }

    EditPlanTrip(index) {
        const mapDOM = app.get(".map");
        const thisPlanDetailedDOM = app.get(
            `.all_plan_detailed>div:nth-child(${index})`
        );
        app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });
        thisPlanDetailedDOM.classList.add("current");
        this.setState({ creact_plantrip: "Edit" });
        mapDOM.classList.add("creact_plantrip");
        console.log(thisPlanDetailedDOM);
    }

    handleHideCreactPlanTrip() {
        const mapDOM = app.get(".map");
        this.setState({ creact_plantrip: "hide" });
        mapDOM.classList.remove("creact_plantrip");
        app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });
    }

    /* 改變 this.state.creact_plantrip */
    changeCreactPlantripState(value) {
        this.setState({ creact_plantrip: value });
    }
}

export default PlanTrip;
