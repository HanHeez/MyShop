import { combineReducers } from 'redux';
import typesReducer from './typesReducer';
import currentProductReducer from './currentProductReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import searchReducer from './searchReducer';


const reducer = combineReducers({
  types: typesReducer,
  currentProduct: currentProductReducer,
  cart: cartReducer,
  user: userReducer,
  search: searchReducer
});

export default reducer;