import React, { useState } from "react";
import * as Yup from "yup";
import ClientAvatar from "./ClientAvatar";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import { Formik, Form, Field } from "formik";
import { getCountries } from "../../../../../_redux/combos/combosActions";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";
import { useFetchCombos } from "../../../../../hooks";
import { useClientsContext } from "../../context/ClientsContext";
import { UploadModal } from "./UploadModal";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components";

// Validation schema
const ClientEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimo 2 caracteres")
    .required("Nombre es requerido"),
  lastName: Yup.string()
    .min(2, "Minimo 2 caracteres")
    .required("Apellido es requerido"),
  bussinessName: Yup.string().min(2, "Minimo 2 caracteres"),
  passport: Yup.string()
    .min(2, "Minimo 2 numeros")
    .required("Passport es requerido"),
  country: Yup.string().required("Pais es requerido"),
  street: Yup.string().min(2, "Minimo 2 caracteres"),
  number: Yup.string(),
  city: Yup.string(),
  postalCode: Yup.string().min(2, "Minimo 2 caracteres"),
  email: Yup.string().required("Email es requerido"),
  phone: Yup.string().min(5, "Minimo 5 numeros"),
  facebookId: Yup.string(),
  googleId: Yup.string(),
  appleId: Yup.string(),
  otherId: Yup.string(),
  status: Yup.number().required("Estatus es requerido"),
  verified: Yup.string(),
  level: Yup.number(),
  category: Yup.number(),
  activity: Yup.string(),
  reference: Yup.string(),
  origen: Yup.string(),
  idOrigen: Yup.string(),
  registrationdate: Yup.string(),
  registrationnumber: Yup.string(),
  constitutiondate: Yup.string(),
});

export function ClientEditForm({
  client,
  btnRef,
  saveClient,
  setIsSubmitting,
  urlImage,
  dni,
}) {
  const { setOpenMessage, handleClose, message, open, variant } = useSnackBar();
  const [countries] = useFetchCombos("countries", getCountries);
  const { verified, status, levels, categories } = useClientsContext();
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const [error, setError] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });

  const handleError = (name) => {
    setError({ ...error, [name]: true });
  };

  return (
    <>
      <Formik
        enableReinitialize={false}
        initialValues={client}
        validationSchema={ClientEditSchema}
        onSubmit={(values) => {
          return saveClient(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <>
            <Form className="form form-label-right">
              <div className="d-flex">
                <div className="mr-4" style={{ minWidth: "232px" }}>
                  <ClientAvatar />
                </div>
                <div>
                  <div className="form-group row">
                    <div className="col-lg-3">
                      <Field
                        name="name"
                        component={Input}
                        placeholder="Nombre"
                        label="Nombre"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="lastName"
                        component={Input}
                        placeholder="Apellido"
                        label="Apellido"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        type="text"
                        name="passport"
                        component={Input}
                        placeholder="CUIT/CUIL"
                        label="CUIT/CUIL"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="bussinessName"
                        component={Input}
                        placeholder="Razón Social"
                        label="Razón Social"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-3 mt-8">
                      <GeneralSelector
                        valueKey="code"
                        values={values}
                        valueName="country"
                        keyName="country"
                        label="País"
                        data={countries}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="email"
                        component={Input}
                        placeholder="Email"
                        label="Email"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="phone"
                        component={Input}
                        placeholder="Móvil"
                        label="Móvil"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="street"
                        component={Input}
                        placeholder="Calle"
                        label="Calle"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="number"
                    component={Input}
                    placeholder="Numero"
                    label="Numero"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="city"
                    component={Input}
                    placeholder="Ciudad"
                    label="Ciudad"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="postalCode"
                    component={Input}
                    placeholder="Código Postal"
                    label="Código Postal"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="facebookId"
                    component={Input}
                    placeholder="Facebook ID"
                    label="Facebook ID"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="googleId"
                    component={Input}
                    placeholder="Google ID"
                    label="Google ID"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="appleId"
                    component={Input}
                    placeholder="Apple ID"
                    label="Apple ID"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="otherId"
                    component={Input}
                    placeholder="Other ID"
                    label="Other ID"
                  />
                </div>
                <div className="col-lg-3">
                  <Select name="status" label="Status">
                    {status.map(({ id, label }) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="activity"
                    component={Input}
                    placeholder="Actividad"
                    label="Actividad"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="reference"
                    component={Input}
                    placeholder="Referido Por"
                    label="Referido Por"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="origen"
                    component={Input}
                    placeholder="Origen"
                    label="Origen"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="idOrigen"
                    component={Input}
                    placeholder="ID Origen"
                    label="ID Origen"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="registrationdate"
                    component={Input}
                    placeholder="Fecha de Inscripción"
                    label="Fecha de Inscripción"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="registrationnumber"
                    component={Input}
                    placeholder="Numero de Inscripción"
                    label="Numero de Inscripción"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="constitutiondate"
                    component={Input}
                    placeholder="Fecha de Constitución"
                    label="Fecha de Constitución"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="ImpGanancias"
                    component={Input}
                    placeholder="Impuesto Ganancias"
                    label="Impuesto Ganancias"
                  />
                </div>
              </div>
              <div className="form-group row">
              <div className="col-lg-3">
                  <Field
                    name="ImpIVA"
                    component={Input}
                    placeholder="IVA"
                    label="IVA"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="ImpIIBB"
                    component={Input}
                    placeholder="IIBB"
                    label="IIBB"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="NumIIBB"
                    component={Input}
                    placeholder="Número IIBB"
                    label="Número IIBB"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="FacturacionAnual"
                    type="number"
                    component={Input}
                    placeholder="Facturación Anual"
                    label="Facturación Anual"
                  />
                </div>
              </div>
              <div className="form-group row">
              <div className="col-lg-3">
                  <Field
                    name="DomicilioFiscal"
                    component={Input}
                    placeholder="Domicilio Fiscal"
                    label="Domicilio Fiscal"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="TipoSociedad"
                    component={Input}
                    placeholder="Tipo de Sociedad"
                    label="Tipo de Sociedad"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="EntidadRegistro"
                    component={Input}
                    placeholder="Entidad de Registro"
                    label="Entidad de Registro"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="PaisInscripcion"
                    component={Input}
                    placeholder="País de Inscripción"
                    label="País de Inscripción"
                  />
                </div>
              </div>
              <div className="form-group row">
              <div className="col-lg-3">
                  <Field
                    name="ProvinciaInscripcion"
                    component={Input}
                    placeholder="Provincia de Inscripción"
                    label="Provincia de Inscripción"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Select name="verified" label="Verificado">
                    {verified.map((verified) => (
                      <option key={verified} value={verified}>
                        {verified}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-3">
                  <Select name="level" label="Nivel">
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-3">
                  <Select name="categories" label="Categoria">
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-3">
                  {/* Img del DNI 1*/}
                  <img
                    className="w-100"
                    src={
                      !error.img1
                        ? `${urlImage}${dni}/1.jpg`
                        : `${toAbsoluteUrl("/media/error/bg3.jpg")}`
                    }
                    alt="avatar"
                    onError={() => handleError("img1")}
                    onClick={() => setShowModal1(true)}
                    role="button"
                  />
                </div>
                <div className="col-3">
                  {/* Img del DNI 2*/}
                  <img
                    className="w-100"
                    src={
                      !error.img2
                        ? `${urlImage}${dni}/2.jpg`
                        : `${toAbsoluteUrl("/media/error/bg3.jpg")}`
                    }
                    alt="avatar"
                    onError={() => handleError("img2")}
                    onClick={() => setShowModal2(true)}
                    role="button"
                  />
                </div>
                <div className="col-3">
                  {/* Img del DNI 3*/}
                  <img
                    className="w-100"
                    src={
                      !error.img3
                        ? `${urlImage}${dni}/3.jpg`
                        : `${toAbsoluteUrl("/media/error/bg3.jpg")}`
                    }
                    alt="avatar"
                    onError={() => handleError("img3")}
                    onClick={() => setShowModal3(true)}
                    role="button"
                  />
                </div>
                <div className="col-3">
                  {/* Img del DNI 4*/}
                  <img
                    className="w-100"
                    src={
                      !error.img4
                        ? `${urlImage}${dni}/4.jpg`
                        : `${toAbsoluteUrl("/media/error/bg3.jpg")}`
                    }
                    alt="avatar"
                    onError={() => handleError("img4")}
                    onClick={() => setShowModal4(true)}
                    role="button"
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
                onClick={setIsSubmitting(isSubmitting)}
              ></button>
            </Form>
          </>
        )}
      </Formik>
      <UploadModal
        show={showModal1}
        onHide={(result) => {
          setShowModal1(false);
          if (result.success) {
            setOpenMessage("success", "Documento cargado correctamente");
          } else if (result.errorCode) {
            setOpenMessage("error", "Hubo un problema al cargar el documento");
          }
        }}
        title={"Cargar Selfie sonriendo"}
        action="1"
        id={dni}
        type="pictures"
      />
      <UploadModal
        show={showModal2}
        onHide={(result) => {
          setShowModal2(false);
          if (result.success) {
            setOpenMessage("success", "Documento cargado correctamente");
          } else if (result.errorCode) {
            setOpenMessage("error", "Hubo un problema al cargar el documento");
          }
        }}
        title={"Cargar Selfie serio"}
        action="2"
        id={dni}
        type="pictures"
      />
      <UploadModal
        show={showModal3}
        onHide={(result) => {
          setShowModal3(false);
          if (result.success) {
            setOpenMessage("success", "Documento cargado correctamente");
          } else if (result.errorCode) {
            setOpenMessage("error", "Hubo un problema al cargar el documento");
          }
        }}
        title={"Cargar frente del DNI"}
        action="3"
        id={dni}
        type="pictures"
      />
      <UploadModal
        show={showModal4}
        onHide={(result) => {
          setShowModal4(false);
          if (result.success) {
            setOpenMessage("success", "Documento cargado correctamente");
          } else if (result.errorCode) {
            setOpenMessage("error", "Hubo un problema al cargar el documento");
          }
        }}
        title={"Cargar dorso del DNI"}
        action="4"
        id={dni}
        type="pictures"
      />
      <SnackbarMessage
        handleClose={handleClose}
        open={open}
        variant={variant}
        message={message}
      />
    </>
  );
}
