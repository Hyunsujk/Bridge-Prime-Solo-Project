import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import LoginForm from "../../LoginForm/LoginForm";
import homepageImage from "../../img/homepage.jpg";
import {
  Container,
  Typography,
  Grid,
  withStyles,
  createStyles,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    root: {
      textAlign: "left",
    },
    body: {
      margin: `90px 100px 0`,
      maxWidth: "500px",
    },
    image: {
      margin: `auto`,
    },
    loginForm: {
      marginTop: `50px`,
    },
  });
class HomePage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth={false}>
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={8} className={classes.body}>
            <div>
              <Typography component="h1" variant="h3">
                Welcome to Bridge!
              </Typography>
              <Typography component="h2" variant="h5">
                Where homeowners and repairmen connect
              </Typography>
            </div>
            <div className={classes.loginForm}>
              <LoginForm />
            </div>
          </Grid>
          <Grid item xs={4} className={classes.image}>
            <div>
              <img src={homepageImage} width="300" alt="repair" />
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(customStyles)(connect(mapStoreToProps)(HomePage));
