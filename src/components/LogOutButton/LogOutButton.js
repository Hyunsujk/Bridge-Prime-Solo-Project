import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles, createStyles, Button } from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    loginButton: {
      marginBottom: "10px",
      color: "#142850",
      "&:hover": {
        color: "#fff",
        background: "#035aa6",
      },
    },
  });

// const { classes } = this.props;

const LogOutButton = (props) => (
  <Button
    // className={classes.loginButton}
    // size="small"
    // This button shows up in multiple locations and is styled differently
    // because it's styled differently depending on where it is used, the className
    // is passed to it from it's parents through React props
    className={props.className}
    onClick={() => {
      props.dispatch({ type: "LOGOUT" });
      props.history.push("/home");
    }}
  >
    Log Out
  </Button>
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default withRouter(connect()(LogOutButton));
