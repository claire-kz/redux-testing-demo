import { RECEIVE_ALL_LISTINGS,
         RECEIVE_LISTING,
         REMOVE_LISTING } from '../actions/listing_actions';
import merge from 'lodash/merge';

const ListingsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_LISTINGS:
      return merge({}, action.listings);
    case RECEIVE_LISTING:
      return merge({}, oldState, {[action.listing.id]: action.listing});
    case REMOVE_LISTING:
      let newState = merge({}, oldState);
      delete newState[action.listing.id];
      return newState;
    default:
      return oldState;
  }
};

export default ListingsReducer;
