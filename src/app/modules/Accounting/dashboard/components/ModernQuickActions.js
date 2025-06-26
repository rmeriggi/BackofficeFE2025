import {
  AccountBalance,
  Add,
  Assessment,
  FilterList,
  Receipt,
  Refresh,
} from "@material-ui/icons";
import React from "react";

export default function ModernQuickActions({
  onRefresh,
  onFilter,
  onNewEntry,
  onReport,
}) {
  const actions = [
    {
      icon: Add,
      title: "Nuevo Asiento",
      description: "Crear entrada contable",
      color: "primary",
      onClick: onNewEntry,
    },
    {
      icon: Receipt,
      title: "Ver Asientos",
      description: "Listar entradas contables",
      color: "success",
      onClick: () => {},
    },
    {
      icon: Assessment,
      title: "Reportes",
      description: "Generar reportes",
      color: "warning",
      onClick: onReport,
    },
    {
      icon: AccountBalance,
      title: "Balance",
      description: "Ver balance general",
      color: "info",
      onClick: () => {},
    },
  ];

  return (
    <div className="row mb-8">
      <div className="col-12">
        <div
          className="card card-custom gutter-b shadow-sm"
          style={{
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <div className="card-body p-6">
            <div className="d-flex justify-content-between align-items-center mb-6">
              <div>
                <h3 className="text-white font-weight-bolder mb-2">
                  Acciones Rápidas
                </h3>
                <p className="text-white-50 mb-0">
                  Accede rápidamente a las funciones más utilizadas
                </p>
              </div>
              <div className="d-flex">
                <button
                  className="btn btn-light btn-sm mr-3"
                  onClick={onRefresh}
                  style={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Refresh className="mr-2" />
                  Actualizar
                </button>
                <button
                  className="btn btn-light btn-sm"
                  onClick={onFilter}
                  style={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FilterList className="mr-2" />
                  Filtros
                </button>
              </div>
            </div>

            <div className="row">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div
                    key={index}
                    className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-4"
                  >
                    <div
                      className="card card-custom gutter-b shadow-sm"
                      style={{
                        border: "none",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onClick={action.onClick}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.1)";
                      }}
                    >
                      <div className="card-body p-4 text-center">
                        <div className="symbol symbol-50 symbol-circle mx-auto mb-4">
                          <span className="symbol-label bg-white">
                            <Icon style={{ fontSize: 24, color: "#667eea" }} />
                          </span>
                        </div>
                        <h5 className="text-white font-weight-bolder mb-2">
                          {action.title}
                        </h5>
                        <p className="text-white-50 mb-0 font-size-sm">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
