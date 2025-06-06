export const CustomerStatusCssClasses = ["warning", "success"]
export const  CustomerStatusTitles =["Pausado", "Vigente"]
export const defaultSorted = [
    {
        dataField: "accountName",
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
        accountName: "",
        bank: "",
        type: "",
        currency: "",
    },
    sortOrder: "asc",
    sortField: "accountName",
    pageNumber: 1,
    pageSize: 10
};