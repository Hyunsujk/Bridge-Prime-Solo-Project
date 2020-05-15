import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Map from "../../Map/Map";
import {
  Grid,
  Typography,
  withStyles,
  createStyles,
  Paper,
} from "@material-ui/core";
import RepairmanCardMapView from "../../RepairmanCardMapView/RepairmanCardMapView";

const customStyles = (theme) =>
  createStyles({
    heading: { margin: "20px 0px 10px", flexGrow: 1, fontWeight: "700" },
    headingPersonnel: { textAlign: "center", color: "#fff", paddingTop: "3px" },
    mapHeading: { textAlign: "center" },
    paper: { background: "#3498db", paddingBottom: "10px" },
    scrollContainer: {
      marginTop: "10px",
      maxHeight: "500px",
      overflow: "hidden",
      overflowY: "auto",
    },
  });

class MapView extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_AVAILABLE_REPAIRMAN",
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={8} lg={8} md={8} sm={12}>
            <div className={classes.mapHeading}>
              <Typography
                component="h1"
                variant="h5"
                className={classes.heading}
              >
                Find repair personnel in your area!
              </Typography>
            </div>
            <Map />
          </Grid>
          <Grid item xs={4} lg={4} md={4} sm={12}>
            <div className={classes.scrollContainer}>
              <Paper className={classes.paper}>
                <div className={classes.headingPersonnel}>
                  <Typography
                    component="h1"
                    variant="h5"
                    className={classes.heading}
                  >
                    Repair Personnel List
                  </Typography>
                </div>
                <RepairmanCardMapView />
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(MapView));
