import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { Container, Typography } from "@material-ui/core";

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
    const repairmanDetails = this.props.store.userDetails || [];
    console.log(repairmanDetails);
    const repairmanSpecialtyId = repairmanDetails.map((details) => {
      return details.user_specialty_id;
    });
    console.log(repairmanSpecialtyId);
    const repairmanRadiusId = repairmanDetails.map((details) => {
      return details.user_radius_id;
    });
    console.log(repairmanRadiusId);

    const repairmanSpecialtyDescription = repairmanSpecialtyId.map(
      (specialty, index) => {
        console.log("specialtyId", specialty);
        const repairmanSpecialtyName = specialty.map((specialtyId) => {
          console.log(specialtyId);
          const repairmanSpecialty = this.props.criteria.specialty.filter(
            (specialty) => {
              return specialty.id == specialtyId;
            }
          );
          console.log(repairmanSpecialty);
          return <p>{repairmanSpecialty[0].specialty}</p>;
        });
        return <div>{repairmanSpecialtyName}</div>;
      }
    );
    console.log(repairmanSpecialtyDescription);

    const selectedRadius = repairmanRadiusId.map((item) => {
      console.log(item);
      const repairmanRadius = this.props.criteria.radius.filter((radius) => {
        return radius.id === item;
      });
      return <p>{repairmanRadius[0] && repairmanRadius[0].radius}</p>;
    });

    let dataToDisplay = (
      <div>
        <Typography>
          {this.props.user.first_name} {this.props.user.last_name}
        </Typography>
        <Typography>
          Address: {this.props.user.address_line1}{" "}
          {this.props.user.address_line2} {this.props.user.city}{" "}
          {this.props.user.state} {this.props.user.zip_code}
        </Typography>
      </div>
    );

    if (this.props.user.type_id === 2) {
      dataToDisplay = (
        <div>
          <Typography>
            {this.props.user.first_name} {this.props.user.last_name}
          </Typography>
          <Typography>Introduction: {this.props.user.introduction}</Typography>
          <Typography>Zip Code: {this.props.user.zip_code}</Typography>
          <Typography>Radius:{selectedRadius} </Typography>
          <Typography>Specialty: {repairmanSpecialtyDescription}</Typography>
        </div>
      );
    }
    return (
      <div>
        <Container>{dataToDisplay}</Container>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProfileReviewPage);
