export const creditsAdapter = (credits) => {
  if(!credits) return []
  const formattedCredits = credits.map((c) => {
    const formattedCredit = {
      amount:      c.amount,
      date:        c.date,
      id:          Number(c.id),
      idClient:    c.idClient,
      productName: c.productName || c.product,
      rate:        Number(c.rate) || Number(c.tna),
      status:      c.status,
      originalId:  c.reference,
      cft:         c.cft,
      productId:   c.productId,
      punitives:   c.punitives,
    }
    return formattedCredit
  })
  return formattedCredits
}

export const oneCreditAdapter = (credit) => {
  const formattedCredit = {
      id:         credit?.id || "",
      idClient:   credit?.idClient || "",
      product:    credit?.product || "",
      date:       credit?.date || "",
      amount:     credit?.amount || "",
      quota:      credit?.quota || "",
      tna:        credit?.tna || "",
      expiration: credit?.expiration || "",
      status:     credit?.status || "",
      collection: credit?.collection || "",
      pending:    credit?.pending || "",
      user:       credit?.user || ""
  }
  return formattedCredit
}