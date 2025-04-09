import axios from 'axios';

import images from '~/assets/images';


const BASE_URL = 'https://your-api-url.com/api/products';

// du lieu de demo
const searchResultData = [
    {
        id: 1,
        name: 'Túi 02 Ruột bút gel xóa được Thiên Long Officemate GRE-006',
        currentPrice: 90000,
        initPrice: 100000,
        thumbnail: images.searchResultItem,
    },
    {
        id: 2,
        name: 'Bút bi Thiên Long TL-08',
        currentPrice: 6000,
        initPrice: 8000,
        thumbnail: images.searchResultItem,
    },
    // ... thêm sản phẩm
];

const productApi = {
    searchFiveProducts: async (query) => {
    // try {
    //   const response = await axios.get(`${BASE_URL}/search`, {
    //     params: { q: query } // vd param: ?q=abc
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error('Error searching products:', error);
    //   throw error;
    // }
    console.log('call search product api: ' + query)
    return searchResultData;
  }
};

export default productApi;