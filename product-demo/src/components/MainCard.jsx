import * as React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Chip} from '@mui/material'

function MainCard(cellphone) {
  return (
    <TableContainer className='pt-6 rounded-lg'>
      <Table>
        <TableHead className="bg-gray-100" font >
          <TableRow>
            <TableCell className= "w-[80px] px-2 py-4 text-sm" sx={{fontWeight:"bold"}} >Thumbnail</TableCell>
            <TableCell className= "w-[80px] px-2 py-4 text-sm"sx={{fontWeight:"bold"}}>Name</TableCell>
            <TableCell className="w-[400px] px-2 py-4 text-sm" sx={{fontWeight:"bold"}}>Description</TableCell>
            <TableCell className="w-[120px] px-2 py-4 text-sm"sx={{fontWeight:"bold"}}>Price</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}

export default MainCard