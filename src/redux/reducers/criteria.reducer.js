import { combineReducers } from "redux";

const specialty = (state = [], action) => {
  switch (action.type) {
    case "SET_SPECIALTY":
      return action.payload;
    default:
      return state;
  }
};

const radius = (state = [], action) => {
  switch (action.type) {
    case "SET_RADIUS":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ specialty, radius });
