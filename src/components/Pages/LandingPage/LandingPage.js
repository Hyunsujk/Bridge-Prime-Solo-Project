import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import MapView from "../../View/MapView/MapView";
import { Container } from "@material-ui/core";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Container maxWidth={false}>
          <MapView />
        </Container>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
