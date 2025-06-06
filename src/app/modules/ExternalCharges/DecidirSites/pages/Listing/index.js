/* eslint-disable eqeqeq */
import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import { sitesAdapter } from "../../adapters/sitesAdapter";
import ListingFilter from "./ListingFilter";
import { DownloadArchive } from "../../../../../components";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { LoadingList } from '../../../../../components/LoadingList'
import { useListingTableContext } from "./ListingTableContext";
import { getListSites } from "../../utils/service";
import { useCallAPI } from "../../../../../hooks";

export default function Listing() {

    const subHeader = useSubheader()
    subHeader.setTitle('ID Sites')
    const history = useHistory()
    const { sitesContext, setSiteContext } = useListingTableContext()
    const [loading] = useCallAPI(getListSites, setSiteContext, undefined, sitesAdapter)

    const propertiesData = {
        header: ['ID',"Cliente",'Site', 'IdSite'],
        properties:["id", 'client', "site",'siteId'],
    }

    const createSite = () => {
        history.push("/externalcharges/sites/new")
    }


    if(!sitesContext) return <LayoutSplashScreen />

    return (
        <Card>
            <CardHeader title={
                <LoadingList fetched={loading}/>
            }>
                <CardHeaderToolbar>
                    <ListingFilter  disabled={!sitesContext.length === 0 } data={sitesContext}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="ml-4"
                        size="medium"
                        onClick={() => createSite()}
                        >
                            Nuevo Site
                    </Button>
                    <DownloadArchive listing={sitesContext} name="Sites" data={propertiesData}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody> 
                <ListingTable 
                    dataTable={sitesContext} 
                />
            </CardBody>
        </Card>
    )
}