import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

class RegistrationMainPage extends Component {
  render() {
    return (
      <div>
        <h2>Registration Main Page</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegistrationMainPage);
