export const sitesAdapter = (sites) => {
  if(!sites) return []
  const formattedsites = sites.map((s) => {
      const formattedCollection = {
        id:                      s.id,
        clientId:                s.clientId,
        client:                  s.client,
        site:                    s.site,
        siteId:                  s.siteId,
        publicPassword:          s.publicPassword,
        privatePassword:         s.privatePassword,
      }
      return formattedCollection
    })
  return formattedsites
}