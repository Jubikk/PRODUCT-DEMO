import * as React from 'react';
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx';
import MainCard from './components/MainCard.jsx';
import PageNav from './components/PageNav.jsx';
import products from './utils/products.js';
import { Card,CardContent, Container } from '@mui/material';

function App(props) {
  return (
    <Container className= "py-4 rounded-2xl">
      <Card >
        <CardContent>
            <Header/>
            <SearchBar/>
            <MainCard products={products}/>
            <PageNav/>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;