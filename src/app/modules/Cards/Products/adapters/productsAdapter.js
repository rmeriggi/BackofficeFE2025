export const productsAdapter = (products) => {
  const formattedProducts = products.map((p) => {
    const formattedProduct = {
      id:         p.id,
      brandId:    p.brandId,
      brand:      p.brand,
      cardTypeId: p.cardTypeId,
      cardType:   p.cardType,
      limit:      p.limit,
      quotaLimit: p.quotaLimit,
      cardId:     p.cardTypeId,
      product:    p.product
    }
    return formattedProduct
  })
  return formattedProducts
}