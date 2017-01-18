/* globals jest */

import {
  fetchListing,
  fetchListings,
  deleteListing,
  updateListing,
  createListing
} from '../util/listing_api_util';

describe('the api util', () => {
  beforeEach(() => {
    global.$ = require.requireMock('jquery');
    global.$.ajax = jest.fn(options => "ajax promise");
  });

  afterEach(() => {
    global.$.ajax.mockClear();
  });

  it('fetchListings makes request and returns an ajax promise', () => {
    const returnValue = fetchListings();
    expect($.ajax).toBeCalled();

    // This line gets the first argument of the first call to $.ajax
    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('api/listings');
    expect(returnValue).toEqual("ajax promise");
  });

  it('fetchListing makes request and returns an ajax promise', () => {
    const returnValue = fetchListing(15);
    expect($.ajax).toBeCalled();

    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('api/listings/15');
    expect(returnValue).toEqual("ajax promise");
  });

  it('createListing makes request and returns an ajax promise', () => {
    const listing = { title: 'New Listing', body: 'Content' };
    const returnValue = createListing(listing);
    expect($.ajax).toBeCalled();

    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('api/listings');
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch(/post/i);
    expect(ajaxCallArg.data).toEqual({ listing });
    expect(returnValue).toEqual("ajax promise");
  });

  it('updateListing makes request and returns an ajax promise', () => {
    const listing = { id: 15, title: 'Existing Listing', body: 'Content' };
    const returnValue = updateListing(listing);
    expect($.ajax).toBeCalled();

    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('api/listings/15');
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch(/patch/i);
    expect(ajaxCallArg.data).toEqual({ listing });
    expect(returnValue).toEqual("ajax promise");
  });

  it('deleteListing makes request and returns an ajax promise', () => {
    const returnValue = deleteListing(15);
    expect($.ajax).toBeCalled();
    const ajaxCallArg = $.ajax.mock.calls[0][0];

    expect(ajaxCallArg.url).toEqual('api/listings/15');
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch(/delete/i);
    expect(returnValue).toEqual("ajax promise");
  });
});
