import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import BootstrapTable from "react-bootstrap-table-next";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    listing: {
      fontSize:'5px!important',
      textAlign: 'center'
    },
    colorColumn:{
        backgroundColor:'#F6F3F3!important',
      fontSize:'5px!important',
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight:'bold'
    },
    header:{
        fontSize:'5px!important',
        textDecorationColor:'black'      
    },
    listing2: {
        fontSize:'8px!important',
        textAlign: 'center'
      },
  }));

export function ListingTable( { programsData, country } ) {

    const classes = useStyles()

    const columns = [
        {
            dataField: "activesUSD",
            text: "Activos (USD)",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,            
          classes: `${classes.listing2}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "quantity",
            text: "Cantidad (VN)",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "pxCleanCost",
            text: "px Costo Clean",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "cleanAmount",
            text: "Monto Clean",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "dirtyAmount",
            text: "Monto Dirty",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "pxDirtyBuy",
            text: "px Compra Dirty",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "pxMarketClean",
            text: "px Mercado Clean",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: `${classes.colorColumn}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "cleanAmount",
            text: "Monto Clean",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "pxMarketDirty",
            text: "px Mercado Dirty",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "actualDirtyAmount",
            text: "Monto Actual Dirty",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "unrealizedClean",
            text: "Unrealized Clean",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "netCarryAndCoupons",
            text: "Carry + Cupones",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "totalPL",
            text: "Total P&L",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "cuponDividends",
            text: "Cupon/Dividends",
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
            keyField="activesUSD"
            data={ programsData }
            columns={ columns }
            condensed
            bordered = {false}
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
