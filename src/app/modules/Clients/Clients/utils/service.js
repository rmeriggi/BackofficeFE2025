import axios from "axios";
import { loadAbort } from "../../../../utils/loadAbort";

export const CLIENTS_URLS = {
  GET_ALL: (search) =>
    `${process.env.REACT_APP_API_URL}/clientsList?search=${search}`,
  GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/clients/${id}`,
  EDIT_ONE_CLIENT: (id) =>
    `${process.env.REACT_APP_API_URL}/clients/client/${id}`,
  EDIT_IDENTITY_ONE_CLIENT: (id) =>
    `${process.env.REACT_APP_API_URL}/clients/identity/${id}`,
  EDIT_SCORE_ONE_CLIENT: (id) =>
    `${process.env.REACT_APP_API_URL}/clients/score/${id}`,
  GET_STATUS: `${process.env.REACT_APP_API_URL}/client/status`,
  GET_LEVELS: `${process.env.REACT_APP_API_URL}/client/level`,
  GET_CATEGORIES: `${process.env.REACT_APP_API_URL}/client/category`,
  GET_VERIFIED: `${process.env.REACT_APP_API_URL}/client/verified`,
  GET_URL_IMAGES: `${process.env.REACT_APP_API_URL}/urlImagesOB`,
  GET_URL_SOLICITYCC: `${process.env.REACT_APP_API_URL}/urlSolicityClientInversor`,
  GET_CVU: (id) => `${process.env.REACT_APP_API_URL}/cvu/client/${id}`,
  GET_ONE_CREDIT_FOR_RECEIPT: (id) =>
    `${process.env.REACT_APP_API_URL}/creditsRequested/${id}`,
  DOCUMENTS_CLIENT: (id) =>
    `${process.env.REACT_APP_API_URL}/clients/${id}/documents`,
  CLIENT_APROV: `${process.env.REACT_APP_API_URL}/clientAprov`,
  DIGITAL_SIGN: `${process.env.REACT_APP_API_URL}/client/digitalSign`,
  WELCOME_LETTER: `${process.env.REACT_APP_API_URL}/client/welcomeLetter`,
  EMAIL_VERIFICATION: (id) =>
    `${process.env.REACT_APP_API_URL}/clients/emailverification/${id}`,
  RECOVER_PASSWORD: (id) =>
    `${process.env.REACT_APP_API_URL}/clients/recoverpassword/${id}`,
  DISABLE_CLIENT: () =>
    `${process.env.REACT_APP_API_URL}/client/disable2024`,
  POST_CALIFICATION: `${process.env.REACT_APP_API_URL}/client/profile/risk`, 
  GET_CALIFICATION: `${process.env.REACT_APP_API_URL}/client/calification`

};

export const calculateMatrix = async (idClient) => {
  const response = await axios.post(CLIENTS_URLS.POST_CALIFICATION, { idClient: idClient });
  return response.data;
};

export const getCalification = async (idClient) => {
  const response = await axios.post(CLIENTS_URLS.GET_CALIFICATION, { idClient: idClient });
  return response.data;
};


export const getAllClients = async (search) => {
  const response = await axios.get(CLIENTS_URLS.GET_ALL(search));
  return response.data;
};

export const getOne = async (id) => {
  const response = await axios.get(CLIENTS_URLS.GET_ONE(id));
  return response.data;
};

export const getStatus = () => {
  const controller = loadAbort();
  return {
    call: axios.get(CLIENTS_URLS.GET_STATUS, { signal: controller.signal }),
    controller,
  };
};

export const getLevels = () => {
  const controller = loadAbort();
  return {
    call: axios.get(CLIENTS_URLS.GET_LEVELS, { signal: controller.signal }),
    controller,
  };
};

export const getCategories = () => {
  const controller = loadAbort();
  return {
    call: axios.get(CLIENTS_URLS.GET_CATEGORIES, { signal: controller.signal }),
    controller,
  };
};

export const getVerified = () => {
  const controller = loadAbort();
  return {
    call: axios.get(CLIENTS_URLS.GET_VERIFIED, { signal: controller.signal }),
    controller,
  };
};

export const editOneClient = async (id, editedClient) => {
  const response = await axios.post(
    CLIENTS_URLS.EDIT_ONE_CLIENT(id),
    editedClient
  );
  return response.data;
};

export const editIdentityOneClient = async (id, editedIdentity) => {
  const response = await axios.post(
    CLIENTS_URLS.EDIT_IDENTITY_ONE_CLIENT(id),
    editedIdentity
  );
  return response.data;
};

export const editScoreOneClient = async (id, editedScore) => {
  const response = await axios.post(
    CLIENTS_URLS.EDIT_SCORE_ONE_CLIENT(id),
    editedScore
  );
  return response.data;
};

export const getOneCreditForReceipt = async (id) => {
  const response = await axios.get(CLIENTS_URLS.GET_ONE_CREDIT_FOR_RECEIPT(id));
  return response.data;
};

export const getUrlImages = async () => {
  const response = await axios.get(CLIENTS_URLS.GET_URL_IMAGES);
  return response.data;
};

export const getUrlSolicityCC = async () => {
  const response = await axios.get(CLIENTS_URLS.GET_URL_SOLICITYCC);
  return response.data;
};

export const getClientCvu = async (id) => {
  const response = await axios.get(CLIENTS_URLS.GET_CVU(id));
  return response.data;
};

export const getDocumentsClient = async (id) => {
  const response = await axios.get(CLIENTS_URLS.DOCUMENTS_CLIENT(id));
  return response.data;
};

export const clientAprov = async (values) => {
  const response = await axios.post(CLIENTS_URLS.CLIENT_APROV, values);
  return response.data;
};

export const digitalSign = async (values) => {
  const response = await axios.post(CLIENTS_URLS.DIGITAL_SIGN, values);
  return response.data;
};

export const welcomeLetter = async (values) => {
  const response = await axios.post(CLIENTS_URLS.WELCOME_LETTER, values);
  return response.data;
};

export const getEmailVerification = async (id) => {
  const response = await axios.post(CLIENTS_URLS.EMAIL_VERIFICATION(id));
  return response.data;
};

export const recoverPassword = async (id) => {
  const response = await axios.post(CLIENTS_URLS.RECOVER_PASSWORD(id));
  return response.data;
};

export const disableClient = async (values) => {
  const response = await axios.post(CLIENTS_URLS.DISABLE_CLIENT(), values);
  return response.data;
};

export const RELATIONS_URLS = {
  UPDATE_RELATION: () =>
    `${process.env.REACT_APP_API_URL}/relations/update-relation`,
  NEW_PERSON: () => `${process.env.REACT_APP_API_URL}/relations/new-person`,
  GET_ALL_PERSONS: (idClient) =>
    `${process.env.REACT_APP_API_URL}/relations/get-all-persons?idClient=${idClient}`,
  NEW_CLIENT_RELATION: () =>
    `${process.env.REACT_APP_API_URL}/relations/new-client-relation`,
};

export const updateRelation = async (relationData) => {
  const response = await axios.post(
    RELATIONS_URLS.UPDATE_RELATION(),
    relationData
  );
  return response.data;
};

export const addNewPerson = async (personData) => {
  const response = await axios.post(RELATIONS_URLS.NEW_PERSON(), personData);
  return response.data;
};

export const getAllPersons = async (idClient) => {
  const response = await axios.get(RELATIONS_URLS.GET_ALL_PERSONS(idClient));
  return response.data;
};

export const addNewClientRelation = async (relationData) => {
  const response = await axios.post(
    RELATIONS_URLS.NEW_CLIENT_RELATION(),
    relationData
  );
  return response.data;
};
