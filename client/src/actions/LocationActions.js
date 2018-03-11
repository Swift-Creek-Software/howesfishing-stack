export const actionTypes = {
  fetchLocations: 'FETCH_LOCATIONS',
  fetchLocationsSuccess: 'FETCH_LOCATIONS_SUCCESS',
}

export const fetchLocations = () => {
  return {
    type: actionTypes.fetchLocations,
    payload: {
      client: 'base',
      request: {
        url: 'api/locations'
      },
    }
  }
}