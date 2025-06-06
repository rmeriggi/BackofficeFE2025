import React from 'react'
import Listing from './exception-flap/Listing'
import { useAllExceptions } from '../../utils/apiHooks';
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { ListingTableContextProvider } from './exception-flap/Listing/ListingTableContext'

const validation = (data) => {
  if(data.length === 0){
    return []
  }else{
    return data.exceptions
  }
}

export default function TaxExceptionFlap({id}) {

  const isMounted = useIsMountedRef();

  const [exceptionsData, taxesCompleted] = useAllExceptions(id,isMounted);
  
  if (!taxesCompleted) {
    return <LayoutSplashScreen />;
  }
  
  const exceptions  = validation(exceptionsData)

  return (
    <ListingTableContextProvider>
      <Listing exceptions={exceptions}/> 
    </ListingTableContextProvider>
  
  )
}
