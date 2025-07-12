import { Close } from "@material-ui/icons";
import React from "react";
import { Modal } from "react-bootstrap";

const DetalleMontoModal = ({ show, onHide, monto, planilla }) => {
  // Configuración de los porcentajes según los requerimientos
  const desglose = [
    { concepto: "Capital", porcentaje: 40 },
    { concepto: "Intereses", porcentaje: 10 },
    { concepto: "Punitorio", porcentaje: 0 },
    { concepto: "Seguro", porcentaje: 20 },
    { concepto: "Cuenta aportación", porcentaje: 20 },
    { concepto: "Ahorro", porcentaje: 10 },
  ];

  // Función para formatear el monto
  const formatearMonto = (valor) => {
    if (!valor || isNaN(valor)) return "$0.00";
    return `$${parseFloat(valor).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Calcular valores basados en el monto total
  const calcularValor = (porcentaje) => {
    const montoNumerico = parseFloat(monto) || 0;
    return (montoNumerico * porcentaje) / 100;
  };

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
          Detalle del Monto
        </Modal.Title>
        <button type="button" className="btn btn-xs btn-icon" onClick={onHide}>
          <Close className="text-white" />
        </button>
      </Modal.Header>

      <Modal.Body className="p-0">
        {/* Información de la planilla */}
        {planilla && (
          <div className="bg-light-primary p-6 border-bottom">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="text-dark font-weight-bolder mb-1">
                  Planilla - {planilla.periodo}
                </h5>
                <p className="text-muted mb-0">
                  <span className="font-weight-bold">Código:</span>{" "}
                  {planilla.codigo} |
                  <span className="font-weight-bold"> Tipo:</span>{" "}
                  {planilla.tipo}
                </p>
              </div>
              <div className="text-right">
                <div className="text-muted font-size-sm">Monto Total</div>
                <div className="text-primary font-weight-bolder font-size-h4">
                  {formatearMonto(monto)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desglose del monto */}
        <div className="p-6">
          <h6 className="text-dark font-weight-bolder mb-4">
            Desglose por Concepto
          </h6>

          <div className="list-group list-group-flush">
            {desglose.map((item, index) => (
              <div
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-4"
              >
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-40 symbol-light-primary mr-4">
                    <span className="symbol-label font-weight-bolder font-size-sm">
                      {item.porcentaje}%
                    </span>
                  </div>
                  <div>
                    <div className="text-dark font-weight-bolder font-size-lg">
                      {item.concepto}
                    </div>
                    <div className="text-muted font-size-sm">
                      {item.porcentaje}% del total
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-dark font-weight-bolder font-size-lg">
                    {formatearMonto(calcularValor(item.porcentaje))}
                  </div>
                </div>
              </div>
            ))}

            {/* Línea divisoria */}
            <div className="separator separator-dashed my-2"></div>

            {/* Total */}
            <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-4 bg-light-success">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-success mr-4">
                  <span className="symbol-label font-weight-bolder font-size-sm text-white">
                    100%
                  </span>
                </div>
                <div>
                  <div className="text-dark font-weight-bolder font-size-lg">
                    Total
                  </div>
                  <div className="text-muted font-size-sm">Total del monto</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-success font-weight-bolder font-size-h5 mr-2">
                  {formatearMonto(monto)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetalleMontoModal;
