import axios from "axios";

export const ACCOUNTING_URLS = {
  POST_GENERAL_BOOK_VISTA: () => `${process.env.REACT_APP_API_URL}/accounting/generalBook/vista`,
  POST_GENERAL_BOOK_PDF: () => `${process.env.REACT_APP_API_URL}/accounting/generalBook/reportPdf`,
  POST_MAYOR_BOOK_VISTA: () => `${process.env.REACT_APP_API_URL}/accounting/mayorBook/vista`,
  POST_MAYOR_BOOK_PDF: () => `${process.env.REACT_APP_API_URL}/accounting/mayorBook/reportPdf`,
  POST_DIARY_BOOK_VISTA: () => `${process.env.REACT_APP_API_URL}/accounting/diaryBook/vista`,
  POST_DIARY_BOOK_PDF: () => `${process.env.REACT_APP_API_URL}/accounting/diaryBook/reportPdf`,
  POST_VAT_SALES_VISTA: () => `${process.env.REACT_APP_API_URL}/accounting/IVA_ventas/vista`,
  POST_VAT_SALES_PDF: () => `${process.env.REACT_APP_API_URL}/accounting/IVA_ventas/reportPdf`,
  POST_VAT_PURCHASES_VISTA: () => `${process.env.REACT_APP_API_URL}/accounting/IVA_compras/vista`,
  POST_VAT_PURCHASES_PDF: () => `${process.env.REACT_APP_API_URL}/accounting/IVA_compras/reportPdf`,
  POST_SUMAS_SALDOS_PDF: () => `${process.env.REACT_APP_API_URL}/accounting/sumas_saldos/reportPdf`, 
};

export const getSumasSaldosPdf = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_SUMAS_SALDOS_PDF(), values, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  });
  return response;
};

export const getBooksVista = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_GENERAL_BOOK_VISTA(), values);
  return response.data;
};

export const getBooksPdf = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_GENERAL_BOOK_PDF(), values, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  });
  return response;
};

export const getMayorVista = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_MAYOR_BOOK_VISTA(), values);
  return response.data;
};

export const getMayorPdf = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_MAYOR_BOOK_PDF(), values, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  });
  return response;
};

export const getDiaryBooksVista = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_DIARY_BOOK_VISTA(), values);
  return response.data;
};

export const getDiaryBooksPdf = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_DIARY_BOOK_PDF(), values, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  });
  return response;
};

export const getVatSales = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_VAT_SALES_VISTA(), values);
  return response.data;
};

export const getVatSalesPdf = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_VAT_SALES_PDF(), values, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  });
  return response;
};

export const getVatPurchasesVista = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_VAT_PURCHASES_VISTA(), values);
  return response.data;
};

export const getVatPurchasesPdf = async (values) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_VAT_PURCHASES_PDF(), values, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  });
  return response;
};


