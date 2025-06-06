export const queryAsignAdapter = (queryAsign) => {
  if(!queryAsign) return []
  const formattedQueryAsign = queryAsign.map((q) => {
    const formattedQueryAsign = {
      id:            q.id,
      manager :      q.manager,
      efficiency:    q.efficiency,
      capital:       q.capital,
      capitalRaised: q.capitalRaised,
      credits:       q.credits,
      creditsRaised: q.creditsRaised
    }
    return formattedQueryAsign
  })
  return formattedQueryAsign
}