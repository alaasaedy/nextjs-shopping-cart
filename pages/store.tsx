import React from 'react';
import Store from '../src/components/Store';
import { Products } from '../src/interfaces/products';

const StorePage = ({ products }: Products) => {
  return <Store products={products} />;
};

export default StorePage;

export const getStaticProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products?limit=4');
  const data = await res.json();
  return {
    props: {
      products: data,
    },
  };
};
