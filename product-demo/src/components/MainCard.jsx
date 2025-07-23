// src/components/MainCard.jsx
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

function MainCard({ products }) {
  return (
    <TableContainer className='pt-6 rounded-lg'>
      <Table>
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell className="w-[80px] px-2 py-4 text-sm" sx={{ fontWeight: "bold" }}>Thumbnail</TableCell>
            <TableCell className="w-[80px] px-2 py-4 text-sm" sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell className="w-[400px] px-2 py-4 text-sm" sx={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell className="w-[120px] px-2 py-4 text-sm" sx={{ fontWeight: "bold" }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} hover>
              <TableCell>
                <img src={product.thumbnail} alt={product.name} className="w-16 h-16 rounded object-cover" />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                ₱{product.price.toLocaleString()}
                <Chip label={`${product.discount}% OFF`} color="primary" size="small" className="ml-2" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MainCard;
