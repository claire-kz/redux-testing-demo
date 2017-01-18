import { connect } from 'react-redux';
import ListingForm from './listing_form';
import { fetchListing, createListing, updateListing } from '../../actions/listing_actions';

const mapStateToProps = (state, ownProps) => {
  let listing = { title: "", body: "" };
  if(ownProps.params) {
    listing = state.listings[ownProps.params.listingId];
  }
  let formType = ownProps.formType || "edit";
  return { listing, formType };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.formType === "new" ? createListing : updateListing;
  return {
    fetchListing: id => dispatch(fetchListing(id)),
    action: listing => dispatch(action(listing))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingForm);
