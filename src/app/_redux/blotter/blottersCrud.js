import axios from "axios";

export const BLOTTER_URLS = {
  GET_LIST: () =>
    `${process.env.REACT_APP_API_URL}/blotter`,
    GET_VISTA_LIST: () =>
    `${process.env.REACT_APP_API_URL}/blotter/vista`,
  NEW_BLOTTER: () =>
    `${process.env.REACT_APP_API_URL}/blotter/new-blotter`,
  UPDATE_AUTHORIZED: () =>
  `${process.env.REACT_APP_API_URL}/blotter/update-authorized`,
  UPDATE_CHARGED: () =>
  `${process.env.REACT_APP_API_URL}/blotter/update-charged`,
  GET_PNL: () =>
  `${process.env.REACT_APP_API_URL}/blotter/BP_PNL`,
  GET_PNL_SPECIES: () =>
  `${process.env.REACT_APP_API_URL}/blotter/BP_PNL/species`,  
  GET_PNL_INSTRUMENT: () =>
  `${process.env.REACT_APP_API_URL}/blotter/BP_PNL/instrument`, 
  GET_SPECIES: () =>
  `${process.env.REACT_APP_API_URL}/blotter/blotter-species`,
  GET_CASH: () =>
  `${process.env.REACT_APP_API_URL}/blotter/cash`,
  GET_CASH_MONEY: () =>
  `${process.env.REACT_APP_API_URL}/blotter/cashMoney`,
  GET_SPECIES_INSTRUMENT: () =>
  `${process.env.REACT_APP_API_URL}/blotter/blotter-species/instrument`,  
  CREATE_COUNTERPARTY:() =>
  `${process.env.REACT_APP_API_URL}/comitenteESCO/new`,
  UPDATE_COUNTERPARTY:() =>
  `${process.env.REACT_APP_API_URL}/comitenteESCO/update`,
  CREATE_SPECIE:() =>
  `${process.env.REACT_APP_API_URL}/species/new`,
  UPDATE_SPECIE:() =>
  `${process.env.REACT_APP_API_URL}/species/update`,
};

export const getAllBlotterList = async (from, to) => {
  const now = new Date().toISOString();
  const since = now.substring(0, 10) + "T00:00:00.001Z";
  const values ={
    sinceDate: from ? from : since,
    toDate:  to ? to : now ,
    idWallet: 0,
    idMoney: 0,
    deadline: 0,
    idMarket: 0,
  }
  const response = await axios.post(BLOTTER_URLS.GET_VISTA_LIST(), values);
  return response.data;
};

export const getAllBlotterVistaList = async () => {
  const now = new Date().toISOString();
  const since = now.substring(0, 10) + "T00:00:00.000Z";

  const values ={
    sinceDate: since,
    toDate:  now ,
    idWallet: 0,
    idMoney: 0,
    deadline: 0,
    idMarket: 0,
  }
  const response = await axios.post(BLOTTER_URLS.GET_LIST(), values);
  return response.data;
};


export const newBlotter = async (values) => {
  const clonedObj = { ...values };
  clonedObj.date = new Date(values.date).toISOString();
  clonedObj.price =Number(clonedObj.price.replace(/\./g, '').replace(',', '.'))
  clonedObj.amount =Number(clonedObj.amount.replace(/\./g, '').replace(',', '.'))
  const response = await axios.post(BLOTTER_URLS.NEW_BLOTTER(), clonedObj);
  return response.data;
};

export const updateAuthorizedBlotter = async (values) => {
  const clonedObj = { ...values };
  const response = await axios.patch(BLOTTER_URLS.UPDATE_AUTHORIZED(), clonedObj);
  return response.data;
};

export const updateCharged = async (values) => {
  const response = await axios.patch(BLOTTER_URLS.UPDATE_CHARGED(), values);
  return response.data;
};

export const getAllPnlSpecies = async (from, to, idMoney, idComitente) => {
  const now = new Date().toISOString();
  const since = now.substring(0, 10) + "T00:00:00.000Z";
  const values ={
    sinceDate: from ? from : since,
    toDate:  to ? to : now ,
    idcomitente: Number(idComitente),
    idMoney: Number(idMoney),    
  }
  const response = await axios.post(BLOTTER_URLS.GET_PNL_SPECIES(), values);
  return JSON.parse(response.data.data);
};

export const getAllPnlInstrument = async (from, to, idMoney, idComitente) => {
  const now = new Date().toISOString();
  const since = now.substring(0, 10) + "T00:00:00.000Z";
  const values ={
    sinceDate: from ? from : since,
    toDate:  to ? to : now ,
    idcomitente: Number(idComitente),
    idMoney: Number(idMoney),    
  }
  const response = await axios.post(BLOTTER_URLS.GET_PNL_INSTRUMENT(), values);
  return JSON.parse(response.data.data);
};

export const getAllPnl = async (from, to, idMoney, idComitente) => {
  const now = new Date().toISOString();
  const since = now.substring(0, 10) + "T00:00:00.000Z";
  const values ={
    sinceDate: from ? from : since,
    toDate:  to ? to : now ,
    idcomitente: Number(idComitente),
    idMoney: Number(idMoney),    
  }
  const response = await axios.post(BLOTTER_URLS.GET_PNL(), values);
  return JSON.parse(response.data);
};

export const getAllSpecies = async (from, to, idMoney) => {
  const now = new Date().toISOString();
  const since = now.substring(0, 10) + "T00:00:00.000Z";
  const values ={
    sinceDate: from ? from : since,
    toDate:  to ? to : now ,
    idMoney: Number(idMoney),   
  }
  const response = await axios.post(BLOTTER_URLS.GET_SPECIES(), values);
  return JSON.parse(response.data);
};

export const getAllSpeciesInstrument = async (from, to, idMoney, market) => {
  const now = new Date().toISOString();
  const since = now.substring(0, 10) + "T00:00:00.000Z";
  const values ={
    sinceDate: from ? from : since,
    toDate:  to ? to : now ,
    idMoney: Number(idMoney),   
    market: Number(market), 
  }
  const response = await axios.post(BLOTTER_URLS.GET_SPECIES_INSTRUMENT(), values);
  return JSON.parse(response.data.data);
};

export const getAllCash = async (from, to, idMoney) => {
  const now = new Date().toISOString();
  const since = now.substring(0, 10) + "T00:00:00.000Z";
  const values ={
    sinceDate: from ? from : since,
    toDate:  to ? to : now ,
    idMoney: Number(idMoney),  
  }
  const response = await axios.post(BLOTTER_URLS.GET_CASH(), values);
  return JSON.parse(response.data);
};

export const getAllCashMoney = async (from, to, deadLine) => {
  const now = new Date().toISOString();
  const since = now.substring(0, 10) + "T00:00:00.000Z";
  const values ={
    sinceDate: from ? from : since,
    toDate:  to ? to : now ,
    deadLine: Number(deadLine),  
  }
  const response = await axios.post(BLOTTER_URLS.GET_CASH_MONEY(), values);
  return JSON.parse(response.data.data);
};

export const createCounterparty = async (values) => {
  const response = await axios.post(BLOTTER_URLS.CREATE_COUNTERPARTY(), values);
  return response.data;
};

export const updateCounterparty = async (values) => {
  const response = await axios.post(BLOTTER_URLS.UPDATE_COUNTERPARTY(), values);
  return response.data;
};

export const createSpecie = async (values) => {
  const response = await axios.post(BLOTTER_URLS.CREATE_SPECIE(), values);
  return response.data;
};

export const updateSpecie= async (values) => {
  const response = await axios.post(BLOTTER_URLS.UPDATE_SPECIE(), values);
  return response.data;
};



