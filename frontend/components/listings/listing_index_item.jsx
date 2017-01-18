import React from 'react';
import { Link, hashHistory } from 'react-router';

const editLink = id => e => {
    e.preventDefault();
    const url = `/listings/${id}/edit`;
    hashHistory.push(url);
};

const ListingIndexItem = ({ listing, router, deleteListing }) => (
  <li>
    <Link to={`/listings/${listing.id}`}>
      {listing.title}
    </Link>&nbsp;
    <button onClick={editLink(listing.id)}>Edit</button>&nbsp;
    <button onClick={() => deleteListing(listing.id)}>Delete</button>
  </li>
);

export default ListingIndexItem;
