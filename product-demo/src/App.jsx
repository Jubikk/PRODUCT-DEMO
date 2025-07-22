import * as React from 'react';
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx';
import { CardContent, Container } from '@mui/material';

function App(props) {
  return (
    <Container>
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