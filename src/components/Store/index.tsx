import React from 'react';
import StoreItem from './StoreItem';
import { Typography, Grid } from '@mui/material';
import { Products } from '../../interfaces/products';

const Store = ({ products }: Products) => {
  return (
    <div>
      <Typography sx={{ my: 2 }} variant='h2' component='h2'>
        STORE
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {products?.map((item) => (
          <Grid item key={item.id} xs={12} md={4} lg={3}>
            <StoreItem
              id={item['id']}
              title={item['title']}
              price={item['price']}
              image={item['image']}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Store;
