import {
  ArrowBack,
  CloudUpload,
  FilterList,
  Refresh,
  Search,
  TableChart,
  Visibility,
} from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DetalleMontoFileModal from "../components/DetalleMontoFileModal";
import { usePlanillasRecibidas } from "../hooks/usePlanillasRecibidas";
import { uploadService } from "../services/uploadService";

const FileDetailPage = () => {
  const { fileId } = useParams();
  const history = useHistory();

  // Estados
  const [file, setFile] = useState(null);
  const [applyingFile, setApplyingFile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroMes, setFiltroMes] = useState("todos");
  const [filtroAno, setFiltroAno] = useState("todos");

  // Estados para el modal de detalle
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [planillaSeleccionada, setPlanillaSeleccionada] = useState(null);
  const [montoSeleccionado, setMontoSeleccionado] = useState(0);
  const [cobradoSeleccionado, setCobradoSeleccionado] = useState(0);

  // Hook para obtener planillas recibidas (usando idpatrono = 0)
  const { planillas, loading, error, refetch } = usePlanillasRecibidas(0);

  // Cargar archivo desde localStorage
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("pendingFiles") || "[]");
    const foundFile = savedFiles.find((f) => f.id === parseInt(fileId));

    if (foundFile) {
      setFile(foundFile);
    } else {
      // Si no se encuentra el archivo, redirigir
      history.push("/cash/files");
    }
  }, [fileId, history]);

  // Función para aplicar archivo
  const handleApplyFile = useCallback(async () => {
    if (!file) return;

    try {
      setApplyingFile(true);
      console.log("Enviando archivo al servicio:", file);
      await uploadService.uploadFile(file);

      // Actualizar archivo como completado
      const savedFiles = JSON.parse(
        localStorage.getItem("pendingFiles") || "[]"
      );
      const updatedFiles = savedFiles.map((f) =>
        f.id === file.id ? { ...f, status: "Completado" } : f
      );
      localStorage.setItem("pendingFiles", JSON.stringify(updatedFiles));

      alert("Archivo aplicado exitosamente");
      history.push("/cash/files");
    } catch (error) {
      console.error("Error al aplicar archivo:", error);
      alert("Error al aplicar archivo: " + error.message);
    } finally {
      setApplyingFile(false);
    }
  }, [file, history]);

  // Función para abrir el modal de detalle
  const handleVerDetalle = (planilla) => {
    setPlanillaSeleccionada(planilla);
    setMontoSeleccionado(planilla.monto);
    setCobradoSeleccionado(planilla.cobrado);
    setShowDetalleModal(true);
  };

  // Función para cerrar el modal de detalle
  const handleCerrarDetalle = () => {
    setShowDetalleModal(false);
    setPlanillaSeleccionada(null);
    setMontoSeleccionado(0);
    setCobradoSeleccionado(0);
  };

  // Función para formatear fecha
  /*   const formatFecha = (fechaString) => {
    if (!fechaString) return "N/A";
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return fechaString;
    }
  }; */

  // Función para formatear monto
  const formatMonto = (monto) => {
    if (!monto) return "$ 0.00";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(monto);
  };

  // Función para determinar el color del monto cobrado
  const getColorCobrado = (cobrado, monto) => {
    const cobradoNum = parseFloat(cobrado) || 0;
    const montoNum = parseFloat(monto) || 0;

    if (cobradoNum === montoNum) {
      return "text-success"; // Verde si son iguales
    } else if (cobradoNum < montoNum) {
      return "text-danger"; // Rojo si cobrado es menor
    } else {
      return "text-warning"; // Amarillo si cobrado es mayor (caso edge)
    }
  };

  // Función para obtener nombre del mes
  const getNombreMes = (mes) => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return meses[mes - 1] || `Mes ${mes}`;
  };

  // Filtrar planillas
  const planillasFiltradas = planillas.filter((planilla) => {
    const coincideBusqueda =
      planilla.identidad?.toString().includes(busqueda) ||
      planilla.afiliado?.toString().includes(busqueda) ||
      planilla.codigo?.toString().includes(busqueda) ||
      planilla.tipo?.toLowerCase().includes(busqueda.toLowerCase());

    const coincideMes =
      filtroMes === "todos" || parseInt(planilla.mes) === parseInt(filtroMes);
    const coincideAno =
      filtroAno === "todos" || parseInt(planilla.ano) === parseInt(filtroAno);

    return coincideBusqueda && coincideMes && coincideAno;
  });

  // Obtener años únicos para filtro
  const anosUnicos = [...new Set(planillas.map((p) => parseInt(p.ano)))].sort(
    (a, b) => b - a
  );
  const mesesUnicos = [...new Set(planillas.map((p) => parseInt(p.mes)))].sort(
    (a, b) => a - b
  );

  // Calcular estadísticas
  const totalPlanillas = planillasFiltradas.length;
  const montoTotal = planillasFiltradas.reduce(
    (sum, p) => sum + (parseFloat(p.monto) || 0),
    0
  );
  const cobradoTotal = planillasFiltradas.reduce(
    (sum, p) => sum + (parseFloat(p.cobrado) || 0),
    0
  );
  const clientesUnicos = new Set(planillasFiltradas.map((p) => p.identidad))
    .size;

  if (!file) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8">
          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              <div className="d-flex align-items-center mb-4">
                <button
                  className="btn btn-icon btn-light mr-3"
                  onClick={() => history.push("/cash/files")}
                >
                  <ArrowBack />
                </button>
                <div>
                  <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
                    Detalle del Archivo
                  </h1>
                  <p className="text-white-75 font-size-lg mb-0">{file.name}</p>
                </div>
              </div>
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
                onClick={refetch}
                title="Actualizar"
              >
                <Refresh />
              </button>
            </div>
          </div>

          {/* Métricas */}
          <div className="row">
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {totalPlanillas}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Total Planillas
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {clientesUnicos}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Identidades Únicas
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {formatMonto(montoTotal)}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Monto Total
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {formatMonto(cobradoTotal)}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Cobrado Total
                </div>
              </div>
            </div>
          </div>

          {/* Botón de aplicar archivo */}
          <div className="row mt-6">
            <div className="col-12 text-center">
              <button
                className="btn btn-success btn-lg font-weight-bolder"
                onClick={handleApplyFile}
                disabled={applyingFile}
              >
                {applyingFile ? (
                  <>
                    <div
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                    >
                      <span className="sr-only">Cargando...</span>
                    </div>
                    Aplicando...
                  </>
                ) : (
                  <>
                    <CloudUpload className="mr-2" />
                    Aplicar Archivo
                  </>
                )}
              </button>
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
                  <label className="text-muted font-weight-bold">Año</label>
                  <select
                    className="form-control form-control-solid"
                    value={filtroAno}
                    onChange={(e) => setFiltroAno(e.target.value)}
                  >
                    <option value="todos">Todos los años</option>
                    {anosUnicos.map((ano) => (
                      <option key={ano} value={ano}>
                        {ano}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">Mes</label>
                  <select
                    className="form-control form-control-solid"
                    value={filtroMes}
                    onChange={(e) => setFiltroMes(e.target.value)}
                  >
                    <option value="todos">Todos los meses</option>
                    {mesesUnicos.map((mes) => (
                      <option key={mes} value={mes}>
                        {getNombreMes(mes)}
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
                      placeholder="Buscar por identidad, afiliado, código o tipo..."
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

      {/* Lista de Planillas */}
      <div className="card card-custom gutter-b">
        <div className="card-header bg-white border-bottom">
          <h3 className="card-title text-dark mb-0">
            <TableChart className="mr-3 text-primary" />
            Planillas Recibidas ({planillasFiltradas.length})
          </h3>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-20">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Cargando...</span>
              </div>
              <p className="text-muted mt-3">Cargando planillas...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-danger mb-3">
                <i className="fas fa-exclamation-triangle fa-3x"></i>
              </div>
              <h4 className="text-danger">Error al cargar planillas</h4>
              <p className="text-muted">{error}</p>
              <button className="btn btn-primary" onClick={refetch}>
                <Refresh className="mr-2" />
                Intentar de nuevo
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th className="pl-7">
                      <span className="text-dark-75">ID</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Año</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Mes</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Identidad</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Afiliado</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Código</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Tipo</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Monto</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Cobrado</span>
                    </th>
                    <th className="text-center">
                      <span className="text-dark-75">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {planillasFiltradas.length > 0 ? (
                    planillasFiltradas.map((planilla) => (
                      <tr key={planilla.id} className="border-bottom">
                        <td className="pl-7">
                          <span className="text-dark font-weight-bolder">
                            {planilla.id}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {planilla.ano}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {getNombreMes(parseInt(planilla.mes))}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {planilla.identidad}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {planilla.afiliado}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {planilla.codigo}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {planilla.tipo}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder text-success">
                            {formatMonto(parseFloat(planilla.monto))}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`font-weight-bolder ${getColorCobrado(
                              planilla.cobrado,
                              planilla.monto
                            )}`}
                          >
                            {formatMonto(parseFloat(planilla.cobrado || 0))}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-light-primary btn-icon"
                            onClick={() => handleVerDetalle(planilla)}
                            title="Ver detalle del monto"
                          >
                            <Visibility className="text-primary" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center py-10">
                        <div className="symbol symbol-100 symbol-light-primary mb-5">
                          <span className="symbol-label">
                            <TableChart
                              style={{ fontSize: 50, color: "#3699FF" }}
                            />
                          </span>
                        </div>
                        <h4 className="text-dark font-weight-bolder mb-2">
                          No se encontraron planillas
                        </h4>
                        <p className="text-muted font-weight-bold">
                          No hay planillas que coincidan con los filtros
                          seleccionados
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

      {/* Modal de Detalle de Monto */}
      <DetalleMontoFileModal
        show={showDetalleModal}
        onHide={handleCerrarDetalle}
        planilla={planillaSeleccionada}
        monto={montoSeleccionado}
        cobrado={cobradoSeleccionado}
      />
    </div>
  );
};

export default FileDetailPage;
