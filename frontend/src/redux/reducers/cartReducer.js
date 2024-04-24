const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case 'updateCart':
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
