import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

// Componente para los botones del header
const HeaderButtons = ({ onBack }) => {
  const { submitForm, isSubmitting } = useFormikContext();

  return (
    <div className="d-flex align-items-center justify-content-between w-100">
      <h3 className="card-title mb-0">
        Editar parámetros por defecto de tarjetas
      </h3>
      <div className="d-flex align-items-center">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-secondary mr-2"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={submitForm}
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar Configuración"}
        </button>
      </div>
    </div>
  );
};

const CardEditForm = () => {
  const history = useHistory();

  const initialValues = {
    producto: "",
    brand: "",
    tipoTarjeta: "",
    limiteCompra: "",
    limiteCuotas: "",
    limiteEfectivo: "",
    limiteCajeroPropio: "",
    limiteCajeroExt: "",
    tna: "",
    cft: "",
    tem: "",
    tasaPunitorios: "",
    tasaRefinanciacion: "",
    habilitaOnline: false,
    habilitaExterior: false,
    habilitaCajero: false,
    habilitaWallet: false,
    diaCierre: "",
    diaVencimiento: "",
    minimoPago: "",
  };

  const validationSchema = Yup.object({
    producto: Yup.string().required("Requerido"),
    brand: Yup.string().required("Requerido"),
    tipoTarjeta: Yup.string().required("Requerido"),
    limiteCompra: Yup.number()
      .required("Requerido")
      .min(0),
    limiteCuotas: Yup.number()
      .required("Requerido")
      .min(0),
    limiteEfectivo: Yup.number()
      .required("Requerido")
      .min(0),
    limiteCajeroPropio: Yup.number()
      .required("Requerido")
      .min(0),
    limiteCajeroExt: Yup.number()
      .required("Requerido")
      .min(0),
    tna: Yup.number()
      .required("Requerido")
      .min(0),
    cft: Yup.number()
      .required("Requerido")
      .min(0),
    tem: Yup.number()
      .required("Requerido")
      .min(0),
    tasaPunitorios: Yup.number()
      .required("Requerido")
      .min(0),
    tasaRefinanciacion: Yup.number()
      .required("Requerido")
      .min(0),
    diaCierre: Yup.number()
      .required("Requerido")
      .min(1)
      .max(31),
    diaVencimiento: Yup.number()
      .required("Requerido")
      .min(1)
      .max(31),
    minimoPago: Yup.number()
      .required("Requerido")
      .min(0)
      .max(100),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí iría la lógica para guardar los datos
    console.log("Datos guardados:", values);

    // Simulamos un retardo de guardado
    setTimeout(() => {
      setSubmitting(false);
      // Redirigir después de guardar (opcional)
      // history.push("/ruta-destino");
    }, 1000);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="container-fluid mt-5">
      <div className="card card-custom gutter-b">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <>
              <div className="card-header">
                <HeaderButtons onBack={handleBack} />
              </div>

              <Form className="card-body">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Brand</label>
                    <Field as="select" name="brand" className="form-control">
                      <option value="">Seleccionar</option>
                      <option value="VISA">VISA</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="AMEX">AMEX</option>
                    </Field>
                    <ErrorMessage
                      name="brand"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Tipo de Tarjeta</label>
                    <Field
                      as="select"
                      name="tipoTarjeta"
                      className="form-control"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Credito">Crédito</option>
                      <option value="Debito">Débito</option>
                      <option value="Prepagada">Prepagada</option>
                    </Field>
                    <ErrorMessage
                      name="tipoTarjeta"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>

                {/* Límites */}
                <h5 className="mt-5 mb-4">Límites</h5>
                <div className="form-row">
                  {["limiteCompra", "limiteCuotas", "limiteEfectivo"].map(
                    (field) => (
                      <div key={field} className="form-group col-md-4">
                        <label>{field.replace("limite", "Límite ")}</label>
                        <Field
                          type="number"
                          name={field}
                          className="form-control"
                        />
                        <ErrorMessage
                          name={field}
                          component="div"
                          className="text-danger small"
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Límite Cajero Propio</label>
                    <Field
                      type="number"
                      name="limiteCajeroPropio"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="limiteCajeroPropio"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Límite Cajero Externo</label>
                    <Field
                      type="number"
                      name="limiteCajeroExt"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="limiteCajeroExt"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>

                {/* Tasas */}
                <h5 className="mt-5 mb-4">Tasas</h5>
                <div className="form-row">
                  {[
                    "tna",
                    "cft",
                    "tem",
                    "tasaPunitorios",
                    "tasaRefinanciacion",
                  ].map((field) => (
                    <div key={field} className="form-group col-md-2">
                      <label>
                        {field === "tna"
                          ? "TNA"
                          : field === "cft"
                          ? "CFT"
                          : field === "tem"
                          ? "TEM"
                          : field === "tasaPunitorios"
                          ? "Punitorios"
                          : "Refinanciación"}
                      </label>
                      <Field
                        type="number"
                        name={field}
                        className="form-control"
                        step="0.01"
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                  ))}
                </div>

                {/* Seguridad */}
                <h5 className="mt-5 mb-4">Seguridad y Flags</h5>
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="habilitaOnline"
                    className="form-check-input"
                    id="habilitaOnline"
                  />
                  <label className="form-check-label" htmlFor="habilitaOnline">
                    Habilita Compra Online
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="habilitaExterior"
                    className="form-check-input"
                    id="habilitaExterior"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="habilitaExterior"
                  >
                    Habilita Compra Exterior
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="habilitaCajero"
                    className="form-check-input"
                    id="habilitaCajero"
                  />
                  <label className="form-check-label" htmlFor="habilitaCajero">
                    Habilita Retiros Cajero
                  </label>
                </div>
                <div className="form-check mb-4">
                  <Field
                    type="checkbox"
                    name="habilitaWallet"
                    className="form-check-input"
                    id="habilitaWallet"
                  />
                  <label className="form-check-label" htmlFor="habilitaWallet">
                    Permite Wallet Digital
                  </label>
                </div>

                {/* Ciclo */}
                <h5 className="mt-5 mb-4">Ciclo de Facturación</h5>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label>Día Cierre</label>
                    <Field
                      type="number"
                      name="diaCierre"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="diaCierre"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>Día Vencimiento</label>
                    <Field
                      type="number"
                      name="diaVencimiento"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="diaVencimiento"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>Mínimo de Pago (%)</label>
                    <Field
                      type="number"
                      name="minimoPago"
                      className="form-control"
                      step="0.01"
                    />
                    <ErrorMessage
                      name="minimoPago"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CardEditForm;
