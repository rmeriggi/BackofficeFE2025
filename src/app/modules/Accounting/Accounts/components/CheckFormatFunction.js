export const checkformat = (e, symbol, side) => {
    if(isNaN(e) || typeof(e) === 'string' || e === null || e === undefined){
      return 'N/A'
    } else {
        if(side === 'right'){
            return `${e*100}${symbol}`
        } else {
            return `${symbol}${e % 1 === 0? new Intl.NumberFormat("de-DE").format(e) : new Intl.NumberFormat("de-DE").format(e.toFixed)}`
        }
    }
}