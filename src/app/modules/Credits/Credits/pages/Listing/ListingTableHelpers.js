export const CustomerStatusCssClasses = ["", "warning", "success", "danger", "primary", "info", "dark"]
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
        status: "",
        productName: "",
        date: "",
        rate: "",
        capital: "",
    },
    sortOrder: "asc",
    sortField: "id",
    pageNumber: 1,
    pageSize: 10
};