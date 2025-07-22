import * as React from 'react';
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx';
import { Card,CardContent, Container } from '@mui/material';

function App(props) {
  return (
    <Container className= "p-4">
      <Card>
        <CardContent>
        <Header/>
        <SearchBar/>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;