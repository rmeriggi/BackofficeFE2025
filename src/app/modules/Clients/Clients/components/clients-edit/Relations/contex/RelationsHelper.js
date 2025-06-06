export const columnsToReportRelations = {
  header: ["Nombre", "Apellido", "Email", "Estado", "Relación", "Porcentaje"],
  properties: ["name", "lastName", "email", "status", "relation", "percentage"],
};

export const reportFormattedRelations = (report) => {
  return report.map((relation) => ({
    name: relation.name,
    lastName: relation.lastName,
    email: relation.email,
    status: relation.status,
    relation: relation.relation,
    percentage: relation.percentage,
  }));
};
