import React, { Component } from "react";
import "../../../scss/popup.scss";

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleCloseAddPlan = this.handleCloseAddPlan.bind(this);
    }

    render() {
        let popupState = this.props.popupState;
        let popup_title;
        let popup_text;
        let popup_button;
        let popup_onclick;
        if (popupState === "signout") {
            popup_title = "確定要登出嗎";
            popup_text = "好吧 就期待下次的相會囉";
            popup_button = "登出";
            popup_onclick = this.props.handleSignout;
        } else {
            popup_title = "確定要刪除嗎";
            popup_text = "會像青春的小鳥 Say Bye";
            popup_button = "刪除";
            /* 確認刪除旅程 */
            if (popupState === "del_trip") {
                popup_onclick = this.props.handleDelTrip;
            }
            /* 確認刪除景點 */
            if (popupState === "del_plan") {
                popup_onclick = this.props.handleDelCreactPlanTrip;
            }
        }
        return (
            <div
                className={`popup ${this.props.popup}`}
                onClick={this.handleCloseAddPlan}
            >
                <div>
                    <div>
                        <h3>
                            <div>
                                {popup_title}
                                <span>
                                    <span />
                                </span>
                            </div>
                            <div>{popup_text}</div>
                        </h3>
                        <ul className="clearfix">
                            <li>
                                <div onClick={popup_onclick}>
                                    {popup_button}
                                </div>
                            </li>
                            <li>
                                <div
                                    className="cancel"
                                    onClick={this.handleCloseAddPlan}
                                >
                                    取消
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    /* 關閉新增旅程 */
    handleCloseAddPlan(e) {
        if (
            e.target.className.split(" ")[0] === "popup" ||
            e.target.className.split(" ")[0] === "cancel"
        ) {
            this.props.handleAppStateChange({
                popup: "hide",
                popup_state: "",
                menu: "",
                trip_attractions: "",
                map: "plantrip_open"
            });

            if (this.props.popupState === "del_plan") {
                this.props.handleAppStateChange({
                    trip_attractions_width: "",
                    map: "plantrip_creactplantrip_open"
                });
            }
        }
    }
}
export default Popup;
