import * as React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Chip} from '@mui/material'

function MainCard(cellphone) {
  return (
    <TableContainer className='pt-6 rounded-lg'>
      <Table>
        <TableHead className="bg-gray-100" font >
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}} >Thumbnail</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Name</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Description</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Price</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}

export default MainCard