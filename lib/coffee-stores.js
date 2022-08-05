import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});


const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
  });
  const unsplashResults =  photos.response.results;

  const photoMap = unsplashResults.map((result) => {
    return result.urls['small'];
  })
  return photoMap
}


export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();
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

  return data.results.map((result, i) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighborhood: neighborhood > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[i] : null,
    }
  });

  // .catch(err => console.error(err));
}
