import {
  AccountBalance,
  CheckCircle,
  Info,
  MonetizationOn,
  Receipt,
  Schedule,
  Warning,
} from "@material-ui/icons";
import React from "react";

export default function ModernAlerts({ alerts, recentActivity }) {
  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return <Warning style={{ color: "#FFA800" }} />;
      case "info":
        return <Info style={{ color: "#3699FF" }} />;
      case "success":
        return <CheckCircle style={{ color: "#0BB783" }} />;
      case "danger":
        return <Warning style={{ color: "#F64E60" }} />;
      default:
        return <Info style={{ color: "#3699FF" }} />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "asiento":
        return <Receipt style={{ color: "#3699FF" }} />;
      case "gasto":
        return <AccountBalance style={{ color: "#F64E60" }} />;
      case "ingreso":
        return <MonetizationOn style={{ color: "#0BB783" }} />;
      default:
        return <Receipt style={{ color: "#3699FF" }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#0BB783";
      case "pending":
        return "#FFA800";
      case "error":
        return "#F64E60";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="row mb-8">
      {/* Alertas */}
      <div className="col-xl-6 col-lg-12 mb-8">
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
              <h3 className="card-label text-dark font-weight-bolder">
                Alertas y Notificaciones
              </h3>
            </div>
          </div>
          <div className="card-body pt-4">
            {alerts && alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center p-4 mb-4 rounded"
                  style={{
                    background:
                      alert.type === "warning"
                        ? "rgba(255, 168, 0, 0.1)"
                        : alert.type === "info"
                        ? "rgba(54, 153, 255, 0.1)"
                        : alert.type === "success"
                        ? "rgba(11, 183, 131, 0.1)"
                        : "rgba(246, 78, 96, 0.1)",
                    border: `1px solid ${
                      alert.type === "warning"
                        ? "rgba(255, 168, 0, 0.2)"
                        : alert.type === "info"
                        ? "rgba(54, 153, 255, 0.2)"
                        : alert.type === "success"
                        ? "rgba(11, 183, 131, 0.2)"
                        : "rgba(246, 78, 96, 0.2)"
                    }`,
                  }}
                >
                  <div className="symbol symbol-40 symbol-circle mr-4">
                    <span className="symbol-label bg-white">
                      {getAlertIcon(alert.type)}
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="font-weight-bolder text-dark mb-0">
                        {alert.title}
                      </h6>
                      {alert.count > 0 && (
                        <span className="badge badge-pill badge-light-primary">
                          {alert.count}
                        </span>
                      )}
                    </div>
                    <p className="text-muted mb-0 font-size-sm">
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle
                  style={{ fontSize: 48, color: "#0BB783", marginBottom: 16 }}
                />
                <h5 className="text-muted">No hay alertas pendientes</h5>
                <p className="text-muted font-size-sm">
                  Todo está funcionando correctamente
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="col-xl-6 col-lg-12 mb-8">
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
              <h3 className="card-label text-dark font-weight-bolder">
                Actividad Reciente
              </h3>
            </div>
          </div>
          <div className="card-body pt-4">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div
                  key={activity.id || index}
                  className="d-flex align-items-center p-4 mb-4 rounded"
                  style={{
                    background: "#f8f9fa",
                    border: "1px solid #e9ecef",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#e9ecef";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f8f9fa";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div className="symbol symbol-40 symbol-circle mr-4">
                    <span className="symbol-label bg-white">
                      {getActivityIcon(activity.type)}
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="font-weight-bolder text-dark mb-0">
                        {activity.description}
                      </h6>
                      <div className="d-flex align-items-center">
                        <span
                          className="badge badge-pill mr-2"
                          style={{
                            background: getStatusColor(activity.status),
                            color: "white",
                            fontSize: "10px",
                          }}
                        >
                          {activity.status === "completed"
                            ? "Completado"
                            : activity.status === "pending"
                            ? "Pendiente"
                            : "Error"}
                        </span>
                        <span className="font-weight-bold text-primary">
                          {activity.amount}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <Schedule
                        style={{
                          fontSize: 14,
                          color: "#6c757d",
                          marginRight: 4,
                        }}
                      />
                      <span className="text-muted font-size-sm">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Schedule
                  style={{ fontSize: 48, color: "#6c757d", marginBottom: 16 }}
                />
                <h5 className="text-muted">No hay actividad reciente</h5>
                <p className="text-muted font-size-sm">
                  Los registros aparecerán aquí
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
