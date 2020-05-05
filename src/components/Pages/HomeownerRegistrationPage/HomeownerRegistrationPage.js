import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import TextField from "@material-ui/core/TextField";

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
        payload: {
          type_id: 1,
          login: {
            username: this.state.login.username,
            password: this.state.login.password,
          },
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          address_line1: this.state.address_line1,
          address_line2: this.state.address_line2,
          city: this.state.city,
          state: this.state.state,
          zip_code: this.state.zip_code,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleLoginChangeFor = (propertyName) => (event) => {
    this.setState({
      login: {
        [propertyName]: event.target.value,
      },
    });
  };

  render() {
    return (
      <div>
        <h2>Homeowner Registration Page</h2>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form>
          <div>
            <TextField
              type="text"
              label="Username"
              variant="outlined"
              value={this.state.login.username}
              onChange={this.handleLoginChangeFor("username")}
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={this.state.login.password}
              onChange={this.handleLoginChangeFor("password")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="First Name"
              variant="outlined"
              value={this.state.first_name}
              onChange={this.handleInputChangeFor("first_name")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Last Name"
              variant="outlined"
              value={this.state.last_name}
              onChange={this.handleInputChangeFor("last_name")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Email"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleInputChangeFor("email")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Address Line 1"
              variant="outlined"
              value={this.state.address_line1}
              onChange={this.handleInputChangeFor("address_line1")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Address Line 2"
              variant="outlined"
              value={this.state.address_line2}
              onChange={this.handleInputChangeFor("address_line2")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="City"
              variant="outlined"
              value={this.state.city}
              onChange={this.handleInputChangeFor("city")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="State"
              variant="outlined"
              value={this.state.state}
              onChange={this.handleInputChangeFor("state")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Zip Code"
              variant="outlined"
              value={this.state.zip_code}
              onChange={this.handleInputChangeFor("zip_code")}
            />
          </div>
        </form>
        <button onSubmit={this.registerHomeownerUser}>Create an account</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(HomeownerRegistrationPage);
