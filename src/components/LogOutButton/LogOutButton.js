import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, withStyles, createStyles } from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    logoutButton: {
      border: "none",
      backgroundColor: "#FF9800",
      color: "#192a56",
      "&:hover": {
        color: "#fff",
        background: "#035aa6",
      },
    },
  });

class LogOutButton extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Button
        className={classes.logoutButton}
        onClick={() => {
          this.props.dispatch({ type: "LOGOUT" });
          this.props.history.push("/home");
        }}
      >
        Log Out
      </Button>
    );
  }
}

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default withStyles(customStyles)(withRouter(connect()(LogOutButton)));
