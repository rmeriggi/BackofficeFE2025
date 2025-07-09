import { Group, Link, PersonAdd } from "@material-ui/icons";
import React, { useState } from "react";
import AsociarPatronoForm from "../components/AsociarPatronoForm";
import RelacionesListado from "../components/RelacionesListado";

const PatronosAsocPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAssociationSuccess = () => {
    // Trigger refresh of the relations list
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
              Asociaciones Patrono - Cliente
            </h1>
            <p className="text-white-75 font-size-lg mb-0">
              Gestión de relaciones entre patronos y clientes
            </p>
          </div>
          <div className="d-flex align-items-center">
            <div className="symbol symbol-60 symbol-light-primary mr-4">
              <span className="symbol-label">
                <Link style={{ fontSize: 30, color: "#3699FF" }} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="card card-custom gutter-b mb-8">
        <div className="card-body py-4 px-8">
          <div className="d-flex align-items-center">
            <Group className="mr-2" style={{ color: "#7E8299" }} />
            <span className="text-muted font-weight-bold">
              Clientes &gt; Patronos &gt; Asociaciones
            </span>
          </div>
        </div>
      </div>

      {/* Formulario de asociación */}
      <div className="mb-8">
        <AsociarPatronoForm onSuccess={handleAssociationSuccess} />
      </div>

      {/* Divider */}
      <div className="separator separator-dashed my-8"></div>

      {/* Listado de relaciones */}
      <div className="mb-8">
        <RelacionesListado refreshTrigger={refreshTrigger} />
      </div>

      {/* Información adicional */}
      <div className="card card-custom">
        <div className="card-body">
          <div className="alert alert-custom alert-light-info" role="alert">
            <div className="alert-icon">
              <PersonAdd style={{ color: "#3699FF" }} />
            </div>
            <div className="alert-text">
              <h4 className="alert-heading">Información</h4>
              <p className="mb-0">
                Esta pantalla permite asociar patronos (empleadores) con sus
                clientes (empleados). Una vez asociados, podrás gestionar las
                relaciones desde el listado inferior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatronosAsocPage;
