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
  // createMuiTheme,
  // ThemeProvider,
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
    link: {
      display: "flex",
      justifyContent: "flex-end",
      flexGrow: 1,
    },
    linkText: {
      textDecoration: "none",
      color: "#fff",
    },
    title: {
      flexGrow: 1,
      color: "#fff",
    },
  });

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    let loginLinkData = {
      path: "/home",
      text: "Login / Register",
    };

    if (this.props.store.user.id != null) {
      loginLinkData.path = "/landing";
      loginLinkData.text = "Home";
    }
    return (
      <div className={classes.root}>
        {/* <ThemeProvider theme={theme}> */}
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div>
              <Link to="/home" className={classes.linkText}>
                <Typography
                  variant="h4"
                  component="h1"
                  className={classes.title}
                >
                  Bridge
                </Typography>
              </Link>
            </div>

            <div className={classes.link}>
              <Link to={loginLinkData.path} className={classes.linkText}>
                {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
                {loginLinkData.text}
              </Link>
              {/* Show the link to the info page and the logout button if the user is logged in */}
              {this.props.store.user.id && (
                <>
                  <Link to="/info">Info Page</Link>
                  <LogOutButton />
                </>
              )}
              {/* Always show this link since the about page is not protected */}
              <Link to="/about" className={classes.linkText}>
                About
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        {/* </ThemeProvider> */}
      </div>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(NavBar));
