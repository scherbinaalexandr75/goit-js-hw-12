// import axios from 'axios';

// export async function getImagesByQuery(query, page) {
//   try {
//     const response = await axios.get('https://pixabay.com/api/', {
//       params: {
//         key: '49643269-74a31c0e0e8d8dacbeb444743',
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: page,
//         per_page: 15,
//       },
//     });
//     console.log(response.data.hits);
//     return response.data.hits;
//   } catch (error) {
//     console.log('Error fetching images:');
//     throw error;
//   }
// }

import axios from 'axios';

const API_KEY = '49643269-74a31c0e0e8d8dacbeb444743';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });

    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error('Помилка запиту:', error);
    throw error;
  }
}