export const providersAdapter = (providers) => {
  if(!providers) return []
  const providersFormatted = providers.map((p) => {
    const providerFormatted = {
      address:     p.address,
      companyName: p.companyName,
      countryId:   p.countryId,
      email:       p.email,
      id:          p.id,
      movil:       p.movil,
      provider:    p.provider,
      date:        p.timeStamp,
      country:     p.country
    }
    return providerFormatted
  })
  return providersFormatted
}