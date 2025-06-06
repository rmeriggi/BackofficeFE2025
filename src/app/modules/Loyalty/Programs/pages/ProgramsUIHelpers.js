export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const ProgramStatusCssClasses = ["none", "danger", "success", "info"];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    status: "",
    productName: "",
    date: "",
    rate: "",
    capital: "",

  },
  sortOrder: "asc", 
  sortField: "productName",
  pageNumber: 1,
  pageSize: 10
};
