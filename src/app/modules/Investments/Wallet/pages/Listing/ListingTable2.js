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
  

export function ListingTable2( { programsData, country } ) {

    const classes = useStyles()

    const columns = [
        {
            dataField: "active",
            text: "Activos",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "quantity",
            text: " ",
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
                  striped
                  condensed
                />  
        )
    )
}

 
ListingTable2.defaultProps = {
    programsData: []
};

ListingTable2.propTypes = {
    accountData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        description: propTypes.string,
        status: propTypes.string,
        fromDate: propTypes.string,
        toDate: propTypes.string,
        frequency: propTypes.string,
    }))
}
