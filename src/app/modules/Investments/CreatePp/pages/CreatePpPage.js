import React, { useState } from "react";
import {
  ArrowBack,
  Search,
  FilterList,
  AccountBalance,
  Person,
  MonetizationOn,
  Event,
  TrendingUp,
  CheckCircle,
  Cancel,
  Autorenew,
  AttachMoney,
  FlashOn,
  Lock,
  MoreVert,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const CreatePpPage = () => {
  const history = useHistory();
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const plazosFijos = [
    {
      id: 1001,
      cliente: "María González",
      producto: "Tradicional",
      monto: 150000,
      moneda: "$",
      fechaInicio: "2023-05-15",
      fechaVencimiento: "2023-11-15",
      tasa: 30,
      interes: 22500,
      estado: "activo",
      renovacion: "automática",
    },
    {
      id: 1002,
      cliente: "Carlos Rodríguez",
      producto: "Digital / Express",
      monto: 50000,
      moneda: "USD",
      fechaInicio: "2023-06-01",
      fechaVencimiento: "2023-09-01",
      tasa: 27,
      interes: 3375,
      estado: "activo",
      renovacion: "manual",
    },
    {
      id: 1003,
      cliente: "Laura Martínez",
      producto: "Pago periódico de interés",
      monto: 300000,
      moneda: "$",
      fechaInicio: "2023-04-10",
      fechaVencimiento: "2024-04-10",
      tasa: 29,
      interes: 87000,
      estado: "activo",
      renovacion: "automática",
    },
    {
      id: 1004,
      cliente: "Jorge Sánchez",
      producto: "Cancelación Anticipada",
      monto: 75000,
      moneda: "$",
      fechaInicio: "2023-03-22",
      fechaVencimiento: "2023-09-22",
      tasa: 28,
      interes: 15750,
      estado: "finalizado",
      renovacion: "no aplica",
    },
    {
      id: 1005,
      cliente: "Ana Fernández",
      producto: "Colateral / Garantía",
      monto: 200000,
      moneda: "$",
      fechaInicio: "2023-07-05",
      fechaVencimiento: "2024-01-05",
      tasa: 28.5,
      interes: 28500,
      estado: "activo",
      renovacion: "automática",
    },
    {
      id: 1006,
      cliente: "Pedro López",
      producto: "Escalonado (Laddered)",
      monto: 450000,
      moneda: "$",
      fechaInicio: "2023-05-30",
      fechaVencimiento: "2024-05-30",
      tasa: 32,
      interes: 144000,
      estado: "activo",
      renovacion: "automática",
    },
    {
      id: 1007,
      cliente: "Sofía Ramírez",
      producto: "Renovable automáticamente",
      monto: 125000,
      moneda: "USD",
      fechaInicio: "2023-06-15",
      fechaVencimiento: "2023-09-15",
      tasa: 31,
      interes: 9687.5,
      estado: "activo",
      renovacion: "automática",
    },
    {
      id: 1008,
      cliente: "Miguel Torres",
      producto: "Tradicional",
      monto: 90000,
      moneda: "$",
      fechaInicio: "2023-02-10",
      fechaVencimiento: "2023-08-10",
      tasa: 30,
      interes: 13500,
      estado: "finalizado",
      renovacion: "no aplica",
    },
  ];

  const plazosFiltrados = plazosFijos.filter((pf) => {
    const coincideEstado =
      filtroActivo === "todos" ||
      (filtroActivo === "activos" && pf.estado === "activo") ||
      (filtroActivo === "finalizados" && pf.estado === "finalizado");

    const coincideBusqueda =
      pf.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      pf.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
      pf.id.toString().includes(busqueda);

    return coincideEstado && coincideBusqueda;
  });

  // Calcular totales
  const totalActivos = plazosFijos.filter((pf) => pf.estado === "activo")
    .length;
  const totalFinalizados = plazosFijos.filter(
    (pf) => pf.estado === "finalizado"
  ).length;
  const totalInversion = plazosFijos.reduce((sum, pf) => sum + pf.monto, 0);
  const totalInteres = plazosFijos.reduce((sum, pf) => sum + pf.interes, 0);

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <ArrowBack
                  className="mr-2 cursor-pointer"
                  onClick={() => window.history.back()}
                />
                <span className="text-dark font-weight-bolder">
                  Plazos Fijos Contratados
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Gestión de todos los plazos fijos activos y finalizados
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                {/*   <FileDownload className="mr-2" /> */}
                Exportar
              </button>
              <button
                onClick={() => history.push("/investments/newpp/create")}
                className="btn btn-primary font-weight-bold"
              >
                Nuevo Plazo Fijo
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas y filtros */}
        <div className="card-body bg-light-info pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-info mr-4">
                <span className="symbol-label bg-white">
                  <AccountBalance style={{ fontSize: 24, color: "#8950FC" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Total Activos
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalActivos}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-success mr-4">
                <span className="symbol-label bg-white">
                  <CheckCircle style={{ fontSize: 24, color: "#1BC5BD" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Total Finalizados
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalFinalizados}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <MonetizationOn style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Inversión Total
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  ${totalInversion.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <TrendingUp style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Interés Generado
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  ${totalInteres.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center flex-wrap">
            {/* Filtros */}
            <div className="d-flex align-items-center mr-10 mb-4">
              <span className="text-dark font-weight-bold mr-4">
                Filtrar por:
              </span>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filtroActivo === "todos" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("todos")}
                >
                  <input type="radio" name="options" /> Todos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filtroActivo === "activos" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("activos")}
                >
                  <input type="radio" name="options" /> Activos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filtroActivo === "finalizados" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("finalizados")}
                >
                  <input type="radio" name="options" /> Finalizados
                </label>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar cliente, producto o ID..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <span>
                  <Search style={{ color: "#7E8299" }} />
                </span>
              </div>
            </div>

            <button className="btn btn-light btn-icon mb-4">
              <FilterList />
            </button>
          </div>
        </div>
      </div>

      {/* Listado de plazos fijos */}
      <div className="row">
        {plazosFiltrados.map((pf) => (
          <div
            key={pf.id}
            className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
          >
            <div
              className={`card card-custom gutter-b shadow-sm ${
                pf.estado === "activo"
                  ? "border-left-primary"
                  : "border-left-success"
              }`}
              style={{ borderLeftWidth: "4px" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50 symbol-light mr-5">
                      <span className="symbol-label">
                        {pf.producto === "Tradicional" && (
                          <AccountBalance
                            style={{ fontSize: 30, color: "#3699FF" }}
                          />
                        )}
                        {pf.producto === "Digital / Express" && (
                          <FlashOn style={{ fontSize: 30, color: "#8950FC" }} />
                        )}
                        {pf.producto === "Pago periódico de interés" && (
                          <AttachMoney
                            style={{ fontSize: 30, color: "#FFA800" }}
                          />
                        )}
                        {pf.producto === "Cancelación Anticipada" && (
                          <Cancel style={{ fontSize: 30, color: "#F64E60" }} />
                        )}
                        {pf.producto === "Colateral / Garantía" && (
                          <Lock style={{ fontSize: 30, color: "#6993FF" }} />
                        )}
                        {pf.producto === "Escalonado (Laddered)" && (
                          <TrendingUp
                            style={{ fontSize: 30, color: "#1BC5BD" }}
                          />
                        )}
                        {pf.producto === "Renovable automáticamente" && (
                          <Autorenew
                            style={{ fontSize: 30, color: "#0BB783" }}
                          />
                        )}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-dark font-weight-bolder mb-0">
                        {pf.producto}
                      </h4>
                      <span className="text-muted font-weight-bold">
                        ID: {pf.id}
                      </span>
                    </div>
                  </div>

                  <div className="dropdown dropdown-inline">
                    <button
                      className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <MoreVert style={{ color: "#B5B5C3" }} />
                    </button>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                      <ul className="navi navi-hover">
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <span className="navi-text">Ver detalles</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <span className="navi-text">Renovar</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <span className="navi-text">Cancelar</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <span className="navi-text">
                              Exportar certificado
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="d-flex align-items-center mr-10">
                    <Person className="mr-2" style={{ color: "#7E8299" }} />
                    <span className="text-dark font-weight-bolder">
                      {pf.cliente}
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <Event className="mr-2" style={{ color: "#7E8299" }} />
                    <span className="text-dark font-weight-bolder">
                      {new Date(pf.fechaVencimiento).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="text-muted font-weight-bold mb-1">
                        Monto Invertido
                      </span>
                      <span className="text-dark font-weight-bolder font-size-h5">
                        {pf.moneda} {pf.monto.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="text-muted font-weight-bold mb-1">
                        Interés Generado
                      </span>
                      <span className="text-success font-weight-bolder font-size-h5">
                        {pf.moneda} {pf.interes.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span
                      className={`label label-lg label-inline ${
                        pf.estado === "activo"
                          ? "label-light-primary"
                          : "label-light-success"
                      }`}
                    >
                      {pf.estado === "activo" ? (
                        <span className="d-flex align-items-center">
                          <div
                            className="bg-primary mr-2 rounded-circle"
                            style={{ width: 8, height: 8 }}
                          ></div>
                          Activo
                        </span>
                      ) : (
                        <span className="d-flex align-items-center">
                          <div
                            className="bg-success mr-2 rounded-circle"
                            style={{ width: 8, height: 8 }}
                          ></div>
                          Finalizado
                        </span>
                      )}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted font-weight-bold mr-2">
                      Tasa:
                    </span>
                    <span className="text-dark font-weight-bolder">
                      {pf.tasa}% TNA
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                <button className="btn btn-light-primary font-weight-bold">
                  Ver detalle completo
                </button>
                <button
                  className={`btn ${
                    pf.estado === "activo"
                      ? "btn-light-danger"
                      : "btn-light-success"
                  } font-weight-bold`}
                >
                  {pf.estado === "activo" ? "Cancelar" : "Renovar"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sin resultados */}
      {plazosFiltrados.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setBusqueda("");
                setFiltroActivo("todos");
              }}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePpPage;
