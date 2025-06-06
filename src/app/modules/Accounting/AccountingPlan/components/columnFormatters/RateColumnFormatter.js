export const RateColumnFormatter = ( cellContent ) => {
  const percentage = Number(cellContent).toFixed(2)
  return (
   `${percentage} %`
)};
