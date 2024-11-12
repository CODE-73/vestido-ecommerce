import Currency from 'currency.js';

export const INR = (value: number) =>
  new Currency(value, {
    symbol: '₹',
    useVedic: true,
  });

export const formatINR = (value: number) => INR(value).format();
