import moment from "moment";

export const initialFilter = {
  filter: {
    name: "",
    lastName: "",
    email: "",
    passport: "",
    account: "",
    status: "",
    from: null,
    to: null,
  },
  sortOrder: "asc",
  sortField: "id",
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
    "Nombre",
    "Apellido",
    "Email",
    "Dni",
    "Fecha alta",
    "País",
    "Estado",
    "Número de cuenta",
    "CVU",
    "Fecha CVU",
    "Canal",
    "Acción",
  ],
  properties: [
    "name",
    "lastName",
    "email",
    "passport",
    "date",
    "country",
    "status",
    "account",
    "cvu",
    "dateCVU",
    "origen",
    "",
  ],
};

export const columnsClients = {
  header: [
    "Cliente",
    "Fecha Alta",
    "Perfil",
    "Número de cuenta",
    "Estado",
    "Canal",
    "Acción",
  ],
  properties: ["name", "date", "email", "account", "state", "origen", ""],
};

export const filterSearch = (listingData, filter) => {
  let filteredData = listingData;
  if (filter.name !== "" || filter.lastname !== "") {
    filteredData = listingData.filter((client) => {
      if (filter.status !== "") {
        if (client.status !== filter.status.toString()) {
          return false;
        }
      }
      if (filter.from !== null) {
        if (moment(client.date).isBefore(filter.from, "days")) {
          return false;
        }
      }
      if (filter.to !== null) {
        if (moment(client.date).isAfter(filter.to, "days")) {
          return false;
        }
      }
      if (
        client.name?.toLowerCase().includes(filter.name.toLowerCase()) ||
        client.passport
          ?.toString()
          .toLowerCase()
          .includes(filter.passport?.toLowerCase()) ||
        client.email?.toLowerCase().includes(filter.email?.toLowerCase()) ||
        client.lastName
          ?.toLowerCase()
          .includes(filter.lastName.toLowerCase()) ||
        client.account?.toLowerCase().includes(filter.account?.toLowerCase())
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
