export const productsTypesAdapter = (productsTypes) => {
  const formattedProductsTypes = productsTypes.map((pT) => {
    const formattedProductType = {
      id: pT.id,
      name: pT.name
    }
    return formattedProductType
  })
  return formattedProductsTypes
}