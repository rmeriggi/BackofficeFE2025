import React, { useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Checkbox, Input } from "../../../../../_metronic/_partials/controls";
import { useDispatch } from "react-redux";
import { useSnackBar } from "../../../../hooks/useSnackBar";
import { Button, CircularProgress } from "@material-ui/core";
import countriesMock from "../../../../__mocks__/countriesMock";
import genderMock from "../../../../__mocks__/gerderMock";
import civilStatusMock from "../../../../__mocks__/civilStatusMock";
import positionMock from "../../../../__mocks__/positionMock";
import { createRelation } from "../../../../_redux/relations/relationsCrud";
import { getAllRelations } from "../../../../_redux/relations/relationsActions";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";

const IdentityEditSchema = Yup.object().shape({
  name: Yup.string()
    .required("Este campo es obligatorio")
    .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras"),
  lastName: Yup.string()
    .required("Este campo es obligatorio")
    .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras"),
  email: Yup.string()
    .required("Este campo es obligatorio")
    .email("Ingrese un email válido"),
  cellPhone: Yup.string()
    .required("Este campo es obligatorio")
    .matches(/^[0-9]+$/, "Solo se permiten números"),
  birthDate: Yup.string().required("Este campo es obligatorio"),
  birthPlace: Yup.string().required("Este campo es obligatorio"),
  street: Yup.string().required("Este campo es obligatorio"),
  city: Yup.string().required("Este campo es obligatorio"),
  civilstatusId: Yup.number().required("Este campo es obligatorio"),
  genreId: Yup.number().required("Este campo es obligatorio"),
  nationality: Yup.number().required("Este campo es obligatorio"),
  residence: Yup.number().required("Este campo es obligatorio"),
  cuit: Yup.string()
    .required("Este campo es obligatorio")
    .matches(/^\d{11}$/, "Debe ser una cadena numérica de 11 caracteres"),
  passport: Yup.string()
    .required("Este campo es obligatorio")
    .matches(/^[0-9]+$/, "Solo se permiten números"),
  profession: Yup.string().required("Este campo es obligatorio"),
  position: Yup.string().required("Este campo es obligatorio"),
});
const countries = countriesMock.countries;
const gender = genderMock.gender;
const civil = civilStatusMock.civilStatus;
const position = positionMock.position;

export function IdentityEditForm({ setData }) {
  const [isObligatedSubject, setObligatedSubject] = useState(false);
  const [isPoliticallyExposedPerson, setPoliticallyExposedPerson] = useState(
    false
  );
  const [facta, setFacta] = useState(false);
  const [isPhysicalResidence, setIsPhysicalResidence] = useState(false);
  const [globalAdvisoryAgent, setIsGlobalAdvisoryAgent] = useState(false);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false);
  const {
    open,
    /*   setOpen, */
    variant,
    message,
    handleClose,
    setOpenMessage,
  } = useSnackBar();
  const idParam = useParams().id;

  const initialValues = {
    idClient: idParam,
    name: "",
    lastName: "",
    bussinessName: "",
    passport: "",
    cuit: "",
    nationality: "",
    street: "",
    numberStreet: "",
    city: "",
    postalCode: "",
    email: "",
    cellPhone: "",
    facebookId: "",
    googleId: "",
    appleId: "",
    otherId: "",
    verified: "",
    level: "",
    category: "",
    use: "",
    civilstatusId: "",
    genreId: "",
    floor: "",
    departament: "",
    origin: "",
    idOrigin: "",
    birthDate: "",
    residence: "",
    birthPlace: "",
    reference: "",
    profession: "",
    position: "",
    idRelation: 0,
    status: 0,
    participation: 0,
    pep: false,
    so: false,
    facta: false,
    rfe: false,
    ip: "",
    device: "",
    agi: false,
  };

  const handleCreate = async (values) => {
    try {
      await createRelation(values);
      setOpenMessage("success", "La relación fue creada correctamente.");
      setProgress(false);
      await dispatch(getAllRelations(idParam, false));
      setData(false);
    } catch {
      setProgress(false);
      setOpenMessage(
        "error",
        "La relación no pudo ser creada. Por favor, volvé a intentar."
      );
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={false}
        initialValues={initialValues}
        validationSchema={IdentityEditSchema}
        onSubmit={(values) => {
          setProgress(true);
          return handleCreate(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <>
            <Form className="form form-label-right">
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  Nombre - Apellido
                  <span class="font-size-h5 font-weight-bold text-danger">
                    *
                  </span>
                </label>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder="Nombre"
                    component={Input}
                  />
                </div>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="lastName"
                    placeholder="Apellido"
                    component={Input}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h8 col-lg-4 col-form-label text-lg-left">
                  Contacto
                  <span class="font-size-h5 font-weight-bold text-danger">
                    *
                  </span>
                </label>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="email"
                    placeholder="Email"
                    component={Input}
                  />
                </div>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="cellPhone"
                    placeholder="Telefono"
                    component={Input}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  Fecha Nacimiento - Lugar de nacimiento (ciudad)
                  <span class="font-size-h5 font-weight-bold text-danger">
                    *
                  </span>
                </label>

                <div class="col-lg-4">
                  <Field
                    type="date"
                    class="form-control"
                    name="birthDate"
                    placeholder="Fecha de Nacimiento"
                    component={Input}
                  />
                </div>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="birthPlace"
                    placeholder="Lugar de Nacimiento"
                    component={Input}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  Domicilio - Localidad
                  <span class="font-size-h5 font-weight-bold text-danger">
                    *
                  </span>
                </label>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="street"
                    placeholder="Domicilio completo"
                    component={Input}
                  />
                </div>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="city"
                    placeholder="Localidad"
                    component={Input}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  Estado civil - Genero
                  <span class="font-size-h5 font-weight-bold text-danger">
                    *
                  </span>
                </label>
                <div class="col-lg-4">
                  <Field
                    as="select"
                    name="civilstatusId"
                    class="form-control"
                    placeholder="Seleccione un estado civil"
                  >
                    <option selected disabled value="">
                      Seleccione un estado civil
                    </option>
                    {civil.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="civilstatusId">
                    {(error) => <p class="text-danger text-xs">{error}</p>}
                  </ErrorMessage>
                </div>
                <div class="col-lg-4">
                  <Field
                    as="select"
                    name="genreId"
                    class="form-control"
                    placeholder="Seleccione un género"
                  >
                    <option selected disabled value="">
                      Seleccione un género
                    </option>
                    {gender.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="genreId">
                    {(error) => <p class="text-danger text-xs">{error}</p>}
                  </ErrorMessage>
                </div>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  Nacionalidad - País de Residencia
                  <span class="font-size-h5 font-weight-bold text-danger">
                    *
                  </span>
                </label>
                <div class="col-lg-4">
                  <Field
                    as="select"
                    name="nationality"
                    class="form-control"
                    placeholder="Seleccione una Nacionalidad"
                  >
                    <option selected disabled value="">
                      Seleccione una Nacionalidad
                    </option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.country}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="nationality">
                    {(error) => <p class="text-danger text-xs">{error}</p>}
                  </ErrorMessage>
                </div>
                <div class="col-lg-4">
                  <Field
                    as="select"
                    name="residence"
                    class="form-control"
                    placeholder="Seleccione un Pais de Residencia"
                  >
                    <option selected disabled value="">
                      Seleccione un Pais de Residencia
                    </option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.country}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="residence">
                    {(error) => <p class="text-danger text-xs">{error}</p>}
                  </ErrorMessage>
                </div>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  CUIT - DNI
                  <span class="font-size-h5 font-weight-bold text-danger">
                    *
                  </span>
                </label>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="cuit"
                    placeholder="CUIT"
                    component={Input}
                  />
                </div>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="passport"
                    placeholder="DNI"
                    component={Input}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  Posición - Actividad
                  <span class="font-size-h5 font-weight-bold text-danger">
                    *
                  </span>
                </label>
                <div class="col-lg-4">
                  <Field
                    as="select"
                    name="position"
                    class="form-control"
                    placeholder="Seleccione una Posición"
                  >
                    <option selected disabled value="">
                      Seleccione una Posición
                    </option>
                    {position.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="position">
                    {(error) => <p class="text-danger text-xs">{error}</p>}
                  </ErrorMessage>
                </div>
                <div class="col-lg-4">
                  <Field
                    type="text"
                    class="form-control"
                    name="profession"
                    placeholder="Actividad"
                    component={Input}
                  />
                </div>
              </div>
              {values.position === "ACCIONISTA" && (
                <div class="form-group row">
                  <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                    Participación
                    <span class="font-size-h5 font-weight-bold text-danger">
                      *
                    </span>
                  </label>
                  <div class="col-lg-4">
                    <Field
                      type="number"
                      min="0"
                      class="form-control"
                      name="participation"
                      placeholder="Participación %"
                      component={Input}
                    />
                  </div>
                </div>
              )}
              <div class="form-group row align-items-center">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  SUJETO OBLIGADO
                </label>
                <span class="switch switch-sm">
                  <Checkbox
                    name="so"
                    isSelected={isObligatedSubject}
                    onChange={(e) => {
                      setObligatedSubject(!isObligatedSubject);
                      setFieldValue("so", e.target.checked);
                    }}
                  ></Checkbox>
                </span>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  RESIDENCIA FISCAL EN EL EXTERIOR
                </label>
                <span class="switch switch-sm">
                  <Checkbox
                    name="rfe"
                    isSelected={isPhysicalResidence}
                    onChange={(e) => {
                      setIsPhysicalResidence(!isPhysicalResidence);
                      setFieldValue("rfe", e.target.checked);
                    }}
                  ></Checkbox>
                </span>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  FACTA
                </label>
                <span class="switch switch-sm">
                  <Checkbox
                    name="facta"
                    isSelected={facta}
                    onChange={(e) => {
                      setFacta(!facta);
                      setFieldValue("facta", e.target.checked);
                    }}
                  ></Checkbox>
                </span>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  AGENTE ASENSOR GLOBAL DE INVERSIONES
                </label>
                <span class="switch switch-sm">
                  <Checkbox
                    name="agi"
                    isSelected={globalAdvisoryAgent}
                    onChange={(e) => {
                      setIsGlobalAdvisoryAgent(!globalAdvisoryAgent);
                      setFieldValue("agi", e.target.checked);
                    }}
                  ></Checkbox>
                </span>
              </div>
              <div class="form-group row">
                <label className="font-weight-bold font-size-h7 col-lg-4 col-form-label text-lg-left">
                  PERSONA POLITICAMENTE EXPUESTA
                </label>
                <span class="switch switch-sm">
                  <Checkbox
                    name="pep"
                    isSelected={isPoliticallyExposedPerson}
                    onChange={(e) => {
                      setPoliticallyExposedPerson(!isPoliticallyExposedPerson);
                      setFieldValue("pep", e.target.checked);
                    }}
                  ></Checkbox>
                </span>
              </div>
              <Button
                variant="contained"
                color="secondary"
                className="mr-3"
                size="large"
                onClick={() => handleSubmit()}
                disabled={false}
                endIcon={
                  progress && <CircularProgress size={20} color="secondary" />
                }
              >
                Añadir
              </Button>
            </Form>
          </>
        )}
      </Formik>
      <SnackbarMessage
        handleClose={handleClose}
        open={open}
        variant={variant}
        message={message}
      />
    </>
  );
}
