import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

select.style.width = '600px';
select.style.padding = '20px 0 20px';
select.style.width = '300px';
select.style.fontSize = '25px';

// select.classList.add('visually-hidden');
select.style.display = 'none';
loader.classList.remove('visually-hidden');
error.classList.add('visually-hidden');
catInfo.classList.add('visually-hidden');

function createOption(arrBreedId) {
  loader.classList.add('visually-hidden');
  // select.classList.remove('visually-hidden');
  select.style.display = 'flex';
  return arrBreedId
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join();
}

fetchBreeds()
  .then(data => {
    select.innerHTML = createOption(data);
    new SlimSelect({
      select: select,
    });
  })
  .catch(onError);

select.addEventListener('change', onSelect);

function onSelect(event) {
  event.preventDefault();
  loader.classList.remove('visually-hidden');
  catInfo.classList.add('visually-hidden');
  // select.classList.add('visually-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url } = data[0];

      catInfo.innerHTML = `
      <div class="cat-card">
        <div class="cat-img">
          <img src="${url}" alt="cat" width="450" height="400"/>
        </div>
        <div class="cat-text">
        <h1 class="cat-title">${data[0].breeds[0].name}</h1>
        <h2 class="cat-temper">${data[0].breeds[0].temperament}</h2>
        <p class="cat-about">${data[0].breeds[0].description}</p>
        </div>
      </div>`;
      select.classList.remove('visually-hidden');
      catInfo.classList.remove('visually-hidden');
      loader.classList.add('visually-hidden');
    })
    .catch(onError);

  // select.value = null;
}

function onError() {
  select.style.display = 'flex';
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    {
      position: 'center-top',
    }
  );

  error.classList.add('visually-hidden');
  loader.classList.add('visually-hidden');
  catInfo.classList.add('visually-hidden');
}
