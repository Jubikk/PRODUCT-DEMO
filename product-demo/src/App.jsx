import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainCard from './components/MainCard';
import PageNav from './components/PageNav';
import ProductModal from './components/Modal'; // Import the modal
import { Card, CardContent, Container } from '@mui/material';
import { fetchProducts } from './utils/products.js'; 

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

  useEffect(() => {
    const getProducts = async () => {
      const result = await fetchProducts();
      setProducts(result);
    };

    getProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
   
  const paginatedProducts = products.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <Container className="py-4 rounded-2xl">
      <Card>
        <CardContent>
          <Header />
          <SearchBar />
          <MainCard 
            products={paginatedProducts} 
            onProductClick={handleProductClick} // Pass click handler
          />
          <PageNav
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            totalItems={products.length}
            onPageChange={(event, newPage) => setCurrentPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setCurrentPage(0);
            }}
          />
        </CardContent>
      </Card>
      
      {/* Render the modal */}
      <ProductModal 
        open={selectedProduct !== null} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />
    </Container>
  );
}

export default App;
