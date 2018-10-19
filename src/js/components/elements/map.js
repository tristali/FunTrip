import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/map.scss";
import app from "../../lib";
import * as firebase from "firebase";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div className={`map ${this.props.state.map}`} />;
    }
    componentDidMount() {
        /* google map 初始化 */
        if (app.get(".map")) {
            const state = this.props.planState;
            let map_center = {
                lat: state.map_center.lat,
                lng: state.map_center.lng
            };
            let options = {
                zoom: state.map_zoom,
                center: map_center
            };
            let map = new google.maps.Map(app.get(".map"), options);

            /* 標記地點起手式 */
            let marker = new google.maps.Marker({
                map: map
            });

            /* google map 自動輸入並抓取資料 */
            app.autocomplete(map, marker);

            // 載入路線服務與路線顯示圖層
            let directionsService = new google.maps.DirectionsService();
            let directionsDisplay = new google.maps.DirectionsRenderer();
            // 放置路線圖層
            directionsDisplay.setMap(map);

            let waypts = [
                {
                    location: { lat: 25.0128364, lng: 121.4693593 },
                    stopover: true
                },
                {
                    location: { lat: 25.0424825, lng: 121.5626854 },
                    stopover: true
                },
                {
                    location: { lat: 25.0424825, lng: 121.5626854 },
                    stopover: true
                }
            ];

            // 路線相關設定
            var request = {
                origin: { lat: 25.0424825, lng: 121.5626854 },
                destination: { lat: 25.0471826, lng: 121.5150107 },
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: "DRIVING"
            };

            // 繪製路線
            directionsService.route(request, function(result, status) {
                if (status == "OK") {
                    // 回傳路線上每個步驟的細節
                    // console.log(result.routes[0].legs[0].steps);
                    directionsDisplay.setDirections(result);
                } else {
                    // console.log(status);
                }
            });
        }
    }

    componentDidUpdate(prevProps) {
        /* 抓取 Database 所有此旅程資料 */
        if (
            prevProps.planState.map_center !==
                this.props.planState.map_center &&
            app.get(".map")
        ) {
            /* google map 初始化 */
            const state = this.props.planState;
            let map_center = {
                lat: state.map_center.lat,
                lng: state.map_center.lng
            };
            let options = {
                zoom: state.map_zoom,
                center: map_center
            };
            let map = new google.maps.Map(app.get(".map"), options);

            /* google map 標記多個位置 */
            let all_detailed_obj = this.props.planState.all_detailed_obj;
            if (all_detailed_obj) {
                let locationsKeyArray = Object.keys(all_detailed_obj);
                let locationsArray = [];
                for (let i = 0; i < locationsKeyArray.length; i++) {
                    let informationItem =
                        all_detailed_obj[locationsKeyArray[i]];
                    let location = informationItem.location;
                    let name = informationItem.name;
                    let category = informationItem.category;
                    let address = informationItem.information.general_0;
                    let web = informationItem.information.general_3;
                    let thisLocationObj = {
                        location: location,
                        name: `<div class="title clearfix"><div class="${
                            category.split("_")[0]
                        } ${
                            category.split("_")[1]
                        }"></div><div>${name}</div></div>`,
                        address: `<div class="address">${address}</div>`
                    };
                    if (web) {
                        thisLocationObj.web = `<div class="web"><a target= _blank href="${
                            web.split("<br />")[1]
                        }">${web.split("<br />")[1]}</a></div>`;
                    }
                    if (address) {
                        thisLocationObj.address = `<div class="address">${
                            address.split("<br />")[1]
                        }</div>`;
                    }
                    locationsArray.push([thisLocationObj]);
                }

                let markers = locationsArray.map(location => {
                    return new google.maps.Marker({
                        position: location[0].location,
                        icon: location[1]
                    });
                });

                /* 小標籤 */
                for (let i = 0; i < markers.length; i++) {
                    let infoWindow = new google.maps.InfoWindow({
                        content: `${locationsArray[i][0].name}${
                            locationsArray[i][0].address
                                ? locationsArray[i][0].address
                                : ""
                        }${
                            locationsArray[i][0].web
                                ? locationsArray[i][0].web
                                : ""
                        }`
                    });
                    markers[i].addListener("click", function() {
                        infoWindow.open(map, markers[i]);
                    });
                }

                let markerCluster = new MarkerClusterer(map, markers, {
                    imagePath:
                        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
                });
            }
        }
    }
}
export default Map;
