const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "updateUserProfile":
      return action.payload;
    default:
      return state;
  }
};

export default userProfileReducer;
