import React from 'react';
import { Link } from 'react-router';

class ListingShow extends React.Component {
  componentDidMount() {
    this.props.fetchListing(this.props.params.listingId);
  }

  componentWillReceiveProps(nextProps) {
    this.props.fetchListing(nextProps.params.listingId);
  }

  render () {
    const listing = this.props.listing;
    if (!listing) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{listing.title}</h3>
        <p>{listing.body}</p>
        <Link to="/">Back to Index</Link>
      </div>
    );
  }
}

export default ListingShow;
