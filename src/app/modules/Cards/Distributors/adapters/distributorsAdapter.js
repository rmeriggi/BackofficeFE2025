export const distributorsAdapter = (distributors) => {
  if(!distributors) return []
  const distributorsFormatted = distributors.map((p) => {
    const providerFormatted = {
      address:     p.address,
      companyName: p.companyName,
      countryId:   p.countryId,
      email:       p.email,
      id:          p.id,
      movil:       p.movil,
      distributor: p.distributor,
      date:        p.timeStamp,
      country:     p.country
    }
    return providerFormatted
  })
  return distributorsFormatted
}