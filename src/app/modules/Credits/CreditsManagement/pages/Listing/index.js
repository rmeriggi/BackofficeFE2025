/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import { useStatusCredits } from "../../utils/apiHook";
import { useAllProducts } from "../../../Products/utils/apiHook";
import { creditsAdapter, productsAdapter, statusCreditsAdapter } from "../../../adapters";
import { withLayoutSplashScreen } from "../../../../../HOCs/withLayoutSplashScreen";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { getAllCreditsList } from "../../utils/service";

const Listing = ({data}) => {

    const [allCredits, setAllCredits] = useState([])
    const [loading, setLoading ] = useState(true)
    const [statusCredits, productsData] = data
    const credits  = creditsAdapter(allCredits)
    const creditsStatus  = statusCreditsAdapter(statusCredits.creditsStatus)
    const products  = productsAdapter(productsData.products)

    useEffect(() => {
        async function getProductsCreditsList() {
            const req = {
                status: 0,
                fromDate: new Date(),
                toDate: new Date()
            }
            const response = await getAllCreditsList(req)
            setAllCredits(response)
            setLoading(false)
        }
        getProductsCreditsList()
    }, [])
    

    const newArr = credits.map(c => {
        const productName = products?.find(p => p.id == c.productName)?.product || "Sin datos"
        const status = creditsStatus?.find(s => s.id == c.status )?.status || "Sin datos"
        return {
            ...c,
            productName,
            status,
        }
    })

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter 
                        disabled={newArr.length === 0}
                        creditsData={newArr}
                        setAllCredits={setAllCredits}
                        setLoading={setLoading} 
                        creditsStatus={creditsStatus}
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {loading ? 
                    <CircularProgress size={20} color="secondary"/> 
                :
                    <ListingTable creditsData={newArr} creditsStatus={creditsStatus}/>
                }   
            </CardBody>
        </Card>
    )
}

const hooks = [
    {
        hook: useStatusCredits
    },
    {
        hook: useAllProducts,
        params: {idEntity: 0, idCurrency:0},
    }
]
export default withLayoutSplashScreen(Listing, hooks)