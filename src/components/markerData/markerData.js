import React, { Component } from "react";
import { Marker } from "react-map-gl";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class markerData extends Component {
  render() {
    return (
      <Marker
        latitude={39.100105}
        longitude={-94.5781416}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div>$</div>
      </Marker>
    );
  }
}

export default connect(mapStoreToProps)(markerData);
