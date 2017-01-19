/* globals jest */

import * as ListingActions from '../actions/listing_actions';
import React from 'react';
import ListingFormContainer from '../components/listings/listing_form_container';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';

const fakeListing = {
  id: 1,
  title: "Title",
  body: "Body"
};
const fakeReducer = (oldState, action) => ({ listings: { 1: fakeListing } });
const fakeStore = createStore(fakeReducer, applyMiddleware(thunk));

describe('listing form container', () => {
  let listingFormNode;

  beforeEach(() => {
    ListingActions.updateListing = jest.fn(listing => dispatch => {});
    ListingActions.fetchListing = jest.fn(id => dispatch => {});
    ListingActions.createListing = jest.fn(listing => dispatch => {});
  });

  describe('creating a new listing', () => {
    beforeEach(() => {
      listingFormNode = mount(<ListingFormContainer formType="new" store={fakeStore} />);
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
      const fakeParams = { formType: 'edit', listingId: 1 };
      listingFormNode = mount(<ListingFormContainer store={fakeStore} params={fakeParams} />);
    });

    it('pre-fills title and body input fields with listing data from the store', () => {
      const titleInput = listingFormNode.find('input').first();
      const bodyInput = listingFormNode.find('textarea');

      expect(titleInput.props().value).toEqual(fakeListing.title);
      expect(bodyInput.props().value).toEqual(fakeListing.body);
    });

    it('triggers the correct action when submitted', () => {
      const form = listingFormNode.find('form');
      form.simulate('submit');

      expect(ListingActions.updateListing).toBeCalledWith(fakeListing);
    });
  });
});
