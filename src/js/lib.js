
let app = {
    firebase:{
        config:{
            apiKey: "AIzaSyBpNTLNQdlFzvFinsEEghCLbYbk2GlJD7k",
            authDomain: "funtrip-3d235.firebaseapp.com",
            databaseURL: "https://funtrip-3d235.firebaseio.com",
            // projectId: "funtrip-3d235",
            storageBucket: "funtrip-3d235.appspot.com",
            // messagingSenderId: "96865531068"
        }
    }
};

app.get = function(selector){
    return document.querySelector(selector);
};

app.getAll = function(selector){
    return document.querySelectorAll(selector);
};

app.firebase_signInWithPopup = function(firebase, provider, provider_name){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        firebase.auth().onAuthStateChanged(firebaseUser=>{
            firebase.database().ref("/users/" + firebaseUser.uid).on("value", function (snapshot) {
                if(!snapshot.val()){
                    firebase.database().ref("/users/" + firebaseUser.uid).set({
                        name:result.user.displayName,
                        email:result.user.email,
                        uid:firebaseUser.uid,
                        photoURL:result.user.photoURL,
                        provider:provider_name,
                    });  
                }
            });
        });
    }).catch(function(error) {
        console.log(error.code,"dddd");
        console.log(error.email,"dddd");
        console.log(error.credential,"dddd");
        if(error.code == "auth/account-exists-with-different-credential"){
            alert(`您好，此信箱 ( ${error.email} ) 已註冊為會員，再麻煩您使用 google 登入`);
        }
    });
};

// app.createElement=function(tagName,settings,parentElement){
//     let obj=document.createElement(tagName);
//     if(settings.atrs){app.setAttributes(obj,settings.atrs);}
//     if(settings.stys){app.setStyles(obj,settings.stys);}
//     if(settings.evts){app.setEventHandlers(obj,settings.evts);}
//     if(parentElement instanceof Element){parentElement.appendChild(obj);}
//     return obj;
// };
// app.modifyElement=function(obj,settings,parentElement){
//     if(settings.atrs){
//         app.setAttributes(obj,settings.atrs);
//     }
//     if(settings.stys){
//         app.setStyles(obj,settings.stys);
//     }
//     if(settings.evts){
//         app.setEventHandlers(obj,settings.evts);
//     }
//     if(parentElement instanceof Element&&parentElement!==obj.parentNode){
//         parentElement.appendChild(obj);
//     }
//     return obj;
// };
// app.setStyles=function(obj,styles){
//     for(let name in styles){
//         obj.style[name]=styles[name];
//     }
//     return obj;
// };
// app.setAttributes=function(obj,attributes){
//     for(let name in attributes){
//         obj[name]=attributes[name];
//     }
//     return obj;
// };
// app.setEventHandlers=function(obj,eventHandlers,useCapture){
//     for(let name in eventHandlers){
//         if(eventHandlers[name] instanceof Array){			
//             for(let i=0;i<eventHandlers[name].length;i++){
//                 obj.addEventListener(name,eventHandlers[name][i],useCapture);
//             }
//         }else{
//             obj.addEventListener(name,eventHandlers[name],useCapture);
//         }
//     }
//     return obj;
// };

export default app;