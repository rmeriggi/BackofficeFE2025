import {
  AccountBalance,
  CheckCircle,
  Close,
  Receipt,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

const ConciliacionModal = ({ show, handleClose, conciliacion }) => {
  const [movimientosBanco, setMovimientosBanco] = useState([]);
  const [asientosContables, setAsientosContables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conciliacionRealizada, setConciliacionRealizada] = useState(false);
  const [registrosNoConciliados, setRegistrosNoConciliados] = useState([]);

  // Función para formatear moneda
  const formatMoney = (amount) => {
    if (amount === null || amount === undefined) return "$ 0.00";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);
  };

  // Calcular total de movimientos bancarios
  const totalBanco = movimientosBanco.reduce(
    (sum, mov) => sum + (mov.importe || 0),
    0
  );

  // Calcular total de asientos contables
  const totalAsientos = asientosContables.reduce(
    (sum, asiento) => sum + (asiento.debito || 0),
    0
  );

  // Función para cargar datos
  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    setConciliacionRealizada(false);
    setRegistrosNoConciliados([]);

    try {
      // Llamada al primer endpoint - movimientos bancarios
      const movimientosResponse = await axios.get(
        `${API_URL}/accounts/movimientos-fecha-tipo?idcuenta=8&dia=2&mes=7&ano=2025&tipo=35`
      );
      setMovimientosBanco(movimientosResponse.data);

      // Llamada al segundo endpoint - asientos contables
      const asientosResponse = await axios.get(
        `${API_URL}/accounts/trx-auxiliar-fecha-cue?idcuenta=8&desde=2025-07-01&hasta=2025-07-31`
      );
      setAsientosContables(asientosResponse.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("Error al cargar los datos de conciliación");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (show) {
      cargarDatos();
    } else {
      // Resetear estado cuando se cierra el modal
      setConciliacionRealizada(false);
      setRegistrosNoConciliados([]);
    }
  }, [show]);

  // Función para manejar conciliación
  const handleConciliar = () => {
    // Obtener importes del banco
    const importesBanco = movimientosBanco.map((mov) => mov.importe);

    // Buscar asientos que no tienen coincidencia en banco
    const asientosNoCoinciden = asientosContables.filter((asiento) => {
      const debito = asiento.debito;
      // Verificar si este débito existe en los importes del banco
      const indiceCoincidencia = importesBanco.findIndex(
        (importe) => Math.abs(importe - debito) < 0.01
      );
      if (indiceCoincidencia >= 0) {
        // Si encuentra coincidencia, la elimina para evitar coincidencias múltiples
        importesBanco.splice(indiceCoincidencia, 1);
        return false;
      }
      return true;
    });

    setRegistrosNoConciliados(asientosNoCoinciden);
    setConciliacionRealizada(true);

    console.log(
      "Conciliación realizada. Registros no conciliados:",
      asientosNoCoinciden
    );
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      backdrop="static"
    >
      <Modal.Header className="bg-light-primary">
        <Modal.Title className="text-primary font-weight-bolder">
          <AccountBalance className="mr-2" />
          Conciliación
        </Modal.Title>
        <button
          type="button"
          className="close"
          onClick={handleClose}
          aria-label="Close"
        >
          <Close />
        </button>
      </Modal.Header>

      <Modal.Body className="p-8">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-10">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Cargando...</span>
            </div>
            <span className="ml-3 text-muted">
              Cargando datos de conciliación...
            </span>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        ) : (
          <div className="row">
            {/* Columna izquierda - Banco */}
            <div className="col-md-6">
              <div className="card card-custom">
                <div className="card-header bg-light-info">
                  <div className="card-header bg-light-info">
                    <div className="d-flex align-items-end justify-content-between w-100">
                      <h5 className="card-title text-info font-weight-bolder mb-0">
                        <AccountBalance className="mr-2" />
                        Banco
                      </h5>
                      <div className="text-info font-weight-bolder">
                        Total: {formatMoney(totalBanco)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "400px" }}
                  >
                    <table className="table table-head-custom table-vertical-center">
                      <thead className="bg-light">
                        <tr>
                          <th className="text-dark font-weight-bolder">
                            Descripción
                          </th>
                          <th className="text-dark font-weight-bolder text-right">
                            Importe
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {movimientosBanco.length > 0 ? (
                          movimientosBanco.map((movimiento, index) => (
                            <tr key={movimiento.id || index}>
                              <td>
                                <div className="text-dark font-weight-bold">
                                  {movimiento.descripcion}
                                </div>
                                <div className="text-muted font-size-sm">
                                  {movimiento.tipo}
                                </div>
                              </td>
                              <td className="text-right">
                                <span className="text-success font-weight-bolder">
                                  {formatMoney(movimiento.importe)}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="text-center py-5">
                              <span className="text-muted">
                                No hay movimientos bancarios
                              </span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Asientos */}
            <div className="col-md-6">
              <div className="card card-custom">
                <div className="card-header bg-light-success">
                  <div className="card-header bg-light-success">
                    <div className="d-flex align-items-end justify-content-between w-100">
                      <h5 className="card-title text-success font-weight-bolder mb-0">
                        <Receipt className="mr-2" />
                        Asientos
                      </h5>
                      <div className="text-success font-weight-bolder">
                        Total: {formatMoney(totalAsientos)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "400px" }}
                  >
                    <table className="table table-head-custom table-vertical-center">
                      <thead className="bg-light">
                        <tr>
                          <th className="text-dark font-weight-bolder">
                            Movimiento
                          </th>
                          <th className="text-dark font-weight-bolder text-right">
                            Débito
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {asientosContables.length > 0 ? (
                          asientosContables.map((asiento, index) => {
                            // Determinar si este registro está en los no conciliados
                            const esNoConciliado =
                              conciliacionRealizada &&
                              registrosNoConciliados.some(
                                (reg) => reg.id === asiento.id
                              );

                            return (
                              <tr
                                key={asiento.id || index}
                                className={
                                  esNoConciliado ? "bg-light-danger" : ""
                                }
                              >
                                <td>
                                  <div className="text-dark font-weight-bold">
                                    {asiento.movimiento || "Sin descripción"}
                                  </div>
                                  <div className="text-muted font-size-sm">
                                    {asiento.auxiliartxt}
                                  </div>
                                  {esNoConciliado && (
                                    <div className="badge badge-danger badge-sm mt-1">
                                      No Conciliado
                                    </div>
                                  )}
                                </td>
                                <td className="text-right">
                                  <span
                                    className={`font-weight-bolder ${
                                      esNoConciliado
                                        ? "text-danger"
                                        : "text-primary"
                                    }`}
                                  >
                                    {formatMoney(asiento.debito)}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="2" className="text-center py-5">
                              <span className="text-muted">
                                No hay asientos contables
                              </span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resultados de conciliación */}
        {conciliacionRealizada && (
          <div className="row mt-6">
            <div className="col-12">
              <div className="alert bg-light-info">
                <h6 className="text-dark font-weight-bolder mb-3">
                  Resultados de la Conciliación
                </h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="text-muted font-weight-bold">
                      Total Banco:
                    </div>
                    <div className="text-success font-weight-bolder font-size-lg">
                      {formatMoney(totalBanco)}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-muted font-weight-bold">
                      Total Asientos:
                    </div>
                    <div className="text-primary font-weight-bolder font-size-lg">
                      {formatMoney(totalAsientos)}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-muted font-weight-bold">
                      Diferencia:
                    </div>
                    <div
                      className={`font-weight-bolder font-size-lg ${
                        Math.abs(totalAsientos - totalBanco) < 0.01
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {formatMoney(totalAsientos - totalBanco)}
                    </div>
                  </div>
                </div>
                {registrosNoConciliados.length > 0 && (
                  <div className="mt-4">
                    <div className="text-danger font-weight-bold">
                      Registros no conciliados: {registrosNoConciliados.length}
                    </div>
                    <div className="text-muted">
                      Los registros marcados en rojo no tienen coincidencia en
                      el banco.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            {!conciliacionRealizada ? (
              <span className="text-muted font-weight-bold">
                Banco: {movimientosBanco.length} movimientos | Asientos:{" "}
                {asientosContables.length} registros
              </span>
            ) : (
              <div>
                <span className="text-success font-weight-bold mr-4">
                  ✓ Conciliación realizada
                </span>
                {registrosNoConciliados.length > 0 && (
                  <span className="text-danger font-weight-bold">
                    {registrosNoConciliados.length} registro(s) sin conciliar
                  </span>
                )}
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold mr-3"
              onClick={handleClose}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-success font-weight-bold"
              onClick={handleConciliar}
              disabled={
                loading ||
                movimientosBanco.length === 0 ||
                asientosContables.length === 0 ||
                conciliacionRealizada
              }
            >
              <CheckCircle className="mr-2" />
              {conciliacionRealizada ? "Conciliado" : "Conciliar"}
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConciliacionModal;
