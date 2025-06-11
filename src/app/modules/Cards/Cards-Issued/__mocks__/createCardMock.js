export default {
  card: {
    name: "",
    start_date: "2025-05-26",
    expiration_date: "",
    number: "",
    birthDay: "",
    status: 0,
    cardId: 1,
  },
  charts: {
    transactions: {
      total: 0,
      variation: 0,
      best: 0,
      average: 0,
      actualMonth: {
        total: 0,
        value: 0,
      },
      lastMonth: {
        total: 0,
        value: 0,
      },
      data: [],
    },
    volume: {
      total: 0,
      variation: 0,
      cashin: 0,
      cashout: 0,
      internals: 0,
    },
    balances: {
      total: 0,
      variation: 0,
      max: {
        total: 0,
        variation: 0,
      },
      min: {
        total: 0,
        variation: 0,
      },
      average: {
        total: 0,
        variation: 0,
      },
      data: [],
    },
  },
};
