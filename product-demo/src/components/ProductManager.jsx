import React, { useState, useEffect } from 'react';
import localProducts from '../services/localProducts';
import ProductFormModal from './ProductFormModal';

const initialFormState = {
  id: '',
  title: '',
  description: '',
  thumbnail: '',
  price: '',
  discountPercentage: '',
  brand: '',
  category: 'smartphones', 
  stock: '',
  rating: '',
  images: [''] 
};

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(localProducts.getProducts());
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      ...form,
      id: Date.now().toString(),
      price: parseFloat(form.price),
      discountPercentage: parseFloat(form.discountPercentage) || 0,
      stock: parseInt(form.stock, 10),
      rating: parseFloat(form.rating) || 0,
      images: form.images.filter(img => img.trim() !== '')
    };
    localProducts.addProduct(newProduct);
    setProducts(localProducts.getProducts());
    setIsAddModalOpen(false);
    setForm(initialFormState);
  };
  
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...form,
      price: parseFloat(form.price),
      discountPercentage: parseFloat(form.discountPercentage) || 0,
      stock: parseInt(form.stock, 10),
      rating: parseFloat(form.rating) || 0,
      images: form.images.filter(img => img.trim() !== '')
    };
    localProducts.updateProduct(updatedProduct);
    setProducts(localProducts.getProducts());
    setIsEditModalOpen(false);
    setForm(initialFormState);
  };
  
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      localProducts.deleteProduct(id);
      setProducts(localProducts.getProducts());
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product List</h2>
        <button
          onClick={() => {
            setForm(initialFormState);
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Product
        </button>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <div className="flex justify-end space-x-2 mt-3">
              <button
                onClick={() => {
                  setForm({ ...product, images: [...product.images] });
                  setIsEditModalOpen(true);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
  
      {/* Add Product Modal */}
      {isAddModalOpen && (
        <ProductFormModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddProduct}
          title="Add New Product"
          product={form}
          onChange={handleInputChange}
        />
      )}
  
      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <ProductFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateProduct}
          title="Edit Product"
          product={form}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};
export default ProductManager;