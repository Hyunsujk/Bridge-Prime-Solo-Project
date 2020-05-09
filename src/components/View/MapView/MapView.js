import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Map from "../../Map/Map";
import { Container, Grid, Typography } from "@material-ui/core";

class MapView extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_AVAILABLE_REPAIRMAN",
    });
  }

  render() {
    console.log(this.props.store.repairman);
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={8} lg={8} md={8} sm={12}>
            <Map />
          </Grid>
          <Grid item xs={4} lg={4} md={4} sm={12}></Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MapView);
