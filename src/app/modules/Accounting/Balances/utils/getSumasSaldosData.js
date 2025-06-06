import axios from 'axios';

const BALANCES_URL = `${process.env.REACT_APP_API_URL}/accounting/sumas_saldos/vista`;

export const getBalancesListData = async ({ fromDate, toDate }) => {
    try {
        console.log("Llamando al endpoint con fechas:", { fromDate, toDate });
        const response = await axios.post(BALANCES_URL, { fromDate, toDate });
        console.log("Respuesta del servidor:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al hacer la solicitud:", error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.errorMessage || 'Error al obtener los datos');
    }
};
