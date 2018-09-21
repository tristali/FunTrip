import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./elements/login";
import Header from "./elements/header";
import Map from "./elements/map";

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <div>
                <Login />
                <Header />
                <Map />
            </div>
        );
    }
}

export default Profile;