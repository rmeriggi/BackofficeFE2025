import { AccountBalance, Close, Save } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

// Bancos disponibles (mock)
const bancosDisponibles = [
  "Banco Galicia",
  "Banco Nación",
  "Banco Santander",
  "Banco BBVA",
  "Banco Macro",
  "Banco Patagonia",
  "Banco Credicoop",
  "Banco Supervielle",
];

// Esquema de validación
const ConciliacionSchema = Yup.object().shape({
  fecha: Yup.string().required("La fecha es requerida"),
  banco: Yup.string().required("El banco es requerido"),
  cuentaBancaria: Yup.string()
    .required("La cuenta bancaria es requerida")
    .min(10, "La cuenta debe tener al menos 10 dígitos"),
  saldoLibro: Yup.number()
    .required("El saldo del libro es requerido")
    .min(0, "El saldo no puede ser negativo"),
  saldoBanco: Yup.number()
    .required("El saldo del banco es requerido")
    .min(0, "El saldo no puede ser negativo"),
  observaciones: Yup.string().max(
    500,
    "Las observaciones no pueden exceder 500 caracteres"
  ),
});

// Valores iniciales
const initialValues = {
  fecha: new Date().toISOString().split("T")[0],
  banco: "",
  cuentaBancaria: "",
  saldoLibro: "",
  saldoBanco: "",
  observaciones: "",
};

export const NuevaConciliacionModal = ({ show, onHide, onSave }) => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Calcular diferencia
    const diferencia =
      parseFloat(values.saldoLibro) - parseFloat(values.saldoBanco);

    // Determinar estado basado en la diferencia
    let estado = "Pendiente";
    if (diferencia === 0) {
      estado = "Completada";
    } else if (Math.abs(diferencia) > 1000) {
      estado = "Con Diferencias";
    }

    const nuevaConciliacion = {
      ...values,
      saldoLibro: parseFloat(values.saldoLibro),
      saldoBanco: parseFloat(values.saldoBanco),
      diferencia,
      estado,
    };

    onSave(nuevaConciliacion);
    resetForm();
    setSubmitting(false);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={ConciliacionSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <Modal.Header className="bg-primary">
              <Modal.Title className="text-white d-flex align-items-center">
                <AccountBalance className="mr-2" />
                Nueva Conciliación Bancaria
              </Modal.Title>
              <button
                type="button"
                className="btn btn-icon btn-light btn-sm"
                onClick={onHide}
                disabled={isSubmitting}
              >
                <Close />
              </button>
            </Modal.Header>

            <Modal.Body className="px-8 py-6">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="text-dark font-weight-bold">
                      Fecha <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="date"
                      name="fecha"
                      className={`form-control form-control-solid ${
                        errors.fecha && touched.fecha ? "is-invalid" : ""
                      }`}
                    />
                    {errors.fecha && touched.fecha && (
                      <div className="invalid-feedback">{errors.fecha}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="text-dark font-weight-bold">
                      Banco <span className="text-danger">*</span>
                    </label>
                    <Field
                      as="select"
                      name="banco"
                      className={`form-control form-control-solid ${
                        errors.banco && touched.banco ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Seleccione un banco</option>
                      {bancosDisponibles.map((banco) => (
                        <option key={banco} value={banco}>
                          {banco}
                        </option>
                      ))}
                    </Field>
                    {errors.banco && touched.banco && (
                      <div className="invalid-feedback">{errors.banco}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="text-dark font-weight-bold">
                      Cuenta Bancaria <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      name="cuentaBancaria"
                      placeholder="Ingrese el número de cuenta bancaria"
                      className={`form-control form-control-solid ${
                        errors.cuentaBancaria && touched.cuentaBancaria
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {errors.cuentaBancaria && touched.cuentaBancaria && (
                      <div className="invalid-feedback">
                        {errors.cuentaBancaria}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="text-dark font-weight-bold">
                      Saldo en Libro <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <Field
                        type="number"
                        name="saldoLibro"
                        step="0.01"
                        placeholder="0.00"
                        className={`form-control form-control-solid ${
                          errors.saldoLibro && touched.saldoLibro
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {errors.saldoLibro && touched.saldoLibro && (
                        <div className="invalid-feedback">
                          {errors.saldoLibro}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="text-dark font-weight-bold">
                      Saldo en Banco <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <Field
                        type="number"
                        name="saldoBanco"
                        step="0.01"
                        placeholder="0.00"
                        className={`form-control form-control-solid ${
                          errors.saldoBanco && touched.saldoBanco
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {errors.saldoBanco && touched.saldoBanco && (
                        <div className="invalid-feedback">
                          {errors.saldoBanco}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mostrar diferencia calculada */}
              {values.saldoLibro && values.saldoBanco && (
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-light-info">
                      <div className="d-flex align-items-center">
                        <div className="mr-3">
                          <i className="fas fa-calculator text-info fa-2x"></i>
                        </div>
                        <div>
                          <h4 className="text-info font-weight-bold mb-1">
                            Diferencia Calculada
                          </h4>
                          <p className="text-dark font-weight-bold mb-0">
                            {(() => {
                              const diferencia =
                                parseFloat(values.saldoLibro) -
                                parseFloat(values.saldoBanco);
                              return new Intl.NumberFormat("es-AR", {
                                style: "currency",
                                currency: "ARS",
                              }).format(diferencia);
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="text-dark font-weight-bold">
                      Observaciones
                    </label>
                    <Field
                      as="textarea"
                      name="observaciones"
                      rows="3"
                      placeholder="Ingrese observaciones sobre la conciliación (opcional)"
                      className={`form-control form-control-solid ${
                        errors.observaciones && touched.observaciones
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {errors.observaciones && touched.observaciones && (
                      <div className="invalid-feedback">
                        {errors.observaciones}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="border-top-0 pt-0">
              <button
                type="button"
                className="btn btn-light-secondary font-weight-bold"
                onClick={onHide}
                disabled={isSubmitting}
              >
                <Close className="mr-2" />
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2" />
                    Guardar Conciliación
                  </>
                )}
              </button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
