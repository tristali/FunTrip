import React, { Component } from "react";

class ProfileTripCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let index = this.props.index;
        let categoryObj = this.props.categoryObj;
        let categoryObjKey = Object.keys(categoryObj);
        let category = categoryObjKey[index];
        return (
            <div onClick={() => this.props.handleChangeTripDisplay(category)}>
                <ul
                    className={
                        this.props.profileState.trip_display ===
                        categoryObjKey[index]
                            ? "current"
                            : ""
                    }
                >
                    <li>{categoryObj[category][0]}</li>
                    <li>{categoryObj[category][1]}</li>
                </ul>
            </div>
        );
    }
}
export default ProfileTripCategory;
