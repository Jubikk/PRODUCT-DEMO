import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { ThemeProvider } from '@mui/material/styles';

function Header() {
  return (
    <div flex justify-center items-center bg-primary text-white mb-4 MuiBox-root css-0>
      <AppBar className="flex justify-center items-center bg-primary text-white mb-4 MuiBox-root css-0">
      <h2 className="MuiTypography-root MuiTypography-h6 css-8xoudn">PRODUCT DEMO</h2>

      </AppBar>
    </div>
    
  );
}

export default Header