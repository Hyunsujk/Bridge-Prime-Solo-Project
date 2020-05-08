import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Map from "../../Map/Map";

class MapView extends Component {
  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MapView);
