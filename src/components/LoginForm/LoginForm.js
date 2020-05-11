import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  withStyles,
  createStyles,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
} from "@material-ui/core";

const customStyles = (theme) =>
  createStyles({
    loginButton: {
      marginBottom: "10px",
      color: "#142850",
      "&:hover": {
        color: "#fff",
        background: "#035aa6",
      },
    },
    registerButton: {
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
    paper: {
      maxWidth: "300px",
    },
    loginBox: {
      marginLeft: "50px",
    },
    registerBox: {
      marginLeft: "50px",
      maxWidth: "300px",
      display: "flex",
      justifyContent: "flex-end",
      flexGrow: 1,
      alignItems: "baseline",
    },
  });

class LoginForm extends Component {
  state = {
    login: {
      username: "",
      password: "",
    },
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.login.username && this.state.login.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: this.state.login,
      });
      this.props.history.push("/main");
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
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
        {this.props.store.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h2>
        )}
        <div className={classes.loginBox}>
          <Typography component="h2" variant="body1">
            Login
          </Typography>
          <Paper variant="outlined" className={classes.paper}>
            <Container maxWidth={false}>
              <form onSubmit={this.login}>
                <div>
                  <TextField
                    type="text"
                    label="Username"
                    value={this.state.login.username}
                    onChange={this.handleInputChangeFor("username")}
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    label="Password"
                    value={this.state.login.password}
                    onChange={this.handleInputChangeFor("password")}
                  />
                </div>
                <div className={classes.buttonDisplay}>
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.loginButton}
                    onClick={this.login}
                  >
                    Log In
                  </Button>
                </div>
              </form>
            </Container>
          </Paper>
        </div>
        <div className={classes.registerBox}>
          <Typography component="h3" variant="body2">
            New to Bridge?
          </Typography>
          <Button
            size="small"
            className={classes.registerButton}
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
              this.props.history.push("/registration");
            }}
          >
            Register
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(
  withRouter(connect(mapStoreToProps)(LoginForm))
);
