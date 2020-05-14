import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import RoomIcon from "@material-ui/icons/Room";
import {
  withStyles,
  createStyles,
  LinearProgress,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const customStyles = (theme) =>
  createStyles({
    pin: { color: "#f76262" },
  });

class MapBoxComponent extends Component {
  state = {
    viewport: {
      latitude: 39.100105,
      longitude: -94.5781416,
      zoom: 11,
      bearing: 0,
      pitch: 0,
    },
    selected: false,
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

  handleClickPopup = (event, id) => {
    this.props.history.push(`/repairman/${id}`);
  };

  render() {
    const { classes } = this.props;

    if (this.props.store.cord.updateNeeded) {
      this.forceUpdate();
    }

    const marker = this.props.availableRepairman
      .filter((repairman, index) => {
        return repairman.latitude != null && repairman.longitude != null;
      })
      .map((repairman, index) => {
        return (
          <Marker
            key={index}
            latitude={repairman.latitude}
            longitude={repairman.longitude}
          >
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.preventDefault();
                this.setState(
                  {
                    ...this.state,
                    selected: true,
                    selectedRepairmanInfo: repairman,
                  },
                  () => {
                    console.log(this.state);
                  }
                );
              }}
            >
              <RoomIcon className={classes.pin} />
            </IconButton>
          </Marker>
        );
      });

    return (
      <div>
        {marker.length > 0 ? (
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
            {this.state.selected ? (
              <Popup
                latitude={this.state.selectedRepairmanInfo.latitude}
                longitude={this.state.selectedRepairmanInfo.longitude}
                closeOnClick={false}
                onClose={() => {
                  this.setState({ ...this.state.viewport, selected: false });
                }}
              >
                <div>
                  {this.state.selectedRepairmanInfo.first_name}{" "}
                  {this.state.selectedRepairmanInfo.last_name}
                </div>
                <div>
                  <Button
                    size="small"
                    onClick={(event) => {
                      this.handleClickPopup(
                        event,
                        this.state.selectedRepairmanInfo.id
                      );
                    }}
                  >
                    <Typography variant="caption">View Profile</Typography>
                  </Button>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        ) : (
          <LinearProgress />
        )}
      </div>
    );
  }
}

export default withStyles(customStyles)(
  withRouter(connect(mapStoreToProps)(MapBoxComponent))
);
