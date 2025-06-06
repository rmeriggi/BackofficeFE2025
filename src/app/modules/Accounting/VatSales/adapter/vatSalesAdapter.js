export const vatSalesAdapter = (vatSales) => {
  if (!vatSales) return [];
  const formattedVatSales = vatSales.map((sale) => {
    const formattedSale = {
      id: sale.id,
      date: sale.date,
      comprobante: sale.comprobante,
      provider: sale.provider,
      cond_IVA: sale.cond_IVA,
      cuit: sale.cuit,
      total: sale.total,
    };
    return formattedSale;
  });
  return formattedVatSales;
};
