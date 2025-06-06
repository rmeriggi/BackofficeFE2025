export const typesAdapter = (types) => {
  if(!types) return []
  const formattedtypes = types.map((t) => {
      const formattedTypes = {
        id:                   t.id,
        type:                t.type,
      }
      return formattedTypes
    })
  return formattedtypes
}