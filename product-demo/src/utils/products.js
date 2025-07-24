// utils/product.js

export const fetchProducts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products/category/smartphones?limit=100&select=title,description,thumbnail,id,price,discountPercentage,brand,category,stock,rating,images');
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
