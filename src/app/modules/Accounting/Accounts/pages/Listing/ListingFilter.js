/* eslint-disable eqeqeq */
import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import {useListingTableContext} from "./ListingTableContext";
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import { createMuiTheme, TextField, colors, MenuItem, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { DownloadArchive } from '../../../../../components';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});

const prepareFilter = (queryParams, values) => {
    const {searchText,  idGroup} = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.account = searchText;
    filter.idGroup = idGroup;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = (props) => {

    const history = useHistory();
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

    const getReportFormatted = (report) => {
        const newReport = report.map((e)=>{
            const group = props.groups.find(group=> group.id == e.group).group 
            return {
                ...e,
                group,
            }
        })
        return newReport
    }
    
    const propertiesData = {
        header: ['ID','Entidad', 'Moneda', 'Grupo', "Cuenta"],
        properties:['id', 'entity', 'currencyName', "group", "account"],
    }
    
    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    idGroup: 0,
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
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row justify-space-around">
                            <div className="col-6" style={{width:'350px'}}>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder="Buscar"
                                    disabled={props.disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        handleSubmit();
                                    }}
                                />
                            </div>
                            <div className="col-6">
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextField
                                        fullWidth
                                        select
                                        size="small"
                                        label="Grupo"
                                        variant="outlined"
                                        value={values.idGroup}
                                        onChange={(e) => {
                                            setFieldValue("idGroup", e.target.value)
                                            props.setValuesAccounts({
                                                ...props.valuesAccounts,
                                                idGroup: e.target.value
                                            })
                                            handleSubmit()
                                        }}
                                        >
                                            <MenuItem key={0} value={0}>
                                                Todos
                                            </MenuItem>
                                        {props.groups.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                            {e.group}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </ThemeProvider >
                            </div>
                        </div>
                        
                    </form>
                )}
            </Formik>
            <Button
                variant="contained"
                color="secondary"
                className="ml-4"
                size="large"
                onClick={() => history.push(`/accounting/accounts/new`)}
                
            >
                Crear
            </Button>
            <DownloadArchive listing={getReportFormatted(report)} data={propertiesData} name='Cuentas'/>
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