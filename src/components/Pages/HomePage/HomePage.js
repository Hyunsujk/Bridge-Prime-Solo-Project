import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import LoginForm from "../../LoginForm/LoginForm";

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="grid">
          <div className="grid-col grid-col_8">
            <div>
              <p>
                Are you a homeowner? Find a perfect repairman for your house!
              </p>

              <p>
                Are you a repairman? Share your work for your prospective
                customer
              </p>
            </div>
            <LoginForm />
          </div>
          <div className="grid-col grid-col_4">
            <h3>Img</h3>
            {/* <button className="btn btn_sizeFull" onClick={this.onLogin}>
              Login
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(HomePage);
