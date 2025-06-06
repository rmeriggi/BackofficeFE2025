export const LedgerBalanceAdapter = (mayorSaldos) => {
  if (!mayorSaldos) return [];
  return mayorSaldos.map((entry) => ({
    codigo: entry.cuenta_contable.codigo,
    descripcion: entry.cuenta_contable.descripcion,
    alias: entry.cuenta_contable.alias,
    saldo: entry.saldo.al_dia,
    importeOrigen: entry.importe_origen,
  }));
};
