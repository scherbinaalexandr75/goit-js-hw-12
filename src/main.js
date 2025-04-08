import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import { renderImages, clearGallery } from './js/render-functions';

const form = document.querySelector('.form');
const searchBox = document.querySelector('input[name="search-text"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchBox.value.trim();
  if (query === '') {
    clearGallery(gallery);
    iziToast.error({
      position: 'topRight',
      message: 'Input field cannot be empty!',
    });
    return;
  }

  loader.style.display = 'inline-flex';

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        clearGallery(gallery);
      } else {
        renderImages(data.hits, gallery);
      }
    })
    .catch(error => {
      clearGallery(gallery);
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});
