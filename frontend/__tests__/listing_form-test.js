/* globals jest */

import * as ListingActions from '../actions/listing_actions';
import React from 'react';
import ListingFormContainer from '../components/listings/listing_form_container';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';

const testListing = {
  id: 1,
  title: "Title",
  body: "Body"
};
const testReducer = (oldState, action) => ({ listings: { 1: testListing } });
const testStore = createStore(testReducer, applyMiddleware(thunk));

describe('listing form container', () => {
  let listingFormNode;

  beforeEach(() => {
    ListingActions.updateListing = jest.fn(listing => dispatch => {});
    ListingActions.fetchListing = jest.fn(id => dispatch => {});
    ListingActions.createListing = jest.fn(listing => dispatch => {});
  });

  describe('creating a new listing', () => {
    beforeEach(() => {
      listingFormNode = mount(<ListingFormContainer formType="new" store={testStore} />);
    });

    it('correctly maps state to props', () => {
      expect(listingFormNode.find('ListingForm').props().listing).toEqual({
        title: "", body: ""
      });
    });

    it('correctly maps dispatch to props', () => {
      expect(listingFormNode.find('ListingForm').props()).toBeDefined();
    });

    it('pre-fills title and body input fields with empty string', () => {
      const titleInput = listingFormNode.find('input').first();
      const bodyInput = listingFormNode.find('textarea');

      expect(titleInput.props().value).toEqual('');
      expect(bodyInput.props().value).toEqual('');
    });

    it('updates the title and body fields when they change', () => {
      const titleInput = listingFormNode.find('input').first();

      titleInput.simulate('change', {
        target: { value: 'telephone' }
      });

      expect(titleInput.props().value).toEqual('telephone');
    });

    it('triggers the correct action when submitted', () => {
      const form = listingFormNode.find('form');
      form.simulate('submit');

      expect(ListingActions.createListing).toBeCalled();
    });
  });

  describe('updating an existing listing', () => {
    beforeEach(() => {
      const testParams = { formType: 'edit', listingId: 1 };
      listingFormNode = mount(<ListingFormContainer store={testStore} params={testParams} />);
    });

    it('correctly maps state to props', () => {
      expect(listingFormNode.find('ListingForm').props().listing).toEqual(testListing);
    });

    it('correctly maps dispatch to props', () => {
      expect(listingFormNode.find('ListingForm').props().action).toBeDefined();
    });

    it('pre-fills title and body input fields with listing data from the store', () => {
      const titleInput = listingFormNode.find('input').first();
      const bodyInput = listingFormNode.find('textarea');

      expect(titleInput.props().value).toEqual(testListing.title);
      expect(bodyInput.props().value).toEqual(testListing.body);
    });

    it('triggers the correct action when submitted', () => {
      const form = listingFormNode.find('form');
      form.simulate('submit');

      expect(ListingActions.updateListing).toBeCalledWith(testListing);
    });
  });
});
