import React from 'react';
import { Typography, Box } from '@mui/material';


function Header() {
  return (
    <Box className="bg-primary text-black flex justify-center py-4 mb-4">
      <Typography variant="h5">PRODUCTS DEMO</Typography>
    </Box>
  );
}

export default Header