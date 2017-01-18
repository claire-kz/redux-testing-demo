/* globals jest */

import React from 'react';
import { createStore } from 'redux';
import ListingShow from '../components/listings/listing_show';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

const fakeListing = {
  id: 1,
  title: "Title",
  body: "Body"
};
const fakeReducer = (oldState, action) => ({ listings: { 1: fakeListing } });
const fakeStore = createStore(fakeReducer);

describe('listing show', () => {
  let listingShowNode;

  beforeEach(() => {
    listingShowNode = shallow(<ListingShow store={fakeStore} listing={fakeListing} />);
  });

  it('contains the listing information', () => {
    const renderedText = listingShowNode.text();

    expect(renderedText).toContain(fakeListing.title);
    expect(renderedText).toContain(fakeListing.body);
  });

  it('has a link to the listing index', () => {
    const showLink = listingShowNode.find(Link);

    expect(showLink).toBeDefined();
    expect(showLink.node.props.to).toEqual('/');
  });
});
