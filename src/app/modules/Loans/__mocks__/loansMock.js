// Mock de datos para el dashboard de préstamos
export const loansMock = {
  // Métricas principales
  summary: {
    totalLoans: 1247,
    totalAmount: 45678900,
    activeLoans: 892,
    overdueLoans: 23,
    totalPaid: 23456700,
    totalPending: 22222200,
    monthlyGrowth: 8.5,
    riskIndex: 2.3,
  },

  // Desglose por tipo de garantía
  byGuaranteeType: {
    reciprocal: {
      count: 567,
      amount: 18900000,
      paid: 9450000,
      pending: 9450000,
      percentage: 45.5,
    },
    mortgage: {
      count: 423,
      amount: 15600000,
      paid: 7800000,
      pending: 7800000,
      percentage: 34.2,
    },
    personal: {
      count: 189,
      amount: 6789000,
      paid: 3394500,
      pending: 3394500,
      percentage: 14.9,
    },
    vehicle: {
      count: 68,
      amount: 4389000,
      paid: 2194500,
      pending: 2194500,
      percentage: 5.4,
    },
  },

  // Desglose por estado
  byStatus: {
    active: {
      count: 892,
      amount: 32500000,
      percentage: 71.5,
    },
    paid: {
      count: 332,
      amount: 13178900,
      percentage: 26.6,
    },
    overdue: {
      count: 23,
      amount: 789000,
      percentage: 1.9,
    },
  },

  // Evolución mensual de préstamos
  monthlyEvolution: [
    { month: "Ene", newLoans: 45, amount: 1800000, payments: 1200000 },
    { month: "Feb", newLoans: 52, amount: 2100000, payments: 1350000 },
    { month: "Mar", newLoans: 48, amount: 1950000, payments: 1420000 },
    { month: "Abr", newLoans: 61, amount: 2400000, payments: 1580000 },
    { month: "May", newLoans: 55, amount: 2200000, payments: 1650000 },
    { month: "Jun", newLoans: 67, amount: 2650000, payments: 1780000 },
    { month: "Jul", newLoans: 58, amount: 2300000, payments: 1850000 },
    { month: "Ago", newLoans: 63, amount: 2500000, payments: 1920000 },
    { month: "Sep", newLoans: 71, amount: 2800000, payments: 1980000 },
    { month: "Oct", newLoans: 65, amount: 2600000, payments: 2050000 },
    { month: "Nov", newLoans: 73, amount: 2900000, payments: 2180000 },
    { month: "Dic", newLoans: 69, amount: 2750000, payments: 2250000 },
  ],

  // Distribución por monto
  byAmount: [
    { range: "0-50k", count: 234, amount: 8500000, percentage: 18.6 },
    { range: "50k-100k", count: 345, amount: 25800000, percentage: 27.7 },
    { range: "100k-200k", count: 298, amount: 44500000, percentage: 23.9 },
    { range: "200k-500k", count: 156, amount: 45600000, percentage: 12.5 },
    { range: "500k-1M", count: 89, amount: 62300000, percentage: 7.1 },
    { range: "1M+", count: 125, amount: 234000000, percentage: 10.2 },
  ],

  // Top 10 préstamos más grandes
  topLoans: [
    {
      id: "L001",
      client: "Constructora del Sur S.A.",
      amount: 2500000,
      guarantee: "Hipotecaria",
      status: "Activo",
      paid: 1250000,
      pending: 1250000,
      startDate: "2023-03-15",
      endDate: "2028-03-15",
    },
    {
      id: "L002",
      client: "Inversiones Norte Ltda.",
      amount: 1800000,
      guarantee: "Recíproca",
      status: "Activo",
      paid: 900000,
      pending: 900000,
      startDate: "2023-06-20",
      endDate: "2027-06-20",
    },
    {
      id: "L003",
      client: "Comercial Este S.A.",
      amount: 1500000,
      guarantee: "Hipotecaria",
      status: "Activo",
      paid: 750000,
      pending: 750000,
      startDate: "2023-09-10",
      endDate: "2028-09-10",
    },
    {
      id: "L004",
      client: "Servicios Oeste Ltda.",
      amount: 1200000,
      guarantee: "Recíproca",
      status: "Activo",
      paid: 600000,
      pending: 600000,
      startDate: "2023-12-05",
      endDate: "2027-12-05",
    },
    {
      id: "L005",
      client: "Industrias Central S.A.",
      amount: 1000000,
      guarantee: "Hipotecaria",
      status: "Activo",
      paid: 500000,
      pending: 500000,
      startDate: "2024-01-15",
      endDate: "2029-01-15",
    },
  ],

  // Alertas del sistema
  alerts: [
    {
      id: 1,
      type: "warning",
      title: "Préstamos vencidos",
      message: "23 préstamos con más de 30 días de atraso",
      count: 23,
      amount: 789000,
    },
    {
      id: 2,
      type: "info",
      title: "Renovaciones próximas",
      message: "45 préstamos próximos a vencer en los próximos 30 días",
      count: 45,
      amount: 1560000,
    },
    {
      id: 3,
      type: "success",
      title: "Pagos exitosos",
      message: "156 pagos procesados exitosamente hoy",
      count: 156,
      amount: 2340000,
    },
  ],

  // Métricas de rendimiento
  performance: {
    averageLoanAmount: 36647,
    averageLoanTerm: 36,
    paymentRate: 94.2,
    defaultRate: 1.9,
    recoveryRate: 78.5,
  },
};
