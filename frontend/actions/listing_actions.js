import * as ListingApiUtil from '../util/listing_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_ALL_LISTINGS = "RECEIVE_ALL_LISTINGS";
export const RECEIVE_LISTING = "RECEIVE_LISTING";
export const REMOVE_LISTING = "REMOVE_LISTING";

export const fetchListings = () => dispatch => (
  ListingApiUtil.fetchListings().then(listings => dispatch(receiveAllListings(listings)))
);

export const fetchListing = id => dispatch => (
  ListingApiUtil.fetchListing(id).then(listing => dispatch(receiveListing(listing)))
);

export const createListing = listing => dispatch => (
  ListingApiUtil.createListing(listing).then(listing => dispatch(receiveListing(listing)))
);

export const updateListing = listing => dispatch => (
  ListingApiUtil.updateListing(listing)
             .then(listing => dispatch(receiveListing(listing)))
             .then(hashHistory.push('/'))
);

export const deleteListing = listing => dispatch => (
  ListingApiUtil.deleteListing(listing).then(listing => dispatch(removeListing(listing)))
);

const receiveAllListings = listings => ({
  type: RECEIVE_ALL_LISTINGS,
  listings
});

const receiveListing = listing => ({
  type: RECEIVE_LISTING,
  listing
});

const removeListing = listing => ({
  type: REMOVE_LISTING,
  listing
});