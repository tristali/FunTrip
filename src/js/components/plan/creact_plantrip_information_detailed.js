import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/creact_plantrip.scss";

class InformationDetailed extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.list = {};
    }
    render() {
        let current_information = this.props.planState.current_information;
        if (
            current_information &&
            current_information[this.props.informationCategory]
        ) {
            console.log(
                current_information[this.props.informationCategory],
                "this.props.planState"
            );
        }
        return (
            <li
                className="clearfix"
                className={
                    current_information[this.props.informationCategory]
                        ? "clearfix current"
                        : "clearfix"
                }
                onBlur={() =>
                    this.props.handleInformationInputStateOnBlur(
                        this.props.item + "-" + this.props.index
                    )
                }
            >
                <div>
                    <div>{this.props.detailedItemName}</div>
                </div>
                <div>
                    <div
                        onClick={() =>
                            this.props.handleInformationInputStateOnClick(
                                this.props.item + "-" + this.props.index
                            )
                        }
                        className="textarea"
                        contentEditable="true"
                        dangerouslySetInnerHTML={this.handleCurrentInformation(
                            this.props.planState,
                            this.props.informationCategory
                        )}
                    ></ div>
                </div>
            </li>
        );
    }

    handleCurrentInformation(
        planState,
        informationCategory
    ) {
        let current_information_name =
            planState.current_information[informationCategory];
        let current_information_content =
            planState.current_information[informationCategory];
        if (current_information_name) {
            if (
                informationCategory === "general_1" ||
                informationCategory === "general_3"
            ) {
                return {
                    __html: current_information_content
                        .slice(10)
                        .split(">")[1]
                        .split("<")[0]
                };

            } else {

                return {
                    __html: current_information_content.slice(10)
                };

            }
        } 
    }
}
export default InformationDetailed;
