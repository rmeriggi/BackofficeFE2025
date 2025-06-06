export const CustomerStatusCssClasses = ["warning", "success"]
export const  CustomerStatusTitles =["Pausado", "Vigente"]
export const defaultSorted = [
    {
        dataField: "id",
        order: "desc"
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
        operationNumber: "",
        searchTextAll: "",
        idStatus: ""
    },
    sortOrder: "asc",
    sortField: "id",
    pageNumber: 1,
    pageSize: 10
};