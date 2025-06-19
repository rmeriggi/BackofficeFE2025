import {
  AccountBalance,
  Assessment,
  CalendarToday,
  Clear,
  Close,
  FilterList,
  Refresh,
  Save,
  Settings,
  ShowChart,
  TrendingUp,
  Tune,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ListingFilter from "../Listing/ListingFilter";

export const FilterModal = ({
  show,
  onHide,
  allBalances,
  setValues,
  isSubmitting,
  setIsSubmitting,
  setValuesToReport,
  setNameExcel,
  handleFilterModalClose,
}) => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simular guardado
    setTimeout(() => {
      setIsLoading(false);
      handleFilterModalClose();
    }, 1000);
  };

  const handleReset = () => {
    // Resetear valores
  };

  const handleClear = () => {
    // Limpiar filtros
  };

  const tabs = [
    { id: "general", label: "General", icon: <Settings /> },
    { id: "advanced", label: "Avanzado", icon: <Tune /> },
    { id: "presets", label: "Presets", icon: <Save /> },
  ];

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="filter-modal-title"
      className="modal-dialog-centered"
    >
      <div className="modal-content">
        {/* Header mejorado */}
        <div className="modal-header bg-gradient-primary-to-secondary">
          <div className="d-flex align-items-center">
            <div className="symbol symbol-40 symbol-circle mr-4">
              <span className="symbol-label bg-white bg-opacity-20">
                <FilterList style={{ color: "#fff" }} />
              </span>
            </div>
            <div>
              <h4
                className="modal-title text-white font-weight-bolder"
                id="filter-modal-title"
              >
                Filtros de Dashboard
              </h4>
              <p className="text-white-75 mb-0">
                Configura los filtros para personalizar el análisis de cuentas
              </p>
            </div>
          </div>
          <button
            type="button"
            className="close text-white"
            onClick={onHide}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body p-0">
          {/* Tabs de navegación */}
          <div className="card card-custom gutter-b mb-0">
            <div className="card-body py-4 px-6">
              <ul className="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-md">
                {tabs.map((tab) => (
                  <li key={tab.id} className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="nav-icon mr-2">{tab.icon}</span>
                      {tab.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contenido de tabs */}
          <div className="p-8">
            {activeTab === "general" && (
              <div className="row">
                <div className="col-12">
                  <div className="card card-custom gutter-b mb-6">
                    <div className="card-header">
                      <div className="card-title">
                        <h3 className="card-label text-dark font-weight-bolder">
                          <AccountBalance className="mr-2" />
                          Configuración General
                        </h3>
                      </div>
                    </div>
                    <div className="card-body">
                      <ListingFilter
                        balancesData={allBalances}
                        setValues={setValues}
                        isSubmitting={isSubmitting}
                        setIsSubmitting={setIsSubmitting}
                        setValuesToReport={setValuesToReport}
                        setNameExcel={setNameExcel}
                        handleFilterModalClose={handleFilterModalClose}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "advanced" && (
              <div className="row">
                <div className="col-12">
                  <div className="card card-custom gutter-b mb-6">
                    <div className="card-header">
                      <div className="card-title">
                        <h3 className="card-label text-dark font-weight-bolder">
                          <Tune className="mr-2" />
                          Filtros Avanzados
                        </h3>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label font-weight-bold">
                              <CalendarToday className="mr-2" />
                              Rango de Fechas Personalizado
                            </label>
                            <input
                              type="date"
                              className="form-control form-control-lg"
                              placeholder="Seleccionar fecha"
                            />
                            <div className="form-text">
                              Define un rango de fechas específico
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label font-weight-bold">
                              <TrendingUp className="mr-2" />
                              Tipo de Variación
                            </label>
                            <select className="form-control form-control-lg">
                              <option>Todas las variaciones</option>
                              <option>Solo positivas</option>
                              <option>Solo negativas</option>
                              <option>Sin variación</option>
                            </select>
                            <div className="form-text">
                              Filtra por tipo de variación
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label font-weight-bold">
                              <ShowChart className="mr-2" />
                              Umbral de Variación
                            </label>
                            <input
                              type="number"
                              className="form-control form-control-lg"
                              placeholder="0"
                            />
                            <div className="form-text">
                              Mínima variación a mostrar
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label font-weight-bold">
                              <Assessment className="mr-2" />
                              Agrupación
                            </label>
                            <select className="form-control form-control-lg">
                              <option>Por día</option>
                              <option>Por semana</option>
                              <option>Por mes</option>
                              <option>Por trimestre</option>
                            </select>
                            <div className="form-text">
                              Define cómo agrupar los datos
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "presets" && (
              <div className="row">
                <div className="col-12">
                  <div className="card card-custom gutter-b mb-6">
                    <div className="card-header">
                      <div className="card-title">
                        <h3 className="card-label text-dark font-weight-bolder">
                          <Save className="mr-2" />
                          Configuraciones Guardadas
                        </h3>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <div className="card card-custom gutter-b bg-light-primary">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-center mb-3">
                                <TrendingUp
                                  style={{ color: "#3699FF", marginRight: 8 }}
                                />
                                <h6 className="font-weight-bold mb-0">
                                  Análisis Semanal
                                </h6>
                              </div>
                              <p className="text-muted font-size-sm mb-3">
                                Configuración estándar para análisis semanal
                              </p>
                              <button className="btn btn-primary btn-sm w-100">
                                Aplicar
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-4">
                          <div className="card card-custom gutter-b bg-light-success">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-center mb-3">
                                {/* <Analytics
                                  style={{ color: "#0BB783", marginRight: 8 }}
                                /> */}
                                <h6 className="font-weight-bold mb-0">
                                  Reporte Mensual
                                </h6>
                              </div>
                              <p className="text-muted font-size-sm mb-3">
                                Configuración para reportes mensuales
                              </p>
                              <button className="btn btn-success btn-sm w-100">
                                Aplicar
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-4">
                          <div className="card card-custom gutter-b bg-light-warning">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-center mb-3">
                                <Assessment
                                  style={{ color: "#FFA800", marginRight: 8 }}
                                />
                                <h6 className="font-weight-bold mb-0">
                                  Análisis Detallado
                                </h6>
                              </div>
                              <p className="text-muted font-size-sm mb-3">
                                Configuración para análisis detallado
                              </p>
                              <button className="btn btn-warning btn-sm w-100">
                                Aplicar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer mejorado */}
        <div className="modal-footer bg-light-gray-100">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-light btn-icon mr-2"
                onClick={handleReset}
                title="Restaurar valores originales"
              >
                <Refresh />
              </button>
              <button
                type="button"
                className="btn btn-light-danger btn-icon mr-2"
                onClick={handleClear}
                title="Limpiar todos los filtros"
              >
                <Clear />
              </button>
            </div>
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-secondary font-weight-bold mr-3"
                onClick={onHide}
              >
                <Close className="mr-2" />
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary font-weight-bold"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner-border spinner-border-sm mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2" />
                    Aplicar Filtros
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
