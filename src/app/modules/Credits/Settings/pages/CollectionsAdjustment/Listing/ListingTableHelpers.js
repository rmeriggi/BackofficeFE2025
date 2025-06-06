export const CustomerStatusCssClasses = ["info", "success", "warning", "danger", "light", "dark", "muted"]
export const  CustomerStatusTitles =["", "Al Día", "Mora 30 Días", "Mora 60 Días", "Mora 90 Días", "Mora 120 Días" ]
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