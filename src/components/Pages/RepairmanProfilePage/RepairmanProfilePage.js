import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Icon,
} from "@material-ui/core";

class RepairmanProfilePage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_RADIUS",
    });
    this.props.dispatch({
      type: "FETCH_SPECIALTY",
    });
    this.props.dispatch({
      type: "GET_REPAIRMAN",
      payload: this.props.match.params.id,
    });
  }

  render() {
    return <div>repairman profile page</div>;
  }
}

export default connect(mapStoreToProps)(RepairmanProfilePage);
