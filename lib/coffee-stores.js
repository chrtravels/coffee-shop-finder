const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

export const fetchCoffeeStores = async () => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY
    }
  };

  const response = await fetch(
    getUrlForCoffeeStores("43.65115438290401%2C-79.37832859616533", 'coffee', 6), options)

  const data =  await response.json();

  return data.results;

  // .catch(err => console.error(err));
}
