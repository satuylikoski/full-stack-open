import axios from 'axios';

const COUNTRY_SEARCH_URL = 'https://restcountries.eu/rest/v2';

const findCountries = search => {
  const request = axios.get(`${COUNTRY_SEARCH_URL}/name/${search}`);
  return request.then(response => response.data);
};

export default { findCountries };
