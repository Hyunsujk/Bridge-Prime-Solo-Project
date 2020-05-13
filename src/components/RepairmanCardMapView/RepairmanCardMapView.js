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
  Chip,
  withStyles,
  createStyles,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    card: { margin: "10px" },
    chip: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  });

class RepairmanCardMapView extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_RADIUS",
    });
    this.props.dispatch({
      type: "FETCH_SPECIALTY",
    });
    // this.props.dispatch({
    //   type: "GET_AVAILABLE_REPAIRMAN",
    // });
  }

  handleClickCard = (event, id) => {
    this.props.history.push(`/repairman/${id}`);
  };

  render() {
    let repairmanSpecialty = "";
    const { classes } = this.props;

    return (
      <div>
        {this.props.repairman.availableRepairman.map((repairman, index) => {
          console.log("repairman", repairman);
          repairmanSpecialty = "";
          repairman.user_specialty_id.map((specialtyId, index) => {
            console.log("specialtyId", specialtyId);
            this.props.criteria.specialty.filter((specialty, index) => {
              if (specialty.id === specialtyId) {
                const specialtyName = specialty.specialty;
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
              className={classes.card}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" component="h1">
                    {repairman.first_name} {repairman.last_name}
                  </Typography>
                  <Typography variant="body2" component="h2">
                    Price Range: ${repairman.user_min_price} - $
                    {repairman.user_max_price}
                  </Typography>
                  <Typography>Specialty: {repairmanSpecialty}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default withStyles(customStyles)(
  withRouter(connect(mapStoreToProps)(RepairmanCardMapView))
);
