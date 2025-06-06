import axios from "axios";
import { loadAbort } from "../../../../utils/loadAbort";

export const PRODUCTS_URLS = {
  GET_ALL: `${process.env.REACT_APP_API_URL}/products`,
  GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/products/${id}`,
  CREATE: `${process.env.REACT_APP_API_URL}/products/new`,
  EDIT: (id) => `${process.env.REACT_APP_API_URL}/products/${id}`,
  GET_ALL_SCORING: (id) =>
    `${process.env.REACT_APP_API_URL}/products/${id}/scoring`,
  CREATE_SCORING: `${process.env.REACT_APP_API_URL}/scoring`,
  DELETE_SCORING: (id) => `${process.env.REACT_APP_API_URL}/scoring/${id}`,
  GET_ALL_PROGRAMS: (id) =>
    `${process.env.REACT_APP_API_URL}/credits/${id}/programs`,
  CREATE_PROGRAM: (id) =>
    `${process.env.REACT_APP_API_URL}/credits/${id}/programs`,
  DELETE_PROGRAM: (id) =>
    `${process.env.REACT_APP_API_URL}/credits/${id}/programs`,
  GET_COMBO_PROGRAMS: `${process.env.REACT_APP_API_URL}/programs`,
  GET_FRECUENCIES: `${process.env.REACT_APP_API_URL}/frequencies`,
  GET_COMBO_QUOTA_SYSTEM: `${process.env.REACT_APP_API_URL}/quotaSystem`,
  GET_EARNINGS_DATA: `${process.env.REACT_APP_API_URL}/earningsData`,
  GET_COMBO_QUOTA_CALCULATE: `${process.env.REACT_APP_API_URL}/quotasCalculate`,
  GET_CREDIT_DESTINY: `${process.env.REACT_APP_API_URL}/creditDestiny`,
  GET_SCORE_SOURCES: `${process.env.REACT_APP_API_URL}/scoreSource`,
};

export const getAllProducts = async (values) => {
  const controller = loadAbort();
  try {
    const response = await axios.post(PRODUCTS_URLS.GET_ALL, values, {
      signal: controller.signal,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOne = async (id) => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_ONE(id));
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axios.post(PRODUCTS_URLS.CREATE, product);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const editProduct = async (id, product) => {
  try {
    const response = await axios.post(PRODUCTS_URLS.EDIT(id), product);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getAllScoring = async (id) => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_ALL_SCORING(id));
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const createScoring = async (values) => {
  try {
    const response = await axios.post(PRODUCTS_URLS.CREATE_SCORING, values);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const deleteScoring = async (id) => {
  try {
    const response = await axios.delete(PRODUCTS_URLS.DELETE_SCORING(id));
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getAllPrograms = async (id) => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_ALL_PROGRAMS(id));
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const createProgram = async (id, values) => {
  try {
    const response = await axios.post(PRODUCTS_URLS.CREATE_PROGRAM(id), values);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const deleteProgram = async (id) => {
  try {
    const response = await axios.delete(PRODUCTS_URLS.DELETE_PROGRAM(id));
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getComboPrograms = async () => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_COMBO_PROGRAMS);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getFrecuencies = async () => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_FRECUENCIES);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getComboQuotaSystem = async () => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_COMBO_QUOTA_SYSTEM);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getEarningsData = async () => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_EARNINGS_DATA);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getComboQuotaCalculate = async () => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_COMBO_QUOTA_CALCULATE);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getComboCreditDestiny = async () => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_CREDIT_DESTINY);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getScoreSource = async () => {
  try {
    const response = await axios.get(PRODUCTS_URLS.GET_SCORE_SOURCES);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
