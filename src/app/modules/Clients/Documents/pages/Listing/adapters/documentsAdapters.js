export const documentsAdapter = (documents) => {
    if(!documents) return []
    const formattedDocuments = documents.map((o) => {
        const formattedCollection = {
          id:                 Number(o.id),
          description:        o.description,
          document:           o.document,
          statusId:           o.idDocumentStatus,
          statusDescription:  o.status,
          lastUpdate:         o.lastUpdate,
          reason:             o.reason,
          clientId:           o.idClient,
          clientName:         o.client,
          url:                o.url
        }
        return formattedCollection
      })
    return formattedDocuments
  }