import React, { Component } from "react";
import ReactDOM from "react-dom";
import GoogleMapReact from 'google-map-react';
import "../../../scss/map.scss";

class Map extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render(){
        console.log(this.props.state.map_center);
        console.log(this.props.state.map_zoom);
        return(
            // Important! Always set the container height explicitly
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBpNTLNQdlFzvFinsEEghCLbYbk2GlJD7k" }}
                    defaultCenter={this.props.state.map_center}
                    defaultZoom={this.props.state.map_zoom}
                >
                    <AnyReactComponent
                        lat={23.5948988}
                        lng={119.8961738}
                        text={"Taiwan"}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

const AnyReactComponent = ({ text }) => (
    <div className="map_default_center">
        {text}
    </div>
);

export default Map;