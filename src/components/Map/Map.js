import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import MapBoxComponent from "../MapBoxComponent/MapBoxComponent";
import {
  withStyles,
  createStyles,
  fade,
  InputBase,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const customStyles = (theme) =>
  createStyles({
    search: {
      margin: "10px 0px",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.2),
      },
      marginLeft: 0,
      Width: "35%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "50%",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "#035aa6",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),

      width: "100%",
      border: "#035aa6",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
          border: "1px solid #035aa6",
        },
      },
    },
  });

class Map extends Component {
  onChange = (key) => (event) => {
    this.setState({
      ...this.state,
      [key]: event.target.value,
    });
  };
  search = (event) => {
    this.props.dispatch({
      type: "FETCH_OPEN_CAGE",
      payload: { search_string: this.state.search_string },
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>

          <InputBase
            placeholder="Location…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={this.onChange("search_string")}
          />

          <Button onClick={this.search}>Search</Button>
        </div>

        <div>
          <MapBoxComponent />
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(Map));
