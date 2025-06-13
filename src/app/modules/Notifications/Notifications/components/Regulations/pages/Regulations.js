import React, { useState, useEffect, useRef } from "react";

const FileUploadApp = () => {
  // Estados
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Referencias
  const fileInputRef = useRef(null);

  // Archivos mockeados iniciales (con tamaño en bytes)
  const initialMockedFiles = [
    {
      id: 1,
      name: "Documento_legal.pdf",
      size: 2400000,
      date: "2023-05-15 10:30",
      status: "Completado",
      statusClass: "status-success",
    },
    {
      id: 2,
      name: "Reporte_financiero.xlsx",
      size: 1800000,
      date: "2023-05-14 15:45",
      status: "Completado",
      statusClass: "status-success",
    },
    {
      id: 3,
      name: "Contrato_servicios.docx",
      size: 450000,
      date: "2023-05-13 09:20",
      status: "Pendiente revisión",
      statusClass: "status-warning",
    },
  ];

  // Cargar archivos iniciales al montar el componente
  useEffect(() => {
    setFiles(initialMockedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Formatear tamaño de archivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Obtener icono según extensión
  const getFileIcon = (fileName) => {
    if (!fileName) return <i className="fas fa-file text-secondary me-2"></i>;

    const fileExtension = fileName
      .split(".")
      .pop()
      .toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return <i className="fas fa-file-pdf text-danger me-2"></i>;
      case "docx":
      case "doc":
        return <i className="fas fa-file-word text-primary me-2"></i>;
      case "xlsx":
      case "xls":
      case "csv":
        return <i className="fas fa-file-excel text-success me-2"></i>;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <i className="fas fa-file-image text-info me-2"></i>;
      case "zip":
      case "rar":
      case "7z":
        return <i className="fas fa-file-archive text-warning me-2"></i>;
      default:
        return <i className="fas fa-file-alt text-secondary me-2"></i>;
    }
  };

  // Manejar eventos de arrastrar
  const handleDragEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  };

  // Manejar soltar archivos
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFiles(file);
      }
    }
  };

  // Manejar selección de archivos
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // CORRECCIÓN: Manejar cambio en el input de archivos
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Tomamos solo el primer archivo (puedes modificar para múltiples)
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        handleFiles(selectedFile);
      }
      // Resetear el input para permitir seleccionar el mismo archivo nuevamente
      e.target.value = "";
    }
  };

  // CORRECCIÓN: Función para manejar archivos (ahora recibe un solo archivo)
  const handleFiles = (file) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simular progreso de subida
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);

          // Añadir el nuevo archivo a la lista
          const newFile = {
            id: Date.now(), // ID único basado en timestamp
            name: file.name || "Archivo sin nombre",
            size: file.size || 0,
            date: new Date().toLocaleString("es-ES"),
            status: "Completado",
            statusClass: "status-success",
          };

          setFiles((prevFiles) => [newFile, ...prevFiles]);
          setIsUploading(false);
          setUploadProgress(0);
          return 0;
        }
        return newProgress;
      });
    }, 200);
  };

  // Eliminar archivo
  const handleDeleteFile = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este archivo?")) {
      setFiles(files.filter((file) => file.id !== id));
    }
  };

  // Descargar archivo (simulación)
  const handleDownloadFile = (fileName) => {
    alert(`Descarga simulada: ${fileName}`);
  };

  return (
    <div className="container py-5">
      <div className="card card-custom gutter-b shadow-lg">
        <div className="card-header bg-white border-bottom">
          <h3 className="card-title text-dark mb-0">
            <i className="fas fa-cloud-upload-alt me-3 text-primary"></i>
            Subida de Archivos
          </h3>
        </div>

        <div className="card-body">
          {/* Área de subida */}
          <div className="mb-10">
            <h4 className="text-dark mb-4">Subir nuevo archivo</h4>

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
                <i className="fas fa-cloud-upload-alt fa-2x text-primary mb-3"></i>
                <br />
                Arrastra y suelta tus archivos aquí o
              </p>

              <input
                type="file"
                ref={fileInputRef}
                className="d-none"
                onChange={handleFileInputChange}
              />

              <button
                className="btn btn-primary btn-lg px-5"
                onClick={handleFileSelect}
                disabled={isUploading}
              >
                <i className="fas fa-folder-open me-2"></i>
                Seleccionar archivos
              </button>
            </div>

            {/* Barra de progreso */}
            {isUploading && (
              <div className="progress-container mt-5">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subiendo archivo...</span>
                  <span className="text-primary fw-bold">
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

          {/* Lista de archivos */}
          <div className="mt-10">
            <h4 className="text-dark mb-4">Archivos subidos</h4>

            <div className="table-responsive">
              <table className="table table-hover table-row-bordered gy-5">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                    <th>Nombre</th>
                    <th>Tamaño</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {getFileIcon(file.name)}
                          <span className="text-dark fw-bold">{file.name}</span>
                        </div>
                      </td>
                      <td className="text-muted">
                        {formatFileSize(file.size)}
                      </td>
                      <td className="text-muted">{file.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            file.statusClass === "status-success"
                              ? "badge-light-success"
                              : "badge-light-warning"
                          }`}
                        >
                          {file.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-icon btn-sm btn-light-primary me-2"
                            onClick={() => handleDownloadFile(file.name)}
                            title="Descargar"
                          >
                            <i className="fas fa-download"></i>
                          </button>
                          <button
                            className="btn btn-icon btn-sm btn-light-danger"
                            onClick={() => handleDeleteFile(file.id)}
                            title="Eliminar"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {files.length === 0 && (
              <div className="text-center py-10">
                <i className="fas fa-file-alt fa-3x text-gray-400 mb-4"></i>
                <h5 className="text-gray-600">No hay archivos subidos</h5>
                <p className="text-muted">
                  Comienza subiendo tu primer archivo
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadApp;
