import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Icon,
} from "@material-ui/core";

class RepairmanCardMapView extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_RADIUS",
    });
    this.props.dispatch({
      type: "FETCH_SPECIALTY",
    });
    this.props.dispatch({
      type: "GET_AVAILABLE_REPAIRMAN",
    });
  }

  handleClickCard = (event, id) => {
    this.props.history.push(`/repairman/${id}`);
  };

  render() {
    let repairmanSpecialty = "";

    return (
      <div>
        {this.props.repairman.availableRepairman.map((repairman, index) => {
          console.log("repairman", repairman);
          repairmanSpecialty = "";
          repairman.user_specialty_id.map((specialtyId, index) => {
            console.log("specialtyId", specialtyId);
            this.props.criteria.specialty.filter((specialty, index) => {
              if (specialty.id === specialtyId) {
                repairmanSpecialty = `${repairmanSpecialty} ${specialty.specialty}`;
              }
            });
            console.log("repairmanSpecialty", repairmanSpecialty);
          });
          return (
            <Card
              variant="outlined"
              key={index}
              onClick={(event) => this.handleClickCard(event, repairman.id)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography>
                    {repairman.first_name} {repairman.last_name}
                  </Typography>
                  <Typography>Specialty: {repairmanSpecialty}</Typography>
                  <Typography>
                    Price Range: ${repairman.user_min_price} - $
                    {repairman.user_max_price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(RepairmanCardMapView));
