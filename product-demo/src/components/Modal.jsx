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
      maxWidth="lg"
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
            <Grid item xs={12} md={6} sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: '500px'
            }}>
              <Box sx={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '450px',
                    height: '400px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 2
                  }}
                >
                  <img
                    src={images[currentImageIndex]}
                    alt={product.title}
                    style={{
                      maxWidth: '85%',
                      maxHeight: '85%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                  
                  {images.length > 1 && (
                    <>
                      <IconButton
                        onClick={handlePrevImage}
                        sx={{
                          position: 'absolute',
                          left: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          '&:hover': { 
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }
                        }}
                      >
                        <ChevronLeft />
                      </IconButton>
                      
                      <IconButton
                        onClick={handleNextImage}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          '&:hover': { 
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    </>
                  )}
                </Box>

                {images.length > 1 && (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: 1,
                    flexWrap: 'wrap',
                    maxWidth: '450px',
                    width: '100%'
                  }}>
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
                          transition: 'all 0.2s ease',
                          '&:hover': { 
                            opacity: 1,
                            transform: 'scale(1.05)'
                          }
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
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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