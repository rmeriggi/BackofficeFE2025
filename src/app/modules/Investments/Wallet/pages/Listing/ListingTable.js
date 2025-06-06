/* eslint-disable eqeqeq */
import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { makeStyles } from '@material-ui/core';
import BootstrapTable from "react-bootstrap-table-next";

const useStyles = makeStyles(theme => ({
    listing: {
      fontSize:'10px!important',
      textAlign: 'center'
    },
    colorColumn:{
      fontSize:'10px!important',
      textAlign: 'center',
 
    },
    header:{
        fontSize:'10px!important',
        textDecorationColor:'black'       

    }
  }));
  
  const rowStyleTable = (row, rowIndex) => {
    const style = {};
    if (row.activeName == "") {
      style.backgroundColor = '#c8e6c9';
    } 
  
    return style;
  };

export function ListingTable( { programsData, country } ) {

    const classes = useStyles()


    const columns = [
        {
            dataField: "activeType",
            text: "Activo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "activeName",
            text: " ",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "ppp",
            text: "PPP",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "quantity",
            text: "Cantidad",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "closingPrice",
            text: "Precio al Cierre",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "alyc",
            text: "Cuenta Alyc",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "alyc2",
            text: "Cta. Alyc2",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: `${classes.colorColumn}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "prsh",
            text: "PRSH",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "foreign",
            text: "Cuenta Afuera",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "total",
            text: "Total",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "h24",
            text: "24Hs",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        
        {
            dataField: "d7",
            text: "7D",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        
        {
            dataField: "last14",
            text: "Últimos 14 Días",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        
        {
            dataField: "plDay",
            text: "P&l Day",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
    ]

    return (
        programsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"créditos"}/>
        ) : (
            <BootstrapTable
                  keyField="active"
                  data={ programsData }
                  columns={ columns }
                  condensed
                  bordered = {false}
                  rowStyle={ rowStyleTable }
                /> 
        )
    )
}

 
ListingTable.defaultProps = {
    programsData: []
};

ListingTable.propTypes = {
    accountData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        description: propTypes.string,
        status: propTypes.string,
        fromDate: propTypes.string,
        toDate: propTypes.string,
        frequency: propTypes.string,
    }))
}
