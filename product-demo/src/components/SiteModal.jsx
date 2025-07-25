import React from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

function SiteModal({ open, onClose, product }) {
  const searchQuery = encodeURIComponent(product?.title || '');
  const googleUrl = `https://www.google.com/search?q=buy+${searchQuery}`;
  const shopeeUrl = `https://shopee.ph/search?keyword=${searchQuery}`;
  const lazadaUrl = `https://www.lazada.com.ph/catalog/?q=${searchQuery}`;
  const amazonUrl = `https://www.amazon.com/s?k=${searchQuery}`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 3, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 16, top: 16, zIndex: 1, backgroundColor: 'rgba(255,255,255,0.8)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' } }}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" sx={{ mb: 2 }}>Sites to Buy "{product?.title}"</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button variant="contained" color="primary" href={googleUrl} target="_blank" rel="noopener">Google Search</Button>
          <Button variant="contained" color="warning" href={shopeeUrl} target="_blank" rel="noopener">Shopee</Button>
          <Button variant="contained" color="info" href={lazadaUrl} target="_blank" rel="noopener">Lazada</Button>
          <Button variant="contained" color="success" href={amazonUrl} target="_blank" rel="noopener">Amazon</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SiteModal;
