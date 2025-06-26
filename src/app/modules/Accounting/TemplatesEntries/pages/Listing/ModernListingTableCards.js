import {
  AccountBalance,
  AccountTree,
  Assessment,
  Business,
  CreditCard,
  Description,
  People,
  TrendingUp,
} from "@material-ui/icons";
import React from "react";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";

const getTemplateIcon = (moduleName) => {
  const name = moduleName?.toLowerCase() || "";
  if (name.includes("cuentas")) return AccountBalance;
  if (name.includes("inversiones")) return TrendingUp;
  if (name.includes("proveedores")) return Business;
  if (name.includes("clientes")) return People;
  if (name.includes("contable")) return AccountTree;
  if (name.includes("créditos") || name.includes("creditos")) return CreditCard;
  if (name.includes("cheques")) return CreditCard;
  return Description;
};

const getTemplateColor = (moduleName) => {
  const name = moduleName?.toLowerCase() || "";

  // Colores únicos para cada tipo de módulo
  if (name.includes("cuentas"))
    return { bg: "#e3f2fd", text: "#1976d2", icon: "#1976d2" };
  if (name.includes("inversiones"))
    return { bg: "#e8f5e8", text: "#388e3c", icon: "#388e3c" };
  if (name.includes("proveedores"))
    return { bg: "#fff3e0", text: "#f57c00", icon: "#f57c00" };
  if (name.includes("clientes"))
    return { bg: "#f3e5f5", text: "#7b1fa2", icon: "#7b1fa2" };
  if (name.includes("contable"))
    return { bg: "#e0f2f1", text: "#00695c", icon: "#00695c" };
  if (name.includes("créditos") || name.includes("creditos"))
    return { bg: "#fce4ec", text: "#c2185b", icon: "#c2185b" };
  if (name.includes("cheques"))
    return { bg: "#f1f8e9", text: "#689f38", icon: "#689f38" };
  if (name.includes("estadísticas"))
    return { bg: "#fafafa", text: "#424242", icon: "#424242" };
  if (name.includes("dashboard"))
    return { bg: "#e8eaf6", text: "#3f51b5", icon: "#3f51b5" };
  if (name.includes("menu"))
    return { bg: "#fff8e1", text: "#ff8f00", icon: "#ff8f00" };

  // Color por defecto
  return { bg: "#f5f5f5", text: "#616161", icon: "#616161" };
};

export default function ModernListingTableCards({ seatingTemplates }) {
  return (
    <div className="row">
      {seatingTemplates.length > 0 ? (
        seatingTemplates.map((item) => {
          const Icon = getTemplateIcon(item.module);
          const colors = getTemplateColor(item.module);

          return (
            <div
              key={item.id}
              className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-6"
            >
              <Card
                style={{
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  background: colors.bg,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.08)";
                }}
              >
                <CardBody className="p-6">
                  <div className="d-flex align-items-center mb-4">
                    <div
                      className="symbol symbol-50 symbol-circle mr-4"
                      style={{ background: "white" }}
                    >
                      <span className="symbol-label">
                        <Icon style={{ fontSize: 24, color: colors.icon }} />
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h5
                        className="font-weight-bolder mb-1"
                        style={{ color: colors.text }}
                      >
                        {item.description}
                      </h5>
                      <div className="text-muted font-size-sm">
                        ID: {item.id}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className="badge badge-pill"
                      style={{
                        background: colors.text,
                        color: "white",
                        fontSize: "12px",
                        padding: "6px 12px",
                      }}
                    >
                      {item.module || "Sin módulo"}
                    </span>
                    <div className="text-muted font-size-sm">#{item.id}</div>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })
      ) : (
        <div className="col-12">
          <Card
            style={{
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              background: "#f8f9fa",
            }}
          >
            <CardBody className="p-8 text-center">
              <Assessment
                style={{ fontSize: 64, color: "#6c757d", marginBottom: 16 }}
              />
              <h4 className="text-muted mb-2">
                No se encontraron plantillas de asientos
              </h4>
              <p className="text-muted mb-0">
                No hay plantillas de asientos disponibles para mostrar
              </p>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
