import {
  Archive,
  CheckCircle,
  CloudDownload,
  CloudUpload,
  Delete,
  Description,
  Error,
  FileCopy,
  FilterList,
  Folder,
  GridOn,
  Image,
  List,
  PictureAsPdf,
  Print,
  Refresh,
  Search,
  Share,
  TableChart,
  Visibility,
} from "@material-ui/icons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  DEFAULT_ALLOWED_TYPES,
  formatFileSize,
  validateFile,
} from "../utils/service";

const FilesPage = () => {
  const history = useHistory();

  // Agregar estilos CSS para la animación de spin
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Obtener token del estado de Redux
  const token = useSelector((state) => state.auth.authToken);

  // Estados
  const [files, setFiles] = useState([]); // Solo archivos en proceso
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [showFilters, setShowFilters] = useState(false);
  const [, /* lastUpdate */ setLastUpdate] = useState(new Date());

  // Estados de filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  // Referencias
  const fileInputRef = useRef(null);

  // Cargar archivos desde localStorage al iniciar
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("pendingFiles") || "[]");
    setFiles(savedFiles);
  }, []);

  // Guardar archivos en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem("pendingFiles", JSON.stringify(files));
  }, [files]);

  // Formatear tamaño de archivo (usando el servicio)
  const formatFileSizeLocal = useCallback((bytes) => {
    return formatFileSize(bytes);
  }, []);

  // Obtener icono según extensión
  const getFileIcon = useCallback((fileName, type) => {
    if (!fileName) return <Folder style={{ fontSize: 24, color: "#7E8299" }} />;

    const fileExtension = fileName
      .split(".")
      .pop()
      .toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return <PictureAsPdf style={{ fontSize: 24, color: "#F64E60" }} />;
      case "docx":
      case "doc":
        return <Description style={{ fontSize: 24, color: "#3699FF" }} />;
      case "xlsx":
      case "xls":
        return <TableChart style={{ fontSize: 24, color: "#0BB783" }} />;
      case "csv":
        return <TableChart style={{ fontSize: 24, color: "#8950FC" }} />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <Image style={{ fontSize: 24, color: "#1BC5BD" }} />;
      case "zip":
      case "rar":
      case "7z":
        return <Archive style={{ fontSize: 24, color: "#FFA800" }} />;
      default:
        return <Description style={{ fontSize: 24, color: "#7E8299" }} />;
    }
  }, []);

  // Obtener color de estado
  const getStatusColor = useCallback((status) => {
    switch (status?.toLowerCase()) {
      case "completado":
        return "#0BB783";
      case "pendiente":
        return "#FFA800";
      case "en proceso":
        return "#3699FF";
      case "error":
        return "#F64E60";
      default:
        return "#7E8299";
    }
  }, []);

  // Obtener icono de estado
  const getStatusIcon = useCallback((status) => {
    switch (status?.toLowerCase()) {
      case "completado":
        return <CheckCircle style={{ fontSize: 16, color: "#0BB783" }} />;
      case "pendiente":
        return <CheckCircle style={{ fontSize: 16, color: "#0BB783" }} />;
      /*  return <Pending style={{ fontSize: 16, color: "#FFA800" }} />; */
      case "en proceso":
        return <Refresh style={{ fontSize: 16, color: "#3699FF" }} />;
      case "error":
        return <Error style={{ fontSize: 16, color: "#F64E60" }} />;
      default:
        return <CheckCircle style={{ fontSize: 16, color: "#0BB783" }} />;
      /*  return <Pending style={{ fontSize: 16, color: "#7E8299" }} />; */
    }
  }, []);

  // Manejar eventos de arrastrar
  const handleDragEvents = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  }, []);

  // Función para manejar archivos - MODIFICADA con simulación de carga
  const handleFiles = useCallback(async (file) => {
    if (!file) return;

    // Validar archivo
    const validation = validateFile(
      file,
      10 * 1024 * 1024,
      DEFAULT_ALLOWED_TYPES
    );
    if (!validation.isValid) {
      // Solo mostrar alert para errores de validación
      alert(validation.error);
      return;
    }

    // Iniciar simulación de carga
    setIsUploading(true);
    setUploadProgress(0);

    // Simular progreso de carga
    const simulateProgress = () => {
      return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15; // Incremento aleatorio
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            resolve();
          }
          setUploadProgress(progress);
        }, 200); // Actualizar cada 200ms
      });
    };

    // Esperar a que termine la simulación
    await simulateProgress();

    // Leer el contenido del archivo para poder guardarlo en localStorage
    const readFileContent = () => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      });
    };

    try {
      const fileContent = await readFileContent();

      // Crear objeto de archivo pendiente (NO subir inmediatamente)
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        date: new Date().toLocaleString("es-ES"),
        status: "Pendiente",
        statusClass: "status-warning",
        type: file.name
          .split(".")
          .pop()
          .toLowerCase(),
        category: "general",
        description: "Archivo cargado - Pendiente de procesamiento",
        uploadedBy: "Usuario Actual",
        downloads: 0,
        content: fileContent, // Guardar el contenido del archivo
        fileType: file.type, // Guardar el tipo de archivo
        confirmed: false, // Estado de confirmación
      };

      // Agregar archivo a la lista
      setFiles((prevFiles) => [newFile, ...prevFiles]);
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      alert("Error al procesar el archivo");
    }

    // Resetear estados de carga
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);
    }, 500);
  }, []);

  // Función para ver el detalle del archivo
  const handleViewFile = useCallback(
    (file) => {
      history.push(`/cash/files/detail/${file.id}`);
    },
    [history]
  );

  // Función para confirmar archivo
  const handleConfirmFile = useCallback((fileId) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId ? { ...file, confirmed: true } : file
      )
    );
  }, []);

  // Función para descargar archivo
  const handleDownloadFile = useCallback((file) => {
    if (file.fileUrl) {
      const link = document.createElement("a");
      link.href = file.fileUrl;
      link.target = "_blank";
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`Descargando "${file.name}" desde S3`);
    } else {
      alert("URL de descarga no disponible");
    }
  }, []);

  // Función para eliminar archivo
  const handleDeleteFile = useCallback((fileId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este archivo?")) {
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    }
  }, []);

  // Función para subir archivo
  const handleUpload = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Función para manejar cambio de archivo
  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFiles(file);
      }
      // Limpiar el input para permitir seleccionar el mismo archivo otra vez
      e.target.value = "";
    },
    [handleFiles]
  );

  // Función para manejar drop
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFiles(droppedFile);
      }
    },
    [handleFiles]
  );

  // Filtrar archivos usando useMemo para optimizar
  const filesFiltrados = useMemo(() => {
    return files.filter((file) => {
      // Filtro por tipo
      const coincideTipo =
        filtroTipo === "todos" || filtroTipo === file.type?.toLowerCase();

      // Filtro por estado
      const coincideEstado =
        filtroEstado === "todos" || filtroEstado === file.status?.toLowerCase();

      // Filtro por búsqueda
      const coincideBusqueda =
        file.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        file.description.toLowerCase().includes(busqueda.toLowerCase()) ||
        file.uploadedBy.toLowerCase().includes(busqueda.toLowerCase());

      return coincideTipo && coincideEstado && coincideBusqueda;
    });
  }, [files, filtroTipo, filtroEstado, busqueda]);

  // Calcular estadísticas usando useMemo
  const estadisticas = useMemo(() => {
    const totalFiles = filesFiltrados.length;
    const totalSize = filesFiltrados.reduce((sum, f) => sum + (f.size || 0), 0);
    const totalDownloads = filesFiltrados.reduce(
      (sum, f) => sum + (f.downloads || 0),
      0
    );
    const totalCompleted = filesFiltrados.filter(
      (f) => f.status === "Completado"
    ).length;
    const totalConfirmed = filesFiltrados.filter((f) => f.confirmed).length;

    return {
      totalFiles,
      totalSize,
      totalDownloads,
      totalCompleted,
      totalConfirmed,
    };
  }, [filesFiltrados]);

  // Obtener tipos únicos para filtros usando useMemo
  const filtrosDisponibles = useMemo(() => {
    const tiposUnicos = [...new Set(files.map((f) => f.type).filter(Boolean))];
    const estadosUnicos = [
      ...new Set(files.map((f) => f.status).filter(Boolean)),
    ];

    return { tiposUnicos, estadosUnicos };
  }, [files]);

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8">
          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
                Archivos de Cash
              </h1>
              <p className="text-white-75 font-size-lg mb-0">
                Gestión y almacenamiento de archivos relacionados con
                operaciones de caja
              </p>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() => setShowFilters(!showFilters)}
                title="Mostrar/Ocultar filtros"
              >
                <FilterList />
              </button>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() =>
                  setViewMode(viewMode === "table" ? "cards" : "table")
                }
                title={viewMode === "table" ? "Vista cards" : "Vista tabla"}
              >
                {viewMode === "table" ? <GridOn /> : <List />}
              </button>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() => setLastUpdate(new Date())}
                title="Actualizar"
              >
                <Refresh />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Share />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Print />
              </button>
            </div>
          </div>

          {/* Métricas */}
          <div className="row mb-6">
            <div className="col-md-2">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {estadisticas.totalFiles}
                </div>
                <div className="text-white-75 font-weight-bold">En Proceso</div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {estadisticas.totalCompleted}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Completados
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {estadisticas.totalConfirmed}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Confirmados
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {formatFileSizeLocal(estadisticas.totalSize)}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Tamaño Total
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {estadisticas.totalDownloads}
                </div>
                <div className="text-white-75 font-weight-bold">Descargas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="card card-custom gutter-b mb-8">
          <div className="card-body bg-light-info pt-6 pb-4 px-8">
            <div className="row mb-6">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">
                    Tipo de Archivo
                  </label>
                  <select
                    className="form-control form-control-solid"
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                  >
                    <option value="todos">Todos los tipos</option>
                    {filtrosDisponibles.tiposUnicos.map((tipo) => (
                      <option key={tipo} value={tipo.toLowerCase()}>
                        {tipo.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">Estado</label>
                  <select
                    className="form-control form-control-solid"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                  >
                    <option value="todos">Todos los estados</option>
                    {filtrosDisponibles.estadosUnicos.map((estado) => (
                      <option key={estado} value={estado.toLowerCase()}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">
                    Búsqueda
                  </label>
                  <div className="input-icon input-icon-right">
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder="Buscar por nombre, descripción o usuario..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <span>
                      <Search style={{ color: "#7E8299" }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Área de subida */}
      <div className="card card-custom gutter-b mb-8">
        <div className="card-header bg-white border-bottom">
          <h3 className="card-title text-dark mb-0">
            <CloudUpload className="mr-3 text-primary" />
            Subir nuevo archivo
          </h3>
        </div>
        <div className="card-body">
          <div
            className={`drop-area card card-custom ${
              isDragging ? "highlight border-primary" : ""
            }`}
            onDragEnter={handleDragEvents}
            onDragOver={handleDragEvents}
            onDragLeave={handleDragEvents}
            onDrop={handleDrop}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "40px",
              textAlign: "center",
              marginBottom: "20px",
              transition: "all 0.3s",
              backgroundColor: isDragging
                ? "rgba(52, 152, 219, 0.05)"
                : "transparent",
            }}
          >
            <p className="text-muted mb-4">
              <CloudUpload
                style={{ fontSize: 48, color: "#3699FF", marginBottom: 16 }}
              />
              <br />
              Arrastra y suelta tus archivos aquí o
            </p>

            <input
              type="file"
              ref={fileInputRef}
              className="d-none"
              onChange={handleFileChange}
            />

            <button
              className="btn btn-primary btn-lg px-5"
              onClick={handleUpload}
              disabled={isUploading}
            >
              <Folder className="mr-2" />
              Seleccionar archivos
            </button>
          </div>

          {/* Barra de progreso */}
          {isUploading && (
            <div className="progress-container mt-5">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subiendo archivo...</span>
                <span className="text-primary font-weight-bold">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%` }}
                  aria-valuenow={uploadProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lista de archivos */}
      <div className="card card-custom gutter-b">
        <div className="card-header bg-white border-bottom">
          <h3 className="card-title text-dark mb-0">
            <FileCopy className="mr-3 text-primary" />
            Archivos en proceso ({filesFiltrados.length})
          </h3>
        </div>
        <div className="card-body p-0">
          {viewMode === "cards" ? (
            <div className="row p-8">
              {filesFiltrados.length > 0 ? (
                filesFiltrados.map((file) => (
                  <div
                    key={file.id}
                    className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
                  >
                    <div className="card card-custom gutter-b shadow-sm">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-50 symbol-light mr-5">
                              <span className="symbol-label">
                                {getFileIcon(file.name, file.type)}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-dark font-weight-bolder mb-0 text-break">
                                {file.name}
                              </h4>
                              <span className="text-muted font-weight-bold">
                                {file.description}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-5">
                          <div className="d-flex align-items-center flex-wrap">
                            <div className="d-flex align-items-center mr-10 mb-2">
                              <span className="text-dark font-weight-bolder mr-2">
                                Tamaño:
                              </span>
                              <span className="text-muted">
                                {formatFileSizeLocal(file.size)}
                              </span>
                            </div>
                            <div className="d-flex align-items-center mr-10 mb-2">
                              <span className="text-dark font-weight-bolder mr-2">
                                Descargas:
                              </span>
                              <span className="text-muted">
                                {file.downloads}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-5">
                          <div className="col-6">
                            <div className="d-flex flex-column">
                              <span className="text-muted font-weight-bold mb-1">
                                Fecha
                              </span>
                              <span className="text-dark font-weight-bolder">
                                {file.date}
                              </span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex flex-column">
                              <span className="text-muted font-weight-bold mb-1">
                                Subido por
                              </span>
                              <span className="text-dark font-weight-bolder">
                                {file.uploadedBy}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <div className="d-flex align-items-center">
                            {getStatusIcon(file.status)}
                            <span
                              className="label label-lg label-inline ml-2"
                              style={{
                                backgroundColor: getStatusColor(file.status),
                              }}
                            >
                              <span className="text-white font-weight-bold">
                                {file.status?.toUpperCase()}
                              </span>
                            </span>
                            {file.confirmed && (
                              <span className="label label-lg label-light-success ml-2">
                                <CheckCircle
                                  className="mr-1"
                                  style={{ fontSize: 14 }}
                                />
                                <span className="font-weight-bold">
                                  CONFIRMADO
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                        <div className="d-flex">
                          {file.status === "Completado" && !file.confirmed && (
                            <button
                              className="btn btn-success font-weight-bold mr-2"
                              onClick={() => handleConfirmFile(file.id)}
                            >
                              <CheckCircle className="mr-2" />
                              Confirmar
                            </button>
                          )}
                          {file.status === "Completado" && file.confirmed && (
                            <button
                              className="btn btn-primary font-weight-bold mr-2"
                              onClick={() => handleDownloadFile(file)}
                            >
                              <CloudDownload className="mr-2" />
                              Descargar
                            </button>
                          )}
                          <button
                            className="btn btn-info font-weight-bold mr-2"
                            onClick={() => handleViewFile(file)}
                          >
                            <Visibility className="mr-2" />
                            Ver Detalle
                          </button>
                        </div>
                        <button
                          className="btn btn-light-danger font-weight-bold"
                          onClick={() => handleDeleteFile(file.id)}
                        >
                          <Delete className="mr-2" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="text-center py-20">
                    <FileCopy
                      style={{
                        fontSize: 80,
                        color: "#E1F0FF",
                        marginBottom: 16,
                      }}
                    />
                    <h3 className="text-dark font-weight-bolder mb-2">
                      No hay archivos en proceso
                    </h3>
                    <p className="text-muted font-weight-bold">
                      Sube un archivo para comenzar
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th className="pl-7">
                      <span className="text-dark-75">Archivo</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Tamaño</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Fecha</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Estado</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Confirmado</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Descargas</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Subido por</span>
                    </th>
                    <th className="text-right pr-7">
                      <span className="text-dark-75">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filesFiltrados.length > 0 ? (
                    filesFiltrados.map((file) => (
                      <tr key={file.id} className="border-bottom">
                        <td className="pl-7">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-40 symbol-light mr-4">
                              <span className="symbol-label">
                                {getFileIcon(file.name, file.type)}
                              </span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center">
                                <span className="text-dark font-weight-bolder">
                                  {file.name}
                                </span>
                              </div>
                              <span className="text-muted font-weight-bold">
                                {file.description}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {formatFileSizeLocal(file.size)}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {file.date}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {getStatusIcon(file.status)}
                            <span
                              className="label label-lg label-inline ml-2"
                              style={{
                                backgroundColor: getStatusColor(file.status),
                              }}
                            >
                              <span className="text-white font-weight-bold">
                                {file.status?.toUpperCase()}
                              </span>
                            </span>
                          </div>
                        </td>
                        <td>
                          {file.confirmed ? (
                            <span className="label label-lg label-light-success">
                              <CheckCircle
                                className="mr-1"
                                style={{ fontSize: 14 }}
                              />
                              <span className="font-weight-bold">SÍ</span>
                            </span>
                          ) : (
                            <span className="label label-lg label-light-warning">
                              {/*   <Pending
                                className="mr-1"
                                style={{ fontSize: 14 }}
                              /> */}
                              <span className="font-weight-bold">NO</span>
                            </span>
                          )}
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {file.downloads}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {file.uploadedBy}
                          </span>
                        </td>
                        <td className="text-right pr-7">
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-icon btn-light-info btn-sm mr-2"
                              onClick={() => handleViewFile(file)}
                              title="Ver Detalle"
                            >
                              <Visibility style={{ fontSize: 16 }} />
                            </button>
                            {file.status === "Completado" && !file.confirmed && (
                              <button
                                className="btn btn-icon btn-light-success btn-sm mr-2"
                                onClick={() => handleConfirmFile(file.id)}
                                title="Confirmar"
                              >
                                <CheckCircle style={{ fontSize: 16 }} />
                              </button>
                            )}
                            {file.status === "Completado" && file.confirmed && (
                              <button
                                className="btn btn-icon btn-light-primary btn-sm mr-2"
                                onClick={() => handleDownloadFile(file)}
                                title="Descargar"
                              >
                                <CloudDownload style={{ fontSize: 16 }} />
                              </button>
                            )}
                            <button
                              className="btn btn-icon btn-light btn-sm"
                              onClick={() => handleDeleteFile(file.id)}
                              title="Eliminar"
                            >
                              <Delete style={{ fontSize: 16 }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-10">
                        <div className="symbol symbol-100 symbol-light-primary mb-5">
                          <span className="symbol-label">
                            <FileCopy
                              style={{ fontSize: 50, color: "#3699FF" }}
                            />
                          </span>
                        </div>
                        <h4 className="text-dark font-weight-bolder mb-2">
                          No hay archivos en proceso
                        </h4>
                        <p className="text-muted font-weight-bold">
                          Sube un archivo para comenzar
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilesPage;
