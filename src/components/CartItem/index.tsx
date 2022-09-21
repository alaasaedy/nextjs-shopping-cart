import React from 'react';
import Image from 'next/image';
import { Button, Stack, Typography } from '@mui/material';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { formatCurrency } from '../../utilities/formatCurrency';
import { Products } from '../../interfaces/products';

export interface CartItemProps extends Products {
  id: number;
  quantity: number;
}

const CartItem = ({ id, quantity, products }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();

  const cartItem = products.find((item) => item.id === id);

  if (!cartItem) return null;

  return (
    <Stack direction='row' gap={2} className='d-flex align-items-center'>
      <Image
        width={125}
        height={75}
        src={cartItem.image}
        alt={cartItem.title}
        style={{ objectFit: 'cover' }}
        layout='fixed'
      />
      <div className='me-auto'>
        <Typography variant='h6' className='fs-6'>
          {cartItem.title}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: '0.65rem' }}>
              {quantity}x
            </span>
          )}
        </Typography>
        <span className='text-muted' style={{ fontSize: '0.75rem' }}>
          {formatCurrency(+cartItem.price)}
        </span>
      </div>
      <span>{formatCurrency(+cartItem.price * quantity)}</span>
      <Button
        variant='outlined'
        color='error'
        size='small'
        onClick={() => removeFromCart(cartItem.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
