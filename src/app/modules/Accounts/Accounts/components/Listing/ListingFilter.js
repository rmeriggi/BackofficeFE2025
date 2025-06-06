import React, { useState, useMemo} from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import { getExcel } from '../../../../../utils/exportExcel';
import {useListingTableContext} from "./ListingTableContext";
import { getAllAccountsList } from "../../utils/service"
import { formatAmountReport } from '../../../../../utils/formatData';
import { getCurrencies } from '../../../../../_redux/combos/combosActions';
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';
import { MenuItem } from '@material-ui/core';
import { useFetchCombos } from '../../../../../hooks';

const prepareFilter = (queryParams, values) => {
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.alias = values;
    filter.bussinesName = values;
    filter.cvu = values
    filter.cuit = values
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({disabled, data, setAccountsData, setLoading}) => {

    const [currencies] = useFetchCombos('currencies', getCurrencies)
    const [reportData, setReportData] = useState() 
    const {
        queryParams,
        setQueryParams,
        setPageNumber
    } = useListingTableContext();

    useMemo(() => {
        const toReport = formatAmountReport(data)
        setReportData(toReport)
    }, [data])
    
    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };

    async function newListing(values) {
        const response = await getAllAccountsList(values.idCurrency)
        const formatedData = formatAmountReport(response.allAccounts)
        setAccountsData(formatedData)
        setLoading(false)
    }

    const propertiesData = {
        header: ['Cuit',"Razón social",'Alias', 'cvu', "saldo"],
        properties:["cuit","bussinesName",'alias','cvu',"amount"] ,
        array: reportData,
    }

    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    idCurrency: 2
                }}
                onSubmit={(values) => {
                   return newListing(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      handleChange,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder="Buscar"
                                    disabled={disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        applyFilter(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-6">
                                <GeneralSelector 
                                    values={values}
                                    valueName='idCurrency'
                                    keyName='currency'
                                    label='Moneda'
                                    data={currencies}
                                    setFieldValue={setFieldValue}
                                    insideOnchange={(e) => {
                                        handleChange(e);
                                        handleSubmit()
                                        setLoading(true)
                                }}
                                    extraMenuItem= {
                                    <MenuItem key={0} value={0}>
                                        Todas
                                    </MenuItem>
                                    }
                                />
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            {data.length > 0 ? 
            (
            <div className="symbol-label ml-7" onClick={() => getExcel(propertiesData, "Cuentas")}>
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