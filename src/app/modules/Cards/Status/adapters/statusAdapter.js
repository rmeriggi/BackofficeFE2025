export const statusAdapter = (status) => {
  if(!status) return []
  const formattedStatus = status.map((s) => {
      const formattedStatus = {
        id:                  s.id,
        status:              s.status,
      }
      return formattedStatus
    })
  return formattedStatus
}