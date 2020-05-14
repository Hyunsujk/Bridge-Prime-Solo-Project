import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import MapView from "../../View/MapView/MapView";
import {
  Container,
  Typography,
  withStyles,
  createStyles,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    heading: { margin: "20px 0px 10px", flexGrow: 1 },
    headingContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    headingPersonnel: {
      display: "flex-end",
      paddingRight: "60px",
    },
  });

class LandingPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container maxWidth={false}>
          <div className={classes.headingContainer}>
            <Typography component="h1" variant="h5" className={classes.heading}>
              Find repair personnel in your area!
            </Typography>
            <div className={classes.headingPersonnel}>
              <Typography
                component="h1"
                variant="h5"
                className={classes.heading}
              >
                Repair Personnel List
              </Typography>
            </div>
          </div>
          <MapView />
        </Container>
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(LandingPage));
