export const ClientStatusCssClasses = ["danger", "success", "info"];
export const ClientStatusTitles = ["Suspendido", "Activo"];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    name: "",
    lastname: "",
    email: "",
    dni: "",
    date: "",
    country: "",
    status: "",

  },
  sortOrder: "asc", 
  sortField: "client",
  pageNumber: 1,
  pageSize: 10
};
