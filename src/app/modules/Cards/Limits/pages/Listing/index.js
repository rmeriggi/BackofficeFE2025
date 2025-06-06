import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import ListingFilter from "./ListingFilter";

const limitsMock = {
    limitsList: [
        {
            id: 1,
            providerName: 'PRISMA',
            providerLastname: 'S.A.',
            issuerName: 'viuMI',
            issuerLastname: 'Argenpay S.A.U',
            brand: 'MASTERCARD',
            cardId: 1,
            limit: 150000,
        },
        {
            id: 2,
            providerName: 'PRISMA',
            providerLastname: 'S.A.',
            issuerName: 'viuMI',
            issuerLastname: 'Argenpay S.A.U',
            brand: 'VISA',
            cardId: 2,
            limit: 100000,
        },
        {
            id: 3,
            providerName: 'HNT Bank',
            providerLastname: 'myHNT',
            issuerName: 'HNT Bank',
            issuerLastname: 'myHNT',
            brand: 'HNT',
            cardId: 3,
            limit: 250000,
        },
        {
            id: 4,
            providerName: 'PRISMA',
            providerLastname: 'S.A.',
            issuerName: 'viuMI',
            issuerLastname: 'Argenpay S.A.U',
            brand: 'VISA PREPAGA',
            cardId: 3,
            limit: 30000,
        },
    ]
}

export function Listing() {
    // const isMounted = useIsMountedRef()
    // const [limits, limitsCompleted] = useAllProducts(isMounted)
   
    // if(!limitsCompleted){
    //   return <LayoutSplashScreen />
    // }
    const {limitsList} = limitsMock

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={limitsList.length === 0} data={limitsList}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable limits={limitsList}/>
            </CardBody>
        </Card>
    )
}