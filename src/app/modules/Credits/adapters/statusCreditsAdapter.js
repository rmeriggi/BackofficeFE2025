export const statusCreditsAdapter = (statusCredits) => {
  const formattedStatusCredits = statusCredits.map((sC) => {
    const formattedStatusCredit = {
      id: sC.id,
      status: sC.status
    }
    return formattedStatusCredit
  })
  return formattedStatusCredits
}