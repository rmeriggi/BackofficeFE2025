import axios from 'axios'
import { loadAbort } from '../../../../utils/loadAbort';

const INVESTMENTCLIENTS_URL = {
  GET: `${process.env.REACT_APP_API_URL}/investment/investmentsClients`,
  GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/investment/investmentClient/${id}`,
}

export const getListInvestmentsClients = () => {
  const controller = loadAbort();
  return { call: axios.get(INVESTMENTCLIENTS_URL.GET, { signal: controller.signal }), controller }
}

export const getInvestmentClient = (id) => {
  const controller = loadAbort();
  return { call: axios.get(INVESTMENTCLIENTS_URL.GET_ONE(id), { signal: controller.signal }), controller }
}