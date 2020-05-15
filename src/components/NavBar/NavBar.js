import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  Typography,
  Toolbar,
  AppBar,
  withStyles,
  createStyles,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "left",
      margin: `0 0 ${theme.spacing(2)}`,
      width: "100%",
    },
    appBar: {
      background: "#FF9800",
    },
    linkContainer: {
      display: "flex",
      justifyContent: "flex-end",
      flexGrow: 1,
      flexDirection: "row",
      alignItems: "baseline",
    },
    linkText: {
      textDecoration: "none",
      color: "#fff",
      marginRight: "20px",
    },
    title: {
      flexGrow: 1,
      color: "#fff",
      display: "inline-block",
    },
    link: {
      flexGrow: 1,
      display: "inline-block",
    },
  });

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    let loginLinkData = {
      path: "/home",
    };

    if (this.props.store.user.id != null) {
      loginLinkData.path = "/main";
    }
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div>
              <Link to={loginLinkData.path} className={classes.linkText}>
                <Typography
                  variant="h4"
                  component="h1"
                  className={classes.title}
                >
                  Bridge
                </Typography>
              </Link>
            </div>

            <div className={classes.linkContainer}>
              {/* Show the link to the My Profile page and the logout button if the user is logged in */}
              {this.props.store.user.id && (
                <>
                  <Link to="/myprofile" className={classes.linkText}>
                    <Typography
                      variant="body1"
                      component="h2"
                      className={classes.link}
                    >
                      My Profile
                    </Typography>
                  </Link>
                  <LogOutButton />
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(NavBar));
