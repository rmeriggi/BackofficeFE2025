export const brandsAdapter = (brands) => {
  if(!brands) return []
  const formattedbrands = brands.map((t) => {
      const formattedBrands = {
        id:                   t.id,
        entityId:             t.entityId,
        countryId:            t.countryId,
        brandName:            t.brandName,
        sponsorName:          t.sponsorName,
        bin:                  t.bin,
        brandLogo:            t.brandLogo,
        sponsorLogo:          t.sponsorLogo,
        country:              t.country,
        entity:               t.entity,
      }
      return formattedBrands
    })
  return formattedbrands
}