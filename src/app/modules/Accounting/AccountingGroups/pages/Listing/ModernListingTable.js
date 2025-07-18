import {
  AccountBalance,
  Assessment,
  Business,
  MonetizationOn,
  TrendingDown,
  TrendingUp,
} from "@material-ui/icons";
import React from "react";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";

const getGroupIcon = (groupName) => {
  const name = groupName.trim().toLowerCase();
  if (name.includes("activo")) return AccountBalance;
  if (name.includes("pasivo")) return TrendingDown;
  if (name.includes("patrimonio")) return Business;
  if (name.includes("ingreso")) return TrendingUp;
  if (name.includes("egreso")) return MonetizationOn;
  return Assessment;
};

const getGroupColor = (groupName) => {
  const name = groupName.trim().toLowerCase();
  if (name.includes("activo"))
    return { bg: "#e3f2fd", text: "#1976d2", icon: "#1976d2" };
  if (name.includes("pasivo"))
    return { bg: "#ffebee", text: "#d32f2f", icon: "#d32f2f" };
  if (name.includes("patrimonio"))
    return { bg: "#e8f5e8", text: "#388e3c", icon: "#388e3c" };
  if (name.includes("ingreso"))
    return { bg: "#fff3e0", text: "#f57c00", icon: "#f57c00" };
  if (name.includes("egreso"))
    return { bg: "#fce4ec", text: "#c2185b", icon: "#c2185b" };
  return { bg: "#f5f5f5", text: "#616161", icon: "#616161" };
};

export default function ModernListingTable({
  accountingGroupsData,
  currency,
  entities,
}) {
  return (
    <div className="row">
      {accountingGroupsData.length > 0 ? (
        accountingGroupsData.map((item, index) => {
          const Icon = getGroupIcon(item.group);
          const colors = getGroupColor(item.group);
          const entityName =
            entities.find((e) => e.id === item.entity)?.entity || item.entity;
          const currencyName =
            currency.find((c) => c.id === item.currency)?.currency ||
            item.currency;

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
                        {item.group.trim()}
                      </h5>
                      <div className="text-muted font-size-sm">
                        ID: {item.id}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <div className="text-muted font-size-sm mb-1">
                        Entidad
                      </div>
                      <div
                        className="font-weight-bold"
                        style={{ color: colors.text }}
                      >
                        {entityName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-muted font-size-sm mb-1">Moneda</div>
                      <div
                        className="font-weight-bold"
                        style={{ color: colors.text }}
                      >
                        {currencyName}
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
                      Grupo Contable
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
                No se encontraron grupos contables
              </h4>
              <p className="text-muted mb-0">
                No hay grupos contables disponibles para mostrar
              </p>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
