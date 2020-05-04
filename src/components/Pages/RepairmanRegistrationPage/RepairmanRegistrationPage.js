import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import TextField from "@material-ui/core/TextField";

class RepairmanRegistrationPage extends Component {
  state = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    zip_code: "",
    radius: "",
    specialty: "",
    min_price: "",
    max_price: "",
    introduction: "",
  };

  registerRepairmanUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "REGISTER_REPAIRMAN",
        payload: {
          type_id: 2,
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          zip_code: this.state.zip_code,
          radius: this.state.radius,
          specialty: this.state.specialty,
          min_price: this.state.min_price,
          max_price: this.state.max_price,
          introduction: this.state.introduction,
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
  render() {
    return (
      <div>
        <h2>Repairman Registration Page</h2>
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
              value={this.state.username}
              onChange={this.handleInputChangeFor("username")}
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
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
              label="Zip Code"
              variant="outlined"
              value={this.state.zip_code}
              onChange={this.handleInputChangeFor("zip_code")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Radius"
              variant="outlined"
              value={this.state.radius}
              onChange={this.handleInputChangeFor("radius")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Specialty"
              variant="outlined"
              value={this.state.specialty}
              onChange={this.handleInputChangeFor("specialty")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Min Price"
              variant="outlined"
              value={this.state.min_price}
              onChange={this.handleInputChangeFor("min_price")}
            />

            <TextField
              type="text"
              label="Max Price"
              variant="outlined"
              value={this.state.max_price}
              onChange={this.handleInputChangeFor("max_price")}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Introduce Yourself"
              variant="outlined"
              value={this.state.introduction}
              onChange={this.handleInputChangeFor("introduction")}
            />
          </div>
        </form>
        <button onSubmit={this.registerRepairmanUser}>Create an account</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RepairmanRegistrationPage);
