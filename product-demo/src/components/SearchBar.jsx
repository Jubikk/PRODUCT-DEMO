import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import { useState, useRef } from 'react';

function SearchBar({ products, onSearchResult, onSearchStart, onSearchEnd }) {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (typeof onSearchChange === 'function') onSearchChange(value);
    setIsSearching(true);
    if (onSearchStart) onSearchStart();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!products || !onSearchResult) return;
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
      );
      onSearchResult(filtered);
      setIsSearching(false);
      if (onSearchEnd) onSearchEnd();
    }, 400);
  };


  const handleClear = () => {
    setSearch('');
    if (typeof onSearchChange === 'function') onSearchChange('');
    setIsSearching(true);
    if (onSearchStart) onSearchStart();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!products || !onSearchResult) return;
      onSearchResult(products);
      setIsSearching(false);
      if (onSearchEnd) onSearchEnd();
    }, 200);
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
          InputProps={{
            endAdornment: (
              search && (
                <InputAdornment position="end">
                  <IconButton aria-label="clear search" onClick={handleClear} edge="end">
                    <Close />
                  </IconButton>
                </InputAdornment>
              )
            )
          }}
        />
      </div>
    </Box>
  );
}

export default SearchBar
