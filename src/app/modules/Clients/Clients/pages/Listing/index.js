import React from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useFetchClients } from "../../../../../hooks";
import { Listing } from "../../../../../components";
import { useClientsContext } from "../../context/ClientsContext";
import { columnsClients, columnsToReportClients, filterSearch, reportFormatted } from "../../context/ContextHelper";
import { useFormatColumn } from "../../hooks/useFormatColumn";

export default function ClientsListing() {

    const [clients, loading] = useFetchClients()
    const values = useClientsContext()

    const formats = useFormatColumn()

    if(!clients || loading){
      return <LayoutSplashScreen />
    }

    return (
        <Listing
            title="Clientes"
            listing={clients}
            downloadFormatList={{
                listing: reportFormatted(filterSearch(clients, values.queryParams.filter)),
                columns: columnsToReportClients
            }}
            tableProps={{
                columns: columnsClients, 
                fnFilter: filterSearch, 
                formatsColumns: formats,
                name: 'Clientes'
            }}
            contextValues={values}
        />
    )
}