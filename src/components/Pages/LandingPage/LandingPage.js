import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import MapView from "../../View/MapView/MapView";
import { Container, Typography } from "@material-ui/core";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Container maxWidth={false}>
          <Typography component="h1" variant="h4">
            Checkout who's available in your area!
          </Typography>
          <MapView />
        </Container>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
