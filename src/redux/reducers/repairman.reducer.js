import { combineReducers } from "redux";

const availableRepairman = (state = [], action) => {
  switch (action.type) {
    case "SET_AVAILABLE_REPAIRMAN":
      return action.payload;
    default:
      return state;
  }
};

const selectedRepairman = (state = [], action) => {
  switch (action.type) {
    case "SET_REPAIRMAN":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ availableRepairman, selectedRepairman });
