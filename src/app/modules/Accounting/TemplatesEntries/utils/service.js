import axios from "axios";

export const SEATING_TEMPLATES_URLS = {
  GET_ALL: `${process.env.REACT_APP_API_URL}/seatingTemplates`,
  GET_ONE_HEADER: (id) =>
    `${process.env.REACT_APP_API_URL}/seatingTemplates/header/${id}`,
  GET_ONE_DETAIL: (id) =>
    `${process.env.REACT_APP_API_URL}/seatingTemplates/detail/${id}`,
  EDIT_HEADER: (id) =>
    `${process.env.REACT_APP_API_URL}/seatingTemplates/header/${id}`,
  EDIT_DETAIL: (id) =>
    `${process.env.REACT_APP_API_URL}/seatingTemplates/detail/${id}`,
  CREATE_HEADER: `${process.env.REACT_APP_API_URL}/seatingTemplates/header`,
  CREATE_DETAIL: `${process.env.REACT_APP_API_URL}/seatingTemplates/detail`,
  GET_ALL_MODULES: `${process.env.REACT_APP_API_URL}/accounting/modules`,
  DELETE_DETAIL: (id) => `${process.env.REACT_APP_API_URL}/deleteDetail/${id}`,
};

export const getAllSeatingTeampleates = async () => {
  const response = await axios.get(SEATING_TEMPLATES_URLS.GET_ALL);
  return response.data;
};

export const getOneHeader = async (id) => {
  const response = await axios.get(SEATING_TEMPLATES_URLS.GET_ONE_HEADER(id));
  return response.data;
};

export const getOneDetail = async (id) => {
  const response = await axios.get(SEATING_TEMPLATES_URLS.GET_ONE_DETAIL(id));
  return response.data;
};

export const editHeader = async (id, values) => {
  try {
    const response = await axios.post(
      SEATING_TEMPLATES_URLS.EDIT_HEADER(id),
      values
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const editDetail = async (id, values) => {
  try {
    const response = await axios.post(
      SEATING_TEMPLATES_URLS.EDIT_DETAIL(id),
      values
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const createHeader = async (values) => {
  try {
    const response = await axios.post(
      SEATING_TEMPLATES_URLS.CREATE_HEADER,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const createDetail = async (values) => {
  try {
    const response = await axios.post(
      SEATING_TEMPLATES_URLS.CREATE_DETAIL,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getAllModules = async () => {
  const response = await axios.get(SEATING_TEMPLATES_URLS.GET_ALL_MODULES);
  return response.data;
};

export const removeDetail = async (id) => {
  const response = await axios.post(SEATING_TEMPLATES_URLS.DELETE_DETAIL(id));
  return response.data;
};
