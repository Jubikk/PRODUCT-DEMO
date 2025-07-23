// src/components/MainCard.jsx
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,Typography } from '@mui/material';

function MainCard({ products }) {
  return (
    <TableContainer className="pt-6 rounded-3xl">
      <Table >
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell className="w-[80px] px-2 py-4 text-sm" sx={{ fontWeight: "bold" }}>Thumbnail</TableCell>
            <TableCell className="w-[80px] px-2 py-4 text-sm" sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell className="w-[460px] px-2 py-4 text-sm" sx={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell className="w-[60px] px-2 py-4 text-sm" sx={{ fontWeight: "bold" }}>Price</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover className="cursor-pointer">
                <TableCell>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{product.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{product.description}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" className="text-blue-500" sx={{fontWeight:"bold"}}>₱{product.price}</Typography>
                  <Chip
                    label={`${Math.round(product.discountPercentage)}% OFF`}
                    color="primary"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MainCard;
