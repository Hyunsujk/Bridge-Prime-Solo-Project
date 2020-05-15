import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import {
  TextField,
  withStyles,
  createStyles,
  Container,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    root: {
      marginBottom: "25px",
    },
    primaryHdg: { marginTop: "20px" },
    createAccountButton: {
      color: "#142850",
      "&:hover": {
        color: "#fff",
        background: "#035aa6",
      },
    },
    buttonDisplay: {
      display: "flex",
      justifyContent: "flex-end",
      flexGrow: 1,
    },
    form: {
      marginTop: "20px",
      margin: "auto",
      maxWidth: "75%",
    },
    textField: {
      width: "400px",
      margin: "5px",
    },
  });

class HomeownerRegistrationPage extends Component {
  state = {
    login: {
      username: "",
      password: "",
    },
    type_id: 1,
    first_name: "",
    last_name: "",
    email: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: "",
  };

  registerHomeownerUser = (event) => {
    event.preventDefault();
    if (this.state.login.username && this.state.login.password) {
      this.props.dispatch({
        type: "REGISTER_HOMEOWNER",
        payload: this.state,
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  handleLoginChangeFor = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      login: {
        ...this.state.login,
        [propertyName]: event.target.value,
      },
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container maxWidth={false} className={classes.root}>
          <div className={classes.primaryHdg}>
            <Typography component="h1" variant="h4">
              Homeowner Registration Page
            </Typography>
            {this.props.errors.registrationMessage && (
              <h2 className="alert" role="alert">
                {this.props.errors.registrationMessage}
              </h2>
            )}
          </div>
          <form className={classes.form}>
            <Grid container spacing={4}>
              <Grid item xs={6} lg={6} md={6} sm={12}>
                <div>
                  <TextField
                    required
                    type="text"
                    label="Username"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.login.username}
                    onChange={this.handleLoginChangeFor("username")}
                  />
                </div>
                <div>
                  <TextField
                    required
                    type="password"
                    label="Password"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.login.password}
                    onChange={this.handleLoginChangeFor("password")}
                  />
                </div>
                <div>
                  <TextField
                    required
                    type="text"
                    label="First Name"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.first_name}
                    onChange={this.handleInputChangeFor("first_name")}
                  />
                </div>
                <div>
                  <TextField
                    required
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.last_name}
                    onChange={this.handleInputChangeFor("last_name")}
                  />
                </div>
                <div>
                  <TextField
                    required
                    type="text"
                    label="Email"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleInputChangeFor("email")}
                  />
                </div>
              </Grid>
              <Grid item xs={6} lg={6} md={6} sm={12}>
                <div>
                  <TextField
                    required
                    type="text"
                    label="Address Line 1"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.address_line1}
                    onChange={this.handleInputChangeFor("address_line1")}
                  />
                </div>
                <div>
                  <TextField
                    required
                    type="text"
                    label="Address Line 2"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.address_line2}
                    onChange={this.handleInputChangeFor("address_line2")}
                  />
                </div>
                <div>
                  <TextField
                    required
                    type="text"
                    label="City"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.city}
                    onChange={this.handleInputChangeFor("city")}
                  />
                </div>
                <div>
                  <TextField
                    required
                    type="text"
                    label="State"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.state}
                    onChange={this.handleInputChangeFor("state")}
                  />
                </div>
                <div>
                  <TextField
                    required
                    type="text"
                    label="Zip Code"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.zip_code}
                    onChange={this.handleInputChangeFor("zip_code")}
                  />
                </div>
              </Grid>
            </Grid>

            <div className={classes.buttonDisplay}>
              <Button
                size="small"
                variant="outlined"
                className={classes.createAccountButton}
                onClick={this.registerHomeownerUser}
              >
                Create an account
              </Button>
            </div>
          </form>
        </Container>
      </div>
    );
  }
}

export default withStyles(customStyles)(
  connect(mapStoreToProps)(HomeownerRegistrationPage)
);
