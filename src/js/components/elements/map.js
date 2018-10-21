import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../../scss/map.scss";
import app from "../../lib";

/* locations icon */
import activity from "../../../img/location_icon/activity.png";
import airplane from "../../../img/location_icon/airplane.png";
import car from "../../../img/location_icon/car.png";
import drink from "../../../img/location_icon/drink.png";
import food from "../../../img/location_icon/food.png";
import lodge from "../../../img/location_icon/lodge.png";
import shopping from "../../../img/location_icon/shopping.png";
import ticket from "../../../img/location_icon/ticket.png";
import train from "../../../img/location_icon/train.png";
import transport from "../../../img/location_icon/transport.png";
import location_bg from "../../../img/location_icon/location_bg.png";
import marker_clusterer from "../../../img/location_icon/marker_clusterer.png";
// const LOCATIONS_ICON_ARRAY = [
//     activity,
//     airplane,
//     car,
//     drink,
//     food,
//     lodge,
//     shopping,
//     ticket,
//     train,
//     transport
// ];
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
        if (app.get(".map") && google) {
            this.props.handleStateChange({
                stateName: "loading",
                value: false
            });

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
            let thisEnvironment = this;
            app.autocomplete(map, thisEnvironment);
        }
    }

    /* 抓取 Database 所有此旅程資料 */
    componentDidUpdate(prevProps) {
        if (
            prevProps.planState.map_center !==
                this.props.planState.map_center ||
            prevProps.planState.all_detailed_obj !==
                this.props.planState.all_detailed_obj ||
            prevProps.planState.current_day !== this.props.planState.current_day
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

            if (
                prevProps.planState.map_center !==
                this.props.planState.map_center
            ) {
                /* 標記地點起手式 */
                let marker = new google.maps.Marker({
                    map: map,
                    position: map_center,
                    icon: location_bg
                });
            }

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

                    let location_icon;
                    if (category.split("_")[1] === "activity") {
                        location_icon = activity;
                    }
                    if (category.split("_")[1] === "airplane") {
                        location_icon = airplane;
                    }
                    if (category.split("_")[1] === "car") {
                        location_icon = car;
                    }
                    if (category.split("_")[1] === "drink") {
                        location_icon = drink;
                    }
                    if (category.split("_")[1] === "food") {
                        location_icon = food;
                    }
                    if (category.split("_")[1] === "lodge") {
                        location_icon = lodge;
                    }
                    if (category.split("_")[1] === "shopping") {
                        location_icon = shopping;
                    }
                    if (category.split("_")[1] === "ticket") {
                        location_icon = ticket;
                    }
                    if (category.split("_")[1] === "train") {
                        location_icon = train;
                    }
                    if (category.split("_")[1] === "transport") {
                        location_icon = transport;
                    }

                    let thisLocationObj = {
                        icon: location_icon,
                        location: location,
                        name: `<div class="title clearfix"><div class="${
                            category.split("_")[0]
                        } ${
                            category.split("_")[1]
                        }"></div><div>${name}</div></div>`,
                        address: `<div class="address">${address}</div>`
                    };
                    if (web) {
                        thisLocationObj.web = `<div class="web">${
                            web.split("<br />")[1]
                        }</div>`;
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
                        icon: location[0].icon
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
                    styles: [
                        {
                            url: marker_clusterer,
                            height: 65,
                            width: 65,
                            textColor: "white",
                            textSize: 15
                        }
                    ],
                    gridSize: 100,
                    minimumClusterSize: 3
                });

                /* 景點連線 */
                let currentDayTextDOMArray = app.getAll(
                    `${this.props.planState.current_day} li.text`
                );

                // Define a symbol using a predefined path (an arrow)
                // supplied by the Google Maps JavaScript API.
                const lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                    strokeColor: "rgba(31, 162, 255, .8)",
                    scale: 2.5
                };

                /* 取得當天所有點的經緯度 */
                let currentDayAllLocations = [];
                for (let i = 0; i < currentDayTextDOMArray.length; i++) {
                    let currentDayTextDOMId = currentDayTextDOMArray[i].id;
                    if (currentDayTextDOMId) {
                        currentDayAllLocations.push({
                            lat: Number(currentDayTextDOMId.split("_")[1]),
                            lng: Number(currentDayTextDOMId.split("_")[3])
                        });
                    }
                }
                for (let i = 0; i < currentDayAllLocations.length - 1; i++) {
                    let path = [];
                    path.push(currentDayAllLocations[i]);
                    path.push(currentDayAllLocations[i + 1]);
                    new google.maps.Polyline({
                        path: path,
                        icons: [
                            {
                                icon: lineSymbol,
                                offset: "47%"
                            }
                        ],
                        map: map,
                        strokeColor: "rgba(31,162,255,.8)"
                    });
                }
            }
        }
    }
}
export default Map;
