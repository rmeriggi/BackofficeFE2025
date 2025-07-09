import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { createPatrono } from "../../../../_redux/patronos/patronosActions";

const NuevoPatronoSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres")
    .required("El nombre es requerido"),
  codigo: Yup.string()
    .min(2, "El código debe tener al menos 2 caracteres")
    .max(20, "El código no puede tener más de 20 caracteres")
    .required("El código es requerido"),
  referencia: Yup.string()
    .min(2, "La referencia debe tener al menos 2 caracteres")
    .max(50, "La referencia no puede tener más de 50 caracteres")
    .required("La referencia es requerida"),
});

const NuevoPatronoModal = ({ show, onHide, onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      setIsSubmitting(true);

      const result = await dispatch(createPatrono(values));

      if (result && result.success) {
        resetForm();
        onHide(); // Cerrar modal
        if (onSuccess) {
          onSuccess(`Patrono "${values.nombre}" creado exitosamente`);
        }
      } else {
        throw new Error("Error al crear el patrono");
      }
    } catch (error) {
      console.error("Error al crear patrono:", error);

      if (error.response?.status === 400) {
        setFieldError("general", "Los datos proporcionados no son válidos");
      } else if (error.response?.data?.error) {
        setFieldError("general", error.response.data.error);
      } else {
        setFieldError(
          "general",
          "Error al crear el patrono. Inténtalo de nuevo."
        );
      }
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Patrono</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          nombre: "",
          codigo: "",
          referencia: "",
        }}
        validationSchema={NuevoPatronoSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting: formikSubmitting, errors, touched }) => (
          <Form>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre *</label>
                    <Field
                      type="text"
                      name="nombre"
                      className={`form-control ${
                        errors.nombre && touched.nombre ? "is-invalid" : ""
                      }`}
                      placeholder="Ingrese el nombre del patrono"
                      disabled={isSubmitting || formikSubmitting}
                    />
                    <ErrorMessage
                      name="nombre"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="codigo">Código *</label>
                    <Field
                      type="text"
                      name="codigo"
                      className={`form-control ${
                        errors.codigo && touched.codigo ? "is-invalid" : ""
                      }`}
                      placeholder="Código único"
                      disabled={isSubmitting || formikSubmitting}
                    />
                    <ErrorMessage
                      name="codigo"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="referencia">Referencia *</label>
                    <Field
                      type="text"
                      name="referencia"
                      className={`form-control ${
                        errors.referencia && touched.referencia
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Referencia"
                      disabled={isSubmitting || formikSubmitting}
                    />
                    <ErrorMessage
                      name="referencia"
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
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={isSubmitting || formikSubmitting}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || formikSubmitting}
              >
                {isSubmitting || formikSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                    Creando...
                  </>
                ) : (
                  "Crear Patrono"
                )}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default NuevoPatronoModal;
