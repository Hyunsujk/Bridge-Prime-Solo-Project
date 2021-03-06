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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Paper,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    primaryHdg: { marginTop: "20px" },
    zipCodeBox: { display: "inline-block", marginLeft: "4px" },
    zipCode: { width: "210px", marginRight: "10px" },
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
    checkbox: {
      marginLeft: "10px",
    },
    checkboxBox: {
      color: "#FF9800",
      "&$checked": {
        color: "#FF9800",
      },
    },
    textField: {
      width: "400px",
      margin: "5px",
    },
    priceRangeBox: { width: "170px", margin: "5px" },
    formControlSelect: {
      minWidth: "120px",
      marginLeft: "10px",
    },
    form: {
      marginTop: "20px",
      margin: "auto",
      maxWidth: "75%",
    },
    warning: {
      color: "#fff",
      background: "red",
      textAlign: "center",
    },
  });

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
    radius_id: "",
    specialty_id: {},
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

    let checkboxStatus = Object.keys(this.state.specialty_id);

    let checkedBox = checkboxStatus.filter((itemKey) => {
      return this.state.specialty_id[itemKey];
    });

    if (this.state.login.username && this.state.login.password) {
      this.props.dispatch({
        type: "REGISTER_REPAIRMAN",
        payload: { ...this.state, specialty_id: checkedBox },
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

  changeSelectedRadius = (event) => {
    this.setState({
      ...this.state,
      radius_id: event.target.value,
    });
  };

  changeSelectedSpecialty = (item, event) => {
    this.setState({
      ...this.state,
      specialty_id: {
        ...this.state.specialty_id,
        [item.id]: event.target.checked,
      },
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container maxWidth={false}>
          <div className={classes.primaryHdg}>
            <Typography component="h1" variant="h4">
              Repair Personnel Registration Page
            </Typography>
            {this.props.errors.registrationMessage && (
              <Typography
                variant="h6"
                component="h1"
                className={classes.warning}
              >
                {this.props.errors.registrationMessage}
              </Typography>
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

                <div className={classes.zipCodeBox}>
                  <TextField
                    required
                    type="text"
                    label="Zip Code"
                    variant="outlined"
                    className={classes.zipCode}
                    value={this.state.zip_code}
                    onChange={this.handleInputChangeFor("zip_code")}
                  />
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.formControlSelect}
                  >
                    <InputLabel id="radius">Radius</InputLabel>
                    <Select
                      labelId="radius"
                      id="radius"
                      value={this.state.radius_id}
                      onChange={this.changeSelectedRadius}
                      label="Radius"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.props.criteria.radius.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.radius}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={6} lg={6} md={6} sm={12}>
                <div>
                  <TextField
                    required
                    type="text"
                    label="Introduce Yourself"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={7}
                    className={classes.textField}
                    value={this.state.introduction}
                    onChange={this.handleInputChangeFor("introduction")}
                  />
                </div>
                <div>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.priceRangeBox}
                  >
                    <InputLabel htmlFor="min_price">
                      Price Range : Min Price
                    </InputLabel>
                    <OutlinedInput
                      id="min_price"
                      onChange={this.handleInputChangeFor("min_price")}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      labelWidth={180}
                    />
                  </FormControl>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.priceRangeBox}
                  >
                    <InputLabel htmlFor="max_price">
                      Price Range : Max Price
                    </InputLabel>
                    <OutlinedInput
                      id="max_price"
                      onChange={this.handleInputChangeFor("max_price")}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      labelWidth={180}
                    />
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} lg={12} md={12}>
                <div>
                  <Container maxWidth={false}>
                    <Typography component="h3" variant="body1">
                      Specialty *
                    </Typography>
                    <Paper variant="outlined" className={classes.paper}>
                      <Grid container>
                        {this.props.criteria.specialty.map((item, index) => (
                          <Grid item xs={4} key={index}>
                            <div className={classes.checkbox}>
                              <FormControl required component="fieldset">
                                <FormControlLabel
                                  key={index}
                                  id={item.id}
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={
                                        this.state.specialty_id[item.id] ||
                                        false
                                      }
                                      name={item.specialty}
                                      onChange={(event) =>
                                        this.changeSelectedSpecialty(
                                          item,
                                          event
                                        )
                                      }
                                    />
                                  }
                                  label={
                                    <Typography component="h4" variant="body2">
                                      {item.specialty}
                                    </Typography>
                                  }
                                />
                              </FormControl>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Container>
                </div>
              </Grid>
            </Grid>
            <div className={classes.buttonDisplay}>
              <Button
                size="small"
                variant="outlined"
                className={classes.createAccountButton}
                onClick={this.registerRepairmanUser}
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
  connect(mapStoreToProps)(RepairmanRegistrationPage)
);
