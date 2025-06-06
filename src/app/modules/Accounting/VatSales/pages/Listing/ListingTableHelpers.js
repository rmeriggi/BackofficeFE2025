export const defaultSorted = [
    {
        dataField: "date",
        order: "asc"
    }
];
export const sizePerPageList = [
    { text: "3", value: 3 },
    { text: "5", value: 5 },
    { text: "10", value: 10 }
];
export const initialFilter = {
    filter: {
        date: "",
        comprobante: "",
        provider: "",
        condIVA: "",
        cuit: "",
        total: "",
    },
    sortOrder: "asc",
    sortField: "date",
    pageNumber: 1,
    pageSize: 10
};
