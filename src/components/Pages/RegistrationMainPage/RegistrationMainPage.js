import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
} from "@material-ui/core/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

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
    return (
      <div>
        <h2>Join us on Bridge!</h2>
        <Grid container>
          <Grid item lg={6} sm={6} xs={12}>
            <Card
              variant="outlined"
              style={{ margin: "5%" }}
              onClick={this.registerHomeowner}
            >
              <CardActionArea>
                <CardContent>
                  <FontAwesomeIcon icon={faHouseUser} />
                  <Typography component="h3" variant="h4">
                    I am a homeowner
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <Card
              variant="outlined"
              style={{ margin: "5%" }}
              onClick={this.registerRepairman}
            >
              <CardActionArea>
                <CardContent>
                  <FontAwesomeIcon icon={faToolbox} />
                  <Typography component="h3" variant="h4">
                    I am a repairman
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegistrationMainPage);
