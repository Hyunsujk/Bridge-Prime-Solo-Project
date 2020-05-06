import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import LoginForm from "../../LoginForm/LoginForm";
import homepageImage from "../../img/homepage.jpg";

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="grid">
          <div className="grid-col grid-col_8">
            <div>
              <h3>Are you a homeowner?</h3>
              <h4>Find a perfect repairman for your house!</h4>

              <h3>Are you a repairman?</h3>
              <h4>Share your work for your prospective customer</h4>
            </div>
            <LoginForm />
          </div>
          <div className="grid-col grid-col_4">
            <img src={homepageImage} width="300" alt="repair" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(HomePage);
