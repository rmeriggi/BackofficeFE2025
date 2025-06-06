/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Input } from "../../../../../../../../_metronic/_partials/controls";
import { Form, Modal, ThemeProvider } from "react-bootstrap";
import { Button, createMuiTheme, colors, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import useIsMountedRef from "../../../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../../../../_metronic/layout";
import { useAllSeatingTemplates } from "../../../../../TemplatesEntries/utils/apiHook";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'
import { es } from 'date-fns/locale';
import { useSnackBar } from "../../../../../../../hooks/useSnackBar";
import { Field, Formik } from "formik";
import { SnackbarMessage } from "../../../../../../../components/SnackbarMessage";
import Listing from "./ListingTemplatesDetails";
import { ListingTableContextProvider } from "./ListingTemplatesDetails/ListingTableContext";
import { getOneDetail } from '../../../../../TemplatesEntries/utils/service'
import { seattingTemplateDetailAdapter } from "../../../../adapters/seattingTemplateDetail";
import { useLoading } from "../../../../../../../hooks/useLoading";
import { create } from "../../../../utils/service";

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});
export function ModalCreate({show, onHide}) {

    const isMounted = useIsMountedRef()
    const [date, setDate] = useState(new Date())

    const [seatingTemplates, seatingTemplatesCompleted] = useAllSeatingTemplates(isMounted)

    const [id, setId] = useState()
    const [detail, setDetail] = useState()

    const {loading, enableLoading, disableLoading} = useLoading()  

    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
    const [progress, setProgress] = useState(false);
    const [amounts, setAmounts] = useState()

    useEffect(() => {
        setId(seatingTemplates?.[0]?.id)
    }, [seatingTemplates])

    useEffect(() => {
        setAmounts(detail?.map((e) => 0))
    }, [detail])

    useEffect(() => {

        const getDetail = async() => {
            const response = await getOneDetail(id)
            const formattedDetail = seattingTemplateDetailAdapter(response)
            setDetail(formattedDetail)
            disableLoading()
        }
        if(id) getDetail()
    }, [id])

    if(!(seatingTemplatesCompleted)) return <LayoutSplashScreen />


    const initialValues = {
        description: '',
        date: new Date(),
        seattingTemplateId: id,
        idAuxAccount: [], 
        auxAccountName: [],
        amounts: amounts
    }

    const isItBalance = (amounts) => {
        let debe = [];
        let haber = [];
        if(detail){
            detail.forEach((e, index) => {
                if(e.movementType === 'D') {
                    debe.push(amounts[index])
                } else {
                    haber.push(amounts[index])
                }
            })
        }

        const totalDebe =  debe.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        const totalHaber =  haber.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        return totalDebe === totalHaber
    }

    const handleCreate = async (values) => {
        if(!(isItBalance(amounts))) {
            return setOpenMessage('error', 'El asiento no está balanceado correctamente. Por favor, volvé a intentar.')
        }
        const body = {
            seattingTemplateId: values.seattingTemplateId,
            date: values.date.toISOString(),
            description: values.description,
            amounts: values.amounts.join(';')
        }
        try {
        await create(body);
        setOpenMessage('success', 'El asiento fue creado correctamente.')
        setTimeout(()=>{
            onHide() 
        }, 3000)
        } catch  {
        setOpenMessage('error', 'El asiento no pudo ser creado correctamente. Por favor, volvé a intentar.')
        }
    }

  return (
    <>
        <Modal
            show={show}
            onHide={onHide}
            size={'xl'}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header>Crear Asiento Contable</Modal.Header>
            <Modal.Body className="overlay overlay-block cursor-default">
                {loading? (
                    <>
                        <div className="overlay-layer">
                            <div className="spinner spinner-lg spinner-primary" />
                        </div> 
                    </>
                    ) : (
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            //validationSchema={AccountingGroupEditSchema}
                            onSubmit={(values) => {
                                setProgress(!progress)
                                handleCreate(values)
                            }}
                        >
                            {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
            
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="mt-8">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <KeyboardDatePicker
                                                        autoOk
                                                        disableFuture
                                                        size="small"
                                                        inputVariant="outlined"
                                                        label="Fecha"
                                                        format="dd/MM/yyyy"
                                                        value={date}
                                                        cancelLabel="cancelar"
                                                        onChange={date => {
                                                            setDate(date)
                                                        }}
                                                    />
                                                </ThemeProvider>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <div className="col-lg-4">
                                            <Field
                                                name="description"
                                                component={Input}
                                                placeholder="Descripción"
                                                label="Descripción"
                                            />
                                        </div>
                                        <div className="col-lg-4 mt-6">
                                            <FormControl>
                                                <InputLabel htmlFor="age-simple">Plantilla</InputLabel>
                                                <Select
                                                value={values.seattingTemplateId}
                                                onChange={(e)=>{
                                                    setId(e.target.value)
                                                    setFieldValue('seattingTemplateId', e.target.value)
                                                    enableLoading()
                                                }}
                                                style={{width: '215px'}}
                                                >
                                                {seatingTemplates.map((e)=>(
                                                    <MenuItem value={e.id} key={e.id}>{e.description}</MenuItem>
                                                ))}
                                                </Select>
                                            </FormControl>
                                        </div>  
                                    </div>
                                    <ListingTableContextProvider>
                                        <Listing data={detail} amounts={values.amounts} setFieldValue={setFieldValue} setAmounts={setAmounts}/>
                                    </ListingTableContextProvider>
                                    <div className="row mt-10">
                                        <Button 
                                            variant="contained"
                                            color="secondary"
                                            type="submit"
                                            className="ml-4"
                                            size="large"
                                            onClick={handleSubmit}
                                            endIcon={
                                                isSubmitting && <CircularProgress size={20} color="secondary"/>  
                                            }
                                        >
                                            Crear
                                        </Button>
                                    </div>
                                    <SnackbarMessage
                                        handleClose={handleClose}
                                        open={open}
                                        variant={variant}
                                        message={message}
                                    />
                                </Form>
                            )}
                        </Formik>
                    )
                }
            </Modal.Body>
            <Modal.Footer className="form">
                <div className="form-group">
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={onHide}
                >
                    Volver
                </Button>
                </div>
            </Modal.Footer>
        </Modal>
    </>
)}
