export const initialFilter = {
  pageNumber: 1,
  pageSize: 10,
  sortField: "nombre",
  sortOrder: "asc",
  filter: {
    nombre: "",
    codigo: "",
    referencia: "",
    estado: "",
  },
};

export const PatronoStatusCssClasses = [
  "",
  "success",
  "info",
  "warning",
  "danger",
];
export const PatronoStatusTitles = [
  "",
  "Activo",
  "Pendiente",
  "Suspendido",
  "Inactivo",
];

export const filterSearch = (patronos, filter) => {
  if (!patronos || !filter) return patronos;

  return patronos.filter((patrono) => {
    const searchText = filter.nombre?.toLowerCase() || "";
    const matchesSearch =
      !searchText ||
      patrono.nombre?.toLowerCase().includes(searchText) ||
      patrono.codigo?.toLowerCase().includes(searchText) ||
      patrono.referencia?.toLowerCase().includes(searchText);

    const matchesEstado = !filter.estado || patrono.estado === filter.estado;

    return matchesSearch && matchesEstado;
  });
};
