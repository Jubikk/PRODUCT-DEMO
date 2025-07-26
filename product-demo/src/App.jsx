import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainCard from './components/MainCard';
import PageNav from './components/PageNav';
import ProductModal from './components/Modal';
import { Card, CardContent, Container } from '@mui/material';
import { fetchProducts } from './utils/products.js'; 

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const result = await fetchProducts();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(result);
      setFilteredProducts(result);
      setIsLoading(false);
    };

    getProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
   
  const paginatedProducts = filteredProducts.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <Container className="py-4 rounded-2xl">
      <Card>
        <CardContent>
          <Header />
          <SearchBar
            products={products}
            onSearchResult={results => {
              setFilteredProducts(results);
              setCurrentPage(0);
            }}
            onSearchStart={() => setIsSearching(true)}
            onSearchEnd={() => setIsSearching(false)}
            onSearchChange={setSearch}
          />  
          <MainCard 
            products={paginatedProducts} 
            onProductClick={handleProductClick}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            totalItems={filteredProducts.length}
            onPageChange={(event, newPage) => setCurrentPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setCurrentPage(0);
            }}
            isLoading={isLoading}
            isSearching={isSearching}
            search={search}
          />
        </CardContent>
      </Card>
      <ProductModal 
        open={selectedProduct !== null} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />
    </Container>
  );
}

export default App;
