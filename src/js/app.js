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

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{
                name:"",
                email:"",
                password:"",
                uid:"",
                photoURL:"", 
            },
            login_or_signup: "signup",
            menu:"",
            map_center: {
                lat: 23.6,
                lng: 121,
            },
            map_zoom: 8,
        };
        this.handleLoginOrSignupState = this.handleLoginOrSignupState.bind(this);
        this.handleLoginAndSignupInputChange = this.handleLoginAndSignupInputChange.bind(this);
        this.handleMenuState = this.handleMenuState.bind(this);
        this.handleSignout = this.handleSignout.bind(this);

        /* Log in and Sign up */
        this.handleLoginOrSignupEnter = this.handleLoginOrSignupEnter.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }
    render(){
        console.log(this.state);
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
                                handleMenuState={this.handleMenuState} 
                                menu={this.state.menu}
                                handleSignout={this.handleSignout}
                                handleFacebookLogin={this.handleFacebookLogin}
                                handleGoogleLogin={this.handleGoogleLogin}
                            />}
                    />
                    <Route
                        path='/profile'
                        render={
                            () => <Profile 
                                state={this.state}
                                handleLoginOrSignupState={this.handleLoginOrSignupState}
                                handleLoginOrSignupEnter={this.handleLoginOrSignupEnter}
                                handleLoginAndSignupInputChange={this.handleLoginAndSignupInputChange}
                                handleMenuState={this.handleMenuState} 
                                menu={this.state.menu}
                                handleSignout={this.handleSignout}
                                handleFacebookLogin={this.handleFacebookLogin}
                                handleGoogleLogin={this.handleGoogleLogin}
                            />}
                    />
                </Switch>
            </BrowserRouter>
        );
    }

    /* Determine if the user chooses to Login or Signup */
    handleLoginOrSignupState(tab_name){
        this.setState({login_or_signup: tab_name});
    }

    /* Login and Signup data input change this.state.user  */
    handleLoginAndSignupInputChange(e){
        const userDetailKey = Object.keys(this.state.user);
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

        if(!thisStateUser.email 
            || !thisStateUser.password
        ){
            alert("OOOpps! 有欄位忘記填囉!");
        } else if(!thisStateUser.email
            .match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)
        ){
            alert("OOOpps! E-Mail 格式有誤!");
        } else if(!thisStateUser.password
            .match(/.{6,}/)
        ){
            alert("OOOpps! 密碼至少需要六碼歐!");
        } else {
            if(this.state.login_or_signup === "login"){
                /* Login */
                const promise = firebase.auth().signInWithEmailAndPassword(thisStateUser.email,thisStateUser.password);
                promise.catch(function(e){
                    if(e.message == "The password is invalid or the user does not have a password."){
                        alert("您好，此信箱已註冊為會員，再麻煩您使用 google 登入");
                    }
                });

            }else if(this.state.login_or_signup === "signup"){
                /* Signup */
                if(!thisStateUser.name){
                    alert("OOOpps! 有欄位忘記填囉!");
                } else {
                    const promise = firebase.auth().createUserWithEmailAndPassword(thisStateUser.email,thisStateUser.password);
                    promise
                        .then(function(){
                            firebase.database().ref("/users/" + firebase.auth().currentUser.uid).set({
                                name:thisStateUser.name,
                                email:thisStateUser.email,
                                uid:firebase.auth().currentUser.uid,
                            });              
                        }).catch(function(e){
                            if(e.message == "The email address is already in use by another account."){
                                alert("您好，此信箱已註冊為會員，再麻煩您使用 google 登入");
                            }
                        });
                }
            }
        }
    }

    /* Facebook Login */
    handleFacebookLogin(){
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope("email");
        app.firebase_signInWithPopup(firebase, provider, "Facebook");
    }

    /* Google Login */
    handleGoogleLogin(){
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        app.firebase_signInWithPopup(firebase, provider, "Google");
    }

    /* Determine if the click menu change this.state.menu */
    handleMenuState(){
        if(!this.state.menu){
            this.setState({menu:"open"});
        }else{
            this.setState({menu:""});
        }
    }

    /* Signout */
    handleSignout(){
        firebase.auth().signOut();
    }
    
    /* Determine the login status when all components are rendered. */
    componentDidMount(){

        /* 判斷登入狀態決定登入視窗是否顯示*/
        let thisStateUser;
        firebase.auth().onAuthStateChanged(firebaseUser=>{
            const loginAndSignupDOM = app.get(".login_and_signup");
            const plantripDOM = app.get(".plantrip");
            const mapDOM = app.get(".map");
            if(firebaseUser){
                thisStateUser = Object.assign({},this.state.user,{
                    email:firebaseUser.email, 
                    uid:firebaseUser.uid,
                    password:"",
                });
                firebase.database().ref("/users/" + firebaseUser.uid).on("value", function(snapshot) {
                    thisStateUser.name = snapshot.val().name;
                    if(snapshot.val().photoURL){
                        thisStateUser.photoURL = snapshot.val().photoURL;
                    }
                });
                this.setState({user:thisStateUser});
                loginAndSignupDOM.classList.add("hide");
                plantripDOM.classList.remove("hide");
                mapDOM.classList.remove("hide_plantrip");

                /* 判斷使用者是否有同意分享目前座標權限 */
                const state = this.state;
                app.initMap(
                    state.map_center.lat,
                    state.map_center.lng,
                    state.map_zoom,
                    locations,
                    labels,
                );

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            console.log(position.coords);  
                            // const userGeolocation = app.get(".map_center");           
                            let nowMapCenterObj = Object.assign({},this.state.map_center,{
                                lat: position.coords.latitude, 
                                lng: position.coords.longitude
                            });
                            this.setState({map_center:nowMapCenterObj});
                            this.setState({map_zoom:10});      
                            // userGeolocation.classList.add("user_geolocation");
                            
                            app.initMap(
                                position.coords.latitude,
                                position.coords.longitude,
                                10,
                                locations,
                                labels,
                            );

                            // var circle = new google.maps.Circle({
                            //     center: nowMapCenterObj,
                            //     radius: position.coords.accuracy
                            // });
                            // autocomplete.setBounds(circle.getBounds());

                        }
                    );
                } else {
                    error => console.log(error);
                }    

            } else {
                loginAndSignupDOM.classList.remove("hide");
                plantripDOM.classList.add("hide");
                mapDOM.classList.add("hide_plantrip");
                thisStateUser = Object.assign({},this.state.user,{
                    name:"",
                    email:"",
                    password:"", 
                    uid:"",photoURL:""
                });
                this.setState({user:thisStateUser,
                    menu:"",});
            }
        });
    }
}

ReactDOM.render(<App />, document.getElementById("app"));

/* 每個行程點名稱 */
var labels ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/* 每個行程點經緯度 */
var locations = [
//     {lat: -31.563910, lng: 147.154312},
//     {lat: -33.718234, lng: 150.363181},
//     {lat: -33.727111, lng: 150.371124},
//     {lat: -33.848588, lng: 151.209834},
//     {lat: -33.851702, lng: 151.216968},
//     {lat: -34.671264, lng: 150.863657},
//     {lat: -35.304724, lng: 148.662905},
//     {lat: -36.817685, lng: 175.699196},
//     {lat: -36.828611, lng: 175.790222},
//     {lat: -37.750000, lng: 145.116667},
//     {lat: -37.759859, lng: 145.128708},
//     {lat: -37.765015, lng: 145.133858},
//     {lat: -37.770104, lng: 145.143299},
//     {lat: -37.773700, lng: 145.145187},
//     {lat: -37.774785, lng: 145.137978},
//     {lat: -37.819616, lng: 144.968119},
//     {lat: -38.330766, lng: 144.695692},
//     {lat: -39.927193, lng: 175.053218},
//     {lat: -41.330162, lng: 174.865694},
//     {lat: -42.734358, lng: 147.439506},
//     {lat: -42.734358, lng: 147.501315},
//     {lat: -42.735258, lng: 147.438000},
    {lat: -43.999792, lng: 170.463352}
];