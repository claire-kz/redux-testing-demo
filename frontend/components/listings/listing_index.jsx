import React from 'react';
import ListingIndexItem from './listing_index_item';
import ListingFormContainer from './listing_form_container';

class ListingIndex extends React.Component {
  componentDidMount() {
    this.props.fetchListings();
  }

  render () {
    return (
      <div>
        <ul>
          {
            this.props.listings.map(listing => (
              <ListingIndexItem
                key={listing.id}
                deleteListing={this.props.deleteListing}
                listing={listing} />
            ))
          }
        </ul>
        <ListingFormContainer formType="new" />
      </div>
    );
  }
}

export default ListingIndex;
