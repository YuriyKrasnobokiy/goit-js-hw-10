// const url = 'https://api.thecatapi.com/v1';
import axios from 'axios';
const api_key =
  'live_RmDtUb9qeeqylRXIzwFZNkT1uiCTBDcY1L7EywzvqNaQwrGVlr4VZrqKg5CR10qO';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = api_key;

function fetchBreeds() {
  // return fetch(`${url}/breeds?api_key=${api_key}`).then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // });

  return axios.get('/breeds').then(resp => resp.data);
}

function fetchCatByBreed(breedId) {
  // return fetch(
  //   `${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`
  // ).then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // });
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(resp => resp.data);
}

export { fetchBreeds, fetchCatByBreed };
