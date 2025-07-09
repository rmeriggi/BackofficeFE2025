import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { createRelacion } from "../../../../_redux/patronosRelaciones/relacionesActions";
import { useFetchClients, useFetchPatronos } from "../../../../hooks";

const AsociarPatronoSchema = Yup.object().shape({
  patronoId: Yup.string().required("El patrono es requerido"),
  clienteId: Yup.string().required("El cliente es requerido"),
});

const AsociarPatronoForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [patronos, patronosLoading] = useFetchPatronos();
  const [clientes, clientesLoading] = useFetchClients();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  if (patronosLoading || clientesLoading) {
    return <LayoutSplashScreen />;
  }

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      setIsSubmitting(true);
      setSuccessMessage("");

      await dispatch(createRelacion(values.patronoId, values.clienteId));

      // Buscar nombres para el mensaje de éxito
      const patrono = patronos?.find((p) => p.id === values.patronoId);
      const cliente = clientes?.find((c) => c.id === values.clienteId);

      setSuccessMessage(
        `Relación creada exitosamente entre ${patrono?.nombre ||
          "Patrono"} y ${cliente?.name || "Cliente"} ${cliente?.lastName || ""}`
      );

      resetForm();
      if (onSuccess) {
        onSuccess();
      }

      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error al asociar patrono:", error);

      if (error.response?.status === 400) {
        setFieldError(
          "general",
          "Los parámetros proporcionados no son válidos"
        );
      } else if (error.response?.data?.error) {
        setFieldError("general", error.response.data.error);
      } else {
        setFieldError(
          "general",
          "Error al asociar patrono con cliente. Inténtalo de nuevo."
        );
      }
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="card card-custom">
      <div className="card-header">
        <div className="card-title">
          <h3 className="card-label">Asociar Patrono con Cliente</h3>
        </div>
      </div>
      <div className="card-body">
        {successMessage && (
          <div className="alert alert-success mb-5" role="alert">
            <div className="alert-text">
              <strong>¡Éxito!</strong> {successMessage}
            </div>
          </div>
        )}

        <Formik
          initialValues={{
            patronoId: "",
            clienteId: "",
          }}
          validationSchema={AsociarPatronoSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting: formikSubmitting, errors }) => (
            <Form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="patronoId">Patrono *</label>
                    <Field
                      as="select"
                      name="patronoId"
                      className={`form-control ${
                        errors.patronoId ? "is-invalid" : ""
                      }`}
                      disabled={isSubmitting || formikSubmitting}
                    >
                      <option value="">Seleccionar patrono...</option>
                      {patronos?.map((patrono) => (
                        <option key={patrono.id} value={patrono.id}>
                          {patrono.nombre} - {patrono.codigo}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="patronoId"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="clienteId">Cliente *</label>
                    <Field
                      as="select"
                      name="clienteId"
                      className={`form-control ${
                        errors.clienteId ? "is-invalid" : ""
                      }`}
                      disabled={isSubmitting || formikSubmitting}
                    >
                      <option value="">Seleccionar cliente...</option>
                      {clientes?.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.name} {cliente.lastName} - {cliente.account}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="clienteId"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
              </div>

              {errors.general && (
                <div className="alert alert-danger mt-3" role="alert">
                  <div className="alert-text">
                    <strong>Error:</strong> {errors.general}
                  </div>
                </div>
              )}

              <div className="form-group text-right">
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold"
                  disabled={isSubmitting || formikSubmitting}
                >
                  {isSubmitting || formikSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm mr-2"></span>
                      Asociando...
                    </>
                  ) : (
                    "Asociar Patrono"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AsociarPatronoForm;
