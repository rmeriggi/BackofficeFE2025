export const vatPurchasesAdapter = (vatPurchases) => {
    if (!vatPurchases) return [];
    const formattedVatPurchases = vatPurchases.map((purchase) => ({
      id: purchase.id,
      date: purchase.date,
      invoice: purchase.comprobante,
      provider: purchase.provider,
      vatStatus: purchase.cond_IVA,
      providerCuit: purchase.cuit,
      taxable21: purchase.grav_21,
      taxable105: purchase.grav_10_5,
      otherTaxable: purchase.df_grav,
      exempt: purchase.exento,
      nonTaxable: purchase.no_grav,
      vat21: purchase.iva_21,
      vat105: purchase.iva_10_5,
      vat27: purchase.iva_27,
      vatWithholding: purchase.perc_iva,
      grossIncomeWithholding: purchase.perc_llbb,
      profitWithholding: purchase.perc_gan,
      otherWithholdings: purchase.per_mn_int_otr,
      total: purchase.total,
    }));
    return formattedVatPurchases;
  };
  