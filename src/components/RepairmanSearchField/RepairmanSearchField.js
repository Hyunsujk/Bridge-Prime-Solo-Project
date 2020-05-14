import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles, createStyles, fade, InputBase } from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    search: {
      position: "relative",
      border: "3px solid black",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.2),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
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
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  });

class RepairmanSearchField extends Component {
  changeSearch = (event) => {
    this.props.dispatch({
      type: "SET_SEARCH",
      payload: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.search}>
        {/* <div className={classes.searchIcon}>
          <SearchIcon />
        </div> */}
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={this.changeSearch}
        />
      </div>
    );
  }
}

export default withStyles(customStyles)(connect()(RepairmanSearchField));
