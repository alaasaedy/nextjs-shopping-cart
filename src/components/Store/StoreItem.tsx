import React from 'react';
import { formatCurrency } from '../../utilities/formatCurrency';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Product } from '../../interfaces/products';

const StoreItem: React.FC<Product> = ({ id, title, price, image }) => {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useShoppingCart();

  const itemQuantity = getItemQuantity(id);

  return (
    <Card sx={{ maxWidth: 345, mx: 'auto' }} className='h-100'>
      <CardMedia
        height={'250px'}
        style={{ objectFit: 'contain' }}
        image={image}
        component='img'
      />
      <CardContent className='d-flex flex-column'>
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap' }}
          className='d-flex justify-content-between align-items-baseline mb-4'
        >
          <Typography
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            variant='h5'
          >
            {title}
          </Typography>
          <Typography
            variant='h6'
            sx={{ fontWeight: '300' }}
            className='text-muted'
          >
            {formatCurrency(+price)}
          </Typography>
        </Box>
        <CardActions>
          <div className='w-100 mt-auto'>
            {itemQuantity === 0 ? (
              <Button
                variant='contained'
                size='large'
                className='w-100'
                onClick={() => increaseItemQuantity(id)}
              >
                + Add To Cart
              </Button>
            ) : (
              <div
                className='d-flex align-items-center flex-column'
                style={{ gap: '0.5rem' }}
              >
                <div
                  className='d-flex justify-content-center'
                  style={{ gap: '0.5rem' }}
                >
                  <Button
                    variant='contained'
                    style={{
                      height: '35px',
                      width: '35px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={() => increaseItemQuantity(id)}
                  >
                    +
                  </Button>
                  <span>
                    <span className='fs-4'>{itemQuantity}</span> In Cart
                  </span>
                  <Button
                    variant='contained'
                    style={{
                      height: '35px',
                      width: '35px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={() => decreaseItemQuantity(id)}
                  >
                    -
                  </Button>
                </div>
                <Button
                  variant='contained'
                  onClick={() => removeFromCart(id)}
                  size='small'
                  color='error'
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default StoreItem;
