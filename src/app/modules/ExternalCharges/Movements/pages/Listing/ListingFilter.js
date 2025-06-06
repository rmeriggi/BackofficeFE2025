/* eslint-disable eqeqeq */
import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';
import {isEqual} from "lodash";
import {useListingTableContext} from "./ListingTableContext";
import { getExcel } from '../../../../../utils/exportExcel';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, TextField, colors, MenuItem } from '@material-ui/core';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});

const prepareFilter = (queryParams, values) => {
    const { searchText, searchTextAll, idStatus } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.operationNumber = searchText;
    filter.searchTextAll = searchTextAll;
    filter.idStatus = idStatus;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = (props) => {

    const [report, setReport] = useState([])
      
    useMemo(() => {
        const dataFormated = props.data
        setReport(dataFormated)
    }, [props.data])

    const {
        queryParams,
        setQueryParams,
        setPageNumber,
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
        header: ['N° de operación',"Fecha de Operacion","N° de Autorización",'Descripción', 'Tipo', 'Importe', 'Estado', 'Grupo Estado', 'Motivo', 'Tipo Error'],
        properties:['operationNumber',"date", "authorizationNumber",'description', 'type', 'amount', 'status', 'groupState', 'reason', 'errorType'] ,
        array: report,
    }
    
    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    searchTextAll: "",
                    idStatus: 0
                }}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="d-flex justify-content-end" style={{width : "500px"}}>
                            <div className='row'>
                                <div className='col-4'>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="searchTextAll"
                                        placeholder="Buscar"
                                        disabled={props.disabled}
                                        onBlur={handleBlur}
                                        value={values.searchTextAll}
                                        onChange={(e) => {
                                            setFieldValue("searchTextAll", e.target.value);
                                            handleSubmit()
                                        }}
                                    />
                                </div>
                                <div className='col-4'>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextField
                                        style={{width:'150px'}}
                                        select
                                        size="small"
                                        label="Estado"
                                        variant="outlined"
                                        value={values.idStatus}
                                        onChange={(e) => {
                                            setFieldValue("idStatus", e.target.value)
                                            handleSubmit()
                                        }}
                                        >
                                            <MenuItem key={0} value={0}>
                                                Todos
                                            </MenuItem>
                                        {props.status.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                            {e.status}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </ThemeProvider >
                                </div>
                                <div className='col-4'>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder="Buscar por n° de operación"
                                    disabled={props.disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("idStatus", e.target.value)
                                        handleSubmit()
                                    }}
                                />
                                </div>
                            </div>           
                    </form>
                )}
            </Formik>
            {props.data.length > 0 ? 
            (
            <div className="symbol-label ml-7" onClick={() => getExcel(propertiesData, "Movimientos")}>
                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
            </div>
            ):(
            <div className="symbol-label ml-7">
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