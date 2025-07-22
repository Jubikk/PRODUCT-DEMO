import * as React from 'react';
import { Typography, Box } from '@mui/material';


function Header() {
  return (
    <Box className="bg-blue-500 text-white flex justify-center py-4 mb-4">
      <Typography variant="h5" fontWeight="bold">PRODUCTS DEMO</Typography>
    </Box>
  );
}

export default Header