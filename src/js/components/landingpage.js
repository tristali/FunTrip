import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    render() {
        return <Redirect to="/plan" />;
    }
}
export default LandingPage;
