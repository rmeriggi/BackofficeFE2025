export const productsAdapter = (products) => {
  if (!Array.isArray(products)) return [];

  return products.map((p) => ({
    TNA: parseFloat(p.TNA),
    amount: parseFloat(p.amount),
    date: p.date,
    id: parseInt(p.id),
    idCountry: parseInt(p.idCountry),
    idCurrency: parseInt(p.idCurrency),
    idEntity: parseInt(p.idEntity),
    product: p.product?.trim(),
    status: p.status,
    timestamp: p.timestamp,
    iva: parseFloat(p.iva),
  }));
};
