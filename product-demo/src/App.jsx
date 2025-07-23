import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainCard from './components/MainCard';
import PageNav from './components/PageNav';
import { Card, CardContent, Container } from '@mui/material';
import { fetchProducts } from './utils/products.js'; // import fetch function

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await fetchProducts();
      setProducts(result);
    };

    getProducts();
  }, []);

  return (
    <Container className="py-4 rounded-2xl">
      <Card>
        <CardContent>
          <Header />
          <SearchBar />
          <MainCard products={products} />
          <PageNav />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
