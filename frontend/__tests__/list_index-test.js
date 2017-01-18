/* globals jest */

import React from 'react';
import { shallow } from 'enzyme';
import ListingIndexContainer from '../components/listings/listing_index_container';
import ListingIndexItem from '../components/listings/listing_index_item';
import ListingFormContainer from '../components/listings/listing_form_container';
import TestUtils from 'react-addons-test-utils';
import { createStore } from 'redux';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const listings = [
  { id: 1, title: "Title1" },
  { id: 2, title: "Title2" },
  { id: 3, title: "Title3" }
];
const fakeReducer = (oldState, action) => ({ listings });
const fakeStore = createStore(fakeReducer);

describe('listing index', () => {
  let listingIndexNode;

  beforeEach(() => {
    // shallow render allows us to unit test only highest level component
    //    i.e. test ListingIndex independently of ListingIndexItem
    listingIndexNode = shallow(<ListingIndexContainer store={fakeStore} params={listings}/>).shallow();
  });


  it('renders a ListingIndexItem for each listing, passing in each listing as a "listing" prop', () => {
    const listingIndexItems = listingIndexNode.find(ListingIndexItem).nodes;
    expect(listingIndexItems.length).toBe(3);

    // tests that each ListingIndexItem has correct props
    for(let i = 0; i < listingIndexItems.length; i++) {
      expect(listingIndexItems[i].props.listing).toBe(listings[i]);
    }
  });

  it('contains a ListingForm component', () => {
    const listingForm = listingIndexNode.find(ListingFormContainer).nodes;
    expect(listingForm.length).toBe(1);
  });
});