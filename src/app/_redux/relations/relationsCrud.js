import axios from "axios";

// URL base para las solicitudes

export const RELATIONS_URLS = {
  GET_ALL_PERSONS: (id) =>  `${process.env.REACT_APP_API_URL}/relations/get-all-persons/${id}`,
  GET_RELATION_BY_ID: (idRelation) =>
    `${process.env.REACT_APP_API_URLL}/relations/get-relation/${idRelation}`,
  UPDATE_RELATION: () => `${process.env.REACT_APP_API_URL}/relations/update-relation`,
  CREATE_RELATION: () => `${process.env.REACT_APP_API_URL}/relations/new-client-relation`,
};

// Obtener todas las relaciones
export const getAllPersons = async (idClient) => {
  const response = await axios.get(RELATIONS_URLS.GET_ALL_PERSONS(idClient));
  return response.data;
};

// Obtener una relación por su ID
export const getRelationById = async (idRelation) => {
  const response = await axios.get(
    RELATIONS_URLS.GET_RELATION_BY_ID(idRelation)
  );
  return response.data;
};

// Actualizar una relación
export const updateRelation = async (relationData) => {
  const response = await axios.patch(
    RELATIONS_URLS.UPDATE_RELATION(),
    relationData
  );
  return response.data;
};

// Crear una nueva relación
export const createRelation = async (relationData) => {

  const values = {
    idClient: parseInt(relationData.idClient, 10),
    name: relationData.name,
    lastName: relationData.lastName,
    bussinessName: relationData.bussinessName,
    passport: relationData.passport,
    cuit: relationData.cuit,
    nationality: parseInt(relationData.nationality, 10) ,
    street: relationData.street,
    numberStreet: relationData.numberStreet,
    city: relationData.city,
    postalCode: relationData.postalCode,
    email: relationData.email,
    cellPhone: relationData.cellPhone,
    facebookId: relationData.facebookId,
    googleId: relationData.googleId,
    appleId: relationData.appleId,
    otherId: relationData.otherId,
    verified: relationData.verified !== "" ? parseInt(relationData.verified, 10) : 0,
    level: relationData.level !== "" ? parseInt(relationData.level, 10) : 0,
    category: relationData.category !== "" ? parseInt(relationData.category, 10) : 0,
    use: relationData.use,
    civilstatusId: parseInt(relationData.civilstatusId),
    genreId: parseInt(relationData.genreId),
    floor: relationData.floor,
    departament: relationData.departament,
    origin: relationData.origin,
    idOrigin: relationData.idOrigin,
    birthDate: relationData.birthDate,
    residence:parseInt(relationData.residence),
    birthPlace: relationData.birthPlace,
    reference: relationData.reference,
    profession: relationData.profession,
    position: relationData.position,
    idRelation: relationData.position === "ACCIONISTA" ? 1 : 2,
    status: relationData.status !== "" ? parseInt(relationData.status, 10) : 1,
    participation: relationData.position === "ACCIONISTA" ? relationData.participation : 0,
    pep: relationData.pep,
    so: relationData.so,
    facta: relationData.facta,
    rfe: relationData.rfe,
    ip: relationData.ip,
    device: relationData.device,
    agi: relationData.agi,
  }

  const response = await axios.post(
    RELATIONS_URLS.CREATE_RELATION(),
    values
  );
  return response.data;
};
