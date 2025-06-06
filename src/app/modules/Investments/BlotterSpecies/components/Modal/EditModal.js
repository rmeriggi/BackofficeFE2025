/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress, MenuItem } from "@material-ui/core";
import { Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { updateSpecie } from "../../../../../_redux/blotter/blottersCrud";
import { getSpecies } from "../../../../../_redux/combos/combosActions";


const ProductEditSchema = Yup.object().shape({
  description: Yup.string().required("Este es un campo requerido"),
  abbreviation: Yup.string().required("Este es un campo requerido"),

});

export function EditModal(props) {
    const [progress, setProgress] = useState(false);
    const dispatch = useDispatch()
    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar(); 
    const cat = [{id:1, cat:'SI'  },{id:2, cat:'NO'},{id:3, cat:'QUANTEX'} ]

    const initialValues = {       
      IDESCO:props.editInitialData.IDESCO,
      abbreviation:props.editInitialData.abbreviation,
      codTpRisk:props.editInitialData.codTpRisk,
      description:props.editInitialData.description,
      esAcction:props.editInitialData.esAcction,
      esCertificateOfDeposit:props.editInitialData.esCertificateOfDeposit,
      esCertificateOfPartFideicomisos:props.editInitialData.esCertificateOfPartFideicomisos,
      esCheckDiferido:props.editInitialData.esCheckDiferido,
      esLEBAC:props.editInitialData.esLEBAC,
      esObligacionNegociable:props.editInitialData.esObligacionNegociable,
      esOtroTituloEmitidoPorBCRA:props.editInitialData.esOtroTituloEmitidoPorBCRA,
      esParaPagares:props.editInitialData.esParaPagares,
      esTituloPublico:props.editInitialData.esTituloPublico,
      id:props.editInitialData.id,
      risk:props.editInitialData.risk 
      }

    async function handleEdit(e) {     
      const values={
        id:Number(e.id),
        idesco: Number(e.IDESCO),
        description: e.description,
        abbreviation: e.abbreviation,
        codtpriesgo: Number(e.codTpRisk),
        risk: e.risk,
        esaccion: Number(e.esAcction),
        depositCertificate: Number(e.esCertificateOfDeposit),
        certificatefideicomiso: e.esCertificateOfPartFideicomisos,
        checkdif: Number(e.esCheckDiferido),
        lebac: Number(e.esLEBAC),
        obliganicionesn: Number(e.esObligacionNegociable),
        titulobcra: Number(e.esOtroTituloEmitidoPorBCRA),
        pagares: Number(e.esParaPagares),
        tp: Number(e.esTituloPublico)
       } 
        
       try {
        setProgress(true)
         await updateSpecie(values)
         await dispatch(getSpecies())      
         setProgress(false)
         props.setShow(false)
       } catch  {
        setProgress(false)      
       }
    
     }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={'xl'}
      centered={true}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
            Actualizar Especie
        </Modal.Title>
      </Modal.Header>
        <Formik
            enableReinitialize={false}
            initialValues={initialValues}
            validationSchema={ProductEditSchema}
            onSubmit={(values) => {
                setProgress(true)
                return handleEdit(values);
            }}
        >
        {({ handleSubmit, handleChange ,setFieldValue, values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
                <Form className="form form-label-right">
                <div className="form-product row">
                     <div className="col-lg-6">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">ABREVIATURA</label> 
                    <Field
                        name="abbreviation"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                    />
                    </div>
                     <div className="col-lg-6">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">DESCRIPCION</label> 
                    <Field
                        name="description"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                    />
                    </div>                   
                </div>  
                </Form>
            </Modal.Body>
            <Modal.Footer className="form">
                <div className="form-group">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mr-3"
                    size="large"
                    onClick={()=> props.setShow(false)}
                  >
                   Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mr-3"
                    size="large"
                    onClick={()=> handleSubmit()}
                    disabled={progress}
                    endIcon={
                      progress && <CircularProgress size={20} color="secondary"/>  
                    }
                  >
                    Confirmar
                  </Button>
                </div>
            </Modal.Footer>
            <SnackbarMessage
                handleClose={handleClose}
                open={open}
                variant={variant}
                message={message}
            />
          </>
        )}
      </Formik>  
    </Modal>
  );
}