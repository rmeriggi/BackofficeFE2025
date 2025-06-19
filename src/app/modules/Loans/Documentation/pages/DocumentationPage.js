import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  AccountBalance as AccountBalanceIcon,
  Add as AddIcon,
  AttachMoney as AttachMoneyIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  CloudDownload as CloudDownloadIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Folder as FolderIcon,
  GridOn as GridOnIcon,
  Home as HomeIcon,
  InsertDriveFile as InsertDriveFileIcon,
  List as ListIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Warning as WarningIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSubheader } from "../../../../../_metronic/layout";
import Pagination from "../../../../components/Pagination";
import { documentationMock } from "../../__mocks__/documentationMock";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: "#f3f6f9",
    minHeight: "100vh",
  },
  header: {
    background: "linear-gradient(135deg, #3699FF 0%, #1BC5BD 100%)",
    color: "white",
    marginBottom: theme.spacing(3),
    borderRadius: "12px",
  },
  headerContent: {
    padding: theme.spacing(3),
  },
  metricCard: {
    height: "100%",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "none",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  metricValue: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  metricChange: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.875rem",
  },
  positiveChange: {
    color: "#1BC5BD",
  },
  negativeChange: {
    color: "#F64E60",
  },
  neutralChange: {
    color: "#7E8299",
  },
  chartCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "none",
  },
  alertCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "none",
    marginBottom: theme.spacing(2),
  },
  alertWarning: {
    borderLeft: "4px solid #FFA800",
    backgroundColor: "#FFF4DE",
  },
  alertInfo: {
    borderLeft: "4px solid #3699FF",
    backgroundColor: "#E1F0FF",
  },
  alertSuccess: {
    borderLeft: "4px solid #1BC5BD",
    backgroundColor: "#E8FFF3",
  },
  loanCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "none",
    marginBottom: theme.spacing(2),
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  statusApproved: {
    backgroundColor: "#E8FFF3",
    color: "#1BC5BD",
  },
  statusPending: {
    backgroundColor: "#FFF4DE",
    color: "#FFA800",
  },
  statusRejected: {
    backgroundColor: "#FFE2E5",
    color: "#F64E60",
  },
  documentCard: {
    borderRadius: "8px",
    border: "1px solid #E1E3EA",
    marginBottom: theme.spacing(1),
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: "#3699FF",
      boxShadow: "0 2px 8px rgba(54, 153, 255, 0.15)",
    },
  },
  uploadArea: {
    border: "2px dashed #E1E3EA",
    borderRadius: "8px",
    padding: theme.spacing(3),
    textAlign: "center",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#3699FF",
      backgroundColor: "#F3F6F9",
    },
  },
  uploadAreaActive: {
    borderColor: "#3699FF",
    backgroundColor: "#E1F0FF",
  },
  viewButton: {
    backgroundColor: "#3699FF",
    color: "white",
    "&:hover": {
      backgroundColor: "#187DE4",
    },
  },
  uploadButton: {
    backgroundColor: "#1BC5BD",
    color: "white",
    "&:hover": {
      backgroundColor: "#0BB783",
    },
  },
  deleteButton: {
    backgroundColor: "#F64E60",
    color: "white",
    "&:hover": {
      backgroundColor: "#EE2D42",
    },
  },
}));

const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  color,
  className,
}) => {
  const classes = useStyles();

  const getChangeColor = (change) => {
    if (change > 0) return classes.positiveChange;
    if (change < 0) return classes.negativeChange;
    return classes.neutralChange;
  };

  const formatValue = (value) => {
    if (typeof value === "number") {
      if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(1)}GB`;
      }
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}MB`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(0)}KB`;
      }
      return `${value}B`;
    }
    return value;
  };

  return (
    <Card className={`${classes.metricCard} ${className}`}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography className={classes.metricValue} style={{ color }}>
              {formatValue(value)}
            </Typography>
            {change !== undefined && (
              <Box
                className={`${classes.metricChange} ${getChangeColor(change)}`}
              >
                <Typography variant="body2">
                  {change > 0 ? "+" : ""}
                  {change}% {changeLabel}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            style={{
              backgroundColor: `${color}20`,
              borderRadius: "50%",
              padding: "12px",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const AlertCard = ({ alert }) => {
  const classes = useStyles();

  const getAlertClass = (type) => {
    switch (type) {
      case "warning":
        return classes.alertWarning;
      case "info":
        return classes.alertInfo;
      case "success":
        return classes.alertSuccess;
      default:
        return classes.alertInfo;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return <WarningIcon style={{ color: "#FFA800" }} />;
      case "info":
        return <AccountBalanceIcon style={{ color: "#3699FF" }} />;
      case "success":
        return <CheckCircleIcon style={{ color: "#1BC5BD" }} />;
      default:
        return <AccountBalanceIcon style={{ color: "#3699FF" }} />;
    }
  };

  return (
    <Card className={`${classes.alertCard} ${getAlertClass(alert.type)}`}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box marginRight={2}>{getAlertIcon(alert.type)}</Box>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {alert.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {alert.message}
            </Typography>
            <Box display="flex" alignItems="center" marginTop={1}>
              <Typography variant="body2" style={{ fontWeight: 600 }}>
                {alert.count} préstamos
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const DocumentCard = ({ document, onView, onDelete, onEdit }) => {
  const classes = useStyles();

  const getDocumentIcon = (type) => {
    switch (type) {
      case "pdf":
        return <PictureAsPdfIcon style={{ color: "#F64E60" }} />;
      case "excel":
        return <DescriptionIcon style={{ color: "#0BB783" }} />;
      case "word":
        return <DescriptionIcon style={{ color: "#3699FF" }} />;
      case "image":
        return <InsertDriveFileIcon style={{ color: "#FFA800" }} />;
      default:
        return <InsertDriveFileIcon style={{ color: "#7E8299" }} />;
    }
  };

  const getDocumentType = (name) => {
    const extension = name
      .split(".")
      .pop()
      ?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "pdf";
      case "xlsx":
      case "xls":
        return "excel";
      case "doc":
      case "docx":
        return "word";
      case "jpg":
      case "jpeg":
      case "png":
        return "image";
      default:
        return "other";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes >= 1000000) {
      return `${(bytes / 1000000).toFixed(1)}MB`;
    }
    if (bytes >= 1000) {
      return `${(bytes / 1000).toFixed(0)}KB`;
    }
    return `${bytes}B`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Aprobado":
        return "#1BC5BD";
      case "Pendiente":
        return "#FFA800";
      case "Rechazado":
        return "#F64E60";
      default:
        return "#7E8299";
    }
  };

  return (
    <Card className={classes.documentCard}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" flex={1}>
            <Avatar style={{ backgroundColor: "#E1E3EA", marginRight: 12 }}>
              {getDocumentIcon(getDocumentType(document.name))}
            </Avatar>
            <Box flex={1}>
              <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                {document.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {document.category} • {formatFileSize(document.size)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Subido: {new Date(document.uploadDate).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Chip
              label={document.status}
              size="small"
              style={{
                backgroundColor: getStatusColor(document.status),
                color: "white",
                fontSize: "0.7rem",
              }}
            />
            <IconButton
              size="small"
              onClick={() => onView(document)}
              style={{ color: "#3699FF" }}
            >
              <VisibilityIcon style={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onEdit(document)}
              style={{ color: "#FFA800" }}
            >
              <EditIcon style={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(document)}
              style={{ color: "#F64E60" }}
            >
              <DeleteIcon style={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const UploadDialog = ({ open, onClose, onUpload, loanId, documentTypes }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      file,
      id: Math.random()
        .toString(36)
        .substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleUpload = async () => {
    setUploading(true);

    // Simular subida de archivos
    for (let file of files) {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, progress: i } : f))
        );
      }
    }

    setUploading(false);
    onUpload(files);
    setFiles([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          Subir Documentos - Préstamo {loanId}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Arrastra archivos aquí o haz clic para seleccionar
          </Typography>

          <Box
            className={`${classes.uploadArea} ${
              dragActive ? classes.uploadAreaActive : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input").click()}
          >
            <CloudUploadIcon
              style={{ fontSize: 48, color: "#3699FF", marginBottom: 16 }}
            />
            <Typography variant="h6" gutterBottom>
              Subir Documentos
            </Typography>
            <Typography variant="body2" color="textSecondary">
              PDF, JPG, PNG, DOC, XLS hasta 10MB
            </Typography>
            <input
              id="file-input"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
          </Box>
        </Box>

        {files.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Archivos seleccionados ({files.length})
            </Typography>
            {files.map((file) => (
              <Box
                key={file.id}
                mb={2}
                p={2}
                border="1px solid #E1E3EA"
                borderRadius="8px"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography variant="body2" style={{ fontWeight: 600 }}>
                    {file.name}
                  </Typography>
                  <IconButton size="small" onClick={() => removeFile(file.id)}>
                    <DeleteIcon style={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                  mb={1}
                >
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={file.progress}
                  style={{ height: 4, borderRadius: 2 }}
                />
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          Cancelar
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          color="primary"
          disabled={files.length === 0 || uploading}
          startIcon={<CloudUploadIcon />}
        >
          {uploading ? "Subiendo..." : "Subir Archivos"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const LoanCard = ({ loan, onView, onUpload, onEdit, onDelete }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case "Aprobado":
        return classes.statusApproved;
      case "Pendiente":
        return classes.statusPending;
      case "Rechazado":
        return classes.statusRejected;
      default:
        return classes.statusPending;
    }
  };

  const getLoanTypeIcon = (type) => {
    switch (type) {
      case "Hipotecario":
        return <HomeIcon style={{ color: "#3699FF" }} />;
      case "Garantía Recíproca":
        return <BusinessIcon style={{ color: "#0BB783" }} />;
      default:
        return <AccountBalanceIcon style={{ color: "#7E8299" }} />;
    }
  };

  const formatAmount = (amount) => {
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  return (
    <Card className={classes.loanCard}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <Avatar style={{ backgroundColor: "#E1E3EA", marginRight: 12 }}>
              {getLoanTypeIcon(loan.loanType)}
            </Avatar>
            <Box>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {loan.clientName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {loan.loanType} • ID: {loan.id}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={loan.status}
              className={getStatusClass(loan.status)}
              size="small"
            />
            <IconButton size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">
              Monto del Préstamo
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: 600, color: "#3699FF" }}
            >
              {formatAmount(loan.amount)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">
              Documentos
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              {loan.documents.length} archivos
            </Typography>
          </Grid>
        </Grid>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="body2" color="textSecondary">
            Fecha de solicitud:{" "}
            {new Date(loan.requestDate).toLocaleDateString()}
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              size="small"
              variant="contained"
              className={classes.viewButton}
              startIcon={<VisibilityIcon style={{ fontSize: 16 }} />}
              onClick={() => onView(loan)}
              style={{
                fontSize: "0.75rem",
                padding: "4px 8px",
                minWidth: "auto",
              }}
            >
              Ver
            </Button>
            <Button
              size="small"
              variant="contained"
              className={classes.uploadButton}
              startIcon={<CloudUploadIcon style={{ fontSize: 16 }} />}
              onClick={() => onUpload(loan)}
              style={{
                fontSize: "0.75rem",
                padding: "4px 8px",
                minWidth: "auto",
              }}
            >
              Subir
            </Button>
          </Box>
        </Box>

        {expanded && (
          <Box mt={2} pt={2} borderTop="1px solid #E1E3EA">
            <Typography variant="h6" gutterBottom>
              Documentos ({loan.documents.length})
            </Typography>
            {loan.documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onView={() => onView(loan)}
                onEdit={() => onEdit(doc)}
                onDelete={() => onDelete(doc)}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const DocumentationPage = () => {
  const classes = useStyles();
  const subheader = useSubheader();
  const [data, setData] = useState(documentationMock);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: "Todos",
    loanType: "Todos",
    documentType: "Todos",
    searchQuery: "",
  });

  subheader.setTitle("Gestión de Documentación");

  useEffect(() => {
    setData(documentationMock);
  }, []);

  const handleRefresh = () => {
    // Simular refresh
    console.log("Refreshing data...");
  };

  const handleView = (loan) => {
    setSelectedLoan(loan);
  };

  const handleUpload = (loan) => {
    setSelectedLoan(loan);
    setUploadDialogOpen(true);
  };

  const handleEdit = (document) => {
    console.log("Edit document:", document);
  };

  const handleDelete = (document) => {
    console.log("Delete document:", document);
  };

  const handleUploadComplete = (files) => {
    console.log("Uploaded files:", files);
    // Aquí se implementaría la lógica de subida real
  };

  const filteredLoans = data.loans.filter((loan) => {
    const statusMatch =
      filters.status === "Todos" || loan.status === filters.status;

    const loanTypeMatch =
      filters.loanType === "Todos" || loan.loanType === filters.loanType;

    const searchMatch =
      filters.searchQuery === "" ||
      loan.clientName
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      loan.id.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return statusMatch && loanTypeMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLoans = filteredLoans.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Funciones para la tabla
  const getStatusText = (status) => {
    return status;
  };

  const getLoanTypeIcon = (type) => {
    switch (type) {
      case "Hipotecario":
        return <HomeIcon style={{ color: "#3699FF" }} />;
      case "Garantía Recíproca":
        return <BusinessIcon style={{ color: "#0BB783" }} />;
      default:
        return <AccountBalanceIcon style={{ color: "#7E8299" }} />;
    }
  };

  const formatAmount = (amount) => {
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  return (
    <div className={classes.root}>
      {/* Header */}
      <Card className={classes.header}>
        <div className={classes.headerContent}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
                Gestión de Documentación
              </Typography>
              <Typography variant="body1" style={{ opacity: 0.9 }}>
                Administración de documentos para préstamos hipotecarios y
                garantías recíprocas
              </Typography>
            </Grid>
            <Grid item>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body2" style={{ opacity: 0.9 }}>
                  Última actualización: {new Date().toLocaleTimeString()}
                </Typography>
                <IconButton onClick={handleRefresh} style={{ color: "white" }}>
                  <RefreshIcon />
                </IconButton>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  Nuevo Préstamo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Card>

      {/* Filtros y Búsqueda */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <span className="text-dark font-weight-bolder">
                  Préstamos con Documentación
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Gestiona y revisa la documentación de todos los préstamos
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <CloudDownloadIcon className="mr-2" />
                Exportar
              </button>
              <button className="btn btn-primary font-weight-bold">
                <AddIcon className="mr-2" />
                Nuevo Préstamo
              </button>
            </div>
          </div>
        </div>

        <div className="card-body bg-light-info pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-info mr-4">
                <span className="symbol-label bg-white">
                  <AccountBalanceIcon
                    style={{ fontSize: 24, color: "#8950FC" }}
                  />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Total Préstamos
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.totalLoans}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-success mr-4">
                <span className="symbol-label bg-white">
                  <FolderIcon style={{ fontSize: 24, color: "#1BC5BD" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Total Documentos
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.totalDocuments}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <WarningIcon style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Pendientes
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.pendingDocuments}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <AttachMoneyIcon style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Tamaño Total
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {(data.summary.totalSize / 1000000000).toFixed(1)}GB
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center flex-wrap">
            {/* Filtros */}
            <div className="d-flex align-items-center mr-10 mb-4">
              <span className="text-dark font-weight-bold mr-4">
                Filtrar por:
              </span>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filters.status === "Todos" ? "active" : ""
                  }`}
                  onClick={() => setFilters({ ...filters, status: "Todos" })}
                >
                  <input type="radio" name="options" /> Todos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filters.status === "Aprobado" ? "active" : ""
                  }`}
                  onClick={() => setFilters({ ...filters, status: "Aprobado" })}
                >
                  <input type="radio" name="options" /> Aprobados
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filters.status === "Pendiente" ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilters({ ...filters, status: "Pendiente" })
                  }
                >
                  <input type="radio" name="options" /> Pendientes
                </label>
              </div>

              {/* Select para tipo de préstamo */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={filters.loanType}
                  onChange={(e) =>
                    setFilters({ ...filters, loanType: e.target.value })
                  }
                >
                  <option value="Todos">Todos los tipos</option>
                  <option value="Hipotecario">Hipotecario</option>
                  <option value="Garantía Recíproca">Garantía Recíproca</option>
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar cliente, ID o tipo de préstamo..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters({ ...filters, searchQuery: e.target.value })
                  }
                />
                <span>
                  <SearchIcon style={{ color: "#7E8299" }} />
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() =>
                  setViewMode(viewMode === "cards" ? "table" : "cards")
                }
                title={viewMode === "cards" ? "Vista tabla" : "Vista tarjetas"}
              >
                {viewMode === "cards" ? <ListIcon /> : <GridOnIcon />}
              </button>
              <button className="btn btn-light btn-icon">
                <FilterListIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vista de Tarjetas */}
      {viewMode === "cards" && (
        <div className="card card-custom gutter-b">
          <div className="card-body">
            <Grid container spacing={3}>
              {currentLoans.map((loan) => (
                <Grid item xs={12} md={6} key={loan.id}>
                  <LoanCard
                    loan={loan}
                    onView={handleView}
                    onUpload={handleUpload}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}

      {/* Vista de Tabla */}
      {viewMode === "table" && (
        <div className="card card-custom gutter-b">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Tipo de Préstamo</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Documentos</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-40 symbol-light-info mr-4">
                            <span className="symbol-label">
                              {getLoanTypeIcon(loan.loanType)}
                            </span>
                          </div>
                          <div>
                            <div className="font-weight-bolder">
                              {loan.clientName}
                            </div>
                            <div className="text-muted">ID: {loan.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="label label-lg label-light-primary label-inline">
                          {loan.loanType}
                        </span>
                      </td>
                      <td>
                        <span className="font-weight-bolder">
                          {formatAmount(loan.amount)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`label label-lg label-inline ${
                            loan.status === "Aprobado"
                              ? "label-light-success"
                              : loan.status === "Pendiente"
                              ? "label-light-warning"
                              : "label-light-danger"
                          }`}
                        >
                          {getStatusText(loan.status)}
                        </span>
                      </td>
                      <td>
                        <span className="font-weight-bolder">
                          {loan.documents.length} archivos
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">
                          {new Date(loan.requestDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-sm btn-light-primary mr-2"
                            onClick={() => handleView(loan)}
                            title="Ver detalles"
                          >
                            <VisibilityIcon style={{ fontSize: 16 }} />
                          </button>
                          <button
                            className="btn btn-sm btn-light-success mr-2"
                            onClick={() => handleUpload(loan)}
                            title="Subir documentos"
                          >
                            <CloudUploadIcon style={{ fontSize: 16 }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Paginación */}
      <div className="card card-custom gutter-b">
        <div className="card-body">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalItems={filteredLoans.length}
          />
        </div>
      </div>

      {/* Métricas, Gráficos y Alertas */}
      <Grid container spacing={3}>
        {/* Métricas Secundarias */}
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Promedio por Préstamo"
            value={`${data.summary.averageDocumentsPerLoan} docs`}
            icon={<FolderIcon style={{ color: "#8950FC" }} />}
            color="#8950FC"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Tasa de Completitud"
            value={`${(
              ((data.summary.totalLoans - data.summary.pendingDocuments) /
                data.summary.totalLoans) *
              100
            ).toFixed(1)}%`}
            icon={<CheckCircleIcon style={{ color: "#1BC5BD" }} />}
            color="#1BC5BD"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Última Subida"
            value={new Date(data.summary.lastUpload).toLocaleDateString()}
            icon={<CloudUploadIcon style={{ color: "#FFA800" }} />}
            color="#FFA800"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Tipos de Documento"
            value={data.documentTypes.length}
            icon={<AttachMoneyIcon style={{ color: "#F64E60" }} />}
            color="#F64E60"
          />
        </Grid>

        {/* Alertas */}
        <Grid item xs={12}>
          <Card className={classes.chartCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alertas del Sistema
              </Typography>
              <Grid container spacing={2}>
                {data.alerts.map((alert) => (
                  <Grid item xs={12} md={4} key={alert.id}>
                    <AlertCard alert={alert} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog de Subida */}
      <UploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onUpload={handleUploadComplete}
        loanId={selectedLoan?.id}
        documentTypes={data.documentTypes}
      />
    </div>
  );
};

export default DocumentationPage;
