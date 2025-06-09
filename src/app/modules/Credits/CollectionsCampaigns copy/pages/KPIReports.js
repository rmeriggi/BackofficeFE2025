import React from "react";
import { withSnackbar } from "../../../../HOCs/withSnackbar";
import styles from "./KPIReports.module.css";

const KPIReports = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Reporte de Créditos - HDBank</h1>

      <div className={styles.kpiContainer}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiTitle}>Cartera Total Activa</div>
          <div className={styles.kpiValue}>$120.500.000</div>
          <div className={styles.kpiSubtext}>Monto vigente</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTitle}>Mora Total (NPL)</div>
          <div className={styles.kpiValue}>4.2%</div>
          <div className={styles.kpiSubtext}>% sobre cartera</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTitle}>Recupero Último Mes</div>
          <div className={styles.kpiValue}>78%</div>
          <div className={styles.kpiSubtext}>Deudas recuperadas</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTitle}>Rentabilidad Bruta</div>
          <div className={styles.kpiValue}>22.8%</div>
          <div className={styles.kpiSubtext}>Últimos 12 meses</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTitle}>Flujo de Cobros Próx. Semana</div>
          <div className={styles.kpiValue}>$8.750.000</div>
          <div className={styles.kpiSubtext}>Proyección próxima semana</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTitle}>Clientes Activos</div>
          <div className={styles.kpiValue}>3.250</div>
          <div className={styles.kpiSubtext}>Con crédito vigente</div>
        </div>
      </div>
    </section>
  );
};

export default withSnackbar(KPIReports);
