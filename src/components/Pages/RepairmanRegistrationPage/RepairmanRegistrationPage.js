import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import TextField from "@material-ui/core/TextField";

class RepairmanRegistrationPage extends Component {
  state = {
    login: {
      username: "",
      password: "",
    },
    type_id: 2,
    first_name: "",
    last_name: "",
    email: "",
    zip_code: "",
    radius_id: 0,
    specialty_id: "",
    min_price: "",
    max_price: "",
    introduction: "",
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_RADIUS",
    });
    this.props.dispatch({
      type: "FETCH_SPECIALTY",
    });
  }

  registerRepairmanUser = (event) => {
    event.preventDefault();

    if (this.state.login.username && this.state.login.password) {
      this.props.dispatch({
        type: "REGISTER_REPAIRMAN",
        payload: this.state,
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

  changeSelectedRadius = (event) => {
    console.log(event.target.value);
    this.setState({
      ...this.state,
      radius_id: event.target.value,
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
          <select onChange={this.changeSelectedRadius}>
            <option value="">Select a radius</option>
            {this.props.criteria.radius.map((item, index) => (
              <option key={index} value={item.id}>
                {item.radius}
              </option>
            ))}
          </select>
        </form>
        <button onSubmit={this.registerRepairmanUser}>Create an account</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RepairmanRegistrationPage);
