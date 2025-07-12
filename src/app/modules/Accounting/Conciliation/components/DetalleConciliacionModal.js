import { Close } from "@material-ui/icons";
import React from "react";
import { Modal } from "react-bootstrap";

const DetalleConciliacionModal = ({ show, onHide, conciliacion }) => {
  // Función para formatear moneda
  const formatMoney = (amount) => {
    if (amount === null || amount === undefined) return "$ 0.00";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Función para obtener color según estado
  const getStatusColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "completada":
        return "success";
      case "pendiente":
        return "warning";
      case "en revisión":
        return "info";
      case "con diferencias":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (!conciliacion) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="modal-rounded"
    >
      <Modal.Header className="bg-primary">
        <Modal.Title className="h4 font-weight-bolder text-white">
          Detalle de Conciliación Bancaria
        </Modal.Title>
        <button type="button" className="btn btn-xs btn-icon" onClick={onHide}>
          <Close className="text-white" />
        </button>
      </Modal.Header>

      <Modal.Body className="p-0">
        {/* Información general */}
        <div className="bg-light-primary p-6 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="text-dark font-weight-bolder mb-1">
                {conciliacion.banco}
              </h5>
              <p className="text-muted mb-0">
                <span className="font-weight-bold">Fecha:</span>{" "}
                {formatDate(conciliacion.fecha)}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`badge badge-${getStatusColor(
                  conciliacion.estado
                )} badge-lg`}
              >
                {conciliacion.estado}
              </span>
            </div>
          </div>
        </div>

        {/* Información detallada */}
        <div className="p-6">
          <div className="row">
            {/* Columna izquierda - Información bancaria */}
            <div className="col-md-6">
              <h6 className="text-dark font-weight-bolder mb-4">
                Información Bancaria
              </h6>

              <div className="mb-4">
                <label className="text-muted font-weight-bold font-size-sm">
                  Número de Cuenta
                </label>
                <div className="text-dark font-weight-bolder">
                  {conciliacion.cuentaBancaria}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-muted font-weight-bold font-size-sm">
                  Banco
                </label>
                <div className="text-dark font-weight-bolder">
                  {conciliacion.banco}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-muted font-weight-bold font-size-sm">
                  Fecha de Conciliación
                </label>
                <div className="text-dark font-weight-bolder">
                  {formatDate(conciliacion.fecha)}
                </div>
              </div>
            </div>

            {/* Columna derecha - Saldos */}
            <div className="col-md-6">
              <h6 className="text-dark font-weight-bolder mb-4">
                Información de Saldos
              </h6>

              <div className="mb-4">
                <label className="text-muted font-weight-bold font-size-sm">
                  Saldo en Libros
                </label>
                <div className="text-primary font-weight-bolder font-size-lg">
                  {formatMoney(conciliacion.saldoLibro)}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-muted font-weight-bold font-size-sm">
                  Saldo Bancario
                </label>
                <div className="text-success font-weight-bolder font-size-lg">
                  {formatMoney(conciliacion.saldoBanco)}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-muted font-weight-bold font-size-sm">
                  Diferencia
                </label>
                <div
                  className={`font-weight-bolder font-size-lg ${
                    conciliacion.diferencia === 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {formatMoney(conciliacion.diferencia)}
                </div>
              </div>
            </div>
          </div>

          {/* Separador */}
          <div className="separator separator-dashed my-6"></div>

          {/* Información de movimientos */}
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-dark font-weight-bolder mb-4">
                Información de Movimientos
              </h6>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-dark font-weight-bold">
                  Total Movimientos:
                </span>
                <span className="text-info font-weight-bolder">
                  {conciliacion.nroMovimientos}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-dark font-weight-bold">
                  Movimientos Conciliados:
                </span>
                <span className="text-success font-weight-bolder">
                  {conciliacion.movimientosConciliados}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark font-weight-bold">Pendientes:</span>
                <span className="text-warning font-weight-bolder">
                  {conciliacion.nroMovimientos -
                    conciliacion.movimientosConciliados}
                </span>
              </div>
            </div>

            <div className="col-md-6">
              <h6 className="text-dark font-weight-bolder mb-4">
                Información Adicional
              </h6>

              <div className="mb-3">
                <label className="text-muted font-weight-bold font-size-sm">
                  Creado por
                </label>
                <div className="text-dark font-weight-bolder">
                  {conciliacion.creadoPor}
                </div>
              </div>

              <div className="mb-3">
                <label className="text-muted font-weight-bold font-size-sm">
                  Fecha de Creación
                </label>
                <div className="text-dark font-weight-bolder">
                  {formatDate(conciliacion.fechaCreacion)}
                </div>
              </div>

              <div className="mb-3">
                <label className="text-muted font-weight-bold font-size-sm">
                  Última Modificación
                </label>
                <div className="text-dark font-weight-bolder">
                  {formatDate(conciliacion.ultimaModificacion)}
                </div>
              </div>
            </div>
          </div>

          {/* Observaciones */}
          {conciliacion.observaciones && (
            <>
              <div className="separator separator-dashed my-6"></div>
              <div>
                <h6 className="text-dark font-weight-bolder mb-4">
                  Observaciones
                </h6>
                <div className="bg-light-info p-4 rounded">
                  <p className="text-dark mb-0">{conciliacion.observaciones}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top-0">
        <button
          type="button"
          className="btn btn-light-primary font-weight-bold"
          onClick={onHide}
        >
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetalleConciliacionModal;
