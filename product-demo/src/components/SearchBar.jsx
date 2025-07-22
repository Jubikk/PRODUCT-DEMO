import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function SearchBar() {
  return (
    <Box
      component="form"
       sx={{ '& .MuiTextField-root': { m: 0, width: '130ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField id="basic" 
                   label="Search product" 
                   InputProps={{sx: {transition: "none !imporant", "&before, &after": {transition: "none !important"}}}}
                   InputLabelProps={{sx: {transition: "none !important"}}}
                   error = ""
                   onChange= ""
                   

        />
      </div>
    </Box>


  );
}

export default SearchBar
