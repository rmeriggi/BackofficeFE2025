const cardNumbers = (numbers) => {
  const numsArray = numbers.split('')
  numsArray.splice(4, 0, '-')
  const res = numsArray.join('')
  return res
}

export const cardsAdapter = (cards) => {
  const formattedCards = cards.map((card) => {
    const formattedCards = {
      id: Number(card.id),
      holder: card.holder,
      clientDni: card.clientDni,
      timeStamp: card.timeSatmp,
      expirationDate: `${card.expirateMonth}/${card.expriteYear}`,
      cardNumber: `${cardNumbers(card.firstNumbers)}**-****-****`,
      brandId: Number(card.brandId)
    }
    return formattedCards
  })
  return formattedCards
}