export const initialFilter = {
  filter: {
    docNumber: "",
    cuil: "",
  },
  sortOrder: "asc",
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};

export const filterData = (listingData, filter) => {
  let filteredData = listingData;
  if (filter.docNumber !== "" || filter.cuil !== "") {
    filteredData = listingData.filter(data => {
      if (
          data.docNumber?.toString().includes(filter.docNumber) ||
          data.cuil?.toString().includes(filter.cuil)
      ) {
          return true;
      }
      return false;
    });
  }
  return filteredData;
}

export const columnsInvestmentClient = {
  header: ['ID', 'Entidad', 'Apellido', 'Nombre', 'Tipo Doc', 'Número Doc', 'Cuil', 'Acción'],
  properties: ['id', 'entityId', 'lastname', 'name', 'docType', 'docNumber', 'cuil', '']
}

export const fieldsToDetail = (client) => {
  return [
    [
      {
        label: 'Entidad',
        value: client.entity
      },
      {
        label: 'Cliente',
        value: client.client
      },
      {
        label: 'Nombre',
        value: client.name
      },
      {
        label: 'Apellido',
        value: client.lastname
      },
    ],
    [
      {
        label: 'Tipo de documento',
        value: client.docType
      },
      {
        label: 'Número de documento',
        value: client.docNumber
      },
      {
        label: 'Nacionalidad',
        value: client.nacionality
      },
      {
        label: 'Fecha de nacimiento',
        value: client.birthDay
      },
    ],
    [
      {
        label: 'Lugar de nacimiento',
        value: client.birthPlacement
      },
      {
        label: 'Género',
        value: client.gender
      },
      {
        label: 'Estado civil',
        value: client.civilStatus
      },
      {
        label: 'PEP',
        value: client.pep
      },
    ],
    [
      {
        label: 'SO',
        value: client.so
      },
      {
        label: 'CUIT',
        value: client.cuit
      },
      {
        label: 'CUIL',
        value: client.cuil
      },
      {
        label: 'CDI',
        value: client.cdi
      },
    ],
    [
      {
        label: 'Email',
        value: client.email
      },
      {
        label: 'No presencial',
        value: client.presencial
      },
      {
        label: 'Inv calificado',
        value: client.invQualified
      },
      {
        label: 'Beneficiario',
        value: client.beneficiary
      },
    ],
    [
      {
        label: 'Cliente',
        value: client.isClient
      },
      {
        label: 'Cliente especial',
        value: client.specialClient
      },
      {
        label: 'Extranjero',
        value: client.foreign
      },
      {
        label: 'Cod interfaz',
        value: client.interfazCod
      },
    ],
    [
      {
        label: 'LUT',
        value: client.lut
      },
      {
        label: 'GIN',
        value: client.gin
      },
      {
        label: 'RUC',
        value: client.ruc
      },
      {
        label: 'Id Facta',
        value: client.idFacta
      },
    ],
    [
      {
        label: 'Obs Facta',
        value: client.obsFacta
      },
      {
        label: 'Cod Tpid Facta',
        value: client.codTpidFacta
      },
      {
        label: 'Cod actividad UIF',
        value: client.codActivityUif
      },
      {
        label: 'Cod tp contrib IVA',
        value: client.codTpContribIva
      },
    ],
    [
      {
        label: 'Tp persona',
        value: client.tpPerson
      },
      {
        label: 'Num impositivo',
        value: client.inpositiveNum
      },
      {
        label: 'Pers empresa',
        value: client.bussinessPers
      },
      {
        label: 'Pers cargo',
        value: client.chargePers
      },
    ],
    [
      {
        label: 'Pers tp contrib retención',
        value: client.persTpCOntribReten
      },
      {
        label: 'Pers ag recaudador',
        value: client.persAgRec
      },
      {
        label: 'Pers ag nro inscrip',
        value: client.persAgNroInscrip
      },
      {
        label: 'Pers SSN',
        value: client.persSSN
      },
    ], 
    [
      {
        label: 'Posición condominio',
        value: client.condominiumPosition
      },
      {
        label: 'Cond tipo condominio',
        value: client.condominiumTypeCond
      },
      {
        label: 'Requiere firma',
        value: client.requireSignature
      },
      {
        label: 'Cond es accionista',
        value: client.condIsAccionist
      },
    ],
    [
      {
        label: 'Cond proc participación',
        value: client.participationCondProc
      },
      {
        label: 'Cond beneficiario',
        value: client.beneficiarieCond
      },
      {
        label: 'Patrimonio estimado',
        value: client.estimatedNetWorth
      },
      {
        label: 'Patrimonio estimado moneda',
        value: client.estimatedNetWorthCurrency
      },
    ],
    [
      {
        label: 'Tp riesgo titular',
        value: client.titularTpRisk
      },
    ],
  ]  
}