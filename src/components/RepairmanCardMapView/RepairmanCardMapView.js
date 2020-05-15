import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
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
  }

  handleClickCard = (event, id) => {
    this.props.history.push(`/repairman/${id}`);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.repairman.availableRepairman.map((repairman, index) => {
          let repairmanSpecialty = [];
          repairman.user_specialty_id.forEach((specialtyId) => {
            this.props.criteria.specialty.forEach((specialty, index) => {
              if (specialty.id === specialtyId) {
                repairmanSpecialty.push(
                  <Chip
                    key={index}
                    label={specialty.specialty}
                    variant="outlined"
                  />
                );
              }
            });
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
                  <Typography variant="body2" component="h2">
                    Specialty
                  </Typography>
                  <div>{repairmanSpecialty}</div>
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
