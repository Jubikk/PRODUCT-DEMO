import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function SearchBar() {

  



  return (
    <Box
      component="form"
      sx={{ width: '100%' }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField id="outline-basic"
                   variant="outlined" 
                   label="Search product"
                   fullWidth
                   error = ""
                   onChange= ""
                   

        />
      </div>
    </Box>


  );
}

export default SearchBar
