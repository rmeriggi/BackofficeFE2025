import axios from "axios";

export const ACCOUNTING_URLS = {
  POST_GENERAL_BOOK_VISTA: () => `${process.env.REACT_APP_API_URL}/accounting/generalBook/vista`,
  POST_GENERAL_BOOK_PDF: () => `${process.env.REACT_APP_API_URL}/accounting/generalBook/reportPdf`,
};

export const fetchGeneralBookData = async (params) => {
  const response = await axios.post(ACCOUNTING_URLS.POST_GENERAL_BOOK_VISTA(), params);
  return response.data;
};

export const downloadGeneralBookReport = async (requestValues) => {
  try {
    const response = await axios.post(ACCOUNTING_URLS.POST_GENERAL_BOOK_PDF(), requestValues, {
      responseType: 'blob', 
    });
    return response;
  } catch (error) {
    console.error("Error al descargar el reporte:", error);
    throw error;
  }
};
