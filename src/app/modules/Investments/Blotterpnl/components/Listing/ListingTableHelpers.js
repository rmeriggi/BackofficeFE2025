export const defaultSorted = [
    {
        dataField: "id",
        order: "asc"
    }
]
export const sizePerPageList = [
    { text: "3", value: 3 },
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "30", value: 30 },
];
export const initialFilter = {
    filter: {
        especie:'',
        instrumento:'',
    },
    sortOrder: "asc",
    sortField: "id",
    pageNumber: 1,
    pageSize: 30
};

export const initialFilterInstrument = {
    filter: {
        instrumento:'',
        especie:'',
    },
    sortOrder: "asc",
    sortField: "id",
    pageNumber: 1,
    pageSize: 30
};

