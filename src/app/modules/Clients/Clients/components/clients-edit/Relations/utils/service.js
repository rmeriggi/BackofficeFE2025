import axios from "axios";

export const RELATIONS_URLS = {
  GET_ALL: () => `https://devbe.myhntbank.com/relations/get-all-persons`,
  NEW_PERSON: () => `https://devbe.myhntbank.com/relations/new-person`,
  NEW_CLIENT_RELATION: () =>
    `https://devbe.myhntbank.com/relations/new-client-relation`,
  UPDATE_RELATION: () =>
    `https://devbe.myhntbank.com/relations/update-relation`,
};

export const getAllRelations = async () => {
  const response = await axios.get(RELATIONS_URLS.GET_ALL());
  return response.data;
};

export const createNewPerson = async (personData) => {
  const response = await axios.post(RELATIONS_URLS.NEW_PERSON(), personData);
  return response.data;
};

export const createNewClientRelation = async (relationData) => {
  const response = await axios.post(
    RELATIONS_URLS.NEW_CLIENT_RELATION(),
    relationData
  );
  return response.data;
};

export const updateRelation = async (relationId, updatedData) => {
  const response = await axios.post(
    RELATIONS_URLS.UPDATE_RELATION(),
    updatedData
  );
  return response.data;
};
export const getOneRelation = async (id) => {
  const response = await axios.get(
    `https://devbe.myhntbank.com/relations/${id}`
  );
  return response.data;
};
