export const dashboardCollectionsAdapter = (dashboardCollections) => {
  const dC = dashboardCollections
  const formattedDashboardCollection = {
    creditsGiven: dC.creditsGiven,
    averageDaysPastDue: dC.averageDaysPastDue,
    feesCollected: dC.feesCollected,
    balances: {
      totalLoaned: dC.balances.totalLoaned,
      totalCollected: dC.balances.totalCollected,
      cobrability: dC.balances.cobrability
    },
    charts: {
      credits: {
        total: dC.charts.credits.total,
        variation: dC.charts.credits.variation,
        best: dC.charts.credits.best,
        average: dC.charts.credits.average,
        actualMonth: {
          total: dC.charts.credits.actualMonth.total,
          value: dC.charts.credits.actualMonth.value
        },
        lastMonth: {
          total: dC.charts.credits.lastMonth.total,
          value: dC.charts.credits.lastMonth.total
        },
        data: dC.charts.credits.data.map((d) => {
          const formattedData = {
            day: d.day,
            value: d.value
          }
          return formattedData
        })
      },
      collections: {
        total: dC.charts.collections.total,
        variation: dC.charts.collections.variation,
        best: dC.charts.collections.best,
        average: dC.charts.collections.average,
        actualMonth: {
          total:dC.charts.collections.actualMonth.total,
          value:dC.charts.collections.actualMonth.value
        },
        lastMonth: {
          total:dC.charts.collections.lastMonth.total,
          value:dC.charts.collections.lastMonth.value
        },
        data: dC.charts.collections.data.map((d) => {
          const formattedData = {
            day: d.day,
            value: d.value
          }
          return formattedData
        })
      },
      graphicvi: {
        total: dC.charts.graphicvi.total,
        variation: dC.charts.graphicvi.variation,
        best: dC.charts.graphicvi.best,
        average: dC.charts.graphicvi.average,
        actualMonth: {
          total: dC.charts.graphicvi.actualMonth.total,
          value: dC.charts.graphicvi.actualMonth.value
        },
        lastMonth: {
          total: dC.charts.graphicvi.lastMonth.total,
          value: dC.charts.graphicvi.lastMonth.value
        },
        data: dC.charts.graphicvi.data.map((d) => {
          const formattedData = {
            day: d.day,
            value: d.value
          }
          return formattedData
        })
      },
      volume: {
        total: dC.charts.volume.total,
        variation: dC.charts.volume.variation,
        cashin: dC.charts.volume.cashin,
        credits: dC.charts.volume.credits,
        collections: dC.charts.volume.collections
      },
      investment: {
        total: dC.charts.investment.total,
        variation: dC.charts.investment.variation,
        cashin: dC.charts.investment.cashin,
        trx: dC.charts.investment.trx,
        tc: dC.charts.investment.tc
      },
      balances: {
        total: dC.charts.balances.total,
        variation: dC.charts.balances.variation,
        max: {
          total: dC.charts.balances.max.total,
          variation: dC.charts.balances.max.variation
        },
        min: {
          total: dC.charts.balances.min.total,
          variation: dC.charts.balances.min.variation
        },
        average: {
          total: dC.charts.balances.average.total,
          variation: dC.charts.balances.average.variation
        },
        data: dC.charts.balances.data.map((d) => {
          const formattedData = {
            month: d.month,
            value: d.value
          }
          return formattedData
        })
      }
    }
  }
  return formattedDashboardCollection
}