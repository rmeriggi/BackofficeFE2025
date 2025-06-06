export const groupsAdapter = (groups) => {
  if(!groups) return []
  const formattedGroups = groups.map((g) => {
    const formattedGroup = {
    id: g.id,
    entity: g.entity,
    currency: g.currency,
    group: g.group
    }
    return formattedGroup
  })
  return formattedGroups
}