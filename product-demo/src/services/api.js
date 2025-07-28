import axios from './axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('/products/category/smartphones?limit=100&select=title,description,thumbnail,id,price,discountPercentage,brand,category,stock,rating,images');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
