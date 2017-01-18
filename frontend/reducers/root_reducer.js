import { combineReducers } from 'redux';
import ListingsReducer from './listings_reducer';

export default combineReducers({
  listings: ListingsReducer
});
