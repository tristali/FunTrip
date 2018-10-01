import React, { Component } from "react";
import ReactDOM from "react-dom";
import GoogleMapReact from "google-map-react";
import "../../../scss/map.scss";
import api from "../../../../api/google";

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