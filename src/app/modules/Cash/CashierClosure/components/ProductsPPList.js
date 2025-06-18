import React, { useState } from "react";
import {
  AccountBalance,
  Autorenew,
  AttachMoney,
  FlashOn,
  TrendingUp,
  Schedule,
  Lock,
} from "@material-ui/icons";

const ProductsPPList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: "Tradicional",
      icono: <AccountBalance style={{ fontSize: 40, color: "#3699FF" }} />,
      descripcion:
        "Plazo fijo clásico con rendimiento garantizado al vencimiento. Ideal para inversores conservadores.",
      rendimiento: "30% TNA",
      plazo: "30 a 365 días",
    },
    {
      id: 2,
      nombre: "Cancelación Anticipada",
      icono: <Schedule style={{ fontSize: 40, color: "#F64E60" }} />,
      descripcion:
        "Flexibilidad para retirar tu dinero antes del vencimiento con una penalización mínima.",
      rendimiento: "28% TNA",
      plazo: "30 a 180 días",
    },
    {
      id: 3,
      nombre: "Renovable automáticamente",
      icono: <Autorenew style={{ fontSize: 40, color: "#0BB783" }} />,
      descripcion:
        "Tu inversión se renueva automáticamente al vencimiento para que no pierdas oportunidades.",
      rendimiento: "31% TNA",
      plazo: "30 a 90 días",
    },
    {
      id: 4,
      nombre: "Pago periódico de interés",
      icono: <AttachMoney style={{ fontSize: 40, color: "#FFA800" }} />,
      descripcion:
        "Recibe intereses mensuales mientras mantienes tu capital invertido.",
      rendimiento: "29% TNA",
      plazo: "90 a 365 días",
    },
    {
      id: 5,
      nombre: "Digital / Express",
      icono: <FlashOn style={{ fontSize: 40, color: "#8950FC" }} />,
      descripcion:
        "Contratación 100% online con acreditación inmediata. Ideal para operaciones rápidas.",
      rendimiento: "27% TNA",
      plazo: "30 a 60 días",
    },
    {
      id: 6,
      nombre: "Escalonado (Laddered)",
      icono: <TrendingUp style={{ fontSize: 40, color: "#1BC5BD" }} />,
      descripcion:
        "Diversifica tus vencimientos para optimizar rendimientos y liquidez.",
      rendimiento: "32% TNA",
      plazo: "60 a 360 días",
    },
    {
      id: 7,
      nombre: "Colateral / Garantía",
      icono: <Lock style={{ fontSize: 40, color: "#6993FF" }} />,
      descripcion:
        "Utiliza tu plazo fijo como garantía para operaciones crediticias sin desinvertir.",
      rendimiento: "28.5% TNA",
      plazo: "90 a 365 días",
    },
  ];

  return (
    <div className="card card-custom gutter-b">
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Productos de Plazos Fijos
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Seleccione el tipo de plazo fijo que mejor se adapte a sus
            necesidades
          </span>
        </h3>
        <div className="card-toolbar">
          <div className="input-icon input-icon-right">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar producto..."
            />
            <span>
              <i className="flaticon2-search-1 text-muted"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="card-body pt-0 pb-10">
        <div className="row">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
              onClick={() => setSelectedProduct(producto)}
            >
              <div
                className={`card card-custom card-stretch gutter-b ${
                  selectedProduct?.id === producto.id
                    ? "card-border border-primary"
                    : ""
                }`}
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderLeft:
                    selectedProduct?.id === producto.id
                      ? "4px solid #3699FF"
                      : "4px solid #fff",
                }}
              >
                <div className="card-body d-flex align-items-center p-6">
                  <div className="d-flex flex-column flex-grow-1">
                    <div className="d-flex align-items-center mb-2">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">{producto.icono}</span>
                      </div>
                      <div>
                        <h5 className="text-dark font-weight-bolder mb-0">
                          {producto.nombre}
                        </h5>
                        <span className="text-muted font-weight-bold">
                          {producto.rendimiento}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted mt-3 mb-0">
                      {producto.descripcion}
                    </p>

                    <div className="d-flex mt-4">
                      <div className="mr-4">
                        <span className="font-weight-bold mr-2">Plazo:</span>
                        <span className="text-muted">{producto.plazo}</span>
                      </div>
                      <div>
                        <span className="font-weight-bold mr-2">
                          Disponible:
                        </span>
                        <span className="text-success">Sí</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                  <button className="btn btn-light-primary font-weight-bold">
                    Más detalles
                  </button>
                  <button className="btn btn-primary font-weight-bold">
                    Contratar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.nombre}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setSelectedProduct(null)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-50 symbol-light mr-5">
                    <span className="symbol-label">
                      {selectedProduct.icono}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-dark font-weight-bolder">
                      {selectedProduct.nombre}
                    </h4>
                    <span className="text-muted font-weight-bold">
                      {selectedProduct.rendimiento}
                    </span>
                  </div>
                </div>

                <p className="mb-4">{selectedProduct.descripcion}</p>

                <div className="separator separator-dashed my-5"></div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-4">
                      <i className="flaticon-calendar text-primary mr-3 font-size-h2"></i>
                      <div>
                        <div className="font-weight-bolder">Plazo</div>
                        <div className="text-muted">
                          {selectedProduct.plazo}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-4">
                      <i className="flaticon-coins text-primary mr-3 font-size-h2"></i>
                      <div>
                        <div className="font-weight-bolder">Monto mínimo</div>
                        <div className="text-muted">$10,000</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-4">
                      <i className="flaticon-refresh text-primary mr-3 font-size-h2"></i>
                      <div>
                        <div className="font-weight-bolder">Renovación</div>
                        <div className="text-muted">Automática</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-4">
                      <i className="flaticon-file text-primary mr-3 font-size-h2"></i>
                      <div>
                        <div className="font-weight-bolder">Documentación</div>
                        <div className="text-muted">Mínima</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light-primary font-weight-bold"
                  onClick={() => setSelectedProduct(null)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary font-weight-bold"
                >
                  Contratar este producto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPPList;
