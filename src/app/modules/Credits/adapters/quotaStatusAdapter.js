export const quotaStatusAdapter = (quotaStatus) => {
  if(!quotaStatus) return []
  const formattedQuotaStatus = quotaStatus.map((q) => {
    const formattedQuotaStatus = {
      id:     q.id,
      status: q.status
    }
    return formattedQuotaStatus
  })
  return formattedQuotaStatus
}