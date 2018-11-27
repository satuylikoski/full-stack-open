import axios from 'axios';
const allCountriesUrl = 'https://restcountries.eu/rest/v2/all';
const name = 'https://restcountries.eu/rest/v2/name';

const getAllCountries = () => {
  const request = axios.get(allCountriesUrl);
  return request
    .then(response => response.data);
};

const findCountries = search => {
  const request = axios.get(`${name}/${search}`);
  return request
    .then(response => response.data);

  // axios.get(`${name}/${search}`).then(response => {
  //   if (response.data.length > 10) {
  //     console.log('tullaanko tänne', response.data);
  //     return 'too many';
  //   } else {
  //     console.log('tullaanko tänne 2', response.data);
  //     return response.data.map((country) => country.name);
  //   }
  // });
};

export default { getAllCountries, findCountries };