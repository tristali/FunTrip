import React, { Component } from "react";
import ReactDOM from "react-dom";
import {NavLink} from "react-router-dom";

const Map = () =>{
    return(
        <div>Map
            <NavLink to="/plan">plan</NavLink>
            <NavLink to="/profile">planprofile</NavLink>
        </div>
    );
};

export default Map;