import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import {
  Container,
  Typography,
  Button,
  TextField,
  withStyles,
  createStyles,
  Grid,
  Chip,
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
    root: {
      marginBottom: "63px",
      marginTop: "50px",
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
    textField: {
      width: "350px",
      margin: "5px",
    },
    paperContainer: {
      width: "75%",
      margin: "10% auto",
    },
    nameText: {
      margin: "20px",
      padding: "auto",
    },
    profileContent: {
      textAlign: "left",
    },
    profileButton: {
      margin: "10px",
      color: "#142850",
      "&:hover": {
        color: "#fff",
        background: "#035aa6",
      },
    },
    editContainer: {
      marginTop: "20px",
      margin: "auto",
      maxWidth: "75%",
    },
    priceRangeBox: { width: "170px", margin: "5px" },
    formControlSelect: {
      minWidth: "120px",
      marginLeft: "10px",
    },
    zipCodeBox: { display: "inline-block", marginLeft: "4px" },
    zipCode: { width: "210px", marginRight: "10px" },
  });

class ProfileReviewPage extends Component {
  state = {
    isEditable: false,
    specialty_id: {},
    first_name: "",
    last_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    email: "",
    zip_code: "",
    radius_id: "",
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
    this.props.dispatch({
      type: "GET_USER_DETAILS",
    });
  }

  handleEdit = (event) => {
    let checkedSpecialty = {};
    this.props.criteria.specialty.forEach((specialty) => {
      checkedSpecialty[specialty.id] = this.specialtyStatusCheck(specialty.id);
    });
    this.setState({
      isEditable: true,
      specialty_id: checkedSpecialty,
    });
  };

  specialtyStatusCheck = (id) => {
    let checkStatus = this.state.specialty_id[id] || false;
    if (this.props.store.userDetails[0].user_specialty_id != null) {
      this.props.store.userDetails[0].user_specialty_id.forEach(
        (specialtyId) => {
          if (id === specialtyId) {
            checkStatus = true;
          }
        }
      );
    }
    return checkStatus;
  };

  handleSave = (event) => {
    let checkboxStatus = Object.keys(this.state.specialty_id);

    let checkedBox = checkboxStatus.filter((itemKey) => {
      return this.state.specialty_id[itemKey];
    });

    const userDetails = this.props.store.userDetails[0];

    let newDetails = {
      ...this.state,
      id: this.props.user.id,
      type_id: this.props.user.type_id,
      specialty_id: checkedBox,
    };

    if (newDetails.type_id === 1) {
      if (newDetails.first_name == null || newDetails.first_name === "") {
        newDetails.first_name = this.props.user.first_name;
      }
      if (newDetails.last_name == null || newDetails.last_name === "") {
        newDetails.last_name = this.props.user.last_name;
      }
      if (newDetails.email == null || newDetails.email === "") {
        newDetails.email = this.props.user.email;
      }
      if (newDetails.address_line1 == null || newDetails.address_line1 === "") {
        newDetails.address_line1 = this.props.user.address_line1;
      }
      if (newDetails.address_line2 == null || newDetails.address_line2 === "") {
        newDetails.address_line2 = this.props.user.address_line2;
      }
      if (newDetails.city == null || newDetails.city === "") {
        newDetails.city = this.props.user.city;
      }
      if (newDetails.state == null || newDetails.state === "") {
        newDetails.state = this.props.user.state;
      }
      if (newDetails.zip_code == null || newDetails.zip_code === "") {
        newDetails.zip_code = this.props.user.zip_code;
      }
    } else if (newDetails.type_id === 2) {
      if (newDetails.first_name == null || newDetails.first_name === "") {
        newDetails.first_name = this.props.user.first_name;
      }
      if (newDetails.last_name == null || newDetails.last_name === "") {
        newDetails.last_name = this.props.user.last_name;
      }
      if (newDetails.email == null || newDetails.email === "") {
        newDetails.email = this.props.user.email;
      }
      if (newDetails.zip_code == null || newDetails.zip_code === "") {
        newDetails.zip_code = this.props.user.zip_code;
      }
      if (newDetails.radius_id == null || newDetails.radius_id === "") {
        newDetails.radius_id = userDetails.user_radius_id;
      }
      if (newDetails.min_price == null || newDetails.min_price === "") {
        newDetails.min_price = userDetails.user_min_price;
      }
      if (newDetails.max_price == null || newDetails.max_price === "") {
        newDetails.max_price = userDetails.user_max_price;
      }
      if (newDetails.introduction == null || newDetails.introduction === "") {
        newDetails.introduction = this.props.user.introduction;
      }
    }
    this.props.dispatch({
      type: "UPDATE_PROFILE",
      payload: newDetails,
    });
    this.setState({
      isEditable: false,
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
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

    const userDetails = this.props.store.userDetails[0] || [];
    const repairmanDetails = this.props.store.userDetails || [];

    let repairmanSpecialtyId = [];
    repairmanDetails.forEach((details) => {
      repairmanSpecialtyId = details.user_specialty_id;
    });

    let repairmanRadiusId = 0;
    repairmanDetails.forEach((details) => {
      repairmanRadiusId = details.user_radius_id;
    });

    let repairmanSpecialty = [];

    repairmanSpecialtyId.forEach((specialtyId) => {
      this.props.criteria.specialty.forEach((specialty, index) => {
        if (specialty.id === specialtyId) {
          repairmanSpecialty.push(
            <Chip key={index} label={specialty.specialty} variant="outlined" />
          );
        }
      });
    });

    let userRadiusNum = 0;
    this.props.criteria.radius.forEach((radius) => {
      if (radius.id === repairmanRadiusId) {
        userRadiusNum = radius.radius;
      }
    });

    let userDetail = (
      <div>
        <Typography className={classes.nameText} component="h1" variant="h4">
          {this.props.user.first_name} {this.props.user.last_name}
        </Typography>
        <div className={classes.profileContent}>
          <Typography>Email: {this.props.user.email}</Typography>
          <Typography>
            Address: {this.props.user.address_line1}{" "}
            {this.props.user.address_line2} {this.props.user.city}{" "}
            {this.props.user.state} {this.props.user.zip_code}
          </Typography>
        </div>
      </div>
    );

    if (this.props.user.type_id === 2) {
      userDetail = (
        <div>
          <Typography className={classes.nameText} component="h1" variant="h4">
            {this.props.user.first_name} {this.props.user.last_name}
          </Typography>
          <div className={classes.profileContent}>
            <Typography>Email: {this.props.user.email}</Typography>
            <Typography>Zip Code: {this.props.user.zip_code}</Typography>
            <Typography>Radius: {userRadiusNum} </Typography>
            <Typography>
              Introduction: {this.props.user.introduction}
            </Typography>
            <Typography>Specialty</Typography> <div>{repairmanSpecialty}</div>
          </div>
        </div>
      );
    }

    let editDetail = (
      <div>
        <Container>
          <div className={classes.editContainer}>
            <Grid container spacing={4}>
              <Grid item xs={6} lg={6} md={6} sm={12}>
                <div>
                  <TextField
                    type="text"
                    label="First Name"
                    variant="outlined"
                    className={classes.textField}
                    defaultValue={this.props.user.first_name}
                    onChange={this.handleInputChangeFor("first_name")}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    className={classes.textField}
                    defaultValue={this.props.user.last_name}
                    onChange={this.handleInputChangeFor("last_name")}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="Email"
                    variant="outlined"
                    className={classes.textField}
                    defaultValue={this.props.user.email}
                    onChange={this.handleInputChangeFor("email")}
                  />
                </div>
              </Grid>
              <Grid item xs={6} lg={6} md={6} sm={12}>
                <div>
                  <TextField
                    type="text"
                    label="Address Line 1"
                    variant="outlined"
                    className={classes.textField}
                    defaultValue={this.props.user.address_line1}
                    onChange={this.handleInputChangeFor("address_line1")}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="Address Line 2"
                    variant="outlined"
                    className={classes.textField}
                    defaultValue={this.props.user.address_line2}
                    onChange={this.handleInputChangeFor("address_line2")}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="City"
                    variant="outlined"
                    className={classes.textField}
                    defaultValue={this.props.user.city}
                    onChange={this.handleInputChangeFor("city")}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="State"
                    variant="outlined"
                    className={classes.textField}
                    defaultValue={this.props.user.state}
                    onChange={this.handleInputChangeFor("state")}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="Zip Code"
                    variant="outlined"
                    className={classes.textField}
                    defaultValue={this.props.user.zip_code}
                    onChange={this.handleInputChangeFor("zip_code")}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );

    if (this.props.user.type_id === 2) {
      editDetail = (
        <div className={classes.editContainer}>
          <Grid container spacing={4}>
            <Grid item xs={6} lg={6} md={6} sm={12}>
              <div>
                <TextField
                  type="text"
                  label="First Name"
                  variant="outlined"
                  className={classes.textField}
                  defaultValue={this.props.user.first_name}
                  onChange={this.handleInputChangeFor("first_name")}
                />
              </div>
              <div>
                <TextField
                  type="text"
                  label="Last Name"
                  variant="outlined"
                  className={classes.textField}
                  defaultValue={this.props.user.last_name}
                  onChange={this.handleInputChangeFor("last_name")}
                />
              </div>
              <div>
                <TextField
                  type="text"
                  label="Email"
                  variant="outlined"
                  className={classes.textField}
                  defaultValue={this.props.user.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </div>
              <div className={classes.zipCodeBox}>
                <TextField
                  type="text"
                  label="Zip Code"
                  variant="outlined"
                  className={classes.zipCode}
                  defaultValue={this.props.user.zip_code}
                  onChange={this.handleInputChangeFor("zip_code")}
                />
                <FormControl
                  variant="outlined"
                  className={classes.formControlSelect}
                >
                  <InputLabel id="radius">Radius</InputLabel>
                  <Select
                    labelId="radius"
                    id="radius"
                    defaultValue={userDetails.user_radius_id}
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
                  type="text"
                  label="Introduce Yourself"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={7}
                  className={classes.textField}
                  value={this.props.user.introduction}
                  onChange={this.handleInputChangeFor("introduction")}
                />
              </div>
              <div>
                <FormControl
                  variant="outlined"
                  className={classes.priceRangeBox}
                >
                  <InputLabel htmlFor="min_price">
                    Price Range : Min Price
                  </InputLabel>
                  <OutlinedInput
                    id="min_price"
                    defaultValue={userDetails.user_min_price}
                    onChange={this.handleInputChangeFor("min_price")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    labelWidth={180}
                  />
                </FormControl>
                <FormControl
                  variant="outlined"
                  className={classes.priceRangeBox}
                >
                  <InputLabel htmlFor="max_price">
                    Price Range : Max Price
                  </InputLabel>
                  <OutlinedInput
                    id="max_price"
                    defaultValue={userDetails.user_max_price}
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
                    Specialty
                  </Typography>
                  <Paper variant="outlined" className={classes.paper}>
                    <Grid container>
                      {this.props.criteria.specialty.map((item, index) => (
                        <Grid item xs={4} key={index}>
                          <div className={classes.checkbox}>
                            <FormControlLabel
                              id={item.id}
                              control={
                                <Checkbox
                                  checked={this.state.specialty_id[item.id]}
                                  name={item.specialty}
                                  onChange={(event) =>
                                    this.changeSelectedSpecialty(item, event)
                                  }
                                />
                              }
                              label={
                                <Typography component="h4" variant="body2">
                                  {item.specialty}
                                </Typography>
                              }
                            />
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Container>
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div>
        <Container maxWidth={false}>
          {this.state.isEditable ? (
            <div className={classes.root}>
              <Container maxWidth={false}>
                {editDetail}
                <div className={classes.buttonDisplay}>
                  <Button
                    variant="outlined"
                    onClick={this.handleSave}
                    className={classes.profileButton}
                  >
                    Save My Profile
                  </Button>
                </div>
              </Container>
            </div>
          ) : (
            <div className={classes.paperContainer}>
              <Paper variant="outlined">
                <center>
                  <Container maxWidth={false}>
                    {userDetail}
                    <Button
                      variant="outlined"
                      onClick={this.handleEdit}
                      className={classes.profileButton}
                    >
                      Edit My Profile
                    </Button>
                  </Container>
                </center>
              </Paper>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default withStyles(customStyles)(
  connect(mapStoreToProps)(ProfileReviewPage)
);
