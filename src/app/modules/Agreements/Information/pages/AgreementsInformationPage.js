import React from "react";
import usePrint from "../../../hooks/usePrint";
import { agreementsAccountsMock } from "../../__mocks__/agreementsAccountsMock";
import { agreementsManagementMock } from "../../__mocks__/agreementsManagementMock";
import { agreementsMock } from "../../__mocks__/agreementsMock";

const AgreementsInformationPage = () => {
  const { printRef, handlePrint } = usePrint();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="container-fluid mt-5" ref={printRef}>
      {/* Header */}
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Informe Ejecutivo - Estado de Acuerdos en Cuenta Corriente
            </span>
          </h3>
          <span className="text-muted font-weight-bold font-size-sm">
            Actualizado al {getCurrentDate()}
          </span>
        </div>

        <div>
          <button className="btn btn-primary no-print" onClick={handlePrint}>
            Imprimir
          </button>
        </div>
      </div>

      {/* Card Principal */}
      <div className="card card-custom gutter-b">
        <div className="card-body pt-0">
          {/* Resumen Ejecutivo */}
          <h5 className="font-weight-bold text-primary mb-4 mt-2">
            Resumen Ejecutivo
          </h5>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td className="font-weight-bold">Total de Acuerdos Activos</td>
                <td>{agreementsMock.summary.activeAgreements}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Total de Cuentas con Acuerdos
                </td>
                <td>{agreementsAccountsMock.summary.totalAccounts}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Monto Total Acordado</td>
                <td>
                  {formatCurrency(agreementsMock.summary.totalAgreedAmount)}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">Monto Total Utilizado</td>
                <td>
                  {formatCurrency(agreementsMock.summary.totalUsedAmount)}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">Monto Total Disponible</td>
                <td>
                  {formatCurrency(agreementsMock.summary.totalAvailableAmount)}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Tasa Promedio de Utilización
                </td>
                <td>
                  {formatPercentage(
                    agreementsMock.summary.averageUtilizationRate
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Distribución por Estado */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Distribución por Estado
          </h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Estado</th>
                <th>Cantidad</th>
                <th>Monto</th>
                <th>% del Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Activos</td>
                <td>{agreementsMock.byStatus.active.count}</td>
                <td>{formatCurrency(agreementsMock.byStatus.active.amount)}</td>
                <td>
                  {formatPercentage(agreementsMock.byStatus.active.percentage)}
                </td>
              </tr>
              <tr>
                <td>Vencidos</td>
                <td>{agreementsMock.byStatus.expired.count}</td>
                <td>
                  {formatCurrency(agreementsMock.byStatus.expired.amount)}
                </td>
                <td>
                  {formatPercentage(agreementsMock.byStatus.expired.percentage)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Distribución por Tipo de Cliente */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Distribución por Tipo de Cliente
          </h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Tipo de Cliente</th>
                <th>Cantidad</th>
                <th>Monto</th>
                <th>% del Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Individual</td>
                <td>{agreementsMock.byClientType.individual.count}</td>
                <td>
                  {formatCurrency(
                    agreementsMock.byClientType.individual.amount
                  )}
                </td>
                <td>
                  {formatPercentage(
                    agreementsMock.byClientType.individual.percentage
                  )}
                </td>
              </tr>
              <tr>
                <td>Empresa</td>
                <td>{agreementsMock.byClientType.business.count}</td>
                <td>
                  {formatCurrency(agreementsMock.byClientType.business.amount)}
                </td>
                <td>
                  {formatPercentage(
                    agreementsMock.byClientType.business.percentage
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Distribución por Rango de Monto */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Distribución por Rango de Monto
          </h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Rango de Monto</th>
                <th>Cantidad</th>
                <th>Monto</th>
                <th>% del Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0 - 50k</td>
                <td>{agreementsMock.byAmountRange["0-50k"].count}</td>
                <td>
                  {formatCurrency(agreementsMock.byAmountRange["0-50k"].amount)}
                </td>
                <td>
                  {formatPercentage(
                    agreementsMock.byAmountRange["0-50k"].percentage
                  )}
                </td>
              </tr>
              <tr>
                <td>50k - 100k</td>
                <td>{agreementsMock.byAmountRange["50k-100k"].count}</td>
                <td>
                  {formatCurrency(
                    agreementsMock.byAmountRange["50k-100k"].amount
                  )}
                </td>
                <td>
                  {formatPercentage(
                    agreementsMock.byAmountRange["50k-100k"].percentage
                  )}
                </td>
              </tr>
              <tr>
                <td>100k - 250k</td>
                <td>{agreementsMock.byAmountRange["100k-250k"].count}</td>
                <td>
                  {formatCurrency(
                    agreementsMock.byAmountRange["100k-250k"].amount
                  )}
                </td>
                <td>
                  {formatPercentage(
                    agreementsMock.byAmountRange["100k-250k"].percentage
                  )}
                </td>
              </tr>
              <tr>
                <td>250k - 500k</td>
                <td>{agreementsMock.byAmountRange["250k-500k"].count}</td>
                <td>
                  {formatCurrency(
                    agreementsMock.byAmountRange["250k-500k"].amount
                  )}
                </td>
                <td>
                  {formatPercentage(
                    agreementsMock.byAmountRange["250k-500k"].percentage
                  )}
                </td>
              </tr>
              <tr>
                <td>500k+</td>
                <td>{agreementsMock.byAmountRange["500k+"].count}</td>
                <td>
                  {formatCurrency(agreementsMock.byAmountRange["500k+"].amount)}
                </td>
                <td>
                  {formatPercentage(
                    agreementsMock.byAmountRange["500k+"].percentage
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Análisis de Sobregiro */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Análisis de Sobregiro
          </h5>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td className="font-weight-bold">Total de Sobregiro</td>
                <td>
                  {formatCurrency(agreementsMock.summary.totalOverdraftAmount)}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">Clientes en Sobregiro</td>
                <td>{agreementsMock.performance.totalOverdraftClients}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Promedio de Días en Sobregiro
                </td>
                <td>{agreementsMock.performance.averageDaysOverdraft} días</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Tasa de Renovación</td>
                <td>
                  {formatPercentage(agreementsMock.performance.renewalRate)}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">Tasa de Default</td>
                <td>
                  {formatPercentage(agreementsMock.performance.defaultRate)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Top 5 Clientes con Mayor Sobregiro */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Top 5 Clientes con Mayor Sobregiro
          </h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Cliente</th>
                <th>Monto Acordado</th>
                <th>Sobregiro</th>
                <th>Utilización</th>
                <th>Días en Sobregiro</th>
                <th>Nivel de Riesgo</th>
              </tr>
            </thead>
            <tbody>
              {agreementsMock.topOverdraftClients
                .slice(0, 5)
                .map((client, index) => (
                  <tr key={client.id}>
                    <td>{client.clientName}</td>
                    <td>{formatCurrency(client.agreementAmount)}</td>
                    <td className="text-danger font-weight-bold">
                      {formatCurrency(client.overdraftAmount)}
                    </td>
                    <td>{formatPercentage(client.utilizationRate)}</td>
                    <td>{client.daysOverdraft}</td>
                    <td>
                      <span
                        className={`badge badge-${
                          client.riskLevel === "Alto"
                            ? "danger"
                            : client.riskLevel === "Medio"
                            ? "warning"
                            : "success"
                        }`}
                      >
                        {client.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Acuerdos Próximos a Vencer */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Acuerdos Próximos a Vencer (Próximos 30 días)
          </h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Cliente</th>
                <th>Monto Acordado</th>
                <th>Saldo Actual</th>
                <th>Días para Vencer</th>
                <th>Probabilidad de Renovación</th>
              </tr>
            </thead>
            <tbody>
              {agreementsMock.expiringAgreements
                .slice(0, 5)
                .map((agreement, index) => (
                  <tr key={agreement.id}>
                    <td>{agreement.clientName}</td>
                    <td>{formatCurrency(agreement.agreementAmount)}</td>
                    <td
                      className={
                        agreement.currentBalance < 0
                          ? "text-danger font-weight-bold"
                          : "text-success font-weight-bold"
                      }
                    >
                      {formatCurrency(agreement.currentBalance)}
                    </td>
                    <td>{agreement.daysToExpire}</td>
                    <td>
                      <span
                        className={`badge badge-${
                          agreement.renewalProbability === "Alta"
                            ? "success"
                            : agreement.renewalProbability === "Media"
                            ? "warning"
                            : "danger"
                        }`}
                      >
                        {agreement.renewalProbability}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Estado de Gestión */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Estado de Gestión de Acuerdos
          </h5>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td className="font-weight-bold">
                  Acuerdos Pendientes de Aprobación
                </td>
                <td>{agreementsManagementMock.summary.pendingApproval}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Acuerdos Pendientes de Renovación
                </td>
                <td>{agreementsManagementMock.summary.pendingRenewal}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Acuerdos Vencidos</td>
                <td>{agreementsManagementMock.summary.expiredAgreements}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Acuerdos en Revisión</td>
                <td>{agreementsManagementMock.summary.pendingApproval}</td>
              </tr>
            </tbody>
          </table>

          {/* Alertas y Recomendaciones */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Alertas y Recomendaciones
          </h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Tipo de Alerta</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Monto Involucrado</th>
              </tr>
            </thead>
            <tbody>
              {agreementsMock.alerts.map((alert, index) => (
                <tr key={alert.id}>
                  <td>
                    <span
                      className={`badge badge-${
                        alert.type === "warning"
                          ? "warning"
                          : alert.type === "success"
                          ? "success"
                          : "info"
                      }`}
                    >
                      {alert.title}
                    </span>
                  </td>
                  <td>{alert.message}</td>
                  <td>{alert.count}</td>
                  <td>{formatCurrency(alert.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Métricas de Rendimiento */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Métricas de Rendimiento
          </h5>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td className="font-weight-bold">
                  Promedio de Monto por Acuerdo
                </td>
                <td>
                  {formatCurrency(
                    agreementsMock.summary.averageAgreementAmount
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Acuerdos que Vencen este Mes
                </td>
                <td>{agreementsMock.summary.agreementsExpiringThisMonth}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Acuerdos que Vencen el Próximo Mes
                </td>
                <td>{agreementsMock.summary.agreementsExpiringNextMonth}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Eficiencia de Gestión</td>
                <td>
                  {formatPercentage(agreementsMock.performance.renewalRate)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgreementsInformationPage;
