/* globals jest */

jest.mock('../components/listings/listing_index_item', () => (
  () => ({ render: () => ( <div></div> ) })
));
jest.mock('../components/listings/listing_form_container', () => {
  // need to name function so we can query for it later
  return function FormContainer() {
    return { render: () => ( <div></div> ) }
  }
});

import React from 'react';
import { mount } from 'enzyme';
import ListingIndexContainer from '../components/listings/listing_index_container';
import ListingIndex from '../components/listings/listing_index';
import * as ListingActions from '../actions/listing_actions';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const listings = {
  1: { id: 1, title: "Title1" },
  2: { id: 2, title: "Title2" },
  3: { id: 3, title: "Title3" }
};
const fakeReducer = (oldState, action) => ({ listings });
const fakeStore = createStore(fakeReducer, applyMiddleware(thunk));

describe('listing index container', () => {
  let listingIndex;

  describe('container component', () => {
    beforeEach(() => {
      ListingActions.fetchListings = jest.fn(() => dispatch => {});
      listingIndex = mount(<ListingIndexContainer store={fakeStore}/>).find(ListingIndex);
    });

    it('correctly maps state to props', () => {
      expect(listingIndex.props().listings).toEqual(Object.values(listings))
    });

    it('correctly maps dispatch to props', () => {
      expect(listingIndex.props().fetchListings).toBeDefined();
      expect(listingIndex.props().deleteListing).toBeDefined();
      expect(listingIndex.props().createListing).toBeDefined();
    });

    it('renders a ListingIndexItem for each listing, passing in each listing as a "listing" prop', () => {
      const listingIndexItems = listingIndex.find('ul').children();
      expect(listingIndexItems.nodes.length).toBe(3);

      listingIndexItems.forEach((item, i) => {
        expect(item.props().listing).toEqual(listings[i+1]);
      });
    });

    it('contains a ListingFormContainer component', () => {
      const listingForm = listingIndex.find('FormContainer');
      expect(listingForm.length).toBe(1);
    });
  });
});