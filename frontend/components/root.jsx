import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './app';
import ListingIndexContainer from './listings/listing_index_container';
import ListingFormContainer from './listings/listing_form_container';
import ListingShowContainer from './listings/listing_show_container';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ListingIndexContainer} />
        <Route path="/listings" component={ListingIndexContainer} />
        <Route path="/listings/:listingId" component={ListingShowContainer} />
        <Route path="/listings/:listingId/edit" component={ListingFormContainer} />
      </Route>
    </Router>
  </Provider>
);

export default Root;