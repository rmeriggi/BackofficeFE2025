export const countriesAdapter = (countries) => {
  if(!countries) return []
  const formattedCountries = countries.map((c) => {
    const formattedCountry = {
      id:      c.id,
      country: c.country,
      code   : c.code
    }
    return formattedCountry
  })
  return formattedCountries
}