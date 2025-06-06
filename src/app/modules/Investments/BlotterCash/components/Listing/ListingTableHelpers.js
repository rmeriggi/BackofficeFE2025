export const defaultSorted = [
    {
        dataField: "id",
        order: "asc"
    }
]
export const sizePerPageList = [
    { text: "10", value: 10 },
    { text: "20", value: 20 },
    { text: "30", value: 30 },
];
export const initialFilter = {
    filter: {
        mercado:'',
    },
    sortOrder: "asc",
    sortField: "id",
    pageNumber: 1,
    pageSize: 6
};

export const initialFilterTable = {
    filter: {
        especie:'',
        instrumento:'',
    },
    sortOrder: "asc",
    sortField: "id",
    pageNumber: 1,
    pageSize: 10
};

