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
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} hover>
              <TableCell>
                <img src={product.thumbnail} alt={product.name} className="w-16 h-16 rounded object-cover" />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{product.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">₱{product.price}</Typography>
                <Chip label={`${product.discount}% OFF`} color="primary" size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MainCard