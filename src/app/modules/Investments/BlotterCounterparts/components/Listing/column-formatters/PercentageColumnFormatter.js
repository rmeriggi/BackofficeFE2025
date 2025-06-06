export function PercentageColumnFormatter(cellContent) {
  const percentFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2,  maximumFractionDigits: 2}).format(cellContent) 
  return (
    `${percentFormated}%`
  )
}