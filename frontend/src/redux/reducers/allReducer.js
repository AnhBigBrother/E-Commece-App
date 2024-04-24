import userProfileReducer from './userProfileReducer';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';
import { combineReducers } from 'redux';

const allReducer = combineReducers({
  user: userProfileReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
});

export default allReducer;
