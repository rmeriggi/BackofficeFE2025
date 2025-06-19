// Mock de datos para acuerdos en cuenta corriente
export const agreementsMock = {
  // Métricas principales
  summary: {
    totalAgreements: 234,
    activeAgreements: 198,
    expiredAgreements: 36,
    totalAgreedAmount: 45600000, // $45.6M
    totalUsedAmount: 28900000, // $28.9M
    totalAvailableAmount: 16700000, // $16.7M
    totalOverdraftAmount: 8900000, // $8.9M
    averageAgreementAmount: 194872,
    averageUtilizationRate: 63.4,
    agreementsExpiringThisMonth: 12,
    agreementsExpiringNextMonth: 18,
  },

  // Acuerdos por estado
  byStatus: {
    active: {
      count: 198,
      amount: 38900000,
      percentage: 84.6,
    },
    expired: {
      count: 36,
      amount: 6700000,
      percentage: 15.4,
    },
  },

  // Acuerdos por tipo de cliente
  byClientType: {
    individual: {
      count: 145,
      amount: 23400000,
      percentage: 62.0,
    },
    business: {
      count: 89,
      amount: 22200000,
      percentage: 38.0,
    },
  },

  // Acuerdos por rango de monto
  byAmountRange: {
    "0-50k": {
      count: 67,
      amount: 2345000,
      percentage: 28.6,
    },
    "50k-100k": {
      count: 89,
      amount: 6675000,
      percentage: 38.0,
    },
    "100k-250k": {
      count: 45,
      amount: 6750000,
      percentage: 19.2,
    },
    "250k-500k": {
      count: 23,
      amount: 8050000,
      percentage: 9.8,
    },
    "500k+": {
      count: 10,
      amount: 21780000,
      percentage: 4.3,
    },
  },

  // Top clientes con mayor sobregiro
  topOverdraftClients: [
    {
      id: "C001",
      clientName: "Empresa ABC S.A.",
      agreementAmount: 2000000,
      currentBalance: -1850000,
      overdraftAmount: 1850000,
      utilizationRate: 92.5,
      daysOverdraft: 15,
      riskLevel: "Alto",
      lastPayment: "2024-02-01",
      nextPayment: "2024-02-15",
    },
    {
      id: "C002",
      clientName: "Juan Pérez",
      agreementAmount: 500000,
      currentBalance: -420000,
      overdraftAmount: 420000,
      utilizationRate: 84.0,
      daysOverdraft: 8,
      riskLevel: "Medio",
      lastPayment: "2024-02-05",
      nextPayment: "2024-02-20",
    },
    {
      id: "C003",
      clientName: "María González",
      agreementAmount: 800000,
      currentBalance: -650000,
      overdraftAmount: 650000,
      utilizationRate: 81.3,
      daysOverdraft: 12,
      riskLevel: "Alto",
      lastPayment: "2024-01-28",
      nextPayment: "2024-02-12",
    },
    {
      id: "C004",
      clientName: "Comercio XYZ",
      agreementAmount: 1200000,
      currentBalance: -950000,
      overdraftAmount: 950000,
      utilizationRate: 79.2,
      daysOverdraft: 6,
      riskLevel: "Medio",
      lastPayment: "2024-02-08",
      nextPayment: "2024-02-22",
    },
    {
      id: "C005",
      clientName: "Roberto Silva",
      agreementAmount: 300000,
      currentBalance: -235000,
      overdraftAmount: 235000,
      utilizationRate: 78.3,
      daysOverdraft: 10,
      riskLevel: "Medio",
      lastPayment: "2024-02-03",
      nextPayment: "2024-02-17",
    },
  ],

  // Acuerdos próximos a vencer
  expiringAgreements: [
    {
      id: "A001",
      clientName: "Empresa DEF S.A.",
      agreementAmount: 1500000,
      currentBalance: -200000,
      expirationDate: "2024-02-15",
      daysToExpire: 3,
      status: "Activo",
      renewalProbability: "Alta",
    },
    {
      id: "A002",
      clientName: "Ana Martínez",
      agreementAmount: 400000,
      currentBalance: 50000,
      expirationDate: "2024-02-18",
      daysToExpire: 6,
      status: "Activo",
      renewalProbability: "Media",
    },
    {
      id: "A003",
      clientName: "Comercio GHI",
      agreementAmount: 800000,
      currentBalance: -150000,
      expirationDate: "2024-02-20",
      daysToExpire: 8,
      status: "Activo",
      renewalProbability: "Baja",
    },
    {
      id: "A004",
      clientName: "Carlos López",
      agreementAmount: 600000,
      currentBalance: 100000,
      expirationDate: "2024-02-25",
      daysToExpire: 13,
      status: "Activo",
      renewalProbability: "Alta",
    },
    {
      id: "A005",
      clientName: "Laura Fernández",
      agreementAmount: 250000,
      currentBalance: -50000,
      expirationDate: "2024-02-28",
      daysToExpire: 16,
      status: "Activo",
      renewalProbability: "Media",
    },
  ],

  // Tendencias de utilización
  utilizationTrends: {
    daily: [
      { date: "2024-02-01", utilization: 58.2 },
      { date: "2024-02-02", utilization: 59.1 },
      { date: "2024-02-03", utilization: 61.3 },
      { date: "2024-02-04", utilization: 60.8 },
      { date: "2024-02-05", utilization: 62.5 },
      { date: "2024-02-06", utilization: 63.4 },
      { date: "2024-02-07", utilization: 64.2 },
      { date: "2024-02-08", utilization: 63.8 },
      { date: "2024-02-09", utilization: 65.1 },
      { date: "2024-02-10", utilization: 63.4 },
    ],
    monthly: [
      { month: "Ene", utilization: 55.2 },
      { month: "Feb", utilization: 63.4 },
    ],
  },

  // Alertas del sistema
  alerts: [
    {
      id: 1,
      type: "warning",
      title: "Clientes en sobregiro crítico",
      message: "5 clientes superan el 80% de su acuerdo",
      count: 5,
      amount: 8900000,
    },
    {
      id: 2,
      type: "info",
      title: "Acuerdos próximos a vencer",
      message: "12 acuerdos vencen este mes",
      count: 12,
      amount: 8500000,
    },
    {
      id: 3,
      type: "success",
      title: "Acuerdos renovados",
      message: "8 acuerdos renovados exitosamente",
      count: 8,
      amount: 3200000,
    },
  ],

  // Métricas de rendimiento
  performance: {
    averageUtilizationRate: 63.4,
    totalOverdraftClients: 23,
    totalOverdraftAmount: 8900000,
    averageDaysOverdraft: 8.5,
    renewalRate: 78.5,
    defaultRate: 2.1,
  },

  // Filtros disponibles
  filters: {
    statuses: ["Todos", "Activos", "Vencidos"],
    clientTypes: ["Todos", "Individual", "Empresa"],
    amountRanges: [
      "Todos",
      "0-50k",
      "50k-100k",
      "100k-250k",
      "250k-500k",
      "500k+",
    ],
    riskLevels: ["Todos", "Bajo", "Medio", "Alto"],
  },
};
