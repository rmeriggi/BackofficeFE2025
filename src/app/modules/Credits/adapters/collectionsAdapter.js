export const managmentStatusAdapter = (managmentStatus) => {
  if(!managmentStatus) return []
  const formattedManagmentStatus = managmentStatus.map((m) => {
    const formattedManagmentStatus = {
      description: m.description,
      id:          m.id
    }
    return formattedManagmentStatus
  })
  return formattedManagmentStatus
}