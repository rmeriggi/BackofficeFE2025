export const productsAdapter = (products) => {
  if(!products) return []
  const formattedProducts = products.products.map((p) => {
    const formattedProduct = {
      TNA: p.TNA,
      amount: p.amount,
      date: p.date,
      id: p.id,
      idCountry: p.idCountry,
      idCurrency: p.idCurrency,
      idEntity: p.idEntity,
      product: p.product,
      status: p.status,
      timestamp: p.timestamp,
      iva: p.iva,
    }
    return formattedProduct
  })
  return formattedProducts
}