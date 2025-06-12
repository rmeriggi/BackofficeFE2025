import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RosEdit = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            Formulario de Reporte de Operación Sospechosa (ROS)
          </h4>
        </div>

        <div className="card-body">
          <Formik
            initialValues={{
              clienteNombre: "",
              clienteDni: "",
              canalUtilizado: "",
              operaciones: "",
              analisis: "",
              indicadores: [],
              conclusion: "",
            }}
            validationSchema={Yup.object({
              clienteNombre: Yup.string().required("Requerido"),
              clienteDni: Yup.string().required("Requerido"),
              canalUtilizado: Yup.string().required("Requerido"),
              operaciones: Yup.string().required("Requerido"),
              analisis: Yup.string().required("Requerido"),
              conclusion: Yup.string().required("Requerido"),
            })}
            onSubmit={(values) => {
              console.log("ROS Submitted:", values);
              alert("Reporte ROS generado correctamente.");
            }}
          >
            <Form>
              <div className="form-group">
                <label>Nombre del Cliente</label>
                <Field name="clienteNombre" className="form-control" />
                <ErrorMessage
                  name="clienteNombre"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>DNI / CUIT / CUIL</label>
                <Field name="clienteDni" className="form-control" />
                <ErrorMessage
                  name="clienteDni"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>Canal utilizado</label>
                <Field
                  name="canalUtilizado"
                  as="select"
                  className="form-control"
                >
                  <option value="">Seleccione...</option>
                  <option value="Home Banking">Home Banking</option>
                  <option value="POS Físico">POS Físico</option>
                  <option value="Transferencia Online">
                    Transferencia Online
                  </option>
                  <option value="Depósito Efectivo">
                    Depósito en Efectivo
                  </option>
                </Field>
                <ErrorMessage
                  name="canalUtilizado"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>Detalle de Operaciones Sospechosas</label>
                <Field
                  name="operaciones"
                  as="textarea"
                  className="form-control"
                  rows="4"
                />
                <ErrorMessage
                  name="operaciones"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>Análisis de la Sospecha</label>
                <Field
                  name="analisis"
                  as="textarea"
                  className="form-control"
                  rows="4"
                />
                <ErrorMessage
                  name="analisis"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>Indicadores de Alerta Aplicados</label>
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="indicators"
                    value="Operaciones inusuales"
                    className="form-check-input"
                  />
                  <label className="form-check-label">
                    Operaciones inusuales
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="indicators"
                    value="Uso intensivo de efectivo"
                    className="form-check-input"
                  />
                  <label className="form-check-label">
                    Uso intensivo de efectivo
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="indicators"
                    value="Transacciones circulares"
                    className="form-check-input"
                  />
                  <label className="form-check-label">
                    Transacciones circulares
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="indicators"
                    value="Cambio abrupto de patrón"
                    className="form-check-input"
                  />
                  <label className="form-check-label">
                    Cambio abrupto de patrón
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Conclusión</label>
                <Field
                  name="conclusion"
                  as="textarea"
                  className="form-control"
                  rows="4"
                />
                <ErrorMessage
                  name="conclusion"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary">
                  Generar Reporte ROS
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RosEdit;
