import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/map.scss";
import app from "../../lib";
import * as firebase from "firebase";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map_center: {
                lat: 23.6,
                lng: 121
            },
            map_zoom: 8,
            locations: ""
        };
    }
    render() {
        console.log(this.state);
        return <div className="map" />;
    }
    componentDidMount() {

        // /* google map 初始化 */
        // const state = this.state;
        // let map_center = {
        //     lat: state.map_center.lat,
        //     lng: state.map_center.lng
        // };
        // let options = {
        //     zoom: state.map_zoom,
        //     center: map_center
        // };
        // let map = new google.maps.Map(app.get(".map"), options);
        // /* 標記地點起手式 */
        // let marker = new google.maps.Marker({
        //     map: map
        // });
        // /* google map 標記位置 */
        // app.setMarker({
        //     coords: map_center,
        //     marker: marker,
        //     map: map
        // });
        // /* google map 自動輸入並抓取資料 */
        // app.autocomplete(map, marker);

        // /* google map 標記多個位置 */

        // /* 抓取 Database 所有此旅程資料 */
        // firebase.auth().onAuthStateChanged(firebaseUser => {
        //     if (firebaseUser) {
        //         const planPath = firebase
        //             .database()
        //             .ref("plans/-LNyxY4e2Gs0k6Q-IDOx");
        //         planPath.on("value", snapshot => {
        //             const plan = snapshot.val();
        //             let locations = plan.detailed;
        //             let locationsKeyArray = Object.keys(locations);
        //             let locationsArray = [];
        //             for (let i = 0; i < locationsKeyArray.length; i++) {
        //                 let location = locations[locationsKeyArray[i]].location;
        //                 locationsArray.push([location]);
        //             }
        //             // this.setState({ locations: locationsArray });
        //             let markers = locationsArray.map(location => {
        //                 return new google.maps.Marker({
        //                     position: location[0],
        //                     icon: location[1]
        //                 });
        //             });
        //             let markerCluster = new MarkerClusterer(map, markers, {
        //                 imagePath:
        //                     "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
        //             });
        //         });
        //     }
        // });

        // /* 判斷使用者是否有同意分享目前座標權限 */
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(position => {
        //         console.log(position.coords);
        //         map.setZoom(11);
        //         map.setCenter({
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude
        //         });
        //         marker.setPosition({
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude
        //         });
        //         app.setMarker({
        //             coords: {
        //                 lat: position.coords.latitude,
        //                 lng: position.coords.longitude
        //             },
        //             marker: marker
        //         });
        //     });
        // }
    }
}
export default Map;

/* 每個行程點經緯度 */
var locations = [
    // [{lat: -42.734358, lng: 147.501315},"../src/img/transport.svg"],
    // [{lat: -42.735258, lng: 147.438000},"../src/img/transport.svg"],
    [{ lat: -43.999792, lng: 170.463352 }, "../src/img/transport.svg"]
];
