import React, { useState } from "react";
import {
  Search,
  AttachMoney,
  MoneyOff,
  AccountBalanceWallet,
  AccountBalance,
  CheckCircle,
  Print,
  FilterList,
  DonutLarge,
  ShowChart,
} from "@material-ui/icons";

const CajeroFinancieroPage = () => {
  const [operacionActiva, setOperacionActiva] = useState("pago");
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [monto, setMonto] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [operacionExitosa, setOperacionExitosa] = useState(false);

  // Productos financieros disponibles
  const productosFinancieros = [
    {
      id: 5001,
      nombre: "Plazo Fijo Tradicional",
      tipo: "Plazo Fijo",
      moneda: "$",
      cliente: "María González",
      cuentaOrigen: "CA$ 1234-5678/9",
      disponible: 150000,
      vencimiento: "2023-11-15",
      tasa: 30,
      estado: "Activo",
    },
    {
      id: 5002,
      nombre: "Bono del Tesoro",
      tipo: "Renta Fija",
      moneda: "$",
      cliente: "Carlos Rodríguez",
      cuentaOrigen: "CC$ 9876-5432/1",
      disponible: 450000,
      vencimiento: "2024-05-20",
      tasa: 8.5,
      estado: "Activo",
    },
    {
      id: 5003,
      nombre: "Acciones Tech",
      tipo: "Renta Variable",
      moneda: "USD",
      cliente: "Laura Martínez",
      cuentaOrigen: "CAU$S 2468-1357/0",
      disponible: 62500,
      vencimiento: null,
      tasa: null,
      estado: "Activo",
    },
    {
      id: 5004,
      nombre: "Fondo Común de Inversión",
      tipo: "Fondos",
      moneda: "$",
      cliente: "Jorge Sánchez",
      cuentaOrigen: "CA$ 8642-7531/5",
      disponible: 290000,
      vencimiento: null,
      tasa: 12.3,
      estado: "Activo",
    },
    {
      id: 5005,
      nombre: "Cheque de Pago Diferido",
      tipo: "Renta Fija",
      moneda: "$",
      cliente: "Ana Fernández",
      cuentaOrigen: "CC$ 1593-4862/7",
      disponible: 120000,
      vencimiento: "2023-09-01",
      tasa: 0,
      estado: "Vencido",
    },
  ];

  // Filtrar productos
  const productosFiltrados = productosFinancieros.filter((producto) => {
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.id.toString().includes(busqueda) ||
      producto.cuentaOrigen.includes(busqueda);

    return coincideBusqueda;
  });

  const handleOperacion = () => {
    // Validar monto
    if (!monto || isNaN(monto) || parseFloat(monto) <= 0) {
      alert("Ingrese un monto válido");
      return;
    }

    if (
      parseFloat(monto) > productoSeleccionado.disponible &&
      operacionActiva === "cobro"
    ) {
      alert("El monto excede el disponible para cobro");
      return;
    }

    setMostrarConfirmacion(true);
  };

  const confirmarOperacion = () => {
    // Aquí iría la lógica real para registrar la operación
    console.log(`Operación de ${operacionActiva} realizada`, {
      producto: productoSeleccionado,
      monto: parseFloat(monto),
    });

    setMostrarConfirmacion(false);
    setOperacionExitosa(true);
    setTimeout(() => {
      setOperacionExitosa(false);
      setProductoSeleccionado(null);
      setMonto("");
    }, 3000);
  };

  const cancelarOperacion = () => {
    setMostrarConfirmacion(false);
  };

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <span className="text-dark font-weight-bolder">
                  Cajero de Productos Financieros
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Operaciones de cobro y pago de instrumentos financieros
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <Print className="mr-2" />
                Imprimir Reporte
              </button>
            </div>
          </div>
        </div>

        {/* Selector de operación */}
        <div className="card-body bg-light-info pt-6 pb-4 px-8">
          <div className="d-flex justify-content-center mb-6">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label
                className={`btn btn-lg ${
                  operacionActiva === "cobro"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } font-weight-bold`}
                onClick={() => setOperacionActiva("cobro")}
              >
                <AttachMoney className="mr-2" />
                Cobros
              </label>
              <label
                className={`btn btn-lg ${
                  operacionActiva === "pago"
                    ? "btn-success"
                    : "btn-outline-success"
                } font-weight-bold`}
                onClick={() => setOperacionActiva("pago")}
              >
                <MoneyOff className="mr-2" />
                Pagos
              </label>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="d-flex align-items-center">
            <div className="input-icon input-icon-right flex-grow-1 mr-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Buscar producto, cliente o cuenta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <span>
                <Search style={{ color: "#7E8299" }} />
              </span>
            </div>
            <button className="btn btn-light btn-icon">
              <FilterList />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="row">
        {/* Listado de productos */}
        <div className="col-lg-6">
          <div className="card card-custom gutter-b">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label">
                  {operacionActiva === "cobro"
                    ? "Instrumentos Disponibles para Cobro"
                    : "Instrumentos Disponibles para Pago"}
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cliente</th>
                      <th>Disponible</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosFiltrados.map((producto) => (
                      <tr key={producto.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-40 symbol-light mr-4">
                              <span className="symbol-label">
                                {producto.tipo === "Plazo Fijo" && (
                                  <AccountBalance
                                    style={{ fontSize: 20, color: "#3699FF" }}
                                  />
                                )}
                                {producto.tipo === "Renta Fija" && (
                                  <AccountBalanceWallet
                                    style={{ fontSize: 20, color: "#8950FC" }}
                                  />
                                )}
                                {producto.tipo === "Renta Variable" && (
                                  <ShowChart
                                    style={{ fontSize: 20, color: "#1BC5BD" }}
                                  />
                                )}
                                {producto.tipo === "Fondos" && (
                                  <DonutLarge
                                    style={{ fontSize: 20, color: "#FFA800" }}
                                  />
                                )}
                              </span>
                            </div>
                            <div>
                              <span className="text-dark font-weight-bolder">
                                {producto.nombre}
                              </span>
                              <span className="text-muted d-block font-size-sm">
                                {producto.tipo} | ID: {producto.id}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {producto.cliente}
                          </span>
                          <span className="text-muted d-block font-size-sm">
                            {producto.cuentaOrigen}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {producto.moneda}{" "}
                            {producto.disponible.toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-light-primary font-weight-bold"
                            onClick={() => setProductoSeleccionado(producto)}
                          >
                            Seleccionar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de operación */}
        <div className="col-lg-6">
          <div className="card card-custom gutter-b">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label">
                  {operacionActiva === "cobro" ? "Cobrar" : "Pagar"}
                </h3>
              </div>
            </div>
            <div className="card-body">
              {!productoSeleccionado ? (
                <div className="text-center py-10">
                  <div className="symbol symbol-100 symbol-light-primary mb-5">
                    <span className="symbol-label">
                      {operacionActiva === "cobro" ? (
                        <AttachMoney
                          style={{ fontSize: 50, color: "#3699FF" }}
                        />
                      ) : (
                        <MoneyOff style={{ fontSize: 50, color: "#1BC5BD" }} />
                      )}
                    </span>
                  </div>
                  <h4 className="text-dark font-weight-bolder mb-2">
                    Seleccione una operación
                  </h4>
                  <p className="text-muted font-weight-bold">
                    {operacionActiva === "cobro"
                      ? "Elija una operación de la lista para realizar el cobro"
                      : "Elija una operación de la lista para realizar el pago"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h4 className="text-dark font-weight-bolder mb-4">
                      Detalles del Instrumento
                    </h4>
                    <div className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-60 symbol-light mr-5">
                        <span className="symbol-label">
                          {productoSeleccionado.tipo === "Plazo Fijo" && (
                            <AccountBalance
                              style={{ fontSize: 30, color: "#3699FF" }}
                            />
                          )}
                          {productoSeleccionado.tipo === "Renta Fija" && (
                            <AccountBalanceWallet
                              style={{ fontSize: 30, color: "#8950FC" }}
                            />
                          )}
                          {productoSeleccionado.tipo === "Renta Variable" && (
                            <ShowChart
                              style={{ fontSize: 30, color: "#1BC5BD" }}
                            />
                          )}
                          {productoSeleccionado.tipo === "Fondos" && (
                            <DonutLarge
                              style={{ fontSize: 30, color: "#FFA800" }}
                            />
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {productoSeleccionado.nombre}
                        </span>
                        <span className="text-muted d-block font-weight-bold">
                          {productoSeleccionado.tipo} | ID:{" "}
                          {productoSeleccionado.id}
                        </span>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-6">
                        <span className="text-muted font-weight-bold">
                          Cliente:
                        </span>
                        <span className="text-dark font-weight-bolder d-block">
                          {productoSeleccionado.cliente}
                        </span>
                      </div>
                      <div className="col-6">
                        <span className="text-muted font-weight-bold">
                          Cuenta Origen:
                        </span>
                        <span className="text-dark font-weight-bolder d-block">
                          {productoSeleccionado.cuentaOrigen}
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <span className="text-muted font-weight-bold">
                          Disponible:
                        </span>
                        <span className="text-dark font-weight-bolder d-block font-size-h5">
                          {productoSeleccionado.moneda}{" "}
                          {productoSeleccionado.disponible.toLocaleString()}
                        </span>
                      </div>
                      {productoSeleccionado.vencimiento && (
                        <div className="col-6">
                          <span className="text-muted font-weight-bold">
                            Vencimiento:
                          </span>
                          <span className="text-dark font-weight-bolder d-block">
                            {new Date(
                              productoSeleccionado.vencimiento
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="separator separator-dashed my-8"></div>

                  <div className="mb-10">
                    <h4 className="text-dark font-weight-bolder mb-6">
                      {operacionActiva === "cobro"
                        ? "Detalles del Cobro"
                        : "Detalles del Pago"}
                    </h4>
                    <div className="form-group">
                      <label className="text-muted font-weight-bold">
                        Monto ({productoSeleccionado.moneda})
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-solid form-control-lg"
                        placeholder="Ingrese el monto"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                      />
                      <span className="form-text text-muted">
                        {operacionActiva === "cobro"
                          ? `Monto máximo disponible: ${
                              productoSeleccionado.moneda
                            } ${productoSeleccionado.disponible.toLocaleString()}`
                          : "Ingrese el monto a pagar"}
                      </span>
                    </div>

                    <div className="form-group">
                      <label className="text-muted font-weight-bold">
                        {operacionActiva === "cobro"
                          ? "Cuenta de Destino"
                          : "Método de Pago"}
                      </label>
                      <select className="form-control form-control-solid form-control-lg">
                        {operacionActiva === "cobro" ? (
                          <>
                            <option>Seleccione cuenta destino</option>
                            <option>CA$ 1234-5678/9 (Cuenta Corriente)</option>
                            <option>CC$ 9876-5432/1 (Caja de Ahorro)</option>
                            <option>Efectivo</option>
                          </>
                        ) : (
                          <>
                            <option>Seleccione método de pago</option>
                            <option>Efectivo</option>
                            <option>Transferencia Bancaria</option>
                            <option>Tarjeta de Crédito</option>
                            <option>Tarjeta de Débito</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="text-muted font-weight-bold">
                        Concepto
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-solid form-control-lg"
                        placeholder="Ingrese concepto"
                        defaultValue={
                          operacionActiva === "cobro"
                            ? `Cobro ${productoSeleccionado.nombre}`
                            : `Pago ${productoSeleccionado.nombre}`
                        }
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-light-danger font-weight-bold"
                      onClick={() => setProductoSeleccionado(null)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-primary font-weight-bold"
                      onClick={handleOperacion}
                    >
                      {operacionActiva === "cobro" ? "Cobrar" : "Pagar"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {mostrarConfirmacion && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Confirmar {operacionActiva === "cobro" ? "Cobro" : "Pago"}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={cancelarOperacion}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Está seguro que desea realizar el{" "}
                  {operacionActiva === "cobro" ? "cobro" : "pago"} de{" "}
                  <strong>
                    {productoSeleccionado.moneda}{" "}
                    {parseFloat(monto).toLocaleString()}
                  </strong>{" "}
                  del instrumento <strong>{productoSeleccionado.nombre}</strong>
                  ?
                </p>
                <div className="alert alert-warning">
                  <strong>Atención:</strong> Esta operación no se puede
                  deshacer.
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light-primary font-weight-bold"
                  onClick={cancelarOperacion}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary font-weight-bold"
                  onClick={confirmarOperacion}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

      {/* Notificación de operación exitosa */}
      {operacionExitosa && (
        <div
          className="alert alert-success alert-dismissible fade show position-fixed"
          style={{
            top: "20px",
            right: "20px",
            zIndex: 100,
            width: "350px",
          }}
        >
          <div className="d-flex align-items-center">
            <CheckCircle className="mr-3" style={{ fontSize: 30 }} />
            <div>
              <h4 className="alert-heading">
                {operacionActiva === "cobro" ? "Cobro" : "Pago"} exitoso
              </h4>
              <p>
                Se ha registrado correctamente el{" "}
                {operacionActiva === "cobro" ? "cobro" : "pago"} de{" "}
                <strong>
                  {productoSeleccionado.moneda}{" "}
                  {parseFloat(monto).toLocaleString()}
                </strong>
                .
              </p>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={() => setOperacionExitosa(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CajeroFinancieroPage;
