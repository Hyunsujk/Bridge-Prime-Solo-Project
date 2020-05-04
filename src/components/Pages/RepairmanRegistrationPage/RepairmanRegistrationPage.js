import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class RepairmanRegistrationPage extends Component {
  render() {
    return (
      <div>
        <h2>Repairman Registration Page</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RepairmanRegistrationPage);
