import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { makeStyles } from '@material-ui/core';

const filterData = (programsData, filter) => {
    let filteredData = programsData;
    if (filter.description !== "" || filter.id !== "") {
        filteredData = programsData.filter(program => {
            if (
                program.description.toLowerCase().includes(filter.description.toLowerCase()) ||
                program.id.toString().toLowerCase().includes(filter.id.toString().toLowerCase()) 
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

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
  

export function ListingTable( { programsData, country } ) {

    const classes = useStyles()

    const columns = [
        {
            dataField: "actives",
            text: "Activos",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
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
            dataField: "buyPrice",
            text: "Precio de Compra",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "marketPrice",
            text: "Precio de Mercado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "totalInvested",
            text: "Total Invertido",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "totalMarket",
            text: "Total Mercado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "pl",
            text: "Ganancia/Pérdida",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: `${classes.colorColumn}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "percentage",
            text: "%",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "cuponDividends",
            text: "Dividendos & Cupones",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "walletPercentage",
            text: "Porcentajes de la Cartera",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
        {
            dataField: "sellMade",
            text: "Venta Realizada",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
          classes: `${classes.listing}`,
            headerClasses: `${classes.header}`
        },
    ]
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(programsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        programsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"créditos"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
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
