export const currenciesAdapter = (currencies) => {
  if(!currencies) return []
  const formattedCurrencies = currencies.map((c) => {
    const formattedCurrency = {
      id:c.id,
      currency: c.currency,
      symbol: c.symbol,
    }
    return formattedCurrency
  })
  return formattedCurrencies
}