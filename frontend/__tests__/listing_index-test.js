/* globals jest */

import React from 'react';
import { shallow } from 'enzyme';
import ListingIndex from '../components/listings/listing_index';
import ListingIndexItem from '../components/listings/listing_index_item';
import ListingFormContainer from '../components/listings/listing_form_container';

const listings = [
  { id: 1, title: "Title1" },
  { id: 2, title: "Title2" },
  { id: 3, title: "Title3" }
];

describe('listing index presentational component', () => {
  let listingIndexNode;

  beforeEach(() => {
    listingIndexNode = shallow(<ListingIndex listings={listings}/>);
  });

  it('renders a ListingIndexItem for each listing, passing in each listing as a "listing" prop', () => {
    const listingIndexItems = listingIndexNode.find(ListingIndexItem);
    expect(listingIndexItems.nodes.length).toBe(3);

    listingIndexItems.forEach((item, i) => {
      expect(item.props().listing).toBe(listings[i]);
    });
  });

  it('contains a ListingForm component', () => {
    const listingForm = listingIndexNode.find(ListingFormContainer).nodes;
    expect(listingForm.length).toBe(1);
  });
});