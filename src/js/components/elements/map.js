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

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: ""
        };
        this.list = {
            /* location icon */
            LOCATIONS_ICON_OBJ: {
                activity: activity,
                airplane: airplane,
                car: car,
                drink: drink,
                food: food,
                lodge: lodge,
                shopping: shopping,
                ticket: ticket,
                train: train,
                transport: transport
            }
        };
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

            this.setState({
                map: map
            });

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
            prevProps.planState.current_tab !== this.props.planState.current_tab
        ) {
            /* google map 初始化 */
            const state = this.props.planState;
            let map = this.state.map;
            let map_center = {
                lat: state.map_center.lat,
                lng: state.map_center.lng
            };
            let options = {
                zoom: state.map_zoom,
                center: map_center
            };

            map.setOptions(options);

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
                let locationsDayArray = Object.keys(all_detailed_obj);
                let locationsArray = [];
                for (let i = 0; i < locationsDayArray.length; i++) {
                    if (all_detailed_obj[i]) {
                        let locationsKeyArray = Object.keys(
                            all_detailed_obj[i]
                        );
                        for (let j = 0; j < locationsKeyArray.length; j++) {
                            let informationItem = all_detailed_obj[i][j];
                            let location = informationItem.location;
                            let name = informationItem.name;
                            let category = informationItem.category;
                            let address = informationItem.information.general_0;
                            let web = informationItem.information.general_3;

                            let location_icon;

                            /* 利用分類判斷 location icon */
                            const LOCATIONS_ICON_OBJ_KEY = Object.keys(
                                this.list.LOCATIONS_ICON_OBJ
                            );
                            for (
                                let i = 0;
                                i < LOCATIONS_ICON_OBJ_KEY.length;
                                i++
                            ) {
                                if (
                                    category.split("_")[1] ===
                                    LOCATIONS_ICON_OBJ_KEY[i]
                                ) {
                                    location_icon = this.list
                                        .LOCATIONS_ICON_OBJ[
                                        LOCATIONS_ICON_OBJ_KEY[i]
                                    ];
                                }
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
                    }
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

                /* 多個聚集點 */
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
                    minimumClusterSize: 5
                });

                /* 景點連線 */
                let currentDayAttractionArray = this.props.planState
                    .all_detailed_obj[
                    this.props.planState.current_tab.split("_")[1]
                ];

                // Define a symbol using a predefined path (an arrow)
                // supplied by the Google Maps JavaScript API.
                /* 箭頭指標 */
                const lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                    strokeColor: "rgba(31, 162, 255, .6)",
                    scale: 2.5
                };

                /* 取得當天所有點的經緯度 */
                let currentDayAllLocations = [];
                if (currentDayAttractionArray) {
                    for (let i = 0; i < currentDayAttractionArray.length; i++) {
                        let currentDayAttractionLocations =
                            currentDayAttractionArray[i].location;
                        if (currentDayAttractionLocations) {
                            currentDayAllLocations.push(
                                currentDayAttractionLocations
                            );
                        }
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
                        strokeColor: "rgba(31,162,255,.6)"
                    });
                }
            }
        }
    }
}
export default Map;
