/* globals jest */

import ListingsReducer from '../reducers/listings_reducer';
import RootReducer from '../reducers/root_reducer';
import { createStore } from 'redux';

describe('Reducers', () => {
  describe('ListingsReducer', () => {
    it('exports an function', () => {
      expect(typeof ListingsReducer).toEqual('function');
    });

    it('should initialize with an empty object as the default state', () => {
      expect(ListingsReducer(undefined, {})).toEqual({});
    });

    it('should return the previous state if an action is not matched', () => {
      const oldState = { 1: 'oldState' };
      const newState = ListingsReducer(oldState, { type: 'unmatchedtype' });
      expect(newState).toEqual(oldState);
    });

    describe('handling the RECEIVE_ALL_LISTINGS action', () => {
      let action,
          fakeListings;

      beforeEach(() => {
        fakeListings = { 1: 'fakeListing1', 2: 'fakeListing2' };
        action = {
          type: 'RECEIVE_ALL_LISTINGS',
          listings: fakeListings
        };
      });

      it('should replace the state with the action\'s listings', () => {
        const state = ListingsReducer(undefined, action);
        expect(state).toEqual(fakeListings);
      });

      it('should not modify the old state', () => {
        let oldState = { 1: 'oldState' };
        ListingsReducer(oldState, action);
        expect(oldState).toEqual({ 1: 'oldState' });
      });
    });

    describe('handling the RECEIVE_LISTING action', () => {
      let action,
          fakeListing;

      beforeEach(() => {
        fakeListing = { id: 1, title: 'fakeListing' };
        action = {
          type: 'RECEIVE_LISTING',
          listing: fakeListing
        };
      });

      it('should add the listing to the state using the listing id as a key', () => {
        let state = ListingsReducer(undefined, action);
        expect(state[1]).toEqual(fakeListing);
      });

      it('should not affect the other listings in the state', () => {
        let oldState = { 2: 'oldState' };
        let state = ListingsReducer(oldState, action);
        expect(state[2]).toEqual('oldState');
      });
    });

    describe('handling the REMOVE_LISTING action', () => {
      let action,
          fakeListing;

      beforeEach(() => {
        fakeListing = { id: 1, title: 'fakeListing' };
        action = {
          type: 'REMOVE_LISTING',
          listing: fakeListing
        };
      });

      it('should remove the correct listing from the state', () => {
        let state = ListingsReducer({ 1: fakeListing }, action);
        expect(typeof state[1]).toEqual('undefined');
      });

      it('should not affect the other listings in the state', () => {
        let oldState = { 1: fakeListing, 2: 'oldState' };
        let state = ListingsReducer(oldState, action);
        expect(state[2]).toEqual('oldState');
      });
    });
  });

  describe('RootReducer', () => {
    let fakeStore;

    beforeAll(() => {
      fakeStore = createStore(RootReducer);
    });

    it('exports a function', () => {
      expect(typeof RootReducer).toEqual('function');
    });

    it('includes the ListingsReducer under the key `listings`', () => {
      const listing = { id: 1, title: 'Root Reducer', content: 'Testing' };
      const action = { type: 'RECEIVE_LISTING', listing };
      fakeStore.dispatch(action);

      expect(fakeStore.getState().listings).toEqual(ListingsReducer({ [listing.id]: listing }, action));
    });
  });

});
