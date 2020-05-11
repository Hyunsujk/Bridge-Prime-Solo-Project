import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

import {
  withStyles,
  createStyles,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
const customStyles = (theme) => createStyles({});

class RepairmanProfilePage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_REPAIRMAN",
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: "FETCH_RADIUS",
    });
    this.props.dispatch({
      type: "FETCH_SPECIALTY",
    });
  }

  render() {
    const { classes } = this.props;
    const repairmanSpecialtyId =
      this.props.repairman.selectedRepairman.user_specialty_id || [];
    console.log(repairmanSpecialtyId);

    return (
      <Container>
        <Typography>
          {this.props.repairman.selectedRepairman.first_name}
          {this.props.repairman.selectedRepairman.last_name}
        </Typography>
        <Typography>
          {this.props.repairman.selectedRepairman.introduction}
        </Typography>
        <Typography>
          Price Range: ${this.props.repairman.selectedRepairman.user_min_price}{" "}
          - ${this.props.repairman.selectedRepairman.user_max_price}
        </Typography>
        <Typography>Specialty</Typography>
        {repairmanSpecialtyId.map((specialtyId, index) => {
          console.log("specialtyId", specialtyId);
          const repairmanSpecialty = this.props.criteria.specialty.filter(
            (specialty) => {
              return specialty.id == specialtyId;
            }
          );
          return (
            <p>{repairmanSpecialty[0] && repairmanSpecialty[0].specialty}</p>
          );
        })}
      </Container>
    );
  }
}

export default withStyles(customStyles)(
  connect(mapStoreToProps)(RepairmanProfilePage)
);
