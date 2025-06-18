import React, { useState } from "react";
import {
  ArrowBack,
  Save,
  Person,
  Description,
  CalendarToday,
  MonetizationOn,
  Timeline,
  AccountBalance,
  Settings,
  Lock,
  AttachMoney,
  AccessTime,
  AccountTree,
  CheckCircle,
  Cancel,
  Info,
  Note,
  Autorenew,
  Receipt,
} from "@material-ui/icons";

const CreatePp = () => {
  const [formData, setFormData] = useState({
    IDCliente: "",
    IDProductoPlazo: "",
    Fecha: new Date().toISOString().split("T")[0],
    Vencimiento: "",
    IDMoneda: "",
    Plazo: "",
    TMF: "",
    TMA: "",
    TNA: "",
    CFT: "",
    Importe: "",
    Estado: 1,
    C_Cuenta: "",
    C_SubCuenta: "",
    C_Auxiliar: "",
    InteresCalculado: "",
    RenovacionAut: false,
    TipoLiquidacion: "",
    Cancelado: false,
    FechaCancelado: "",
    Observaciones: "",
    IDuser: 1, // Asumiendo que viene del contexto de autenticación
    FechaActulizacion: new Date().toISOString().split("T")[0],
  });

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Datos de ejemplo (deberían venir de tu API)
  const clientes = [
    { ID: 1, Nombre: "María González", DNI: "30123456" },
    { ID: 2, Nombre: "Carlos Rodríguez", DNI: "32987654" },
    { ID: 3, Nombre: "Laura Martínez", DNI: "35678901" },
  ];

  const productosPlazo = [
    { ID: 1, Producto: "Tradicional", TNA: 30, PlazoMin: 30, PlazoMax: 365 },
    {
      ID: 2,
      Producto: "Digital / Express",
      TNA: 27,
      PlazoMin: 30,
      PlazoMax: 60,
    },
    {
      ID: 3,
      Producto: "Pago periódico de interés",
      TNA: 29,
      PlazoMin: 90,
      PlazoMax: 365,
    },
  ];

  const monedas = [
    { ID: 1, Moneda: "Pesos Argentinos (ARS)", Simbolo: "$" },
    { ID: 2, Moneda: "Dólares Estadounidenses (USD)", Simbolo: "US$" },
    { ID: 3, Moneda: "Euros (EUR)", Simbolo: "€" },
  ];

  const tiposLiquidacion = [
    { ID: 1, Descripcion: "Al vencimiento" },
    { ID: 2, Descripcion: "Mensual" },
    { ID: 3, Descripcion: "Trimestral" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProductoChange = (e) => {
    const productoId = e.target.value;
    const producto = productosPlazo.find((p) => p.ID === productoId);
    setProductoSeleccionado(producto);
    setFormData((prev) => ({
      ...prev,
      IDProductoPlazo: productoId,
      TNA: producto?.TNA || "",
    }));
  };

  const calcularVencimiento = (fecha, plazo) => {
    if (!fecha || !plazo) return "";
    const fechaDate = new Date(fecha);
    fechaDate.setDate(fechaDate.getDate() + parseInt(plazo));
    return fechaDate.toISOString().split("T")[0];
  };

  const handlePlazoChange = (e) => {
    const plazo = e.target.value;
    setFormData((prev) => ({
      ...prev,
      Plazo: plazo,
      Vencimiento: calcularVencimiento(prev.Fecha, plazo),
    }));
  };

  const handleFechaChange = (e) => {
    const fecha = e.target.value;
    setFormData((prev) => ({
      ...prev,
      Fecha: fecha,
      Vencimiento: calcularVencimiento(fecha, prev.Plazo),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Aquí iría la lógica para guardar en la base de datos
  };

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
                  Asignar Nuevo Plazo Fijo
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Complete todos los campos para asignar un plazo fijo a un
                cliente
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <button
              className="btn btn-primary font-weight-bold d-flex align-items-center"
              form="CreatePpForm"
              type="submit"
            >
              <Save className="mr-2" />
              Asignar Plazo Fijo
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <form id="CreatePpForm" onSubmit={handleSubmit}>
            {/* Sección 1: Información del cliente */}
            <div className="card card-custom gutter-b">
              <div className="card-header bg-light-primary">
                <div className="card-title">
                  <h3 className="card-label text-primary">
                    <Person className="mr-2" />
                    Información del Cliente
                  </h3>
                </div>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Seleccionar Cliente</label>
                  <div className="input-icon input-icon-right">
                    <Person className="input-icon-lg" />
                    <select
                      className="form-control form-control-solid"
                      name="IDCliente"
                      value={formData.IDCliente}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione un cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.ID} value={cliente.ID}>
                          {cliente.Nombre} (DNI: {cliente.DNI})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 2: Configuración del plazo fijo */}
            <div className="card card-custom gutter-b">
              <div className="card-header bg-light-success">
                <div className="card-title">
                  <h3 className="card-label text-success">
                    <AccountBalance className="mr-2" />
                    Configuración del Plazo Fijo
                  </h3>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Producto de Plazo Fijo</label>
                      <div className="input-icon input-icon-right">
                        <Description className="input-icon-lg" />
                        <select
                          className="form-control form-control-solid"
                          name="IDProductoPlazo"
                          value={formData.IDProductoPlazo}
                          onChange={handleProductoChange}
                          required
                        >
                          <option value="">Seleccione un producto</option>
                          {productosPlazo.map((producto) => (
                            <option key={producto.ID} value={producto.ID}>
                              {producto.Producto} ({producto.TNA}% TNA)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Moneda</label>
                      <div className="input-icon input-icon-right">
                        <AttachMoney className="input-icon-lg" />
                        <select
                          className="form-control form-control-solid"
                          name="IDMoneda"
                          value={formData.IDMoneda}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione moneda</option>
                          {monedas.map((moneda) => (
                            <option key={moneda.ID} value={moneda.ID}>
                              {moneda.Moneda}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Fecha de Inicio</label>
                      <div className="input-icon input-icon-right">
                        <CalendarToday className="input-icon-lg" />
                        <input
                          type="date"
                          className="form-control form-control-solid"
                          name="Fecha"
                          value={formData.Fecha}
                          onChange={handleFechaChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Fecha de Vencimiento</label>
                      <div className="input-icon input-icon-right">
                        <CalendarToday className="input-icon-lg" />
                        <input
                          type="date"
                          className="form-control form-control-solid"
                          name="Vencimiento"
                          value={formData.Vencimiento}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Plazo (días)</label>
                      <div className="input-icon input-icon-right">
                        <AccessTime className="input-icon-lg" />
                        <input
                          type="number"
                          className="form-control form-control-solid"
                          placeholder="Ingrese el plazo en días"
                          name="Plazo"
                          value={formData.Plazo}
                          onChange={handlePlazoChange}
                          min={productoSeleccionado?.PlazoMin || 1}
                          max={productoSeleccionado?.PlazoMax || 365}
                          required
                        />
                      </div>
                      {productoSeleccionado && (
                        <span className="text-muted font-size-sm">
                          Rango válido: {productoSeleccionado.PlazoMin} a{" "}
                          {productoSeleccionado.PlazoMax} días
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Importe</label>
                      <div className="input-icon input-icon-right">
                        <MonetizationOn className="input-icon-lg" />
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          placeholder="Ingrese el monto"
                          name="Importe"
                          value={formData.Importe}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 3: Tasas y liquidación */}
            <div className="card card-custom gutter-b">
              <div className="card-header bg-light-warning">
                <div className="card-title">
                  <h3 className="card-label text-warning">
                    <Timeline className="mr-2" />
                    Tasas y Liquidación
                  </h3>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tasa Nominal Anual (TNA)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          name="TNA"
                          value={formData.TNA}
                          onChange={handleChange}
                          required
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tipo de Liquidación</label>
                      <div className="input-icon input-icon-right">
                        <Receipt className="input-icon-lg" />
                        <select
                          className="form-control form-control-solid"
                          name="TipoLiquidacion"
                          value={formData.TipoLiquidacion}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione tipo</option>
                          {tiposLiquidacion.map((tipo) => (
                            <option key={tipo.ID} value={tipo.ID}>
                              {tipo.Descripcion}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tasa Mensual Fija (TMF)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          name="TMF"
                          value={formData.TMF}
                          onChange={handleChange}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tasa Mensual Adelantada (TMA)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          name="TMA"
                          value={formData.TMA}
                          onChange={handleChange}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Costo Financiero Total (CFT)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          name="CFT"
                          value={formData.CFT}
                          onChange={handleChange}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Interés Calculado</label>
                      <div className="input-icon input-icon-right">
                        <MonetizationOn className="input-icon-lg" />
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          name="InteresCalculado"
                          value={formData.InteresCalculado}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="RenovacionAut"
                      checked={formData.RenovacionAut}
                      onChange={handleChange}
                    />
                    <span></span>
                    Renovación Automática al Vencimiento
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="col-lg-4">
          {/* Sección 4: Configuración adicional */}
          <div className="card card-custom gutter-b">
            <div className="card-header bg-light-info">
              <div className="card-title">
                <h3 className="card-label text-info">
                  <Settings className="mr-2" />
                  Configuración Adicional
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Estado del Plazo Fijo</label>
                <div className="input-icon input-icon-right">
                  <CheckCircle className="input-icon-lg" />
                  <select
                    className="form-control form-control-solid"
                    name="Estado"
                    value={formData.Estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="Cancelado"
                    checked={formData.Cancelado}
                    onChange={handleChange}
                  />
                  <span></span>
                  Cancelado
                </label>
              </div>

              {formData.Cancelado && (
                <div className="form-group">
                  <label>Fecha de Cancelación</label>
                  <div className="input-icon input-icon-right">
                    <Cancel className="input-icon-lg" />
                    <input
                      type="date"
                      className="form-control form-control-solid"
                      name="FechaCancelado"
                      value={formData.FechaCancelado}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="separator separator-dashed my-5"></div>

              <h4 className="text-dark font-weight-bolder mb-4">
                Configuración Contable
              </h4>

              <div className="form-group">
                <label>Cuenta Contable</label>
                <div className="input-icon input-icon-right">
                  <AccountTree className="input-icon-lg" />
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Código de cuenta"
                    name="C_Cuenta"
                    value={formData.C_Cuenta}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subcuenta Contable</label>
                <div className="input-icon input-icon-right">
                  <AccountTree className="input-icon-lg" />
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Código de subcuenta"
                    name="C_SubCuenta"
                    value={formData.C_SubCuenta}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Auxiliar Contable</label>
                <div className="input-icon input-icon-right">
                  <AccountTree className="input-icon-lg" />
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Código de auxiliar"
                    name="C_Auxiliar"
                    value={formData.C_Auxiliar}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sección 5: Observaciones */}
          <div className="card card-custom gutter-b">
            <div className="card-header bg-light-danger">
              <div className="card-title">
                <h3 className="card-label text-danger">
                  <Note className="mr-2" />
                  Observaciones
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <textarea
                  className="form-control form-control-solid"
                  rows="5"
                  placeholder="Ingrese cualquier observación relevante sobre este plazo fijo..."
                  name="Observaciones"
                  value={formData.Observaciones}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Panel de información */}
          <div className="card card-custom">
            <div className="card-header bg-light-success">
              <div className="card-title">
                <h3 className="card-label text-success">
                  <Info className="mr-2" />
                  Información Importante
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-5">
                <div className="symbol symbol-40 symbol-light-primary mr-5">
                  <span className="symbol-label">
                    <Autorenew fontSize="large" />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-dark font-weight-bolder font-size-h6 mb-0">
                    Renovación Automática
                  </span>
                  <span className="text-muted font-weight-bold">
                    Si se activa, el plazo fijo se renovará automáticamente al
                    vencimiento
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center mb-5">
                <div className="symbol symbol-40 symbol-light-warning mr-5">
                  <span className="symbol-label">
                    <MonetizationOn fontSize="large" />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-dark font-weight-bolder font-size-h6 mb-0">
                    Tasas Actualizadas
                  </span>
                  <span className="text-muted font-weight-bold">
                    Verifique las tasas con el área financiera antes de asignar
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-light-danger mr-5">
                  <span className="symbol-label">
                    <Lock fontSize="large" />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-dark font-weight-bolder font-size-h6 mb-0">
                    Seguridad de Datos
                  </span>
                  <span className="text-muted font-weight-bold">
                    Toda la información se encripta antes de guardar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePp;
