export const managersAdapter = (managers) => {
  if(!managers) return []
  const formattedManagers = managers.users?.map((m) => {
    const formattedManager = {
      email:     m.email,
      id:        m.id,
      name:      m.name,
      password:  m.password,
      status:    m.status,
      timestamp: m.timestamp,
      user:      m.user
    }
    return formattedManager
  })
  return formattedManagers
}