/* globals jest */

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ListingShowContainer from '../components/listings/listing_show_container';
import ListingShow from '../components/listings/listing_show';
import { Link } from 'react-router';
import { shallow, mount } from 'enzyme';
import * as ListingActions from '../actions/listing_actions';
import thunk from 'redux-thunk';

const fakeListing = {
  id: 1,
  title: "Title",
  body: "Body"
};
const fakeReducer = (oldState, action) => ({ listings: { 1: fakeListing }});
const fakeStore = createStore(fakeReducer, applyMiddleware(thunk));

describe('listing show', () => {
  let listingShowNode;

  beforeEach(() => {
    ListingShow.componentDidMount = jest.fn();
    ListingActions.fetchListing = jest.fn(() => dispatch => {});
    const fakeParams = { listingId: fakeListing.id };

    listingShowNode = mount(
      <ListingShowContainer store={fakeStore} params={fakeParams}/>
    ).find(ListingShow);
  });

  it('correctly maps state to props', () => {
    expect(listingShowNode.props().listing).toEqual(fakeListing);
  });

  it('correctly maps dispatch to props', () => {
    expect(listingShowNode.props().fetchListing).toBeDefined();
  });

  it('contains the listing information', () => {
    const renderedText = listingShowNode.text();

    expect(renderedText).toContain(fakeListing.title);
    expect(renderedText).toContain(fakeListing.body);
  });

  it('has a link to the listing index', () => {
    const showLink = listingShowNode.find(Link);

    expect(showLink).toBeDefined();
    expect(showLink.props().to).toEqual('/');
  });
});
