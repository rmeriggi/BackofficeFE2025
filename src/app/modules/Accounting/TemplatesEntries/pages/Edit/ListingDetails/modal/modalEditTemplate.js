/* eslint-disable eqeqeq */
import React, { useState } from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Button, Checkbox, CircularProgress, FormControlLabel } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Select } from "../../../../../../../../_metronic/_partials/controls";
import { useSnackBar } from "../../../../../../../hooks/useSnackBar";
import { editDetail } from "../../../../utils/service";
import { useParams } from "react-router-dom";
import { SnackbarMessage } from "../../../../../../../components/SnackbarMessage";

const TemplatesEntriesSchema = Yup.object().shape({
    idAuxiliary: Yup.string()
    .required("La cuenta auxiliar es un campo requerido"),
  });

export function ModalEditTemplate(props) {

    const detail = props.data?.find(e => e.id == props.id)

    const [groupId, setGroupId] = useState(detail?.groupId)
    const [accounts, setAccounts] = useState(props.accounts)
    const [accountId, setAccountId] = useState(detail?.accountId)
    const [subAccounts, setSubAccounts] = useState(props.subAccounts)
    const [subAccountId, setSubAccountId] = useState(detail?.subAccountId)
    const [auxAccounts, setAuxAccounts] = useState(props.auxiliariesAccounts)
    const [auxAccountId, setAuxAccountId] = useState(detail?.idAuxiliary)
    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar();
    const { id } = useParams();

    const initialValues = {
        idHeader: detail?.idHeader,
        idAuxiliary: detail?.idAuxiliary,
        subAccountId: detail?.subAccountId,
        accountId: detail?.accountId,
        groupId: detail?.groupId,
        movementType: detail?.movementType,
    }

    const editTemplate = async (values) => {
        const bodyDetail= {
            id: props.id,
            idAuxiliary: Number(auxAccountId),
            movementType: values.movementType
        }

        try {
            await editDetail(id, bodyDetail)
            props.setLoading(true)
            setOpenMessage('success', 'La plantilla fue actualizada correctamente.')
            setTimeout(()=>{
                props.hide()
            }, 4000)
        } catch (error) {
            setOpenMessage('error', 'La plantilla no pudo ser actualizada correctamente. Por favor, intenta nuevamente')
        }
    }
    
    const getAccountsByGroup = (idGroup) => {
        const accounts = props.accounts.filter(a => a.group == idGroup)
        return accounts
    }
    
    const getSubAccountsByAccount = (idAccount) => {
        const subaccounts = props.subAccounts.filter(sa => sa.account == idAccount)
        return subaccounts
    }

    const getAuxAccountsBySubAccount = (idSubAccount) => {
        const auxaccounts = props.auxiliariesAccounts.filter(aux => aux.idSubAccount == idSubAccount)
        return auxaccounts
    }


  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={'lg'}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Editar Plantilla 
        </Modal.Title>
      </Modal.Header>
      
        <Formik
        enableReinitialize={false}
        initialValues={initialValues}
        validationSchema={TemplatesEntriesSchema}
        onSubmit={(values) => {
          return editTemplate(values);
        }}
      >
        {({ handleSubmit, handleChange ,setFieldValue, values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
                <Form className="form form-label-right">
                    <div className="form-group row">
                        <div className="col-3">
                            <Select
                                name="groupId"
                                label="Grupo"
                                value={groupId}
                                onChange={(e)=>{
                                    handleChange(e);
                                    setGroupId(e.target.value)

                                    const accounts = getAccountsByGroup(e.target.value);

                                    setAccounts(accounts)
                                    setAccountId(accounts[0]?.id)

                                    const subaccounts = getSubAccountsByAccount(accounts[0]?.id);
                                    setSubAccounts(subaccounts)
                                    setSubAccountId(subaccounts[0]?.idAccount)

                                    const auxAccounts = getAuxAccountsBySubAccount(subaccounts[0]?.id)
                                    setAuxAccounts(auxAccounts)
                                    setAuxAccountId(auxAccounts[0]?.id)
                                }}
                            >
                                {props.groups.map((e)=>(
                                    <option key={e.id} value={e.id}>
                                        {e.group.trim()}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-3">
                            <Select
                                name="accountId"
                                label="Cuenta"
                                value={accountId}
                                onChange={(e)=>{
                                    handleChange(e);
                                    setAccountId(e.target.value)

                                    const subaccounts = getSubAccountsByAccount(e.target.value);
                                    setSubAccounts(subaccounts)
                                    setSubAccountId(subaccounts[0]?.idAccount)

                                    const auxAccounts = getAuxAccountsBySubAccount(subaccounts[0]?.id)
                                    setAuxAccounts(auxAccounts)
                                    setAuxAccountId(auxAccounts[0]?.id)
                                }}
                            >
                                {accounts.map((e)=>(
                                    <option key={e.id} value={e.id}>
                                        {e.account.trim()}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-3">
                        <Select
                                name="subAccountId"
                                label="Subcuenta"
                                value={subAccountId}
                                onChange={(e)=>{
                                    handleChange(e);
                                    setSubAccountId(e.target.value)

                                    const auxAccounts = getAuxAccountsBySubAccount(e.target.value)
                                    setAuxAccounts(auxAccounts)
                                    setAuxAccountId(auxAccounts[0]?.id)
                                }}
                            >
                                {subAccounts.map((e)=>(
                                    <option key={e.id} value={e.id}>
                                        {e.subAccount.trim()}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-3">
                            <Select
                                name="idAuxiliary"
                                label="Cuenta Auxiliar"
                                value={auxAccountId}
                                onChange={(e)=>{
                                    setAuxAccountId(e.target.value)
                                }}
                            >
                                {auxAccounts.map((e)=>(
                                    <option key={e.id} value={e.id}>
                                        {e.auxiliary.trim()}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-3">
                            <FormControlLabel
                                label="Debe"
                                labelPlacement="top"
                                control={
                                    <Checkbox
                                        value={values.movementType === 'D'}
                                        checked={values.movementType === "D"}
                                        onChange={(e) => {
                                            setFieldValue("movementType", e.target.checked ? "D" : "")
                                        }}
                                        color="secondary"
                                    />
                                }
                            />
                            <FormControlLabel
                                label="Haber"
                                labelPlacement="top"
                                control={
                                    <Checkbox
                                        value={values.movementType === 'H'}
                                        checked={values.movementType === "H"}
                                        onChange={(e) => {
                                            setFieldValue("movementType", e.target.checked ? "H" : "")
                                        }}
                                    color="secondary"
                                    />
                                }
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
                    onClick={props.hide}
                  >
                    Volver
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mr-3"
                    size="large"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    endIcon={
                      isSubmitting && <CircularProgress size={20} color="secondary"/>  
                    }
                  >
                    Editar
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

