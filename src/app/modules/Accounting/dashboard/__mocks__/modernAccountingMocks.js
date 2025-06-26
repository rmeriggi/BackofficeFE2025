// Datos mock modernos para el dashboard de contabilidad
export const modernAccountingMocks = {
  // Estadísticas principales
  mainStats: [
    {
      title: "Total Asientos",
      value: "2,847",
      icon: "Receipt",
      color: "primary",
      iconColor: "#3699FF",
      trend: 12.5,
      subtitle: "este mes",
    },
    {
      title: "Balance General",
      value: "$ 15,847,320",
      icon: "AccountBalance",
      color: "success",
      iconColor: "#0BB783",
      trend: 8.3,
      subtitle: "vs mes anterior",
    },
    {
      title: "Ingresos Totales",
      value: "$ 8,234,567",
      icon: "MonetizationOn",
      color: "warning",
      iconColor: "#FFA800",
      trend: 15.7,
      subtitle: "vs mes anterior",
    },
    {
      title: "Gastos Totales",
      value: "$ 6,123,456",
      icon: "AccountBalanceWallet",
      color: "danger",
      iconColor: "#F64E60",
      trend: -5.2,
      subtitle: "vs mes anterior",
    },
  ],

  // Datos para gráficos
  charts: {
    // Gráfico de barras para créditos
    credits: {
      total: "8,234,567",
      variation: 15.7,
      data: [
        { day: "Lun", value: 1250000 },
        { day: "Mar", value: 1450000 },
        { day: "Mié", value: 1350000 },
        { day: "Jue", value: 1650000 },
        { day: "Vie", value: 1850000 },
        { day: "Sáb", value: 950000 },
        { day: "Dom", value: 750000 },
      ],
    },

    // Gráfico de barras para débitos
    collections: {
      total: "6,123,456",
      variation: -5.2,
      data: [
        { day: "Lun", value: 950000 },
        { day: "Mar", value: 1150000 },
        { day: "Mié", value: 1050000 },
        { day: "Jue", value: 1250000 },
        { day: "Vie", value: 1450000 },
        { day: "Sáb", value: 750000 },
        { day: "Dom", value: 550000 },
      ],
    },

    // Gráfico de dona para volumen
    volume: {
      total: "15,847,320",
      variation: 8.3,
      credits: 65,
      collections: 35,
    },

    // Gráfico de línea para evolución
    evolution: {
      total: "2,847",
      variation: 12.5,
      data: [
        { month: "Ene", credits: 7200000, debits: 6800000 },
        { month: "Feb", credits: 7500000, debits: 7200000 },
        { month: "Mar", credits: 7800000, debits: 7500000 },
        { month: "Abr", credits: 8100000, debits: 7800000 },
        { month: "May", credits: 8400000, debits: 8100000 },
        { month: "Jun", credits: 8700000, debits: 8400000 },
        { month: "Jul", credits: 9000000, debits: 8700000 },
        { month: "Ago", credits: 9300000, debits: 9000000 },
        { month: "Sep", credits: 9600000, debits: 9300000 },
        { month: "Oct", credits: 9900000, debits: 9600000 },
        { month: "Nov", credits: 10200000, debits: 9900000 },
        { month: "Dic", credits: 10500000, debits: 10200000 },
      ],
    },
  },

  // Métricas secundarias
  secondaryStats: [
    {
      title: "Cuentas por Cobrar",
      value: "$ 2,345,678",
      trend: 8.5,
      color: "success",
    },
    {
      title: "Cuentas por Pagar",
      value: "$ 1,876,543",
      trend: -3.2,
      color: "danger",
    },
    {
      title: "Flujo de Caja",
      value: "$ 2,111,111",
      trend: 12.8,
      color: "primary",
    },
    {
      title: "ROI Promedio",
      value: "18.5%",
      trend: 2.1,
      color: "warning",
    },
  ],

  // Alertas y notificaciones
  alerts: [
    {
      type: "warning",
      title: "Asientos Pendientes",
      message: "Tienes 15 asientos pendientes de revisión",
      count: 15,
    },
    {
      type: "info",
      title: "Balance Mensual",
      message: "El balance del mes está listo para revisión",
      count: 1,
    },
    {
      type: "success",
      title: "Conciliación Bancaria",
      message: "Conciliación bancaria completada exitosamente",
      count: 0,
    },
  ],

  // Actividad reciente
  recentActivity: [
    {
      id: 1,
      type: "asiento",
      description: "Asiento de ventas registrado",
      amount: "$ 125,000",
      time: "Hace 2 horas",
      status: "completed",
    },
    {
      id: 2,
      type: "gasto",
      description: "Gasto de servicios registrado",
      amount: "$ 45,000",
      time: "Hace 4 horas",
      status: "pending",
    },
    {
      id: 3,
      type: "ingreso",
      description: "Ingreso por inversiones",
      amount: "$ 89,000",
      time: "Hace 6 horas",
      status: "completed",
    },
    {
      id: 4,
      type: "asiento",
      description: "Asiento de nómina procesado",
      amount: "$ 234,000",
      time: "Hace 8 horas",
      status: "completed",
    },
  ],

  // Resumen de cuentas
  accountSummary: {
    activos: {
      circulantes: 8500000,
      fijos: 7200000,
      total: 15700000,
    },
    pasivos: {
      circulantes: 6800000,
      largoplazo: 4200000,
      total: 11000000,
    },
    patrimonio: {
      capital: 3500000,
      reservas: 1200000,
      total: 4700000,
    },
  },
};

export default modernAccountingMocks;
