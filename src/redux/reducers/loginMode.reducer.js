const loginMode = (state = "login", action) => {
  switch (action.type) {
    case "SET_TO_REGISTER_MODE":
      return "register";
    case "SET_TO_REGISTER_MODE_HOMEOWNER":
      return "registerHomeowner";
    case "SET_TO_REGISTER_MODE_REPAIRMAN":
      return "registerRepairman";
    default:
      return state;
  }
};

// loginMode will be on the redux state at:
// state.loginMode
export default loginMode;
