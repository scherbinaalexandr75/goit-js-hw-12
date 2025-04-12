

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  renderImage,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const searchBox = document.querySelector('input[name="search-text"]');
let pageNow = 1;
let queryNow = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = searchBox.value.trim();

  if (query === '') {
    clearGallery();
    hideLoadMoreButton();
    iziToast.error({
      title: '',
      position: 'topRight',
      message: 'Input field cannot be empty!',
    });
    return;
  }

  pageNow = 1;
  queryNow = query;
  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(queryNow, pageNow);

    if (data.hits.length === 0) {
      clearGallery();
      iziToast.error({
        title: '',
        position: 'topRight',
        message: 'Вибачте, за вашим запитом нічого не знайдено.',
      });
      hideLoadMoreButton();
    } else {
      renderImage(data.hits);
      if (pageNow * 15 >= data.totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          title: '',
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    clearGallery();
    iziToast.error({
      title: '',
      position: 'topRight',
      message: 'Виникла помилка при завантаженні зображень. Спробуйте ще раз.',
    });
    hideLoadMoreButton();
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  pageNow += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(queryNow, pageNow);
    renderImage(data.hits);
    showLoadMoreButton();

    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (pageNow * 15 >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: '',
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    clearGallery();
    iziToast.error({
      title: '',
      position: 'topRight',
      message: 'Виникла помилка при завантаженні зображень. Спробуйте ще раз.',
    });
  } finally {
    hideLoader();
  }
});
