/* globals jest */

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ListingShowContainer from '../components/listings/listing_show_container';
import ListingShow from '../components/listings/listing_show';
import { Link } from 'react-router';
import { mount } from 'enzyme';
import * as ListingActions from '../actions/listing_actions';
import thunk from 'redux-thunk';

const testListing = {
  id: 1,
  title: "Title",
  body: "Body"
};
const testReducer = (oldState, action) => ({ listings: { [testListing.id]: testListing }});
const testStore = createStore(testReducer, applyMiddleware(thunk));

describe('listing show', () => {
  let listingShow;

  beforeEach(() => {
    ListingActions.fetchListing = jest.fn(() => dispatch => {});
    const testParams = { listingId: testListing.id };

    listingShow = mount(
      <ListingShowContainer store={testStore} params={testParams}/>
    ).find(ListingShow);
  });

  it('correctly maps state to props', () => {
    expect(listingShow.props().listing).toEqual(testListing);
  });

  it('correctly maps dispatch to props', () => {
    expect(listingShow.props().fetchListing).toBeDefined();
  });

  it('contains the listing information', () => {
    const renderedText = listingShow.text();

    expect(renderedText).toContain(testListing.title);
    expect(renderedText).toContain(testListing.body);
  });

  it('has a link to the listing index', () => {
    const showLink = listingShow.find(Link);

    expect(showLink).toBeDefined();
    expect(showLink.props().to).toEqual('/');
  });
});
