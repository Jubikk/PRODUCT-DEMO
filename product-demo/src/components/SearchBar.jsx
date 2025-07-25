import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function SearchBar({ products, onSearchResult }) {
  const [search, setSearch] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!products || !onSearchResult) return;
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(value.toLowerCase()) ||
      product.description.toLowerCase().includes(value.toLowerCase())
    );
    onSearchResult(filtered);
  };

  return (
    <Box
      component="form"
      sx={{ width: '100%' }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outline-basic"
          variant="outlined"
          label="Search product"
          fullWidth
          value={search}
          onChange={handleChange}
        />
      </div>
    </Box>
  );
}

export default SearchBar
