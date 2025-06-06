import axios from 'axios';

export const MAYOR_SALDOS_URLS = {
  GET_LIST: `${process.env.REACT_APP_API_URL}/accounting/mayor_saldos/vista`,
  GET_REPORT: `${process.env.REACT_APP_API_URL}/accounting/mayor_saldos/reportPdf`
};

export const getMayorSaldosVista = async (values) => {
  try {
    const response = await axios.post(MAYOR_SALDOS_URLS.GET_LIST, values);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const getMayorSaldosPdf = async (values) => {
  try {
    const response = await axios.post(MAYOR_SALDOS_URLS.GET_REPORT, values, { responseType: 'blob' });
    return response;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
