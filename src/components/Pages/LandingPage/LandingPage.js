import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <h2>Landing Page</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
