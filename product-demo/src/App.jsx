import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainCard from './components/MainCard';
import PageNav from './components/PageNav';
import ProductModal from './components/Modal';
import ProductManager from './components/ProductManager';
import { Card, CardContent, Container } from '@mui/material';
import { fetchProducts } from './services/api.js';
import localProducts from './services/localProducts';
import styles from './App.module.css';

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
    const syncProducts = async () => {
      setIsLoading(true);
      try {
        // Check if we need to import API products
        const API_DATA_VERSION = '1.0'; // Increment this if you want to re-import API data
        const lastApiVersion = localStorage.getItem('apiDataVersion');
        
        // Always get current products from localStorage
        let storedProducts = localProducts.getProducts();
        
        // If first time loading or version changed, import API products
        const shouldImportApiProducts = !lastApiVersion || lastApiVersion !== API_DATA_VERSION;
        
        if (shouldImportApiProducts) {
          console.log('Importing products from API...');
          // Clear existing products to avoid duplicates
          localProducts.clearAllProducts();
          
          // Fetch and import API products
          const apiProducts = await fetchProducts();
          apiProducts.forEach(product => localProducts.addProduct(product));
          
          // Update stored products reference
          storedProducts = localProducts.getProducts();
          
          // Mark API version to prevent re-importing
          localStorage.setItem('apiDataVersion', API_DATA_VERSION);
          console.log('Successfully imported', storedProducts.length, 'products from API');
        }
        
        // Update state with current products
        setProducts(storedProducts);
        setFilteredProducts(storedProducts);
      } catch (error) {
        console.error('Error syncing products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    syncProducts();
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

  const handleProductsUpdate = (updatedProducts) => {
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  return (
    <Container className={styles.container}>
      <Card>
        <CardContent>
          <Header />
          <div className={styles.contentContainer}>
            <div className={styles.searchContainer}>
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
            <div className={styles.buttonContainer}>
              <button 
                onClick={() => setShowProductManager(!showProductManager)}
                className={styles.manageButton}
              >
                {showProductManager ? 'Back to Products' : 'Manage Products'}
              </button>
            </div>
          </div>
          
          {showProductManager ? (
            <div style={{ marginTop: '1rem' }}>
              <ProductManager 
                products={products} 
                onProductsUpdate={handleProductsUpdate} 
              />
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
