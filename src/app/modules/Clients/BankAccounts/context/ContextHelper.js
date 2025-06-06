import moment from "moment";

export const initialFilter = {
  filter: {
    CBU: "",
    CBUAlias: "",
    entity: "",    
  },
  sortOrder: "asc",
  sortField: "CBU",
  pageNumber: 1,
  pageSize: 10,
};


export const ClientStatusCssClasses = [
  "danger",
  "success",
  "info",
  "info",
  "info",
  "danger",
  "danger",
  "danger",
  "warning",
  "warning",
];
export const ClientStatusTitles = [
  "",
  "Activo",
  "Pendiente",
  "Revision Compliance",
  "Firmando",
  "Rechazado",
  "Baja",
  "Pausado",
  "Pendiente Alta",
  "Falta Documentacion",
];

export const columnsToReportClients = {
  header: [
    "Banco",
    "cbu/cvu",
    "alias",
  ],
  properties: ["entity", "CBU", "CBUAlias"],
};

export const columnsClients = {
  header: [
    "Banco",
    "cbu/cvu",
    "alias",
    "",
    "",
    "",
    "Acción",
  ],
  properties: ["entity", "CBU", "CBUAlias", "", "", "", ""],
};

export const filterSearch = (listingData, filter) => {
    
  let filteredData = listingData;
  if (filter.CBU !== "" || filter.CBUAlias !== "" || filter.entity !=="") {
    filteredData = listingData.filter((client) => {          
      if (
        client.CBUAlias?.toLowerCase().includes(filter.CBUAlias.toLowerCase()) ||
        client.CBU
          ?.toString()
          .toLowerCase()
          .includes(filter.CBU?.toLowerCase()) ||
        client.entity?.toLowerCase().includes(filter.entity?.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
};

export const reportFormatted = (report) => {
  const reportFormatted = report.map((e) => {
    const dateCVU = e.dateCVU ? moment(e.dateCVU).format("DD/MM/YYYY") : "";
    const date = moment(e.date)
      .utc()
      .format("DD/MM/YYYY");
    const status = ClientStatusTitles[e.status]; // e.status === "1" ? "Activo" : "Inactivo"
    return {
      ...e,
      dateCVU,
      date,
      status,
    };
  });
  return reportFormatted;
};
