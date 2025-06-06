import React from 'react'
import AccountsTable from './AccountsTable'
import { ListingTableContextProvider } from './ListingTableContext';
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../_metronic/_partials/controls";
import AccountsData from './AccountsData';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useStatusCredits } from '../../../Credits/Credits/utils/apiHook';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
  
export default function AccountsListEdit({data, buttonCvu}) {

  const {dataAccount} = data
  const isMounted = useIsMountedRef()
  const [statusCredits, statusCreditsComplete] = useStatusCredits(isMounted)

  if(!statusCreditsComplete) return <LayoutSplashScreen />

  const { creditsStatus } = statusCredits

  return (
    <Card>
      <CardHeader title="Movimientos" >
        <CardHeaderToolbar>
          <AccountsData account={dataAccount} buttonCvu={buttonCvu}/>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
      <ListingTableContextProvider >
        {data.movementsHnt && 
          <AccountsTable 
            movements={data.movementsHnt}
            creditsStatus={creditsStatus} 
        />}
        {data.movementsAr && 
          <AccountsTable 
           movements={data.movementsAr} 
           creditsStatus={creditsStatus}
        />}
        {data.movementsUs && 
          <AccountsTable 
            movements={data.movementsUs}
            creditsStatus={creditsStatus} 
          />} 
      </ListingTableContextProvider>
      </CardBody>
    </Card>
  )
}
