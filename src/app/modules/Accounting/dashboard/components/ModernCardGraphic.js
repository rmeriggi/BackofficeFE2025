import {
  MoreVert,
  TrendingDown,
  TrendingUp,
  Visibility,
} from "@material-ui/icons";
import React from "react";

export default function ModernCardGraphic({
  children,
  title,
  data,
  icon: Icon,
  color = "primary",
}) {
  const { total, variation } = data || {};

  const colorClasses = {
    primary: {
      bg: "bg-light-primary",
      text: "text-primary",
      icon: "#3699FF",
    },
    success: {
      bg: "bg-light-success",
      text: "text-success",
      icon: "#0BB783",
    },
    warning: {
      bg: "bg-light-warning",
      text: "text-warning",
      icon: "#FFA800",
    },
    danger: {
      bg: "bg-light-danger",
      text: "text-danger",
      icon: "#F64E60",
    },
    info: {
      bg: "bg-light-info",
      text: "text-info",
      icon: "#8950FC",
    },
  };

  const currentColor = colorClasses[color] || colorClasses.primary;

  return (
    <div
      className="card card-custom gutter-b shadow-sm"
      style={{
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        height: "100%",
      }}
    >
      <div className="card-header border-0 pt-6 pb-0">
        <div className="card-title">
          <div className="d-flex align-items-center">
            <div className={`symbol symbol-50 symbol-light-${color} mr-4`}>
              <span className="symbol-label bg-white">
                {Icon && (
                  <Icon style={{ fontSize: 24, color: currentColor.icon }} />
                )}
              </span>
            </div>
            <div>
              <h3 className="card-label text-dark font-weight-bolder mb-1">
                {title}
              </h3>
              <div className="d-flex align-items-center">
                {variation > 0 ? (
                  <TrendingUp
                    style={{
                      fontSize: 16,
                      color: currentColor.icon,
                      marginRight: 4,
                    }}
                  />
                ) : (
                  <TrendingDown
                    style={{ fontSize: 16, color: "#F64E60", marginRight: 4 }}
                  />
                )}
                <span
                  className={`font-weight-bold font-size-sm ${
                    variation > 0 ? currentColor.text : "text-danger"
                  }`}
                >
                  {variation > 0 ? `+${variation}%` : `${variation}%`} vs mes
                  anterior
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-toolbar">
          <div className="dropdown">
            <button
              className="btn btn-light btn-sm dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              style={{ borderRadius: "6px" }}
            >
              <MoreVert />
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="#">
                <Visibility className="mr-2" />
                Ver detalles
              </a>
              <a className="dropdown-item" href="#">
                Exportar
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body pt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div className="text-muted font-weight-bold font-size-sm mb-1">
              Total
            </div>
            <div
              className={`font-size-h2 font-weight-bolder ${currentColor.text}`}
            >
              {typeof total === "number"
                ? new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(total)
                : total || "0"}
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: "auto", minHeight: "200px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
