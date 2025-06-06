/* eslint-disable eqeqeq */
import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';
import {isEqual} from "lodash";
import {useListingTableContext} from "./ListingTableContext";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, TextField, colors, MenuItem, Button } from '@material-ui/core';
import { DownloadArchive } from '../../../../../components';
import { useHistory } from 'react-router-dom';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});

const prepareFilter = (queryParams, values) => {
    const { searchText, idEntity, idCurrency, idAccount } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.subaccount = searchText;
    filter.idCurrency = idCurrency;
    filter.idEntity = idEntity;
    filter.idAccount = idAccount;
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
            const idAccount = props.accounts.find(account=> account.id == e.account)?.account
            return {
                ...e,
                idAccount,
            }
        })
        return newReport
    }

    const propertiesData = {
        header: ['ID', 'Cuenta', 'Subcuenta'],
        properties:['id', 'idAccount', 'subAccount'] ,
    }

    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    idCurrency: 0,
                    idEntity: 0,
                    idAccount: 0,
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
                      handleChange,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row justify-space-around">
                            <div className="col-lg-6" style={{width:'350px'}}>
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
                            <div className="col-lg-6">
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextField
                                        fullWidth
                                        select
                                        size="small"
                                        label="Cuenta"
                                        variant="outlined"
                                        value={values.idAccount}
                                        onChange={(e) => {
                                            setFieldValue("idAccount", e.target.value)
                                            props.setSubaccountsParams({
                                                ...props.subaccountsParams,
                                                idAccount: e.target.value
                                            })
                                            handleSubmit()
                                        }}
                                    >
                                            <MenuItem key={0} value={0}>
                                                Todos
                                            </MenuItem>
                                        {props.accounts.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                            {e.account}
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
                onClick={() => history.push(`/accounting/subAccounts/new`)}
            >
                Agregar
            </Button>
            <DownloadArchive listing={getReportFormatted(report)} data={propertiesData} name='Subcuentas'/>
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