import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

class ProfileReviewPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_RADIUS",
    });
    this.props.dispatch({
      type: "FETCH_SPECIALTY",
    });
    this.props.dispatch({
      type: "GET_USER_DETAILS",
    });
  }
  render() {
    return (
      <div>
        <h2>Profile Review Page</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProfileReviewPage);
