import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import { ThemeProvider } from '@mui/material/styles';

function Header() {
  return (
    <AppBar class="flex justify-center items-center bg-primary text-white mb-4 MuiBox-root css-0">
      <h2>PRODUCT DEMO</h2>

    </AppBar>
  );
}

export default Header