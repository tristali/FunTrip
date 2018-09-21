import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom"; 
import LandingPage from "./components/landingpage";
import Plan from "./components/plan";
import Profile from "./components/profile";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={LandingPage} exact/>
                    <Route path="/plan" component={Plan} exact/>
                    <Route path="/profile" component={Profile} exact/>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));