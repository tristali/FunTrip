import React, { Component } from "react";
import ReactDOM from "react-dom";
import {NavLink} from "react-router-dom";

const LandingPage = () =>{
    return(
        <div>LandingPage
            <NavLink to="/plan">plan</NavLink>
        </div>
    );
};

export default LandingPage;