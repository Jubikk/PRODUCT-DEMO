import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainCard from './components/MainCard';
import PageNav from './components/PageNav';
import ProductModal from './components/Modal';
import ProductManager from './components/ProductManager';
import { Card, CardContent, Container } from '@mui/material';
import { fetchProducts } from './services/api.js'; 

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductManager, setShowProductManager] = useState(false);


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
          <div style={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'stretch',
            gap: '0.75rem',
            margin: '1rem 0',
            width: '100%'
          }}>
            <div style={{
              flex: 1,
              minWidth: 0 // Prevents flex item from overflowing container
            }}>
              <SearchBar
                products={products}
                onSearchResult={results => {
                  setFilteredProducts(results);
                  setCurrentPage(0);
                }}
                onSearchStart={() => setIsSearching(true)}
                onSearchEnd={() => setIsSearching(false)}
                onSearchChange={setSearch}
                fullWidth
              />
            </div>
            <div style={{
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: '180px' }
            }}>
              <button 
                onClick={() => setShowProductManager(!showProductManager)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                {showProductManager ? 'Back to Products' : 'Manage Products'}
              </button>
            </div>
          </div>
          
          {showProductManager ? (
            <div style={{ marginTop: '1rem' }}>
              <ProductManager />
            </div>
          ) : (
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
          )}
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
