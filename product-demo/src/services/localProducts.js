

const STORAGE_KEY = 'products';

const getProducts = () => {
  try {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error('Error getting products from localStorage:', error);
    return [];
  }
}

const addProduct = (product) => {
  try {
    const products = getProducts();
    // Check if product with same ID already exists
    if (!products.some(p => p.id === product.id)) {
      products.push(product);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
    return products;
  } catch (error) {
    console.error('Error adding product to localStorage:', error);
    throw error;
  }
} 

const updateProduct = (updatedProduct) => {
  try {
    const products = getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
    return products;
  } catch (error) {
    console.error('Error updating product in localStorage:', error);
    throw error;
  }
}

const deleteProduct = (id) => {
  try {
    const products = getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProducts));
    return filteredProducts;
  } catch (error) {
    console.error('Error deleting product from localStorage:', error);
    throw error;
  }
} 
const clearAllProducts = () => {
  localStorage.removeItem(STORAGE_KEY);
}

export default {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  clearAllProducts
}




