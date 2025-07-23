import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainCard from './components/MainCard';
import PageNav from './components/PageNav';
import { Card, CardContent, Container } from '@mui/material';
import { fetchProducts } from './utils/products.js'; 

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // important
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getProducts = async () => {
      const result = await fetchProducts();
      setProducts(result);
    };

    getProducts();
  }, []);
   
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
          <MainCard products={paginatedProducts} />
          <PageNav
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            totalItems={products.length}
            onPageChange={(event, newPage) => setCurrentPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setCurrentPage(0);  }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
