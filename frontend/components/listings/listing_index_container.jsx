import { connect } from 'react-redux';
import ListingIndex from './listing_index';
import { fetchListings, deleteListing, createListing } from '../../actions/listing_actions';

const mapStateToProps = state => ({
  listings: Object.keys(state.listings).map(id => state.listings[id])
});

const mapDispatchToProps = dispatch => ({
  fetchListings: () => dispatch(fetchListings()),
  deleteListing: id => dispatch(deleteListing(id)),
  createListing: listing => dispatch(createListing(listing))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingIndex);
