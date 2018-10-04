import React, { Component } from "react";
import ReactDOM from "react-dom";

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

/* google map init */
app.initMap = function(map_center_lat,map_center_lng,map_zoom,locations,labels) {
    const input = app.get(".search_input");
    /* 座標中心 */
    let map_center = {
        lat: map_center_lat, 
        lng: map_center_lng
    };
    let options = {
        zoom: map_zoom,
        center: map_center,
    };
    let map = new google.maps.Map(app.get(".map"),options);
   
    /* 標記地點 */
    addMarker({
        coords:map_center,
        map:map,
        icon:"",
    });

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"});
    
    var autocomplete = new google.maps.places.Autocomplete(
        input, 
        {placeIdOnly: true}
    );
    autocomplete.bindTo("bounds", map);
    
    var geocoder = new google.maps.Geocoder;
    let marker = new google.maps.Marker({
        map: map
    });
 
    autocomplete.addListener("place_changed", function() {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            return;
        }
        geocoder.geocode({"placeId": place.place_id}, function(results, status) {

            if (status !== "OK") {
                window.alert("Geocoder failed due to: " + status);
                return;
            }
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);
            // Set the position of the marker using the place ID and location.
            marker.setPlace({
                placeId: place.place_id,
                location: results[0].geometry.location
            });
            marker.setVisible(true);

            var service = new google.maps.places.PlacesService(map);

            service.getDetails({
                placeId: place.place_id,
                fields: ["name",
                    "opening_hours",
                    "international_phone_number",
                    "website"
                ]
            }, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log("營業時間",place.opening_hours.weekday_text);

                    let placeDetailsArray = ["",
                        results[0].formatted_address,
                        place.international_phone_number,
                        place.website
                    ];
                    input.value = place.name;
                    for(let i =1; i<5; i++){
                        app.get(`.general>li:nth-child(${i})`).classList.add("current");
                        app.get(`.general>li:nth-child(${i}) textarea`).value = placeDetailsArray[i-1];
                    }

                }
            });

        });
    });
};
export default app;

  
/* 標記地點 */
function addMarker(props){
    let marker = new google.maps.Marker({ 
        map: props.map,
    });

    if(props.coords){
        marker.setPosition(props.coords);
    }

    /* 標記地點小圖像 */
    if(props.icon){
        marker.setIcon(props.icon);
    }

    /* 標記地點小標籤可以填入想填的內容 */
    if(props.content){
        let infoWindow = new google.maps.InfoWindow({
            content:props.content,
        });
        marker.addListener("click",function(){
            infoWindow.open(props.map, marker);
        });
    }
}    