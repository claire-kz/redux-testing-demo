/* globals jest */

import React from 'react';
import ListingIndexItem from '../components/listings/listing_index_item';
import { Link, hashHistory } from 'react-router';
import { shallow } from 'enzyme';

describe('listing index item', () => {
  let listing,
      listingIndexNode,
      deleteListing;

  beforeEach(() => {
    listing = {
      id: 1,
      title: "Title",
      body: "Body"
    };

    deleteListing = jest.fn();
    hashHistory.push = jest.fn();

    const props = {
      deleteListing,
      listing
    };

    listingIndexNode = shallow(<ListingIndexItem {...props} />);
  });

  it('should be a function', () => {
    expect(typeof ListingIndexItem).toEqual('function');
  });

  it('shows the listing\'s title as a Link to the listing\'s show page', () => {
    const showLink = listingIndexNode.find(Link);

    expect(showLink.node.props.children).toEqual(`${listing.title}`);
    expect(showLink.node.props.to).toEqual(`/listings/${listing.id}`);
  });

  it('has a button that links to the listing edit page', () => {
    const editButton = listingIndexNode.find('button').filterWhere(button =>
      /edit/i.test(button.node.props.children)
    );
    expect(editButton).toBeDefined();

    // click on Edit link with mock event object
    editButton.simulate('click', { preventDefault() { } });
    expect(hashHistory.push).toBeCalledWith(`/listings/${listing.id}/edit`);
  });

  it('has a button to delete listing', () => {
    const deleteButton = listingIndexNode.find('button').filterWhere(button =>
      /delete/i.test(button.node.props.children)
    );
    expect(deleteButton).toBeDefined();

    deleteButton.simulate('click');
    expect(deleteListing).toBeCalledWith(listing.id);
  });
});
