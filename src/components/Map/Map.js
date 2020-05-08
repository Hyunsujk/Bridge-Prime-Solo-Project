import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
// import MapBoxComponent from "../MapBoxComponent/MapBoxComponent";

class Map extends Component {
  onChange = (key) => (event) => {
    this.setState(
      {
        ...this.state,
        [key]: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  search = (event) => {
    this.props.dispatch({
      type: "FETCH_OPEN_CAGE",
      payload: { search_string: this.state.search_string },
    });
  };

  render() {
    return (
      <div>
        <div>
          <input type="text" onChange={this.onChange("search_string")}></input>
          <button onClick={this.search}>SEARCH</button>
        </div>

        <div>{/* <MapBoxComponent /> */}</div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Map);
