import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom"; 
import LandingPage from "./components/landingpage";
import Plan from "./components/plan";
import Profile from "./components/profile";
import app from "./lib";
import * as firebase from "firebase";

/*initialize firebase*/
firebase.initializeApp(app.firebase.config);

const auth = firebase.auth();
// auth.signInWithEmailAndPassword(email,pass);
// auth.createUserWithEmailAndPassword(email,pass);
// auth.onAuthStateChanged(firebaseUser=>{});

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{
                name:"",
                email:"",
                password:"",
                auth:"",
            },
            loginOrSignup:{
                login:"current",
                signup:"",
            },
        };
        this.handleLoginOrSignupState = this.handleLoginOrSignupState.bind(this);
        this.handleLoginOrSignupEnter = this.handleLoginOrSignupEnter.bind(this);
        this.handleLoginAndSignupInputChange = this.handleLoginAndSignupInputChange.bind(this);
    }

    /* Determine if the user chooses to Login or Signup */
    handleLoginOrSignupState(e){
        const LoginAndSignupDOMsArray = [...app.getAll(".tab>li")];
        const LoginAndSignupInboxDOM = app.get(".login_and_signup>div");

        LoginAndSignupDOMsArray.forEach(e => {
            e.classList.remove("current");
        });
        let loginOrSignup ={
            login:"",
            signup:"",
        };
        loginOrSignup[e.currentTarget.className] = "current";
        this.setState({loginOrSignup});

        LoginAndSignupInboxDOM.className=e.currentTarget.className;
    }

    /* Login and Signup data input change this.state.user  */
    handleLoginAndSignupInputChange(e){
        const userDetailKey = ["name","email","password","auth"];
        const userDetailState ={};
        userDetailKey.forEach(i => {
            userDetailState[i]=this.state.user[i];
            if(i == e.currentTarget.id){
                userDetailState[i]=e.currentTarget.value;
            }
        });
        this.setState({user:userDetailState});
    }

    /* Login and Signup data check and send out */
    handleLoginOrSignupEnter(){
        if(!this.state.user.email || !this.state.user.password){
            alert("OOOpps! 有欄位忘記填囉!");
        } else if(!this.state.user.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)){
            alert("OOOpps! E-Mail 格式有誤!");
        } else if(!this.state.user.password.match(/.{6,}/)){
            alert("OOOpps! 密碼至少需要六碼歐!");
        }
        if(this.state.loginOrSignup.login === "current"){
            console.log("login");
        }else if(this.state.loginOrSignup.signup === "current"){
            if(!this.state.user.name){
                alert("OOOpps! 有欄位忘記填囉!");
            }
        }
        console.log(this.state.user);
    }

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={LandingPage} exact/>
                    <Route
                        path='/plan'
                        render={
                            () => <Plan 
                                state={this.state}
                                handleLoginOrSignupState={this.handleLoginOrSignupState}
                                handleLoginOrSignupEnter={this.handleLoginOrSignupEnter}
                                handleLoginAndSignupInputChange={this.handleLoginAndSignupInputChange}
                            />}
                    />
                    <Route path="/profile" component={Profile} exact/>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));