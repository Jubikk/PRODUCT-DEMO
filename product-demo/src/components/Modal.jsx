// src/components/ProductModal.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import SiteModal from './SiteModal';

function ProductModal({ open, onClose, product }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [siteModalOpen, setSiteModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset imageLoaded when image changes
  React.useEffect(() => {
    setImageLoaded(false);
  }, [currentImageIndex, product]);

  if (!product) return null;

  const images = product && product.images && product.images.length > 0 
    ? product.images 
    : [product?.thumbnail];

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
    <>
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottom: '1px solid #eee', background: '#fafbfd', minHeight: 75 }}>
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', fontSize: 9, fontWeight: 'bold' }}>
              {product.category?.toUpperCase() || 'PRODUCT'}
            </Typography>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
              {product.title}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              ml: 1,
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0, position: 'relative' }}>

          <Box sx={{ p: 3 }}>

            <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ minHeight: 500 }}>
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 350 }}>
                  <Box sx={{ width: '100%', maxWidth: '500px' }}>
                
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '300px',
                        borderRadius: 2,
                        overflow: 'hidden',
                        mb: 2,
                        position: 'relative',
                        flexDirection: 'row'
                      }}
                    >
                      {!imageLoaded && (
                        <Box sx={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, background: 'rgba(255,255,255,0.5)' }}>
                          <CircularProgress />
                        </Box>
                      )}
                      <img
                        src={images[currentImageIndex]}
                        alt={product.title}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          display: imageLoaded ? 'block' : 'none',
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
                      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
                        {images.map((image, index) => (
                          <Box
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            sx={{
                              width: { xs: 40, sm: 50, md: 60 },
                              height: { xs: 40, sm: 50, md: 60 },
                              borderRadius: 1,
                              overflow: 'hidden',
                              cursor: 'pointer',
                              border: currentImageIndex === index ? '2px solid #1976d2' : '2px solid transparent',
                              opacity: currentImageIndex === index ? 1 : 0.7,
                              '&:hover': { opacity: 1 },
                              mx: 0.5,
                              mb: 0.5
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
                  {isMobile ? (
                    <Box sx={{ px: 2, pb: 1, position: 'relative' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ fontWeight: 'bold', fontSize: 12, py: 1, mb: 4, borderRadius: 2, display: 'block', mx: 'auto' }}
                        onClick={() => setSiteModalOpen(true)}
                      >
                        SEARCH SITES FOR AVAILABILITY
                      </Button>
                      <Button
                        onClick={onClose}
                        sx={{
                          position: 'absolute',
                          right: 12,
                          bottom: 4,
                          fontSize: 12,
                          color: 'text.secondary',
                          boxShadow: 'none',
                          minWidth: 'auto',
                          p: 0,
                          background: 'none',
                          '&:hover': { background: 'none', textDecoration: 'underline' },
                          border: 'none',
                          fontWeight: 400
                        }}
                        disableRipple
                        disableElevation
                      >
                        CLOSE
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ px: 2, pb: 3, pt: 1, position: 'relative', minHeight: 70 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ fontWeight: 'bold', fontSize: 18, py: 2, px: 7, borderRadius: 2, display: 'block', mx: 'auto', minWidth: 320 }}
                        onClick={() => setSiteModalOpen(true)}
                      >
                        SEARCH SITES FOR AVAILABILITY
                      </Button>
                      <Button
                        onClick={onClose}
                        sx={{
                          position: 'absolute',
                          right: 18,
                          bottom: 10,
                          fontSize: 13,
                          color: 'text.secondary',
                          boxShadow: 'none',
                          minWidth: 'auto',
                          p: 0,
                          background: 'none',
                          '&:hover': { background: 'none', textDecoration: 'underline' },
                          border: 'none',
                          fontWeight: 400
                        }}
                        disableRipple
                        disableElevation
                      >
                        CLOSE
                      </Button>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
      <SiteModal open={siteModalOpen} onClose={() => setSiteModalOpen(false)} product={product} />
    </>
  );
}

export default ProductModal;