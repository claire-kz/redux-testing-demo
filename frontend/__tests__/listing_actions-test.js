/* globals jest */

jest.mock('react-router');

import {
  RECEIVE_ALL_LISTINGS,
  RECEIVE_LISTING,
  REMOVE_LISTING,
  fetchListings,
  fetchListing,
  createListing,
  updateListing,
  deleteListing
} from '../actions/listing_actions';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('listing actions', () => {
  describe('listing constants', () => {
    it('should contain a RECEIVE_ALL_LISTINGS constant', () => {
      expect(RECEIVE_ALL_LISTINGS).toEqual('RECEIVE_ALL_LISTINGS');
    });

    it('should contain a RECEIVE_LISTING constant', () => {
      expect(RECEIVE_LISTING).toEqual('RECEIVE_LISTING');
    });

    it('should contain a REMOVE_LISTING constant', () => {
      expect(REMOVE_LISTING).toEqual('REMOVE_LISTING');
    });
  });

  describe('thunks', () => {
    let ListingApiUtil,
        store;

    beforeEach(() => {
      ListingApiUtil = require('../util/listing_api_util');
      store = mockStore({ listings: {} });
    });

    describe('fetchListings', () => {
      it('should export a fetchListings function', () => {
        expect(typeof fetchListings).toEqual('function');
      });

      it('dispatches RECEIVE_ALL_LISTINGS when listings have been fetched', () => {
        const listings = { 1: { id: 1, title: "Test", body: "Works?"} };
        ListingApiUtil.fetchListings = jest.fn(() => (
          Promise.resolve(listings)
        ));
        const expectedActions = [{ type: "RECEIVE_ALL_LISTINGS", listings }];

        return store.dispatch(fetchListings()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('fetchListing', () => {
      it('should export a fetchListing function', () => {
        expect(typeof fetchListing).toEqual('function');
      });

      it('dispatches RECEIVE_LISTING when a single listing has been fetched', () => {
        const listings = { 1: { id: 1, title: "Test", body: "Works?"} };
        ListingApiUtil.fetchListing = jest.fn(id => (
          Promise.resolve({ [id]: listings[id] })
        ));
        const expectedActions = [{ type: "RECEIVE_LISTING", listing: listings }];

        return store.dispatch(fetchListing(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('createListing', () => {
      it('should export a createListing function', () => {
        expect(typeof createListing).toEqual('function');
      });

      it('dispatches RECEIVE_LISTING when a listing has been created', () => {
        const newListing = { title: "New Title", body: "New Body" };
        ListingApiUtil.createListing = jest.fn((listing) => (
          Promise.resolve({ 1: listing })
        ));
        const expectedActions = [{ type: "RECEIVE_LISTING", listing: { 1: newListing }}];

        return store.dispatch(createListing(newListing)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('updateListing', () => {
      it('should export an updateListing function', () => {
        expect(typeof updateListing).toEqual('function');
      });

      it('dispatches RECEIVE_LISTING when a listing has been updated', () => {
        const updatedListing = { title: "Updated Title", body: "Updated Body", id: 2 };
        ListingApiUtil.updateListing = jest.fn((listing) => (
          Promise.resolve({ [updatedListing.id]: updatedListing })
        ));
        const expectedActions = [{
          type: "RECEIVE_LISTING",
          listing: { [updatedListing.id]: updatedListing }
        }];

        return store.dispatch(updateListing(updatedListing)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('deleteListing', () => {
      it('should export a deleteListing function', () => {
        expect(typeof updateListing).toEqual('function');
      });

      it('dispatches REMOVE_LISTING when a listing has been deleted', () => {
        const listing = { title: "Title", body: "Body", id: 3 };

        ListingApiUtil.deleteListing = jest.fn((listing) => (
          Promise.resolve({ [listing.id]: listing })
        ));
        const expectedActions = [{
          type: "REMOVE_LISTING",
          listing: { [listing.id]: listing }
        }];

        return store.dispatch(deleteListing(listing)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });
});
