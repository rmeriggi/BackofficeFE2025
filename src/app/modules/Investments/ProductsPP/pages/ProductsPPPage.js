import React, { useState } from "react";
import ProductsPPList from "../components/ProductsPPList";
import { ProductsPPHeader } from "../components/ProductsPPHeader";
import { Add } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
const ProductsPPPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const history = useHistory();
  const handleNewProduct = () => {
    /*  setShowCreateModal(true); */
    history.push("/investments/productspp/create");
  };

  return (
    <div className="container-fluid">
      <ProductsPPHeader onNewProduct={handleNewProduct} />
      <ProductsPPList />

      {showCreateModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Crear Nuevo Producto de Plazo Fijo
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowCreateModal(false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Nombre del Producto</label>
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder="Ej: Plazo Fijo Premium"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Tasa de Rendimiento (TNA)</label>
                        <input
                          type="text"
                          className="form-control form-control-solid"
                          placeholder="Ej: 32.5"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Plazo (días)</label>
                        <input
                          type="text"
                          className="form-control form-control-solid"
                          placeholder="Ej: 30-180"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                      className="form-control form-control-solid"
                      rows="3"
                      placeholder="Descripción detallada del producto..."
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Características Especiales</label>
                    <div className="checkbox-list">
                      <label className="checkbox">
                        <input type="checkbox" />
                        <span></span>
                        Cancelación anticipada
                      </label>
                      <label className="checkbox">
                        <input type="checkbox" />
                        <span></span>
                        Renovación automática
                      </label>
                      <label className="checkbox">
                        <input type="checkbox" />
                        <span></span>
                        Pago periódico de intereses
                      </label>
                      <label className="checkbox">
                        <input type="checkbox" />
                        <span></span>
                        Disponible digitalmente
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Monto Mínimo de Inversión</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input
                        type="number"
                        className="form-control form-control-solid"
                        placeholder="10000"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light-primary font-weight-bold"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary font-weight-bold"
                >
                  <Add className="mr-2" />
                  Crear Producto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPPPage;
