
export const fetchListings = () => (
  $.ajax({
    method: 'GET',
    url: 'api/listings',
  })
);

export const fetchListing = id => (
  $.ajax({
    method: 'GET',
    url: `api/listings/${id}`
  })
);

export const createListing = listing => (
  $.ajax({
    url: 'api/listings',
    method: 'POST',
    data: { listing }
  })
);

export const updateListing = listing => (
  $.ajax({
    url: `api/listings/${listing.id}`,
    method: 'PATCH',
    data: { listing }
  })
);

export const deleteListing = id => (
  $.ajax({
    url: `api/listings/${id}`,
    method: 'DELETE'
  })
);
