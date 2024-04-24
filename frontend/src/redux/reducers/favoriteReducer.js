const favoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'updateFavorite':
      return action.payload;
    default:
      return state;
  }
};

export default favoriteReducer;
