import axios from 'axios';

export const VAT_PURCHASES_URLS = {
  GET_LIST: `${process.env.REACT_APP_API_URL}/accounting/IVA_compras/vista`,
  GET_REPORT: `${process.env.REACT_APP_API_URL}/accounting/IVA_compras/reportPdf`

};

export const getVatPurchasesVista = async (values) => {
  try {
    const response = await axios.post(VAT_PURCHASES_URLS.GET_LIST, values);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
export const getVatPurchasesPdf = async (values) => {
  try {
      const response = await axios.post(VAT_PURCHASES_URLS.GET_REPORT, values, { responseType: 'blob' });
      return response;
  } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
  }
};