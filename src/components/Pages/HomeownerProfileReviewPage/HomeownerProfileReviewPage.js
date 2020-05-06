import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class HomeownerProfileReviewPage extends Component {
  render() {
    return (
      <div>
        <h2>Homeowner Profile Review Page</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(HomeownerProfileReviewPage);
