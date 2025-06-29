/* eslint-disable jsx-a11y/accessible-emoji */
import {
  AccessTime,
  Add,
  ArrowDownward,
  ArrowUpward,
  AttachMoney,
  Cancel,
  CheckCircle,
  Description,
  Lock,
  LockOpen,
  MonetizationOn,
  Print,
  Remove,
  Save,
  Today,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import usePrint from "../../../hooks/usePrint";
import {
  getCajaCierre,
  procesarMovimientosCierre,
} from "../utils/cashierClosureService";

const CierreCajaPage = () => {
  const [observaciones, setObservaciones] = useState("");
  const [efectivoReportado, setEfectivoReportado] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [cierreRealizado, setCierreRealizado] = useState(false);

  // Estados para datos del API
  const [movimientosDelDia, setMovimientosDelDia] = useState([]);
  const [datosCierre, setDatosCierre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hook para impresión
  const { printRef, handlePrint } = usePrint();

  // Función para cargar datos del API
  const fetchDatosCierre = async () => {
    try {
      setLoading(true);
      const movimientosRaw = await getCajaCierre();

      // Procesar los movimientos para calcular totales y estadísticas
      const datosProcessados = procesarMovimientosCierre(movimientosRaw);

      // Establecer los movimientos directamente
      setMovimientosDelDia(datosProcessados.movimientos);

      // Crear datos de cierre simulados con la información procesada
      const datosCierreSimulados = {
        fecha: new Date().toISOString().split("T")[0],
        sucursal: "Centro",
        cajero: "Sistema",
        resumen: datosProcessados.resumen,
        movimientos: datosProcessados.estadisticas,
        estado: "Abierto",
        horaInicio: "09:00:00",
        horaCierre: null,
      };

      setDatosCierre(datosCierreSimulados);
      setError(null);
    } catch (err) {
      console.error("Error al cargar datos de cierre:", err);
      setError("Error al cargar los datos de cierre de caja");

      // Datos mock como fallback usando la estructura real proporcionada
      const movimientosMock = [
        {
          id: 1001,
          fecha: "2023-08-15T10:30:00",
          tipo: "plazo_fijo",
          operacion: "apertura",
          monto: 500000,
          moneda: "$",
          productoNombre: "Plazo Fijo Tradicional",
          cliente: "María González",
          estado: "Completado",
          formaPago: "efectivo",
        },
        {
          id: 1002,
          fecha: "2023-08-15T11:15:00",
          tipo: "tarjeta",
          operacion: "pago",
          monto: 12500,
          moneda: "$",
          productoNombre: "VISA Débito",
          cliente: "Carlos Rodríguez",
          estado: "Completado",
          formaPago: "transferencia",
        },
        {
          id: 1003,
          fecha: "2023-08-15T14:20:00",
          tipo: "credito",
          operacion: "pago",
          monto: 18500,
          moneda: "$",
          productoNombre: "Préstamo Personal",
          cliente: "Laura Martínez",
          estado: "Completado",
          formaPago: "efectivo",
        },
        {
          id: 1004,
          fecha: "2023-08-15T15:45:00",
          tipo: "cuenta",
          operacion: "deposito",
          monto: 75000,
          moneda: "$",
          productoNombre: "Caja de Ahorro",
          cliente: "Jorge Sánchez",
          estado: "Completado",
          formaPago: "efectivo",
        },
        {
          id: 1005,
          fecha: "2023-08-15T16:30:00",
          tipo: "cuenta",
          operacion: "extraccion",
          monto: 20000,
          moneda: "$",
          productoNombre: "Cuenta Corriente",
          cliente: "Ana Fernández",
          estado: "Completado",
          formaPago: "efectivo",
        },
      ];

      // Procesar movimientos mock
      const datosMockProcessados = procesarMovimientosCierre(movimientosMock);
      setMovimientosDelDia(datosMockProcessados.movimientos);

      // Datos mock para cierre
      const datosMock = {
        fecha: new Date().toISOString().split("T")[0],
        sucursal: "Centro",
        cajero: "Juan Pérez",
        resumen: datosMockProcessados.resumen,
        movimientos: datosMockProcessados.estadisticas,
        estado: "Abierto",
        horaInicio: "09:00:00",
        horaCierre: null,
      };

      setDatosCierre(datosMock);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchDatosCierre();
  }, []);

  // Función para determinar forma de pago basada en los datos del API
  const determinarFormaPago = (movimiento) => {
    // Si el movimiento tiene el campo formaPago, lo usamos
    if (movimiento.formaPago) {
      return movimiento.formaPago;
    }

    // Si no, inferimos según el tipo de operación
    if (
      movimiento.tipo === "tarjeta" ||
      movimiento.operacion === "transferencia"
    ) {
      return "transferencia";
    }

    // Por defecto, asumimos efectivo
    return "efectivo";
  };

  // Calcular totales
  const calcularTotales = () => {
    // Si tenemos datos del API, usarlos directamente
    if (datosCierre?.resumen) {
      // Calcular ingresos/egresos por forma de pago basado en los movimientos
      let ingresosEfectivo = 0;
      let egresosEfectivo = 0;
      let ingresosTransferencia = 0;
      let egresosTransferencia = 0;

      movimientosDelDia.forEach((movimiento) => {
        const monto = parseFloat(movimiento.monto) || 0;
        const formaPago = determinarFormaPago(movimiento);

        if (
          movimiento.operacion === "deposito" ||
          movimiento.operacion === "apertura" ||
          movimiento.operacion === "pago"
        ) {
          if (formaPago === "efectivo") {
            ingresosEfectivo += monto;
          } else {
            ingresosTransferencia += monto;
          }
        } else if (
          movimiento.operacion === "extraccion" ||
          movimiento.operacion === "retiro"
        ) {
          if (formaPago === "efectivo") {
            egresosEfectivo += monto;
          } else {
            egresosTransferencia += monto;
          }
        }
      });

      return {
        ingresosEfectivo,
        egresosEfectivo,
        ingresosTransferencia,
        egresosTransferencia,
        totalIngresos: datosCierre.resumen.totalIngresos,
        totalEgresos: datosCierre.resumen.totalEgresos,
        saldoEfectivo: ingresosEfectivo - egresosEfectivo,
        cantidadOperaciones:
          datosCierre.movimientos?.totalOperaciones || movimientosDelDia.length,
      };
    }

    // Fallback: calcular desde movimientos directamente
    const totales = {
      ingresosEfectivo: 0,
      egresosEfectivo: 0,
      ingresosTransferencia: 0,
      egresosTransferencia: 0,
      totalIngresos: 0,
      totalEgresos: 0,
      saldoEfectivo: 0,
      cantidadOperaciones: movimientosDelDia.length,
    };

    movimientosDelDia.forEach((movimiento) => {
      const monto = parseFloat(movimiento.monto) || 0;
      const formaPago = determinarFormaPago(movimiento);

      if (
        movimiento.operacion === "deposito" ||
        movimiento.operacion === "apertura" ||
        movimiento.operacion === "pago"
      ) {
        if (formaPago === "efectivo") {
          totales.ingresosEfectivo += monto;
        } else {
          totales.ingresosTransferencia += monto;
        }
        totales.totalIngresos += monto;
      } else if (
        movimiento.operacion === "extraccion" ||
        movimiento.operacion === "retiro"
      ) {
        if (formaPago === "efectivo") {
          totales.egresosEfectivo += monto;
        } else {
          totales.egresosTransferencia += monto;
        }
        totales.totalEgresos += monto;
      }
    });

    totales.saldoEfectivo = totales.ingresosEfectivo - totales.egresosEfectivo;

    return totales;
  };

  const {
    ingresosEfectivo,
    egresosEfectivo,
    totalIngresos,
    totalEgresos,
    saldoEfectivo,
    cantidadOperaciones,
  } = calcularTotales();

  // Función para obtener el icono según la operación
  const getIconoOperacion = (operacion) => {
    switch (operacion) {
      case "deposito":
      case "cobro":
      case "apertura":
        return <ArrowDownward style={{ color: "green", fontSize: 16 }} />;
      case "extraccion":
      case "pago":
        return <ArrowUpward style={{ color: "red", fontSize: 16 }} />;
      default:
        return <AttachMoney style={{ fontSize: 16 }} />;
    }
  };

  // Función para obtener el color según la forma de pago
  const getColorFormaPago = (formaPago) => {
    return formaPago === "efectivo" ? "text-warning" : "text-info";
  };

  // Función para confirmar el cierre
  const confirmarCierre = () => {
    if (efectivoReportado && !isNaN(efectivoReportado)) {
      setMostrarConfirmacion(true);
    }
  };

  // Función para ejecutar el cierre
  const ejecutarCierre = () => {
    // Aquí iría la lógica para guardar el cierre en el backend
    setCierreRealizado(true);
    setMostrarConfirmacion(false);
  };

  return (
    <>
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            .container-fluid {
              margin: 0;
              padding: 0;
            }
            .card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }
          }
        `}
      </style>
      <div className="container-fluid" ref={printRef}>
        {/* Encabezado */}
        <div className="card card-custom gutter-b">
          <div className="card-header border-0 py-5">
            <div className="card-title">
              <h3 className="card-label">
                <span className="d-flex align-items-center">
                  <Lock style={{ fontSize: 28, marginRight: 10 }} />
                  <span className="text-dark font-weight-bolder">
                    Cierre de Caja Diario
                  </span>
                </span>
                <span className="text-muted mt-2 font-weight-bold font-size-sm">
                  Resumen y conciliación de todas las operaciones del día
                  {datosCierre && (
                    <div className="mt-2">
                      <span className="badge badge-light-info mr-2">
                        Sucursal: {datosCierre.sucursal}
                      </span>
                      <span className="badge badge-light-success mr-2">
                        Cajero: {datosCierre.cajero}
                      </span>
                      <span
                        className={`badge ${
                          datosCierre.estado === "Cerrado"
                            ? "badge-light-danger"
                            : "badge-light-warning"
                        }`}
                      >
                        Estado: {datosCierre.estado}
                      </span>
                    </div>
                  )}
                </span>
              </h3>
            </div>
            <div className="card-toolbar no-print">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-light-info font-weight-bold mr-4"
                  onClick={() => window.location.reload()}
                  disabled={loading}
                >
                  <AccessTime className="mr-2" />
                  {loading ? "Cargando..." : "Actualizar Cierre"}
                </button>
                <button
                  className="btn btn-light-primary font-weight-bold mr-4"
                  onClick={handlePrint}
                >
                  <Print className="mr-2" />
                  Imprimir Reporte
                </button>
              </div>
            </div>
          </div>

          {/* Resumen general */}
          <div className="card-body bg-light-info pt-6 pb-4 px-8">
            <div className="row mb-6">
              <div className="col-md-3">
                <div className="d-flex align-items-center bg-white rounded p-4">
                  <div className="symbol symbol-40 symbol-light-primary mr-5">
                    <span className="symbol-label">
                      <Today style={{ fontSize: 20 }} />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-muted font-weight-bold">
                      Fecha de Cierre
                    </span>
                    <span className="font-weight-bolder font-size-h5">
                      {datosCierre?.fecha
                        ? new Date(datosCierre.fecha).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="d-flex align-items-center bg-white rounded p-4">
                  <div className="symbol symbol-40 symbol-light-info mr-5">
                    <span className="symbol-label">
                      <Description style={{ fontSize: 20 }} />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-muted font-weight-bold">
                      Operaciones
                    </span>
                    <span className="font-weight-bolder font-size-h5">
                      {cantidadOperaciones}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="d-flex align-items-center bg-white rounded p-4">
                  <div className="symbol symbol-40 symbol-light-success mr-5">
                    <span className="symbol-label">
                      <Add style={{ color: "green", fontSize: 20 }} />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-muted font-weight-bold">
                      Total Ingresos
                    </span>
                    <span className="font-weight-bolder font-size-h5 text-success">
                      $ {totalIngresos.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="d-flex align-items-center bg-white rounded p-4">
                  <div className="symbol symbol-40 symbol-light-danger mr-5">
                    <span className="symbol-label">
                      <Remove style={{ color: "red", fontSize: 20 }} />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-muted font-weight-bold">
                      Total Egresos
                    </span>
                    <span className="font-weight-bolder font-size-h5 text-danger">
                      $ {totalEgresos.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detalle de movimientos */}
        <div className="row">
          <div className="col-md-8">
            <div className="card card-custom gutter-b">
              <div className="card-header border-0 py-5">
                <h3 className="card-title">
                  <span className="card-label font-weight-bolder text-dark">
                    <AccessTime className="mr-2" />
                    Movimientos del día
                  </span>
                </h3>
                {error && (
                  <div className="alert alert-warning">
                    <span className="text-warning font-weight-bold">
                      ⚠️ {error} - Mostrando datos de ejemplo para demostración
                    </span>
                  </div>
                )}
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="d-flex justify-content-center py-10">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Cargando movimientos...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover table-vertical-center">
                      <thead>
                        <tr>
                          <th>Hora</th>
                          <th>Operación</th>
                          <th>Cliente</th>
                          <th>Producto</th>
                          <th>Forma Pago</th>
                          <th className="text-right">Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movimientosDelDia.map((movimiento) => (
                          <tr key={movimiento.id}>
                            <td>
                              <span className="text-muted">
                                {new Date(movimiento.fecha).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                {getIconoOperacion(movimiento.operacion)}
                                <span className="ml-2 text-capitalize">
                                  {movimiento.operacion.replace("_", " ")}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className="text-dark font-weight-bolder">
                                {movimiento.cliente}
                              </span>
                            </td>
                            <td>
                              <span className="text-dark">
                                {movimiento.productoNombre}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`font-weight-bold ${getColorFormaPago(
                                  determinarFormaPago(movimiento)
                                )}`}
                              >
                                {determinarFormaPago(movimiento) === "efectivo"
                                  ? "Efectivo"
                                  : "Transferencia"}
                              </span>
                            </td>
                            <td className="text-right">
                              <span
                                className={`font-weight-bolder ${
                                  movimiento.operacion === "deposito" ||
                                  movimiento.operacion === "cobro" ||
                                  movimiento.operacion === "apertura"
                                    ? "text-success"
                                    : "text-danger"
                                }`}
                              >
                                {movimiento.moneda}{" "}
                                {movimiento.monto.toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Panel de cierre */}
          <div className="col-md-4">
            <div className="card card-custom gutter-b">
              <div className="card-header border-0 py-5">
                <h3 className="card-title">
                  <span className="card-label font-weight-bolder text-dark">
                    <MonetizationOn className="mr-2" />
                    Conciliación de Efectivo
                  </span>
                </h3>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column mb-8">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <span className="font-weight-bold">
                      Ingresos en efectivo:
                    </span>
                    <span className="font-weight-bolder text-success">
                      $ {ingresosEfectivo.toLocaleString()}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <span className="font-weight-bold">
                      Egresos en efectivo:
                    </span>
                    <span className="font-weight-bolder text-danger">
                      $ {egresosEfectivo.toLocaleString()}
                    </span>
                  </div>
                  <div className="separator separator-dashed my-4"></div>
                  <div className="d-flex align-items-center justify-content-between mb-6">
                    <span className="font-weight-bolder">
                      Saldo esperado en caja:
                    </span>
                    <span
                      className={`font-weight-bolder font-size-h5 ${
                        saldoEfectivo >= 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      $ {saldoEfectivo.toLocaleString()}
                    </span>
                  </div>

                  {!cierreRealizado ? (
                    <>
                      <div className="form-group">
                        <label className="font-weight-bold">
                          Efectivo reportado:
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          placeholder="Ingrese el monto contado"
                          value={efectivoReportado}
                          onChange={(e) => setEfectivoReportado(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="font-weight-bold">Diferencia:</label>
                        <div
                          className={`alert ${
                            efectivoReportado && !isNaN(efectivoReportado)
                              ? Math.abs(
                                  saldoEfectivo - parseFloat(efectivoReportado)
                                ) === 0
                                ? "alert-success"
                                : "alert-danger"
                              : "alert-light"
                          }`}
                        >
                          {efectivoReportado && !isNaN(efectivoReportado) ? (
                            <>
                              ${" "}
                              {Math.abs(
                                saldoEfectivo - parseFloat(efectivoReportado)
                              ).toLocaleString()}
                              (
                              {saldoEfectivo > parseFloat(efectivoReportado)
                                ? "Faltante"
                                : "Sobrante"}
                              )
                            </>
                          ) : (
                            "Ingrese el efectivo reportado"
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="font-weight-bold">
                          Observaciones:
                        </label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Ingrese observaciones relevantes"
                          value={observaciones}
                          onChange={(e) => setObservaciones(e.target.value)}
                        ></textarea>
                      </div>

                      <button
                        className="btn btn-primary no-print font-weight-bold w-100 mt-4"
                        disabled={
                          !efectivoReportado || isNaN(efectivoReportado)
                        }
                        onClick={confirmarCierre}
                      >
                        <LockOpen className="mr-2" />
                        Realizar Cierre de Caja
                      </button>
                    </>
                  ) : (
                    <div className="alert alert-success text-center">
                      <CheckCircle style={{ fontSize: 48, color: "green" }} />
                      <h4 className="mt-3 font-weight-bolder">
                        Cierre de Caja Registrado
                      </h4>
                      <p className="mt-2">
                        El cierre de caja se ha registrado correctamente.
                      </p>
                      <button
                        className="btn btn-light-primary font-weight-bold mt-3 no-print"
                        onClick={handlePrint}
                      >
                        <Print className="mr-2" />
                        Imprimir Comprobante
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de confirmación */}
        {mostrarConfirmacion && (
          <div className="no-print">
            <div
              className="modal-backdrop fade show"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1040,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              onClick={() => setMostrarConfirmacion(false)}
            ></div>

            <div
              className="modal fade show"
              style={{
                display: "block",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1050,
              }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirmar Cierre de Caja</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setMostrarConfirmacion(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="alert alert-warning">
                      <h5 className="alert-heading">
                        ¿Está seguro que desea realizar el cierre de caja?
                      </h5>
                      <p>
                        Una vez confirmado, no podrá realizar más operaciones
                        con esta caja hasta la próxima apertura.
                      </p>
                    </div>

                    <div className="d-flex flex-column">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="font-weight-bold">
                          Saldo esperado:
                        </span>
                        <span className="font-weight-bolder">
                          $ {saldoEfectivo.toLocaleString()}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="font-weight-bold">
                          Efectivo reportado:
                        </span>
                        <span className="font-weight-bolder">
                          $ {parseFloat(efectivoReportado).toLocaleString()}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="font-weight-bold">Diferencia:</span>
                        <span
                          className={`font-weight-bolder ${
                            Math.abs(
                              saldoEfectivo - parseFloat(efectivoReportado)
                            ) === 0
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          ${" "}
                          {Math.abs(
                            saldoEfectivo - parseFloat(efectivoReportado)
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light font-weight-bold"
                      onClick={() => setMostrarConfirmacion(false)}
                    >
                      <Cancel className="mr-2" />
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary font-weight-bold"
                      onClick={ejecutarCierre}
                    >
                      <Save className="mr-2" />
                      Confirmar Cierre
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CierreCajaPage;
