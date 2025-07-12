import {
  Assignment,
  GetApp,
  Refresh,
  Search,
  Visibility,
} from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { useFetchPatronos, usePlanillasProyectadas } from "../../../../hooks";
import DetalleMontoModal from "../components/DetalleMontoModal";
import { downloadPatronosCSV } from "../services/exportService";

export default function PlanillasProyectadasPage() {
  const [patronos, patronosLoading] = useFetchPatronos();
  const [patronoSeleccionado, setPatronoSeleccionado] = useState("");
  const [busquedaPatrono, setBusquedaPatrono] = useState("");
  const [showFilters /* setShowFilters */] = useState(true);
  const [isDownloadingCSV, setIsDownloadingCSV] = useState(false);

  // Estados para el modal de detalle
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [planillaSeleccionada, setPlanillaSeleccionada] = useState(null);
  const [montoSeleccionado, setMontoSeleccionado] = useState(0);

  // Obtener el token del estado
  const token = useSelector((state) => state.auth.authToken);

  const {
    planillas,
    loading: planillasLoading,
    error,
  } = usePlanillasProyectadas(patronoSeleccionado);

  // Función para descargar CSV de patronos
  const handleDownloadPatronosCSV = useCallback(async () => {
    setIsDownloadingCSV(true);
    try {
      const result = await downloadPatronosCSV(token);
      if (result.success) {
        alert(result.message);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert(`Error inesperado: ${error.message}`);
    } finally {
      setIsDownloadingCSV(false);
    }
  }, [token]);

  // Función para abrir el modal de detalle
  const handleVerDetalle = (planilla) => {
    const planillaConPeriodo = {
      ...planilla,
      periodo: `${formatearMes(planilla.mes)} ${planilla.ano}`,
    };
    setPlanillaSeleccionada(planillaConPeriodo);
    setMontoSeleccionado(planilla.monto);
    setShowDetalleModal(true);
  };

  // Función para cerrar el modal de detalle
  const handleCerrarDetalle = () => {
    setShowDetalleModal(false);
    setPlanillaSeleccionada(null);
    setMontoSeleccionado(0);
  };

  if (patronosLoading) {
    return <LayoutSplashScreen />;
  }

  // Filtrar patronos por búsqueda
  const patronosFiltrados =
    patronos?.filter(
      (patrono) =>
        patrono.nombre.toLowerCase().includes(busquedaPatrono.toLowerCase()) ||
        patrono.codigo.toLowerCase().includes(busquedaPatrono.toLowerCase())
    ) || [];

  const patronoActual = patronos?.find(
    (patrono) => patrono.id === parseInt(patronoSeleccionado)
  );

  const formatearMonto = (monto) => {
    if (!monto) return "$0.00";
    return `$${parseFloat(monto).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatearMes = (mes) => {
    const meses = {
      "01": "Enero",
      "02": "Febrero",
      "03": "Marzo",
      "04": "Abril",
      "05": "Mayo",
      "06": "Junio",
      "07": "Julio",
      "08": "Agosto",
      "09": "Septiembre",
      "10": "Octubre",
      "11": "Noviembre",
      "12": "Diciembre",
    };
    return meses[mes] || mes;
  };

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
              Planillas Proyectadas
            </h1>
            <p className="text-white-75 font-size-lg mb-0">
              Consulta de planillas proyectadas por patrono
            </p>
          </div>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-light btn-icon"
              onClick={handleDownloadPatronosCSV}
              disabled={isDownloadingCSV}
              title="Descargar CSV de Patronos"
            >
              {isDownloadingCSV ? (
                <Refresh style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <GetApp />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Selector de Patrono */}
      <Card>
        <div className="card-header border-0 pt-6">
          <div className="card-title">
            <h3 className="card-label">
              <Assignment className="mr-2" />
              Seleccionar Patrono
            </h3>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {/* Búsqueda de patrono */}
            {showFilters && (
              <div className="col-md-6 mb-4">
                <div className="input-icon input-icon-right">
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Buscar patrono por nombre o código..."
                    value={busquedaPatrono}
                    onChange={(e) => setBusquedaPatrono(e.target.value)}
                  />
                  <span>
                    <Search style={{ color: "#7E8299" }} />
                  </span>
                </div>
              </div>
            )}

            {/* Selector de patrono */}
            <div className={showFilters ? "col-md-6 mb-4" : "col-12 mb-4"}>
              <select
                className="form-control form-control-solid"
                value={patronoSeleccionado}
                onChange={(e) => setPatronoSeleccionado(e.target.value)}
              >
                <option value="">Seleccione un patrono...</option>
                {patronosFiltrados.map((patrono) => (
                  <option key={patrono.id} value={patrono.id}>
                    {patrono.nombre} ({patrono.codigo})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Información del patrono seleccionado */}
          {patronoActual && (
            <div className="alert alert-info mt-4">
              <div className="alert-text">
                <strong>Patrono seleccionado:</strong> {patronoActual.nombre} -
                <strong> Código:</strong> {patronoActual.codigo} -
                <strong> Referencia:</strong> {patronoActual.referencia}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Tabla de Planillas Proyectadas */}
      {patronoSeleccionado && (
        <Card>
          <div className="card-header border-0 pt-6">
            <div className="card-title">
              <h3 className="card-label">
                <Assignment className="mr-2" />
                Planillas Proyectadas
                {patronoActual && (
                  <span className="text-muted font-size-sm ml-2">
                    ({patronoActual.nombre})
                  </span>
                )}
              </h3>
            </div>
          </div>
          <div className="card-body">
            {planillasLoading ? (
              <div className="d-flex justify-content-center py-10">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">
                <div className="alert-text">
                  <strong>Error:</strong> {error}
                </div>
              </div>
            ) : planillas.length === 0 ? (
              <div className="d-flex flex-column align-items-center py-10">
                <div className="symbol symbol-100 symbol-light-warning mb-5">
                  <span className="symbol-label">
                    <Assignment style={{ fontSize: 50, color: "#FFA800" }} />
                  </span>
                </div>
                <h3 className="text-dark font-weight-bolder mb-2">
                  No hay planillas proyectadas
                </h3>
                <p className="text-muted font-weight-bold">
                  Este patrono no tiene planillas proyectadas disponibles
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-head-custom table-vertical-center overflow-hidden">
                  <thead>
                    <tr>
                      <th className="text-center">
                        <span className="text-dark-75 font-weight-bolder">
                          Período
                        </span>
                      </th>
                      <th className="text-center">
                        <span className="text-dark-75 font-weight-bolder">
                          Identidad
                        </span>
                      </th>
                      <th className="text-center">
                        <span className="text-dark-75 font-weight-bolder">
                          Código
                        </span>
                      </th>
                      <th className="text-center">
                        <span className="text-dark-75 font-weight-bolder">
                          Tipo
                        </span>
                      </th>
                      <th className="text-center">
                        <span className="text-dark-75 font-weight-bolder">
                          Monto
                        </span>
                      </th>
                      <th className="text-center">
                        <span className="text-dark-75 font-weight-bolder">
                          Acciones
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {planillas.map((planilla, index) => (
                      <tr key={index} className="border-bottom">
                        <td className="text-center">
                          <span className="text-dark font-weight-bolder">
                            {formatearMes(planilla.mes)} {planilla.ano}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-dark font-weight-bolder">
                            {planilla.identidad}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-dark font-weight-bolder">
                            {planilla.codigo}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-dark font-weight-bolder">
                            {planilla.tipo}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-success font-weight-bolder font-size-lg">
                            {formatearMonto(planilla.monto)}
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Estadísticas */}
            {planillas.length > 0 && (
              <div className="mt-8">
                <div className="row">
                  <div className="col-md-3">
                    <div className="card card-custom bg-light-primary">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45 symbol-primary mr-5">
                            <span className="symbol-label">
                              <Assignment style={{ fontSize: 20 }} />
                            </span>
                          </div>
                          <div>
                            <div className="text-dark font-weight-bolder font-size-h6">
                              Total Planillas
                            </div>
                            <div className="text-primary font-weight-bold font-size-h4">
                              {planillas.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card card-custom bg-light-success">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45 symbol-success mr-5">
                            <span className="symbol-label">
                              <i
                                className="fas fa-dollar-sign"
                                style={{ fontSize: 20 }}
                              />
                            </span>
                          </div>
                          <div>
                            <div className="text-dark font-weight-bolder font-size-h6">
                              Monto Total
                            </div>
                            <div className="text-success font-weight-bold font-size-h4">
                              {formatearMonto(
                                planillas
                                  .reduce(
                                    (total, planilla) =>
                                      total + parseFloat(planilla.monto || 0),
                                    0
                                  )
                                  .toString()
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card card-custom bg-light-warning">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45 symbol-warning mr-5">
                            <span className="symbol-label">
                              <i
                                className="fas fa-calculator"
                                style={{ fontSize: 20 }}
                              />
                            </span>
                          </div>
                          <div>
                            <div className="text-dark font-weight-bolder font-size-h6">
                              Promedio
                            </div>
                            <div className="text-warning font-weight-bold font-size-h4">
                              {formatearMonto(
                                (
                                  planillas.reduce(
                                    (total, planilla) =>
                                      total + parseFloat(planilla.monto || 0),
                                    0
                                  ) / planillas.length
                                ).toString()
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card card-custom bg-light-info">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45 symbol-info mr-5">
                            <span className="symbol-label">
                              <i
                                className="fas fa-calendar-alt"
                                style={{ fontSize: 20 }}
                              />
                            </span>
                          </div>
                          <div>
                            <div className="text-dark font-weight-bolder font-size-h6">
                              Períodos
                            </div>
                            <div className="text-info font-weight-bold font-size-h4">
                              {
                                [
                                  ...new Set(
                                    planillas.map((p) => `${p.mes}/${p.ano}`)
                                  ),
                                ].length
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Modal de Detalle de Monto */}
      <DetalleMontoModal
        show={showDetalleModal}
        onHide={handleCerrarDetalle}
        planilla={planillaSeleccionada}
        monto={montoSeleccionado}
      />
    </div>
  );
}
