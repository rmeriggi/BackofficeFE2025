/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  AccountBalance,
  Add,
  BarChart,
  CalendarToday,
  CloudDownload,
  Code,
  Description,
  ExpandMore,
  FilterList,
  Folder,
  Gavel,
  GridOn,
  InsertDriveFile,
  List,
  MoreVert,
  PictureAsPdf,
  Print,
  Refresh,
  Search,
  Settings,
  Share,
  Star,
  Storage,
} from "@material-ui/icons";
import React, { useMemo, useState } from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { formatDate } from "../../../../../utils/formatData";
import { useAllArchives } from "../../utils/apiHooks";

export default function Listing() {
  const isMounted = useIsMountedRef();
  const [allArchives, allArchivesCompleted] = useAllArchives(isMounted);
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [archivoExpandido, setArchivoExpandido] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Procesar datos para el nuevo formato - movido antes del return
  const processedArchives = useMemo(() => {
    if (!allArchivesCompleted || !allArchives?.files) return [];

    const allArchivesData = formatDate(allArchives.files);
    return allArchivesData.map((archivo, index) => ({
      id: index + 1,
      nombre: archivo.file || "Archivo sin nombre",
      fecha: archivo.date || new Date().toLocaleDateString(),
      periodo: archivo.period || "Sin período",
      tipo: getTipoArchivo(archivo.file),
      tamaño: Math.floor(Math.random() * 1000) + 100 + " KB",
      descripcion: `Archivo del período ${archivo.period} con información del BCRA`,
      estado: "Disponible",
      descargado: Math.floor(Math.random() * 1000),
      version: "1.0",
      formato: getFormatoArchivo(archivo.file),
      prioridad: Math.random() > 0.7 ? "Alta" : "Normal",
      destacado: Math.random() > 0.8,
      categoria: getCategoriaArchivo(archivo.file),
      tags: ["BCRA", "Regulatorio", archivo.period],
      ultimaModificacion: archivo.date || new Date().toLocaleDateString(),
      creadoPor: "Sistema BCRA",
      checksum: generateChecksum(),
      comprimido: Math.random() > 0.5,
      encriptado: Math.random() > 0.8,
      action: archivo.action,
      ...archivo,
    }));
  }, [allArchivesCompleted, allArchives]);

  if (!allArchivesCompleted) {
    return <LayoutSplashScreen />;
  }

  const toggleExpandirArchivo = (id) => {
    if (archivoExpandido === id) {
      setArchivoExpandido(null);
    } else {
      setArchivoExpandido(id);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simular refresh
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const archivesFiltrados = processedArchives.filter((a) => {
    const coincideTipo =
      filtroTipo === "todos" ||
      (filtroTipo === "destacados" && a.destacado) ||
      filtroTipo === a.tipo.toLowerCase();

    const coincideCategoria =
      filtroActivo === "todos" || filtroActivo === a.categoria.toLowerCase();

    const coincideBusqueda =
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.periodo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.id.toString().includes(busqueda);

    return coincideTipo && coincideCategoria && coincideBusqueda;
  });

  // Calcular estadísticas
  const totalArchivos = processedArchives.length;
  const totalDestacados = processedArchives.filter((a) => a.destacado).length;
  const totalDescargados = processedArchives.reduce(
    (sum, a) => sum + a.descargado,
    0
  );
  const tiposArchivo = [...new Set(processedArchives.map((a) => a.tipo))];
  const categoriasArchivo = [
    ...new Set(processedArchives.map((a) => a.categoria)),
  ];

  // Contar por tipo
  const conteoTipos = tiposArchivo.map((tipo) => ({
    tipo,
    cantidad: processedArchives.filter((a) => a.tipo === tipo).length,
  }));

  // Contar por categoría
  const conteoCategorias = categoriasArchivo.map((categoria) => ({
    categoria,
    cantidad: processedArchives.filter((a) => a.categoria === categoria).length,
  }));

  // Obtener colores según el tipo
  const getTipoColor = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "pdf":
        return "#F64E60";
      case "excel":
        return "#0BB783";
      case "csv":
        return "#FFA800";
      case "txt":
        return "#3699FF";
      case "json":
        return "#8950FC";
      case "xml":
        return "#1BC5BD";
      default:
        return "#7E8299";
    }
  };

  // Obtener icono según el tipo
  const getTipoIcono = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "pdf":
        return <PictureAsPdf style={{ fontSize: 30, color: "#F64E60" }} />;
      case "excel":
        return <Description style={{ fontSize: 30, color: "#0BB783" }} />;
      case "csv":
        return <PictureAsPdf style={{ fontSize: 30, color: "#F64E60" }} />;
      case "txt":
        return <InsertDriveFile style={{ fontSize: 30, color: "#3699FF" }} />;
      case "json":
        return <Code style={{ fontSize: 30, color: "#8950FC" }} />;
      case "xml":
        return <Storage style={{ fontSize: 30, color: "#1BC5BD" }} />;
      default:
        return <InsertDriveFile style={{ fontSize: 30, color: "#7E8299" }} />;
    }
  };

  // Obtener icono de categoría
  const getCategoriaIcono = (categoria) => {
    switch (categoria.toLowerCase()) {
      case "regulatorio":
        return <Gavel style={{ fontSize: 18, color: "#F64E60" }} />;
      case "financiero":
        return <AccountBalance style={{ fontSize: 18, color: "#0BB783" }} />;
      case "estadistico":
        return <BarChart style={{ fontSize: 18, color: "#3699FF" }} />;
      case "operativo":
        return <Settings style={{ fontSize: 18, color: "#FFA800" }} />;
      default:
        return <Folder style={{ fontSize: 18, color: "#7E8299" }} />;
    }
  };

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
                Archivos BCRA
              </h1>
              <p className="text-white-75 font-size-lg mb-0">
                Gestión y acceso a archivos regulatorios del Banco Central
              </p>
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center mr-6">
                <div className="symbol symbol-40 symbol-circle mr-4">
                  <span className="symbol-label bg-white bg-opacity-20">
                    <CalendarToday style={{ color: "#fff" }} />
                  </span>
                </div>
                <div>
                  <div className="text-white-75 font-size-sm">
                    Última actualización
                  </div>
                  <div className="text-white font-weight-bold">
                    {lastUpdate.toLocaleTimeString("es-AR")}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <Refresh
                  className={
                    isLoading ? "spinner-border spinner-border-sm" : ""
                  }
                />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Share />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Print />
              </button>
              <button className="btn btn-light btn-icon">
                <Settings />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas y filtros */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <span className="text-dark font-weight-bolder">
                  Archivos Disponibles
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Explora y gestiona los archivos regulatorios del BCRA
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <CloudDownload className="mr-2" />
                Exportar
              </button>
              <button className="btn btn-primary font-weight-bold">
                <Add className="mr-2" />
                Nuevo Archivo
              </button>
            </div>
          </div>
        </div>

        <div className="card-body bg-light-info pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-info mr-4">
                <span className="symbol-label bg-white">
                  <Folder style={{ fontSize: 24, color: "#8950FC" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Archivos Totales
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalArchivos}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-success mr-4">
                <span className="symbol-label bg-white">
                  <CloudDownload style={{ fontSize: 24, color: "#1BC5BD" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Total Descargas
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalDescargados.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <Star style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Archivos Destacados
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalDestacados}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <BarChart style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Tipos de Archivo
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {tiposArchivo.length}
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
                    filtroActivo === "todos" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("todos")}
                >
                  <input type="radio" name="options" /> Todos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filtroActivo === "destacados" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("destacados")}
                >
                  <input type="radio" name="options" /> Destacados
                </label>
                {categoriasArchivo.slice(0, 3).map((categoria) => (
                  <label
                    key={categoria}
                    className={`btn btn-outline-secondary font-weight-bold ${
                      filtroActivo === categoria.toLowerCase() ? "active" : ""
                    }`}
                    onClick={() => setFiltroActivo(categoria.toLowerCase())}
                  >
                    <input type="radio" name="options" /> {categoria}
                  </label>
                ))}
              </div>

              {/* Select para tipo */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <option value="todos">Todos los tipos</option>
                  <option value="destacados">Destacados</option>
                  {tiposArchivo.map((tipo) => (
                    <option key={tipo} value={tipo.toLowerCase()}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar archivo, período o descripción..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <span>
                  <Search style={{ color: "#7E8299" }} />
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                title={viewMode === "grid" ? "Vista lista" : "Vista grilla"}
              >
                {viewMode === "grid" ? <List /> : <GridOn />}
              </button>
              <button className="btn btn-light btn-icon">
                <FilterList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de archivos */}
      {viewMode === "grid" ? (
        <div className="row">
          {archivesFiltrados.map((a) => (
            <div
              key={a.id}
              className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
            >
              <div
                className={`card card-custom gutter-b shadow-sm ${
                  a.destacado ? "border-left-warning" : "border-left-primary"
                }`}
                style={{ borderLeftWidth: "4px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">
                          {getTipoIcono(a.tipo)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-dark font-weight-bolder mb-0 text-break">
                          {a.nombre}
                          {a.destacado && (
                            <span className="label label-sm label-warning label-inline ml-2">
                              Destacado
                            </span>
                          )}
                        </h4>
                        <span className="text-muted font-weight-bold">
                          ID: {a.id} | {a.tipo.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="dropdown dropdown-inline">
                      <button
                        className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <MoreVert style={{ color: "#B5B5C3" }} />
                      </button>
                      <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                        <ul className="navi navi-hover">
                          <li className="navi-item">
                            <a href="#" className="navi-link">
                              <span className="navi-text">Descargar</span>
                            </a>
                          </li>
                          <li className="navi-item">
                            <a href="#" className="navi-link">
                              <span className="navi-text">
                                Añadir a favoritos
                              </span>
                            </a>
                          </li>
                          <li className="navi-item">
                            <a href="#" className="navi-link">
                              <span className="navi-text">Compartir</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-muted font-weight-bold mb-3">
                      {a.descripcion}
                    </p>

                    <div className="d-flex align-items-center flex-wrap">
                      <div className="d-flex align-items-center mr-10 mb-2">
                        <div className="mr-2">
                          <span className="text-dark font-weight-bolder">
                            Período:
                          </span>
                          <span className="text-muted ml-2">{a.periodo}</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center mr-10 mb-2">
                        <div className="mr-2">
                          <span className="text-dark font-weight-bolder">
                            Categoría:
                          </span>
                          <span className="text-muted ml-2">
                            {getCategoriaIcono(a.categoria)} {a.categoria}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Tamaño
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {a.tamaño}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Descargas
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {a.descargado.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <span
                        className="label label-lg label-inline"
                        style={{ backgroundColor: getTipoColor(a.tipo) }}
                      >
                        <span className="text-white d-flex align-items-center">
                          <div
                            className="bg-white mr-2 rounded-circle"
                            style={{ width: 8, height: 8 }}
                          ></div>
                          {a.tipo.toUpperCase()}
                        </span>
                      </span>
                    </div>

                    <div>
                      <span className="text-muted font-weight-bold mr-2">
                        Estado:
                      </span>
                      <span className="text-success font-weight-bolder">
                        {a.estado}
                      </span>
                    </div>
                  </div>

                  {/* Detalles expandibles */}
                  <div className="mt-4">
                    <button
                      className="btn btn-link btn-sm p-0 d-flex align-items-center text-primary font-weight-bold"
                      onClick={() => toggleExpandirArchivo(a.id)}
                    >
                      <span>Ver más detalles</span>
                      <ExpandMore
                        className={`ml-1 transition ${
                          archivoExpandido === a.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {archivoExpandido === a.id && (
                      <div className="mt-4 pt-4 border-top">
                        <div className="row">
                          <div className="col-6">
                            <div className="d-flex flex-column mb-3">
                              <span className="text-muted font-weight-bold mb-1">
                                Fecha
                              </span>
                              <span className="text-dark font-weight-bolder">
                                {a.fecha}
                              </span>
                            </div>

                            <div className="d-flex flex-column mb-3">
                              <span className="text-muted font-weight-bold mb-1">
                                Versión
                              </span>
                              <span className="text-dark font-weight-bolder">
                                {a.version}
                              </span>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="d-flex flex-column mb-3">
                              <span className="text-muted font-weight-bold mb-1">
                                Prioridad
                              </span>
                              <span className="text-warning font-weight-bolder">
                                {a.prioridad}
                              </span>
                            </div>

                            <div className="d-flex flex-column">
                              <span className="text-muted font-weight-bold mb-1">
                                Última Modificación
                              </span>
                              <span className="text-info font-weight-bolder">
                                {a.ultimaModificacion}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                  <a
                    href={a.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="btn btn-primary font-weight-bold"
                  >
                    <CloudDownload className="mr-2" />
                    Descargar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Vista de lista real
        <div className="card card-custom gutter-b">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th className="pl-7">
                      <span className="text-dark-75">Archivo</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Tipo</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Período</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Fecha</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Tamaño</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Descargas</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Estado</span>
                    </th>
                    <th className="text-right pr-7">
                      <span className="text-dark-75">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {archivesFiltrados.map((a) => (
                    <tr key={a.id} className="border-bottom">
                      <td className="pl-7">
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-40 symbol-light mr-4">
                            <span className="symbol-label">
                              {getTipoIcono(a.tipo)}
                            </span>
                          </div>
                          <div>
                            <div className="d-flex align-items-center">
                              <span className="text-dark font-weight-bolder">
                                {a.nombre}
                              </span>
                              {a.destacado && (
                                <span className="label label-sm label-warning label-inline ml-2">
                                  Destacado
                                </span>
                              )}
                            </div>
                            <span className="text-muted font-weight-bold">
                              ID: {a.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className="label label-lg label-inline"
                          style={{ backgroundColor: getTipoColor(a.tipo) }}
                        >
                          <span className="text-white font-weight-bold">
                            {a.tipo.toUpperCase()}
                          </span>
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {a.periodo}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {a.fecha}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {a.tamaño}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {a.descargado.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span className="text-success font-weight-bolder">
                          {a.estado}
                        </span>
                      </td>
                      <td className="text-right pr-7">
                        <div className="d-flex justify-content-end">
                          <a
                            href={a.action}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="btn btn-icon btn-primary btn-sm"
                            title="Descargar"
                          >
                            <CloudDownload style={{ fontSize: 16 }} />
                          </a>
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

      {/* Sin resultados */}
      {archivesFiltrados.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron archivos
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setBusqueda("");
                setFiltroActivo("todos");
                setFiltroTipo("todos");
              }}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}

      {/* Resumen por tipo de archivo */}
      <div className="card card-custom mt-8">
        <div className="card-header">
          <h3 className="card-title text-dark font-weight-bolder">
            Distribución por Tipo de Archivo
          </h3>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap">
            {conteoTipos.map((item) => (
              <div
                key={item.tipo}
                className="d-flex align-items-center mr-10 mb-5"
              >
                <div className="symbol symbol-40 symbol-light mr-4">
                  <span className="symbol-label">
                    {getTipoIcono(item.tipo)}
                  </span>
                </div>
                <div>
                  <span className="text-dark font-weight-bolder">
                    {item.tipo}
                  </span>
                  <div className="text-muted font-weight-bold">
                    {item.cantidad}{" "}
                    {item.cantidad === 1 ? "archivo" : "archivos"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen por categoría */}
      <div className="card card-custom mt-8">
        <div className="card-header">
          <h3 className="card-title text-dark font-weight-bolder">
            Distribución por Categoría
          </h3>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap">
            {conteoCategorias.map((item) => (
              <div
                key={item.categoria}
                className="d-flex align-items-center mr-10 mb-5"
              >
                <div className="symbol symbol-40 symbol-light mr-4">
                  <span className="symbol-label">
                    {getCategoriaIcono(item.categoria)}
                  </span>
                </div>
                <div>
                  <span className="text-dark font-weight-bolder">
                    {item.categoria}
                  </span>
                  <div className="text-muted font-weight-bold">
                    {item.cantidad}{" "}
                    {item.cantidad === 1 ? "archivo" : "archivos"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Funciones auxiliares
function getTipoArchivo(nombre) {
  if (!nombre) return "txt";
  const extension = nombre
    .split(".")
    .pop()
    ?.toLowerCase();
  switch (extension) {
    case "pdf":
      return "pdf";
    case "xlsx":
    case "xls":
      return "excel";
    case "csv":
      return "csv";
    case "json":
      return "json";
    case "xml":
      return "xml";
    default:
      return "txt";
  }
}

function getFormatoArchivo(nombre) {
  if (!nombre) return "texto";
  const extension = nombre
    .split(".")
    .pop()
    ?.toLowerCase();
  switch (extension) {
    case "pdf":
      return "PDF";
    case "xlsx":
    case "xls":
      return "Excel";
    case "csv":
      return "CSV";
    case "json":
      return "JSON";
    case "xml":
      return "XML";
    default:
      return "Texto";
  }
}

function getCategoriaArchivo(nombre) {
  if (!nombre) return "general";
  const nombreLower = nombre.toLowerCase();
  if (nombreLower.includes("regulatorio") || nombreLower.includes("norma"))
    return "regulatorio";
  if (nombreLower.includes("financiero") || nombreLower.includes("balance"))
    return "financiero";
  if (nombreLower.includes("estadistico") || nombreLower.includes("estad"))
    return "estadistico";
  if (nombreLower.includes("operativo") || nombreLower.includes("op"))
    return "operativo";
  return "general";
}

function generateChecksum() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}
