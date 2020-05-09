const repairman = (state = [], action) => {
  switch (action.type) {
    case "SET_REPAIRMAN":
      return action.payload;
    default:
      return state;
  }
};

export default repairman;
