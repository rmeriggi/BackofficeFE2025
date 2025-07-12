import { Close } from "@material-ui/icons";
import React from "react";
import { Modal } from "react-bootstrap";

const DetalleMontoFileModal = ({ show, onHide, monto, cobrado, planilla }) => {
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

  // Función para determinar el color del cobrado
  const getColorCobrado = (cobrado, monto) => {
    const cobradoNum = parseFloat(cobrado) || 0;
    const montoNum = parseFloat(monto) || 0;

    if (cobradoNum === montoNum) {
      return "text-success"; // Verde si son iguales
    } else if (cobradoNum < montoNum) {
      return "text-danger"; // Rojo si cobrado es menor
    } else {
      return "text-warning"; // Amarillo si cobrado es mayor
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
    return meses[parseInt(mes) - 1] || `Mes ${mes}`;
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
          Detalle del Monto - Archivo
        </Modal.Title>
        <button type="button" className="btn btn-xs btn-icon" onClick={onHide}>
          <Close className="text-white" />
        </button>
      </Modal.Header>

      <Modal.Body className="p-0">
        {/* Información de la planilla */}
        {planilla && (
          <div className="bg-light-primary p-6 border-bottom">
            <div className="row">
              <div className="col-md-8">
                <h5 className="text-dark font-weight-bolder mb-3">
                  Información de la Planilla
                </h5>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-muted mb-2">
                      <span className="font-weight-bold">ID:</span>{" "}
                      {planilla.id}
                    </p>
                    <p className="text-muted mb-2">
                      <span className="font-weight-bold">Período:</span>{" "}
                      {getNombreMes(planilla.mes)} {planilla.ano}
                    </p>
                    <p className="text-muted mb-2">
                      <span className="font-weight-bold">Código:</span>{" "}
                      {planilla.codigo}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-muted mb-2">
                      <span className="font-weight-bold">Tipo:</span>{" "}
                      {planilla.tipo}
                    </p>
                    <p className="text-muted mb-2">
                      <span className="font-weight-bold">Identidad:</span>{" "}
                      {planilla.identidad}
                    </p>
                    <p className="text-muted mb-2">
                      <span className="font-weight-bold">Afiliado:</span>{" "}
                      {planilla.afiliado}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-right">
                <div className="mb-3">
                  <div className="text-muted font-size-sm">Monto Original</div>
                  <div className="text-primary font-weight-bolder font-size-h4">
                    {formatearMonto(monto)}
                  </div>
                </div>
                <div>
                  <div className="text-muted font-size-sm">Monto Cobrado</div>
                  <div
                    className={`font-weight-bolder font-size-h4 ${getColorCobrado(
                      cobrado,
                      monto
                    )}`}
                  >
                    {formatearMonto(cobrado)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desglose del monto */}
        <div className="p-6">
          <h6 className="text-dark font-weight-bolder mb-4">
            Desglose por Concepto (Basado en Monto Original)
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
                      {item.porcentaje}% del monto original
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

            {/* Comparación de totales */}
            <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-4 bg-light-info">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-info mr-4">
                  <span className="symbol-label font-weight-bolder font-size-sm text-white">
                    100%
                  </span>
                </div>
                <div>
                  <div className="text-dark font-weight-bolder font-size-lg">
                    Total Original
                  </div>
                  <div className="text-muted font-size-sm">
                    Monto completo de la planilla
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-info font-weight-bolder font-size-h5 mr-2">
                  {formatearMonto(monto)}
                </div>
              </div>
            </div>

            {/* Monto cobrado */}
            <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-4 bg-light-secondary">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-secondary mr-4">
                  <span className="symbol-label font-weight-bolder font-size-sm text-white">
                    {cobrado && monto
                      ? Math.round(
                          (parseFloat(cobrado) / parseFloat(monto)) * 100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div>
                  <div className="text-dark font-weight-bolder font-size-lg">
                    Total Cobrado
                  </div>
                  <div className="text-muted font-size-sm">
                    Monto efectivamente cobrado
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-weight-bolder font-size-h5 mr-2 ${getColorCobrado(
                    cobrado,
                    monto
                  )}`}
                >
                  {formatearMonto(cobrado)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetalleMontoFileModal;
