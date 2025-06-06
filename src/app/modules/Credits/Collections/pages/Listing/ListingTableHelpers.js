export const CustomerStatusCssClasses = ["warning", "info", "success", "danger"]
export const  CustomerStatusTitles =["", "Pendiente", "Otorgado", "Rechazado"]
export const defaultSorted = [
    {
        dataField: "productId",
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
        manager: "",
        creditId: "",
        dni: "",
        name: "",
        days: "",
        amountOwed:"",
        cuotes: "",
        dateLastContact: "",
        status: "",
    },
    sortOrder: "asc",
    sortField: "productId",
    pageNumber: 1,
    pageSize: 10
};