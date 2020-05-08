import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import {
  withStyles,
  createStyles,
  Container,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
} from "@material-ui/core/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

const customStyles = (theme) =>
  createStyles({
    primaryHdg: { margin: "20px 0" },
    card: { margin: "auto", textAlign: "center" },
    cardActionArea: { height: "300px" },
    cardContent: { margin: "10px" },
  });

class RegistrationMainPage extends Component {
  handleClick = (type) => (event) => {
    this.props.history.push(`/${type}`);
  };
  registerHomeowner = (event) => {
    this.props.dispatch({ type: "SET_TO_REGISTER_MODE_HOMEOWNER" });
    this.props.history.push("/hregistration");
  };
  registerRepairman = (event) => {
    this.props.dispatch({ type: "SET_TO_REGISTER_MODE_REPAIRMAN" });
    this.props.history.push("/rregistration");
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container maxWidth={false}>
          <div className={classes.primaryHdg}>
            <Typography component="h1" variant="h4">
              Join us on Bridge!
            </Typography>
          </div>
          <Grid container spacing={4}>
            <Grid item lg={6} sm={6} xs={12}>
              <Card
                variant="outlined"
                className={classes.card}
                onClick={this.registerHomeowner}
              >
                <CardActionArea className={classes.cardActionArea}>
                  <CardContent>
                    <FontAwesomeIcon icon={faHouseUser} size="9x" />
                    <Typography
                      component="h3"
                      variant="h5"
                      className={classes.cardContent}
                    >
                      I am a homeowner
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <Card
                variant="outlined"
                className={classes.card}
                onClick={this.registerRepairman}
              >
                <CardActionArea className={classes.cardActionArea}>
                  <CardContent>
                    <FontAwesomeIcon icon={faToolbox} size="9x" />
                    <Typography
                      component="h3"
                      variant="h5"
                      className={classes.cardContent}
                    >
                      I am a repairman
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(customStyles)(
  connect(mapStoreToProps)(RegistrationMainPage)
);
