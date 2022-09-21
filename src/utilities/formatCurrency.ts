export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(number);
};
