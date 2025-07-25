// src/components/MainCard.jsx
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Typography, useMediaQuery, Box, Paper } from '@mui/material';

function MainCard({ products, onProductClick }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <Box className="pt-6">
        {products.map((product) => (
          <Paper
            key={product.id}
            onClick={() => onProductClick(product)}
            elevation={3}
            sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, borderRadius: 3, cursor: 'pointer' }}
            className="hover:shadow-lg transition-shadow"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', marginRight: 16 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {product.description.length > 60 ? product.description.slice(0, 60) + '...' : product.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" color="primary" fontWeight={700}>
                  ₱{product.price}
                </Typography>
                {product.rating && (
                  <Chip icon={<span>★</span>} label={product.rating.toFixed(2)} size="small" sx={{ fontWeight: 500 }} />
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  // Desktop/table view below
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
              <TableRow key={product.id} hover className="cursor-pointer" onClick={() => onProductClick(product)}>
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
