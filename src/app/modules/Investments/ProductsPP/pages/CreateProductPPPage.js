import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ArrowBack,
  Save,
  Description,
  CalendarToday,
  MonetizationOn,
  Timeline,
  AccountBalance,
  Settings,
  Lock,
  Business,
  Public,
  CheckCircle,
  AttachMoney,
  AccessTime,
  TrendingUp,
  AccountTree,
  Cancel,
  Info,
} from "@material-ui/icons";

const CreateProductPPPage = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    IDEntidad: "",
    IDPais: "",
    Producto: "",
    Fecha: new Date().toISOString().split("T")[0],
    Vencimiento: "",
    IDMoneda: "",
    TopeDeposito: "",
    Plazo: "",
    TMF: "",
    TMA: "",
    TNA: "",
    CFT: "",
    CupoCliente: "",
    Montomin: "",
    Montomax: "",
    Estado: 1,
    Tipo: "",
    C_Cuenta: "",
    C_SubCuenta: "",
    C_Auxiliar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Aquí iría la lógica para guardar en la base de datos
  };

  return (
    <div className="container-fluid">
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
                  Crear Nuevo Producto de Plazo Fijo
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Complete todos los campos para registrar un nuevo producto de
                inversión
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <button
              className="btn btn-secondary font-weight-bold d-flex align-items-center mr-2"
              onClick={() => history.goBack()}
            >
              <ArrowBack className="mr-2" />
              Volver
            </button>
            <button
              className="btn btn-primary font-weight-bold d-flex align-items-center"
              form="plazoFijoForm"
              type="submit"
            >
              <Save className="mr-2" />
              Guardar Producto
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <form id="plazoFijoForm" onSubmit={handleSubmit}>
            {/* Sección 1: Información básica */}
            <div className="card card-custom gutter-b">
              <div className="card-header bg-light-primary">
                <div className="card-title">
                  <h3 className="card-label text-primary">
                    <Description className="mr-2" />
                    Información Básica
                  </h3>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Entidad Financiera</label>
                      <div className="input-icon input-icon-right">
                        <Business className="input-icon-lg" />
                        <select
                          className="form-control form-control-solid"
                          name="IDEntidad"
                          value={formData.IDEntidad}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione una entidad</option>
                          <option value="1">Banco Nacional</option>
                          <option value="2">Banco Comercial</option>
                          <option value="3">Financiera Global</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>País</label>
                      <div className="input-icon input-icon-right">
                        <Public className="input-icon-lg" />
                        <select
                          className="form-control form-control-solid"
                          name="IDPais"
                          value={formData.IDPais}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione un país</option>
                          <option value="1">Argentina</option>
                          <option value="2">Uruguay</option>
                          <option value="3">Chile</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Nombre del Producto</label>
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Ej: Plazo Fijo Premium"
                    name="Producto"
                    value={formData.Producto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Fecha de Creación</label>
                      <div className="input-icon input-icon-right">
                        <CalendarToday className="input-icon-lg" />
                        <input
                          type="date"
                          className="form-control form-control-solid"
                          name="Fecha"
                          value={formData.Fecha}
                          onChange={handleChange}
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
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 2: Configuración financiera */}
            <div className="card card-custom gutter-b">
              <div className="card-header bg-light-success">
                <div className="card-title">
                  <h3 className="card-label text-success">
                    <MonetizationOn className="mr-2" />
                    Configuración Financiera
                  </h3>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
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
                          <option value="1">Pesos Argentinos (ARS)</option>
                          <option value="2">
                            Dólares Estadounidenses (USD)
                          </option>
                          <option value="3">Euros (EUR)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Plazo (días)</label>
                      <div className="input-icon input-icon-right">
                        <AccessTime className="input-icon-lg" />
                        <input
                          type="number"
                          className="form-control form-control-solid"
                          placeholder="Ej: 30"
                          name="Plazo"
                          value={formData.Plazo}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tope de Depósito</label>
                      <div className="input-icon input-icon-right">
                        <Lock className="input-icon-lg" />
                        <input
                          type="number"
                          className="form-control form-control-solid"
                          placeholder="Ej: 1000000"
                          name="TopeDeposito"
                          value={formData.TopeDeposito}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Cupo por Cliente</label>
                      <div className="input-icon input-icon-right">
                        <AccountBalance className="input-icon-lg" />
                        <input
                          type="number"
                          className="form-control form-control-solid"
                          placeholder="Ej: 500000"
                          name="CupoCliente"
                          value={formData.CupoCliente}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Monto Mínimo</label>
                      <div className="input-icon input-icon-right">
                        <MonetizationOn className="input-icon-lg" />
                        <input
                          type="number"
                          className="form-control form-control-solid"
                          placeholder="Ej: 10000"
                          name="Montomin"
                          value={formData.Montomin}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Monto Máximo</label>
                      <div className="input-icon input-icon-right">
                        <MonetizationOn className="input-icon-lg" />
                        <input
                          type="number"
                          className="form-control form-control-solid"
                          placeholder="Ej: 1000000"
                          name="Montomax"
                          value={formData.Montomax}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 3: Tasas y rendimientos */}
            <div className="card card-custom gutter-b">
              <div className="card-header bg-light-warning">
                <div className="card-title">
                  <h3 className="card-label text-warning">
                    <Timeline className="mr-2" />
                    Tasas y Rendimientos
                  </h3>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tasa Mensual Fija (TMF)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          placeholder="Ej: 2.5"
                          name="TMF"
                          value={formData.TMF}
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
                      <label>Tasa Mensual Adelantada (TMA)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          placeholder="Ej: 2.3"
                          name="TMA"
                          value={formData.TMA}
                          onChange={handleChange}
                          required
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
                      <label>Tasa Nominal Anual (TNA)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          placeholder="Ej: 30.0"
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
                      <label>Costo Financiero Total (CFT)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-solid"
                          placeholder="Ej: 35.0"
                          name="CFT"
                          value={formData.CFT}
                          onChange={handleChange}
                          required
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <label>Tipo de Producto</label>
                <div className="input-icon input-icon-right">
                  <TrendingUp className="input-icon-lg" />
                  <select
                    className="form-control form-control-solid"
                    name="Tipo"
                    value={formData.Tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione tipo</option>
                    <option value="1">Tradicional</option>
                    <option value="2">Cancelación Anticipada</option>
                    <option value="3">Renovable automáticamente</option>
                    <option value="4">Pago periódico de interés</option>
                    <option value="5">Digital / Express</option>
                    <option value="6">Escalonado (Laddered)</option>
                    <option value="7">Colateral / Garantía</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Estado del Producto</label>
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

          {/* Panel de información */}
          <div className="card card-custom gutter-b">
            <div className="card-header bg-light-danger">
              <div className="card-title">
                <h3 className="card-label text-danger">
                  <Info className="mr-2" />
                  Información Importante
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-5">
                <div className="symbol symbol-40 symbol-light-danger mr-5">
                  <span className="symbol-label">
                    <Cancel fontSize="large" />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-dark font-weight-bolder font-size-h6 mb-0">
                    Campos Obligatorios
                  </span>
                  <span className="text-muted font-weight-bold">
                    Todos los campos marcados con (*) son obligatorios
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center mb-5">
                <div className="symbol symbol-40 symbol-light-success mr-5">
                  <span className="symbol-label">
                    <CheckCircle fontSize="large" />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-dark font-weight-bolder font-size-h6 mb-0">
                    Tasas Actualizadas
                  </span>
                  <span className="text-muted font-weight-bold">
                    Verifique las tasas con el área financiera
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-light-info mr-5">
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

export default CreateProductPPPage;
