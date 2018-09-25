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
app.firebase.auth = firebase.auth();

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{
                name:"",
                email:"",
                password:"",
                auth:"",
                uid:"",
            },
            loginOrSignup:{
                login:"current",
                signup:"",
            },
        };
        this.handleLoginOrSignupState = this.handleLoginOrSignupState.bind(this);
        this.handleLoginAndSignupInputChange = this.handleLoginAndSignupInputChange.bind(this);
        this.handleLoginOrSignupEnter = this.handleLoginOrSignupEnter.bind(this);
        this.handleSignout = this.handleSignout.bind(this);
    }

    /* Determine if the user chooses to Login or Signup */
    handleLoginOrSignupState(e){
        const LoginAndSignupDOMsArray = [...app.getAll(".tab>li")];
        const LoginAndSignupInboxDOM = app.get(".login_and_signup>div");

        LoginAndSignupDOMsArray.forEach(e => {
            e.classList.remove("current");
        });
        let loginOrSignup = {
            login:"",
            signup:"",
        };
        loginOrSignup[e.currentTarget.className] = "current";
        this.setState({loginOrSignup});

        LoginAndSignupInboxDOM.className=e.currentTarget.className;
    }

    /* Login and Signup data input change this.state.user  */
    handleLoginAndSignupInputChange(e){
        const userDetailKey = ["name","email","password","auth","uid"];
        const userDetailState ={};
        userDetailKey.forEach(i => {
            userDetailState[i]=this.state.user[i];
            if(i == e.currentTarget.id){
                userDetailState[i]=e.currentTarget.value;
            }
        });
        this.setState({user:userDetailState});
    }

    /* check the Login and Signup information before sending the information */
    handleLoginOrSignupEnter(){
        const thisStateUser = this.state.user;

        if(!thisStateUser.email || !thisStateUser.password){
            alert("OOOpps! 有欄位忘記填囉!");
        } else if(!thisStateUser.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)){
            alert("OOOpps! E-Mail 格式有誤!");
        } else if(!thisStateUser.password.match(/.{6,}/)){
            alert("OOOpps! 密碼至少需要六碼歐!");
        } else {
            if(this.state.loginOrSignup.login === "current"){
                /* Login */
                const promise = app.firebase.auth.signInWithEmailAndPassword(thisStateUser.email,thisStateUser.password);
                promise.catch(e=>alert(e.message));

            }else if(this.state.loginOrSignup.signup === "current"){
                /* Signup */
                if(!thisStateUser.name){
                    alert("OOOpps! 有欄位忘記填囉!");
                } else {
                    const promise = app.firebase.auth.createUserWithEmailAndPassword(thisStateUser.email,thisStateUser.password);
                    promise
                        .catch(e=>alert(e.message));
                }
            }
        }
    }

    /* Signout */
    handleSignout(){
        app.firebase.auth.signOut();
    }

    /* Determine the login status when all components are rendered. */
    componentDidMount(){
        const thisStateUser = this.state.user;
        app.firebase.auth.onAuthStateChanged(firebaseUser=>{
            const loginAndSignupDOM = app.get(".login_and_signup");
            if(firebaseUser){
                thisStateUser.email = firebaseUser.email;
                thisStateUser.uid = firebaseUser.uid;
                loginAndSignupDOM.classList.add("hide");
            } else {
                loginAndSignupDOM.classList.remove("hide");
                thisStateUser.email = "";
                thisStateUser.uid = "";
            }
        });
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
                                handleSignout={this.handleSignout}
                            />}
                    />
                    <Route path="/profile" component={Profile} exact/>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));