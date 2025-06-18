import React, { useState } from "react";
import {
  AccountBalance,
  AttachMoney,
  TrendingUp,
  Lock,
  Add,
  Search,
} from "@material-ui/icons";

export const ProductsPPHeader = ({ onNewProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="card card-custom gutter-b">
      <div className="card-header border-0 py-5">
        <div className="card-title align-items-start flex-column">
          <h3 className="text-dark font-weight-bolder mb-3">
            Productos de Plazos Fijos
          </h3>
          <p className="text-muted font-weight-bold font-size-lg">
            Gestión integral de productos de inversión a plazo fijo
          </p>
        </div>
        <div className="card-toolbar">
          <div className="d-flex align-items-center">
            {/* Campo de búsqueda */}
            <div className="input-icon input-icon-right mr-4">
              <input
                type="text"
                className="form-control form-control-solid"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span>
                <Search style={{ color: "#7E8299" }} />
              </span>
            </div>

            {/* Botón para nuevo producto */}
            <button
              className="btn btn-primary font-weight-bold d-flex align-items-center"
              onClick={onNewProduct}
            >
              <Add className="mr-2" />
              Nuevo Producto
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="card-body bg-light-primary pt-6 pb-4 px-8">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-center mb-4 mb-lg-0">
            <div className="symbol symbol-40 symbol-light-primary mr-4">
              <span className="symbol-label bg-white">
                <AccountBalance style={{ fontSize: 24, color: "#3699FF" }} />
              </span>
            </div>
            <div>
              <div className="font-size-sm text-muted font-weight-bold">
                Productos Activos
              </div>
              <div className="font-size-h4 font-weight-bolder">7</div>
            </div>
          </div>

          <div className="d-flex align-items-center mb-4 mb-lg-0">
            <div className="symbol symbol-40 symbol-light-success mr-4">
              <span className="symbol-label bg-white">
                <TrendingUp style={{ fontSize: 24, color: "#1BC5BD" }} />
              </span>
            </div>
            <div>
              <div className="font-size-sm text-muted font-weight-bold">
                Rendimiento Promedio
              </div>
              <div className="font-size-h4 font-weight-bolder">29.5% TNA</div>
            </div>
          </div>

          <div className="d-flex align-items-center mb-4 mb-lg-0">
            <div className="symbol symbol-40 symbol-light-warning mr-4">
              <span className="symbol-label bg-white">
                <AttachMoney style={{ fontSize: 24, color: "#FFA800" }} />
              </span>
            </div>
            <div>
              <div className="font-size-sm text-muted font-weight-bold">
                Inversión Mínima
              </div>
              <div className="font-size-h4 font-weight-bolder">$10,000</div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="symbol symbol-40 symbol-light-danger mr-4">
              <span className="symbol-label bg-white">
                <Lock style={{ fontSize: 24, color: "#F64E60" }} />
              </span>
            </div>
            <div>
              <div className="font-size-sm text-muted font-weight-bold">
                Seguridad
              </div>
              <div className="font-size-h4 font-weight-bolder">Garantizada</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
