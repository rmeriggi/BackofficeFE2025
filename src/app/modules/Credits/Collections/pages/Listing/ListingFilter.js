import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import {useListingTableContext} from "./ListingTableContext";
import { TextField, MenuItem, Button, CircularProgress } from '@material-ui/core';
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import { getExcel } from '../../../../../utils/exportExcel';
import { formatClientReport } from '../../../../../utils/formatData';
import { forceDocument } from '../../utils/service';

const prepareFilter = (queryParams, values) => {
    const { searchText, searchCuotes,searchStatus } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.dni = searchText;
    filter.name = searchText;
    filter.cuotes = searchCuotes;
    filter.status = searchStatus;
    filter.days = searchText;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const statuses = [
    {id:1, name: "Activo"},
    {id:2, name: "Pendiente"},
    {id:3, name: "Cancelado"},
    {id:4, name: "Rechazado"},
]

const ListingFilter = ({disabled, data, setData, collections}) => {

    const [report, setReport] = useState([])
    const [btnValue, setBtnValue] = useState('Forzar Documento')
    const [loading, setLoading] = useState(false)
  
    useMemo(() => {
        const dataFormated = formatClientReport(data)
        setReport(dataFormated)
    }, [data])

    const {
        queryParams,
        setQueryParams,
        setPageNumber
    } = useListingTableContext();

    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };

    const propertiesData = {
        header: ['Gestor',"N° de Crédito",'DNI', 'Cliente', 'Días', "Importe Adeudado", "Cuotas", "Fecha último contacto", "Estado"],
        properties:['manager', "idCredit",'dni', 'name', "days", "amountOwed", "quotas", "dateLastContact", "status"] ,
        array: report,
    }

    const handleForce = async(dni, setFieldValue) => {
        if(btnValue === 'Forzar Documento') {
            setLoading(true)
            const data = await forceDocument({dni: dni})
            setLoading(false)
            setData(data)
            setBtnValue('Volver')
            setFieldValue("dni", '');
        } else {
            setData(collections.collectionsManagment)
            setBtnValue('Forzar Documento')
            setFieldValue("dni", '');
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    searchStatus:"",
                    searchCuotes:"",
                    dni: ""
                }}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      handleChange,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right" style={{width: '95%'}}>
                        <div className='row align-items-center'>
                            <div className="col ">
                                <TextField
                                        select
                                        size="small"
                                        fullWidth
                                        label="Estado"
                                        variant="outlined"
                                        value={values.searchStatus}
                                        onChange={(e) => {
                                        setFieldValue("searchStatus", e.target.value)
                                        handleSubmit()
                                        }}
                                        >
                                        <MenuItem key={0} value={"Todas"}>
                                            Todas
                                        </MenuItem>
                                        {statuses.map((c) => (
                                        <MenuItem key={c.id} value={c.name}>
                                        {c.name}
                                        </MenuItem>
                                        ))} 
                                </TextField> 
                                </div>
                                <div className="col"> 
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="searchCuotes"
                                        placeholder="Buscar por Cuotas Adeudadas"
                                        disabled={disabled}
                                        onBlur={handleBlur}
                                        value={values.searchCuotes}
                                        onChange={(e) => {
                                            setFieldValue("searchCuotes", e.target.value);
                                            handleSubmit();
                                        }}
                                    />
                                </div>
                                <div className="col col-lg-3"> 
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="searchText"
                                        placeholder="Buscar por nombre, DNI, días de mora"
                                        disabled={disabled}
                                        onBlur={handleBlur}
                                        value={values.searchText}
                                        onChange={(e) => {
                                            setFieldValue("searchText", e.target.value);
                                            handleSubmit();
                                        }}
                                    />
                                </div>
                                <div className="col col-lg-2"> 
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="dni"
                                        placeholder="DNI"
                                        onBlur={handleBlur}
                                        value={values.dni}
                                        onChange={(e) => {
                                            setBtnValue('Forzar Documento')
                                            setFieldValue("dni", e.target.value);
                                        }}
                                    />
                                </div>
                                <div className='col'>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        size="small"
                                        disabled={(isNaN(Number(values.dni)) || loading || !(values.dni.length > 6)) && btnValue !== "Volver"}
                                        onClick={() => {
                                            handleForce(values.dni, setFieldValue)
                                        }}
                                        endIcon={
                                            loading && <CircularProgress size={16} color="secondary"/>  
                                            }
                                        >
                                            {btnValue}
                                    </Button>
                                </div>
                        </div>
                    </form>
                )}
            </Formik>
            {data.length > 0 ? 
            (
            <div className="symbol-label ml-2" onClick={() => getExcel(propertiesData, "Gestión de cobranzas")}>
                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
            </div>
            ):(
            <div className="symbol-label ml-2">
                <i className="flaticon2-download icon-xl text-secondary"></i>
            </div>
            )}
        </>
    );
}

ListingFilter.defaultProps = {
    disabled: false,
}

ListingFilter.propTypes = {
    disabled: propTypes.bool
}

export default ListingFilter;