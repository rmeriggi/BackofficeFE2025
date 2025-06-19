import {
  Analytics,
  Assessment,
  Business,
  CalendarToday,
  ExpandLess,
  ExpandMore,
  FilterList,
  Group,
  Info,
  MonetizationOn,
  Settings,
  ShowChart,
  TrendingUp,
  Tune,
} from "@material-ui/icons";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";

export const Filters = ({
  currencies,
  entities,
  setValues,
  values,
  onHide,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("");

  const presets = [
    {
      id: "monthly",
      name: "Análisis Mensual",
      description: "Configuración estándar para análisis mensual",
      icon: <CalendarToday />,
      color: "primary",
      values: { idCurrency: 2, idEntity: 1 },
    },
    {
      id: "quarterly",
      name: "Reporte Trimestral",
      description: "Configuración para reportes trimestrales",
      icon: <Analytics />,
      color: "success",
      values: { idCurrency: 2, idEntity: 1 },
    },
    {
      id: "detailed",
      name: "Análisis Detallado",
      description: "Configuración para análisis detallado",
      icon: <Assessment />,
      color: "warning",
      values: { idCurrency: 2, idEntity: 1 },
    },
  ];

  const applyPreset = (preset) => {
    setValues(preset.values);
    setSelectedPreset(preset.id);
  };

  return (
    <div className="filters-container">
      {/* Presets rápidos */}
      <div className="card card-custom gutter-b mb-6">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label text-dark font-weight-bolder">
              <Settings className="mr-2" />
              Configuraciones Rápidas
            </h3>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {presets.map((preset) => (
              <div key={preset.id} className="col-md-4 mb-4">
                <div
                  className={`card card-custom gutter-b bg-light-${
                    preset.color
                  } cursor-pointer hover-elevate-up ${
                    selectedPreset === preset.id
                      ? "border border-" + preset.color
                      : ""
                  }`}
                  onClick={() => applyPreset(preset)}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className={`symbol symbol-40 symbol-light-${preset.color} mr-3`}
                      >
                        <span className="symbol-label bg-white">
                          {React.cloneElement(preset.icon, {
                            style: {
                              fontSize: 20,
                              color:
                                preset.color === "primary"
                                  ? "#3699FF"
                                  : preset.color === "success"
                                  ? "#0BB783"
                                  : "#FFA800",
                            },
                          })}
                        </span>
                      </div>
                      <div>
                        <h6 className="font-weight-bold mb-1">{preset.name}</h6>
                        <p className="text-muted font-size-sm mb-0">
                          {preset.description}
                        </p>
                      </div>
                    </div>
                    <button
                      className={`btn btn-${preset.color} btn-sm w-100`}
                      onClick={(e) => {
                        e.stopPropagation();
                        applyPreset(preset);
                      }}
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros principales */}
      <div className="card card-custom gutter-b mb-6">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label text-dark font-weight-bolder">
              <FilterList className="mr-2" />
              Filtros Principales
            </h3>
          </div>
          <div className="card-toolbar">
            <button
              className="btn btn-light btn-sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? <ExpandLess /> : <ExpandMore />}
              {showAdvanced ? "Ocultar Avanzado" : "Mostrar Avanzado"}
            </button>
          </div>
        </div>
        <div className="card-body">
          <Formik
            initialValues={values}
            validate={(values) => {
              const errors = {};
              if (!values.idCurrency) {
                errors.idCurrency = "La moneda es requerida";
              }
              if (!values.idEntity) {
                errors.idEntity = "La entidad es requerida";
              }
              return errors;
            }}
          >
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
              <Form className="form-label-right">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label font-weight-bold">
                        <MonetizationOn className="mr-2" />
                        Moneda
                      </label>
                      <GeneralSelector
                        values={values}
                        valueName="idCurrency"
                        keyName="currency"
                        label=""
                        data={currencies}
                        setFieldValue={setFieldValue}
                        insideOnchange={(e) => {
                          const newValues = {
                            ...values,
                            idCurrency: e.target.value,
                          };
                          setValues(newValues);
                          handleSubmit();
                        }}
                      />
                      {errors.idCurrency && touched.idCurrency && (
                        <div className="text-danger font-size-sm mt-1">
                          {errors.idCurrency}
                        </div>
                      )}
                      <div className="form-text">
                        Selecciona la moneda para mostrar los valores
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label font-weight-bold">
                        <Business className="mr-2" />
                        Entidad
                      </label>
                      <GeneralSelector
                        values={values}
                        valueName="idEntity"
                        keyName="entity"
                        label=""
                        data={entities}
                        setFieldValue={setFieldValue}
                        insideOnchange={(e) => {
                          const newValues = {
                            ...values,
                            idEntity: e.target.value,
                          };
                          setValues(newValues);
                          handleSubmit();
                        }}
                      />
                      {errors.idEntity && touched.idEntity && (
                        <div className="text-danger font-size-sm mt-1">
                          {errors.idEntity}
                        </div>
                      )}
                      <div className="form-text">
                        Selecciona la entidad financiera
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtros avanzados */}
                {showAdvanced && (
                  <div className="mt-6 pt-6 border-top">
                    <h4 className="text-dark font-weight-bolder mb-4">
                      <Tune className="mr-2" />
                      Filtros Avanzados
                    </h4>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label font-weight-bold">
                            <CalendarToday className="mr-2" />
                            Período de Análisis
                          </label>
                          <select className="form-control form-control-lg">
                            <option>Últimos 30 días</option>
                            <option>Últimos 90 días</option>
                            <option>Último año</option>
                            <option>Personalizado</option>
                          </select>
                          <div className="form-text">
                            Define el período de tiempo para el análisis
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label font-weight-bold">
                            <TrendingUp className="mr-2" />
                            Tipo de Transacción
                          </label>
                          <select className="form-control form-control-lg">
                            <option>Todas las transacciones</option>
                            <option>Solo ingresos</option>
                            <option>Solo egresos</option>
                            <option>Transferencias</option>
                          </select>
                          <div className="form-text">
                            Filtra por tipo de transacción
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label font-weight-bold">
                            <Group className="mr-2" />
                            Segmento de Clientes
                          </label>
                          <select className="form-control form-control-lg">
                            <option>Todos los clientes</option>
                            <option>Clientes activos</option>
                            <option>Clientes nuevos</option>
                            <option>Clientes premium</option>
                          </select>
                          <div className="form-text">
                            Filtra por segmento de clientes
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label font-weight-bold">
                            <ShowChart className="mr-2" />
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
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Información de ayuda */}
      <div className="card card-custom gutter-b bg-light-info">
        <div className="card-body p-4">
          <div className="d-flex align-items-center">
            <div className="symbol symbol-40 symbol-light-info mr-4">
              <span className="symbol-label bg-white">
                <Info style={{ fontSize: 20, color: "#3699FF" }} />
              </span>
            </div>
            <div>
              <h5 className="text-dark font-weight-bolder mb-1">
                Consejos de uso
              </h5>
              <p className="text-muted mb-0">
                Utiliza las configuraciones rápidas para aplicar filtros
                predefinidos o personaliza los filtros según tus necesidades.
                Los cambios se aplican automáticamente al seleccionar una
                opción.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
