import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
} from "@material-ui/core/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

class RegistrationMainPage extends Component {
  render() {
    return (
      <div>
        <h2>Registration Main Page</h2>
        <Grid container>
          <Grid item lg={6} sm={6} xs={12}>
            <Card variant="outlined" style={{ margin: "5%" }}>
              <CardActionArea>
                <CardContent>
                  <FontAwesomeIcon icon={faHouseUser} />
                  <h3>I am a homeowner</h3>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <Card variant="outlined" style={{ margin: "5%" }}>
              <CardActionArea>
                <CardContent>
                  <FontAwesomeIcon icon={faToolbox} />
                  <h3>I am a repairman</h3>
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
