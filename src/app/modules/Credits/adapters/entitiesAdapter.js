export const entitiesAdapter = (entities) => {
  if(!entities) return []
  const formattedEntities = entities.map((e) => {
    const formattedEntity = {
      id: e.id,
      entity: e.entity,
      codCBU: e.codCBU,
    }
    return formattedEntity
  })
  return formattedEntities
}