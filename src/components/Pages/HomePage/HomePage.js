import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import LoginForm from "../../LoginForm/LoginForm";
import homepageImage from "../../img/homepage.jpg";
import { Container, Typography } from "@material-ui/core";

class HomePage extends Component {
  render() {
    return (
      <Container maxWidth={false}>
        <div>
          <div>
            <Typography component="h2" variant="h4">
              Are you a homeowner?
            </Typography>
            <Typography component="h3" variant="h5">
              Find a perfect repairman for your house!
            </Typography>

            <Typography component="h2" variant="h4">
              Are you a repairman?
            </Typography>
            <Typography component="h3" variant="h5">
              Share your work for your prospective customer
            </Typography>
          </div>
          <LoginForm />
        </div>
        <div>
          <img src={homepageImage} width="300" alt="repair" />
        </div>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(HomePage);
