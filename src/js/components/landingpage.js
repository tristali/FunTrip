import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Redirect to="/plan" />;
    }
}
export default LandingPage;
