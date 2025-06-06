export const CustomerStatusCssClasses = ["warning", "success"]
export const  CustomerStatusTitles =["Pausado", "Vigente"]
export const defaultSorted = [
    {
        dataField: "id",
        order: "asc"
    }
]
export const sizePerPageList = [
    { text: "3", value: 3 },
    { text: "5", value: 5 },
    { text: "50", value: 50 }
];
export const initialFilter = {
    filter: {
        id: "",
        active: "",
        amount: "",
        pxCleanCost: "",
        cleanCost: "",
        pxDirtyPurchase: "", 
        dirtyAmount: ""
    },
    sortOrder: "asc",
    sortField: "id",
    pageNumber: 1,
    pageSize: 50
};