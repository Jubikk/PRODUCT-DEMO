

const fetchProducts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products/category/smartphones');
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default fetchProducts;
