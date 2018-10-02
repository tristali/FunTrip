import React, { Component } from "react";
import ReactDOM from "react-dom";
import GoogleMapReact from "google-map-react";
import "../../../scss/map.scss";
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
        return(
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: api.google }}
                    center={this.props.state.map_center}
                    zoom={this.props.state.map_zoom}
                >
                    <AnyReactComponent
                        lat={this.props.state.map_center.lat}
                        lng={this.props.state.map_center.lng}
                        text={"Here"}
                    />
                </GoogleMapReact>
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