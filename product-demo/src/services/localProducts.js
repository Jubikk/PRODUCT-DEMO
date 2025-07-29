

const getProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
}

const addProduct = (product) => {
  const products = getProducts();
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
} 

const updateProduct = (updateProduct ) => {
  const products = getProducts();   
  const index = products.findIndex(p => p.id === updateProduct.id); 
  if (index !== -1) {
    products[index] = updateProduct;
    localStorage.setItem('products', JSON.stringify(products));
  }
}

const deleteProduct = (id) => {
  const products = getProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(filteredProducts));
} 

export default {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}




