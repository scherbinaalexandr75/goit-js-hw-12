import axios from 'axios';


export function getImagesByQuery(query) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '49643269-74a31c0e0e8d8dacbeb444743',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      if (response.data.hits.length === 0) {
        return Promise.reject('The images not found');
      }
      return response.data;
    })
    .catch(error => {
      console.log('An error has occurred', error);
      return Promise.reject(error);
    });
}