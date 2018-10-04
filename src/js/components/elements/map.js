import React, { Component } from "react";
import ReactDOM from "react-dom";
import {MyGoogleMap} from "../../lib";
// import GoogleMapReact from "google-map-react";
import "../../../scss/map.scss";
import app from "../../lib";
import api from "../../../../api/google";
// import app from "../../lib";

/* 插入 GoogleMap Libraries */
// const headDOM = app.get("head");
// let scriptDOM = document.createElement("script");
// scriptDOM.setAttribute("type","text/javascript");
// scriptDOM.setAttribute("src",api.google_lib);
// headDOM.appendChild(scriptDOM);

class Map extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render(){
        console.log(this.props.state,"--------");
        return(
            <div className="map"
                // onLoad={app.initMap(
                //     this.props.state.map_center.lat,
                //     this.props.state.map_center.lng,
                //     this.props.state.map_zoom
                // )}
            >
                <div id="infowindow-content">
                    <span id="place-name"  class="title"></span><br />
                    Place ID <span id="place-id"></span><br />
                    <span id="place-address"></span>
                </div>
                {
                    // app.initMap(
                    //     this.props.state.map_center.lat,
                    //     this.props.state.map_center.lng,
                    //     this.props.state.map_zoom
                    // )
                    // console.log(app.get(".map"))
                }
                {/* <MyGoogleMap 
                    state={this.props.state}
                /> */}
                {/* <GoogleMapReact
                    bootstrapURLKeys={{ key: api.google }}
                    center={this.props.state.map_center}
                    zoom={this.props.state.map_zoom}
                >
                    <AnyReactComponent
                        lat={this.props.state.map_center.lat}
                        lng={this.props.state.map_center.lng}
                        text={"Here"}
                    />
                </GoogleMapReact> */}
            </div>
        );
    }
}

const AnyReactComponent = ({ text }) => (
    <div className="map_center">
        {text}
    </div>
);

export default Map;

// const MyGoogleMap =({

// })=>{
//     return(

//     );
// };