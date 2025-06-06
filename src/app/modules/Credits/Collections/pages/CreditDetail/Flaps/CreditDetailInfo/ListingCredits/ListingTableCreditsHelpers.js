export const StatusCssClasses = ["warning", "info", "success", "danger"]
export const StatusTitles =["", "Pendiente", "Otorgado", "Rechazado"]
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
        status: "",
        creditId: "",
        creditType: "",
        quota: "",
        amount: "",
        expiration: "",
    },
    sortOrder: "asc",
    sortField: "productId",
    pageNumber: 1,
    pageSize: 10
};