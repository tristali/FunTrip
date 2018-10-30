import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";

class ProfileAllTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            plan_id: ""
        };
        this.handleOpenThisPlan = this.handleOpenThisPlan.bind(this);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={`/plan?id=${this.state.plan_id}`} />;
        }
        return (
            <li className={this.props.thisTripState}>
                <div onClick={() => this.handleOpenThisPlan(this.props.id)}>
                    <ul className={this.props.className}>
                        <li>{this.props.name}</li>
                        <li>{`${this.props.start} - ${this.props.end}`}</li>
                        <li>
                            <div />
                        </li>
                    </ul>
                </div>
            </li>
        );
    }
    handleOpenThisPlan(plan_id) {
        this.props.handleAppStateChange({
            add_plantrip: "hide",
            current_plan: plan_id,
            loading: true,
            menu: ""
        });
        this.setState({
            plan_id: plan_id,
            redirect: true
        });
    }
    componentDidMount() {
        this.props.handleAppStateChange({
            loading: false
        });
    }
}

export default ProfileAllTrip;
