import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class MapBoxComponent extends Component {
  state = {
    viewport: {
      latitude: 39.100105,
      longitude: -94.5781416,
      zoom: 11,
      bearing: 0,
      pitch: 0,
    },
  };

  viewportChange = (change) => {
    this.setState({
      viewport: change,
    });
  };

  clickMap = (event) => {
    console.log("lng: ", event.lngLat[0]);
    console.log("lat: ", event.lngLat[1]);
  };

  forceUpdate() {
    this.props.dispatch({ type: "MAP_FORCE_UPDATE_ENFORCED" });
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: this.props.store.cord.lat,
        longitude: this.props.store.cord.lng,
      },
    });
  }

  render() {
    if (this.props.store.cord.updateNeeded) {
      this.forceUpdate();
    }

    const marker = this.props.repairman.availableRepairman.map(
      (repairman, index) => {
        if (repairman.longitude && repairman.latitude) {
          return (
            <Marker
              key={index}
              latitude={repairman.latitude}
              longitude={repairman.longitude}
            >
              repairman
            </Marker>
          );
        }
      }
    );

    return (
      <ReactMapGL
        {...this.state.viewport}
        width="60vw"
        height="70vh"
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={this.viewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onClick={this.clickMap}
      >
        {marker}
      </ReactMapGL>
    );
  }
}

export default connect(mapStoreToProps)(MapBoxComponent);
