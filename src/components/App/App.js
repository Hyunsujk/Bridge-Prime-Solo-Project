import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import LandingPage from "../Pages/LandingPage/LandingPage";
import HomeownerRegistrationPage from "../Pages/HomeownerRegistrationPage/HomeownerRegistrationPage";
import RepairmanRegistrationPage from "../Pages/RepairmanRegistrationPage/RepairmanRegistrationPage";

import "./App.css";
import "../fonts/fonts.css";
import HomePage from "../Pages/HomePage/HomePage";
import RegistrationMainPage from "../Pages/RegistrationMainPage/RegistrationMainPage";
import NavBar from "../NavBar/NavBar";
import RepairmanProfilePage from "../Pages/RepairmanProfilePage/RepairmanProfilePage";
import ProfileReviewPage from "../Pages/ProfileReviewPage/ProfileReviewPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route exact path="/home" component={HomePage} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the LandingPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the Home page. */}
            <ProtectedRoute exact path="/main" component={LandingPage} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/myprofile"
              component={ProfileReviewPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
            {/* <ProtectedRoute
              exact
              path="/home"
              authRedirect="/landing"
              component={HomePage}
            /> */}
            <ProtectedRoute
              exact
              path="/registration"
              authRedirect="/main"
              component={RegistrationMainPage}
            />
            <ProtectedRoute
              exact
              path="/hregistration"
              authRedirect="/main"
              component={HomeownerRegistrationPage}
            />
            <ProtectedRoute
              exact
              path="/rregistration"
              authRedirect="/main"
              component={RepairmanRegistrationPage}
            />
            <ProtectedRoute
              exact
              path="/repairman/:id"
              component={RepairmanProfilePage}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
