import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class RepairmanProfileReviewPage extends Component {
  render() {
    return (
      <div>
        <h2>Repairman Profile Review Page</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RepairmanProfileReviewPage);
