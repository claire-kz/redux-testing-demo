/* globals jest */

jest.mock('../actions/listing_actions');
const ListingActions = require('../actions/listing_actions');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ListingFormContainer from '../components/listings/listing_form_container';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';

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
      const root = (
        <Provider store={fakeStore}>
          <ListingFormContainer formType="new" />
        </Provider>
      );

      listingFormNode = document.createElement('div');
      ReactDOM.render(root, listingFormNode);
    });

    it('pre-fills title and body input fields with empty string', () => {
      const inputNodes = listingFormNode.querySelectorAll('input, textarea');
      const inputValues = [];

      for (let i = 0; i < inputNodes.length; i++) {
        if (inputNodes[i].value) {
          inputValues.push(inputNodes[i].value);
        }
      }

      // testing that no detectable default values have been provided
      expect(inputValues).toEqual(["Create Listing"]);
    });

    it('updates the title and body fields when they change', () => {
      const inputNode = listingFormNode.querySelector('input');

      TestUtils.Simulate.change(inputNode, {
        target: { value: 'telephone' }
      });

      expect(inputNode.value).toEqual('telephone');
    });

    it('triggers the correct action when submitted', () => {
      const form = listingFormNode.querySelector('form');
      TestUtils.Simulate.submit(form);

      expect(ListingActions.createListing).toBeCalled();
    });
  });

  describe('updating an existing listing', () => {
    beforeEach(() => {
      const fakeParams = { formType: 'edit', listingId: 1 };
      const root = (
        <Provider store={fakeStore}>
          <ListingFormContainer params={fakeParams} />
        </Provider>
      );

      listingFormNode = document.createElement('div');
      ReactDOM.render(root, listingFormNode);
    });

    it('pre-fills title and body input fields with listing data from the store', () => {
      const inputNodes = listingFormNode.querySelectorAll('input, textarea');
      const inputValues = [];

      for (let i = 0; i < inputNodes.length; i++) {
        if (inputNodes[i].value) {
          inputValues.push(inputNodes[i].value);
        }
      }

      expect(inputValues).toContain(fakeListing.title);
      expect(inputValues).toContain(fakeListing.body);
    });

    it('triggers the correct action when submitted', () => {
      const form = listingFormNode.querySelector('form');
      TestUtils.Simulate.submit(form);

      expect(ListingActions.updateListing).toBeCalledWith(fakeListing);
    });
  });
});
