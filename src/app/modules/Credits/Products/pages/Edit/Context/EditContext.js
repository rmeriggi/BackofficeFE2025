import React, {createContext, useContext, useReducer } from "react"
import { EDIT_PRODUCT} from "./actions"
import { useAllTrx } from "../../../../../../utils/apiHooks"
import useIsMountedRef from "../../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../../../_metronic/layout";
import { useCreditDestiny, useEarningsData, useFrecuencies, useQuotaCalculate, useScoreSource } from "../../../utils/apiHook";
import { useAllScoreParams } from "../../../../../Settings/Scoreparams/utils/apiHooks";
import { getCountries, getCurrencies, getEntities } from "../../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../../hooks";

const EditContext = createContext()

export function useEditContext() {
  return useContext(EditContext);
}

const initialState = {
  product: {
    idEntity: "1",
    idCountry: "1",
    product: "",
    date: new Date(),
    expiration: new Date(),
    idCurrency:"1",
    investment: "",
    quotaMin: "",
    quotaMax: "",
    TEA: "",
    TNA: "",
    CFT: "",
    quota:"",
    minAmount: "",
    maxAmount: "",
    status: 0,
    minScore: "",
    maxScore: "", 
    minCalification: "",
    maxCalification: "",
    expenses: "",
    taxes:"",
    punitive: "",
    creditsQuantity: "",
    RCI: "",
    idLoginData: "1",
    cutDay: "",
    expirationDay: "",
    freeDay: "",
    idFrecuency: 1,
    automaticApproval: 0,
    automaticTransfer: 0,
    idDebitTransaction: 1,
    idCreditTransaction: 1,
    idDebitAutomaticTransaction: 1,
    idCreditDestiny: 1,
    idQuotaCalculate: 1,
    reputation: 0
  }
}

const editReducer = (state, {type, product}) => {
  if(type === EDIT_PRODUCT){
    return {
       product : {...state.product, ...product} 
    }
  }
}

export function EditContextProvider({children}) {

  const isMountedRef = useIsMountedRef();
  const [state, dispatch] = useReducer(editReducer, initialState)
  const [countriesData] = useFetchCombos('countries', getCountries)
  const [currenciesData] = useFetchCombos('currencies', getCurrencies)
  const [entitiesData] = useFetchCombos('entities', getEntities)
  const [frequenciesData, frequenciesCompleted] = useFrecuencies(isMountedRef)
  const [trxTypeData, trxTypeCompleted] = useAllTrx(isMountedRef)
  const [earnings, earningsCompleted] = useEarningsData(isMountedRef)
  const [quotaCalculate, quotaCalculateCompleted] = useQuotaCalculate(isMountedRef)
  const [creditsDestiny, creditsDestinyCompleted] = useCreditDestiny(isMountedRef)
  const [scoreSourceData, scoreSourceCompleted] = useScoreSource(isMountedRef);
  const [scoreParamsData, scoreParamsCompleted] = useAllScoreParams(isMountedRef);
  
  if(!(
    frequenciesCompleted &&
    trxTypeCompleted && 
    earningsCompleted && 
    quotaCalculateCompleted &&
    creditsDestinyCompleted &&
    scoreParamsCompleted &&
    scoreSourceCompleted)){
    return <LayoutSplashScreen />
  }

  const values = {
    state,
    dispatch,
    countriesData,
    currenciesData,
    entitiesData,
    frequenciesData,
    earnings,
    trxTypeData,
    quotaCalculate,
    creditsDestiny,
    scoreSourceData,
    scoreParamsData
  }
  return (
    <EditContext.Provider value={values}>
      {children}
    </EditContext.Provider>
  )
} 