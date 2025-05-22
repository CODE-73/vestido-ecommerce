export const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export const formatPeriod = (period: string) => {
  const [year, month] = period.split('-');
  return new Date(Number(year), Number(month) - 1).toLocaleString('default', {
    month: 'short',
    year: 'numeric',
  });
};
