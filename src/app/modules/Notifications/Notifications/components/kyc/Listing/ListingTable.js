import React from "react";
import { useListingTableContext } from "./ListingTableContext";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { PaginatedTable } from "../../../../../../components/PaginatedTable";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../../../_metronic/_helpers";
import { TableNoRecordsFoundMessage } from "../../../../../../components/TableNoRecordsFound";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
/* import { DateColumnFormatter } from "./column-formatters/DateColumnFormatter"; */
/* import StatusColumnFormatter from "./column-formatters/StatusColumnFormatter"; */
import { useHistory } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
/* import FlagIcon from '@material-ui/icons/Flag'; */
import PersonIcon from "@material-ui/icons/Person";
/* import EmailIcon from "@material-ui/icons/Email"; */
import FingerprintIcon from "@material-ui/icons/Fingerprint";

// Estilos en línea para evitar el uso de hooks
const styles = {
  headerCell: {
    backgroundColor: "#2c3e50",
    color: "white",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "12px 15px",
  },
  rowStyle: {
    "&:nth-of-type(even)": {
      backgroundColor: "#f8f9fa",
    },
    "&:hover": {
      backgroundColor: "#e9f7fe",
      transition: "background-color 0.3s ease",
    },
  },
  booleanCell: {
    textAlign: "center",
    verticalAlign: "middle",
  },
  trueValue: {
    color: "#28a745",
  },
  falseValue: {
    color: "#dc3545",
  },
  actionButton: {
    minWidth: "90px",
    padding: "6px 12px",
    borderRadius: "4px",
    fontWeight: 500,
    textTransform: "none",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
    },
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: 600,
    display: "inline-block",
  },
  activeStatus: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },
  inactiveStatus: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  countryCell: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  countryFlag: {
    width: "20px",
    height: "15px",
    borderRadius: "2px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
  },
  clientContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  clientAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#e3f2fd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clientName: {
    fontWeight: 600,
  },
  clientLastName: {
    fontSize: "0.85rem",
    color: "#6c757d",
  },
};

// Función para obtener estilos de fila
const getRowStyle = (row, index) => {
  return {
    ...styles.rowStyle,
    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
    "&:hover": {
      backgroundColor: "#e9f7fe",
    },
  };
};

// Formateador para valores booleanos
const BooleanFormatter = (cell) => {
  return cell ? (
    <div style={{ ...styles.booleanCell, ...styles.trueValue }}>
      <CheckCircleIcon fontSize="small" />
    </div>
  ) : (
    <div style={{ ...styles.booleanCell, ...styles.falseValue }}>
      <CancelIcon fontSize="small" />
    </div>
  );
};

// Formateador para el nombre del cliente
const ClientNameFormatter = (cell, row) => {
  return (
    <div style={styles.clientContainer}>
      <div style={styles.clientAvatar}>
        <PersonIcon style={{ color: "#1976d2" }} />
      </div>
      <div>
        <div style={styles.clientName}>{row.name}</div>
        <div style={styles.clientLastName}>{row.lastName}</div>
      </div>
    </div>
  );
};

// Formateador para el país
const CountryFormatter = (cell) => {
  // Mapeo de códigos de país a nombres
  const countryNames = {
    "54": "Argentina",
    "55": "Brasil",
    "56": "Chile",
    "57": "Colombia",
    "58": "Venezuela",
    "52": "México",
    "51": "Perú",
  };

  // Colores para las banderas (ejemplo simplificado)
  const flagColors = {
    "54":
      "linear-gradient(to bottom, #74acdf 33%, white 33%, white 66%, #74acdf 66%)",
    "55": "linear-gradient(to bottom, #009c3b 50%, #ffdf00 50%)",
    "56":
      "linear-gradient(to bottom, #0039a6 33%, white 33%, white 66%, #d52b1e 66%)",
    "57": "linear-gradient(to bottom, #FFCD00 50%, #003893 25%, #CE1126 25%)",
    "58":
      "linear-gradient(to bottom, #FFCC00 33%, #0038A8 33%, #0038A8 66%, #CE1126 66%)",
    "52":
      "linear-gradient(to bottom, #006847 33%, white 33%, white 66%, #CE1126 66%)",
    "51":
      "linear-gradient(to bottom, #D91023 33%, white 33%, white 66%, #D91023 66%)",
  };

  return (
    <div style={styles.countryCell}>
      <div
        style={{
          ...styles.countryFlag,
          background: flagColors[cell] || "#e0e0e0",
        }}
      />
      <span>{countryNames[cell] || `País ${cell}`}</span>
    </div>
  );
};

// Formateador para el email
/* const EmailFormatter = (cell) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <EmailIcon fontSize="small" color="action" />
      <a
        href={`mailto:${cell}`}
        style={{ textDecoration: "none", color: "#1976d2" }}
      >
        {cell}
      </a>
    </div>
  );
}; */

// Formateador para el pasaporte
const PassportFormatter = (cell) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <FingerprintIcon fontSize="small" color="action" />
      <span>{cell}</span>
    </div>
  );
};

// Formateador para el estado
const EnhancedStatusFormatter = (cell) => {
  const statusInfo = {
    "1": {
      text: "Activo",
      style: { ...styles.statusBadge, ...styles.activeStatus },
    },
    "2": {
      text: "Inactivo",
      style: { ...styles.statusBadge, ...styles.inactiveStatus },
    },
    "3": {
      text: "Pendiente",
      style: {
        ...styles.statusBadge,
        backgroundColor: "#fff3cd",
        color: "#856404",
      },
    },
    "4": {
      text: "Bloqueado",
      style: {
        ...styles.statusBadge,
        backgroundColor: "#d6d8d9",
        color: "#1b1e21",
      },
    },
  };

  const status = statusInfo[cell] || {
    text: `Estado ${cell}`,
    style: { ...styles.statusBadge, ...styles.inactiveStatus },
  };

  return <span style={status.style}>{status.text}</span>;
};

const filterData = (accountsData, filter) => {
  let filteredData = accountsData;
  if (filter.id !== "" && filter.id !== 0) {
    filteredData = accountsData.filter((account) => {
      if (account.status === filter.id) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
};

export function ListingTable({
  counterparties,
  setShowEditModal,
  setEditInitialData,
}) {
  const history = useHistory();

  const columns = [
    {
      dataField: "name",
      text: "Cliente",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      headerStyle: styles.headerCell,
      formatter: ClientNameFormatter,
      classes: "align-middle",
      style: { minWidth: "220px" },
    },
    {
      dataField: "passport",
      text: "Pasaporte",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      headerStyle: styles.headerCell,
      formatter: PassportFormatter,
      classes: "align-middle",
      style: { minWidth: "160px" },
    },

    {
      dataField: "status",
      text: "Estado",
      headerStyle: { ...styles.headerCell, textAlign: "center" },
      align: "center",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: EnhancedStatusFormatter,
      classes: "align-middle",
      style: { minWidth: "120px" },
    },
    {
      dataField: "country",
      text: "País",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      headerStyle: styles.headerCell,
      formatter: CountryFormatter,
      classes: "align-middle",
      style: { minWidth: "150px" },
    },
    {
      dataField: "pep",
      text: "PEP",
      headerStyle: { ...styles.headerCell, textAlign: "center" },
      align: "center",
      formatter: BooleanFormatter,
      classes: "align-middle",
      style: { minWidth: "80px" },
    },
    {
      dataField: "so",
      text: "SO",
      headerStyle: { ...styles.headerCell, textAlign: "center" },
      align: "center",
      formatter: BooleanFormatter,
      classes: "align-middle",
      style: { minWidth: "80px" },
    },
    {
      dataField: "facta",
      text: "FATCA",
      headerStyle: { ...styles.headerCell, textAlign: "center" },
      align: "center",
      formatter: BooleanFormatter,
      classes: "align-middle",
      style: { minWidth: "90px" },
    },
    {
      dataField: "rfe",
      text: "RFE",
      headerStyle: { ...styles.headerCell, textAlign: "center" },
      align: "center",
      formatter: BooleanFormatter,
      classes: "align-middle",
      style: { minWidth: "80px" },
    },
    {
      dataField: "aagi",
      text: "AAGI",
      headerStyle: { ...styles.headerCell, textAlign: "center" },
      align: "center",
      formatter: BooleanFormatter,
      classes: "align-middle",
      style: { minWidth: "90px" },
    },
    {
      dataField: "",
      text: "Acción",
      formatter: ActionColumnFormatter,
      formatExtraData: {
        tooltip: "Editar usuario",
        fnAction: (row) => {
          history.push(`/clients/clients/edit/${row.id}`);
        },
        icon: "Communication/Write.svg",
      },
      headerStyle: { textAlign: "center" /* … */ },
      align: "center",
      classes: "align-middle",
      style: { minWidth: "120px" },
    },
  ];

  const {
    queryParams,
    size,
    pageNumber,
    setSize,
    setPageNumber,
  } = useListingTableContext();

  const filteredData = filterData(counterparties, queryParams.filter);

  const paginationOptions = {
    custom: true,
    totalSize: filteredData.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };

  return filteredData.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"clientes"} />
  ) : (
    <div
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: "20px",
      }}
    >
      <PaginatedTable
        columns={columns}
        data={filteredData}
        defaultSorted={defaultSorted}
        paginationOptions={paginationOptions}
        setSize={setSize}
        setPageNumber={setPageNumber}
        rowStyle={(row, index) => getRowStyle(row, index)}
        headerClasses="align-middle"
      />
    </div>
  );
}
