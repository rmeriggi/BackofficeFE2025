export const dashboardAdapter= (data) => {
  const dashboardFormatted = {
    header: {
      clients:        data.header.clients,
      operations:     data.header.Operation,
      volumeOperated: data.header.volumeOperated,
      pl:             data.header.pl,
      comissions:     data.header.comissions
    },
    charts: {
      species: {
        data: data.charts.species.data.map(s => {
          return {
            specie:     s.specie,
            value:      s.value,
            percentage: s.percentage
          }
        })
      },
      operations: {
        data: data.charts.operations.data.map(o => {
          return {
            day:    o.day,
            amount: o.amount
          }
        })
      },
      volume: {
        data:  data.charts.Volume.data.map(v => {
          return {
            day:    v.day,
            amount: v.amount
          }
        })
      },
      comissions: {
        data: data.charts.Comissions.data.map(c => {
          return {
            day:    c.day,
            amount: c.amount
          }
        })
      },
      valuation: {
        data: data.charts.valuation.data.map(v => {
          return {
            day:        v.day,
            variations: v.variations
          }
        })
      },
      pl: {
        data: data.charts.pl.data.map(pl => {
          return {
            day:    pl.day,
            amount: pl.amount
          }
        })
      }     
    }
  }
  return dashboardFormatted
}
  
  