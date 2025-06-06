import axios from "axios";

export const ECHECKS_URLS = {
  GET_ALL_ECHECKS: () =>  `${process.env.REACT_APP_API_URL}/echeck/all`,
  GET_ECHECK_BY_ID: (id) =>`${process.env.REACT_APP_API_URL}/echeck/by/${id}`,
  GET_ECHECK_BY_ID_CUENTA: () =>`${process.env.REACT_APP_API_URL}/echeck/by/Idcuenta}`,
  UPDATE_ECHECK: () => `${process.env.REACT_APP_API_URL}/echeck/update`,
  CREATE_ECHECK: () => `${process.env.REACT_APP_API_URL}/echeck/new`,
  CREATE_DEBT: () => `${process.env.REACT_APP_API_URL}/debtsReceivable/new`
};


export const getAllEchecks = async () => {
  const response = await axios.get(ECHECKS_URLS.GET_ALL_ECHECKS());
  return response.data;
};


export const getEcheckById = async (id) => {
  const response = await axios.get(
    ECHECKS_URLS.GET_ECHECK_BY_ID(id)
  );
  return response.data;
};

export const updateEcheck = async (echeckData) => {
  const response = await axios.post(
    ECHECKS_URLS.UPDATE_ECHECK(),
    echeckData
  );
  return response.data;
};

export const createEcheck = async (echeckData) => {  

  const response = await axios.post(
    ECHECKS_URLS.CREATE_ECHECK(),
    echeckData
  );
  return response.data;
};
