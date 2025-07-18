export const ClientStatusCssClasses = ["warning", "primary"]
export const ClientStatusTitles = ["Inactivo", "Activo"]

export const defaultSorted = [
    {
        dataField: "id",
        order: "asc"
    }
]
export const sizePerPageList = [
    { text: "3", value: 3 },
    { text: "5", value: 5 },
    { text: "10", value: 10 }
];
export const initialFilter = {
    filter: {
        id: "",
        currency: "",
        country: "",
        tax: "",
        status: "",
    },
    sortOrder: "asc",
    sortField: "id",
    pageNumber: 1,
    pageSize: 10
};