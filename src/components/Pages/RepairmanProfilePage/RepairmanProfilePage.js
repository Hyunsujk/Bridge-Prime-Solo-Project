import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

import {
  withStyles,
  createStyles,
  Container,
  Typography,
  Paper,
  Chip,
} from "@material-ui/core";
const customStyles = (theme) =>
  createStyles({
    profileContent: {
      textAlign: "left",
      marginBottom: "20px",
    },
    nameText: {
      margin: "20px",
      padding: "auto",
    },
    container: {
      margin: "80px auto 30px",
      maxWidth: "75%",
      padding: "auto 0",
      height: "350px",
    },
    paper: { margin: "auto 0" },
  });

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
    let repairmanSpecialty = [];
    repairmanSpecialtyId.forEach((specialtyId) => {
      this.props.criteria.specialty.forEach((specialty) => {
        if (specialty.id === specialtyId) {
          repairmanSpecialty.push(
            <Chip label={specialty.specialty} variant="outlined" />
          );
        }
      });
    });

    return (
      <div className={classes.container}>
        <Paper variant="outlined" className={classes.paper}>
          <center>
            <Container maxWidth={false}>
              <div>
                <Typography
                  className={classes.nameText}
                  component="h1"
                  variant="h4"
                >
                  {this.props.repairman.selectedRepairman.first_name}{" "}
                  {this.props.repairman.selectedRepairman.last_name}
                </Typography>
                <div className={classes.profileContent}>
                  <Typography>
                    Email: {this.props.repairman.selectedRepairman.email}
                  </Typography>
                  <Typography>
                    {this.props.repairman.selectedRepairman.introduction}
                  </Typography>
                  <Typography>
                    Price Range: $
                    {this.props.repairman.selectedRepairman.user_min_price} - $
                    {this.props.repairman.selectedRepairman.user_max_price}
                  </Typography>
                  <Typography>Specialty</Typography>
                  {repairmanSpecialty}
                </div>
              </div>
            </Container>
          </center>
        </Paper>
      </div>
    );
  }
}

export default withStyles(customStyles)(
  connect(mapStoreToProps)(RepairmanProfilePage)
);
