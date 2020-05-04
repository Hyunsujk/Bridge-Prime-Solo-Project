import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

class HomeownerRegistrationPage extends Component {
  render() {
    return (
      <div>
        <h2>Homeowner Registration Page</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(HomeownerRegistrationPage);
