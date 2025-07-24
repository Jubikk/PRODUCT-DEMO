// src/components/ProductModal.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  Grid
} from '@mui/material';
import { Close, ChevronLeft, ChevronRight } from '@mui/icons-material';

function ProductModal({ open, onClose, product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;


  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.thumbnail];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }
          }}
        >
          <Close />
        </IconButton>

        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              {product.category?.toUpperCase() || 'PRODUCT'}
            </Typography>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              {product.title}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: '500px' }}>
              
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      maxWidth: '350px',
                      height: '300px',
                      borderRadius: 2,
                      overflow: 'hidden',
                      mb: 2
                    }}
                  >
                    <img
                      src={images[currentImageIndex]}
                      alt={product.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        margin: 'auto'
                      }}
                    />
                  {images.length > 1 && (
                    <>
                      <IconButton
                        onClick={handlePrevImage}
                        sx={{
                          position: 'absolute',
                          left: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                        }}
                      >
                        <ChevronLeft />
                      </IconButton>
                      
                      <IconButton
                        onClick={handleNextImage}
                        sx={{
                          position: 'absolute',
                          right: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    </>
                  )}
                </Box>

                {images.length > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 2 }}>
                    {images.map((image, index) => (
                      <Box
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: currentImageIndex === index ? '2px solid #1976d2' : '2px solid transparent',
                          opacity: currentImageIndex === index ? 1 : 0.7,
                          '&:hover': { opacity: 1 },
                          mx: 0.5
                        }}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' , }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                    ₱{product.price}
                  </Typography>
                  {product.discountPercentage > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Discount:
                      </Typography>
                      <Typography variant="body2" color="error" fontSize="17px" sx={{ mb: 1 }}>
                       {`${(product.discountPercentage)}% OFF`}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Box sx={{ mb: 4, flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Description:
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {product.description}
                  </Typography>
                </Box>
                {(product.brand || product.rating || product.stock) && (
                  <Box sx={{ mb: 4 }}>
                    {product.brand && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Brand:</strong><br/> {product.brand}
                      </Typography>
                    )}
                    {product.stock !== undefined && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Stock:</strong><br/> {product.stock} available
                      </Typography>
                    )}
                    {product.rating && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Rating:</strong><br/> {product.rating} / 5
                      </Typography>
                    )}
                  </Box>
                )}
                <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ py: 1.5, minWidth: 120 }}
                    onClick={onClose}
                  >
                    CLOSE
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ProductModal;