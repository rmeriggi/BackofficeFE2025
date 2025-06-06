import React, { useEffect, useState } from 'react'
import { LayoutSplashScreen, useSubheader } from '../../../../../../_metronic/layout'
import { Card, CardBody } from '../../../../../../_metronic/_partials/controls'
import { AccumulatedInterests } from '../../components/graphics/AccumulatedInterests'
import { RoundsActives } from '../../components/graphics/RoundsActives'
import { Amounts } from '../../components/header/Amounts'
import { Avatar } from '../../components/header/Avatar'
import { RoundsProgress } from '../../components/header/RoundsProgress'
import { LastOperations } from '../../components/Tables/LastOperation/LastOperations'
import { NextPayments } from '../../components/Tables/NextPayment/NextPayments'
import {OperationsContextProvider} from "../../components/Tables/LastOperation/ListingTableContext"
import { NextPaymentContextProvider } from '../../components/Tables/NextPayment/ListingTableContext'
import { colorCode } from "../../../../../utils/aleatoryColors"
import { getInversion } from '../../utils/service'
import { useParams } from 'react-router-dom'

export default function InvestmentPage () {

  const [dashboard, setDashboard] = useState()
  const subheader = useSubheader()
  subheader.setTitle("Inversiones");
  const {id} = useParams()

  useEffect(() => {
    const getDashboard = async() => {
      const response = await getInversion(id)
      const { header } = response.dashboard
      subheader.setInformation({name: header.name, passport: header.dni})
      setDashboard(response.dashboard)
    }
    getDashboard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if(!dashboard) return <LayoutSplashScreen />

  const {charts, operations, nextPayments, header} = dashboard
  const amounts = {
    investedCapital: header.investedCapital,
    collected:       header.collected,
    toCollect:       header.toCollect
  }

  const dataRoundsActive = charts.roundAmount.data.map(r => {
    const round = {
      ...r,
      color: colorCode()
    }
    return round
  })

  const rounds = charts.roundAmount.data.map(r => {
    const round = {
      id: r.id,
      round: r.round
    }
    return round
  })

  return (
    <Card>
      <CardBody>
        <div className='d-flex justify-content-between border-bottom pb-5'>
          <Avatar image={header.urlImage} />
          <Amounts amounts={amounts}/>
          <RoundsProgress rounds={header.round}/>
        </div>
        <div className='d-flex py-10 border-bottom'>
          <RoundsActives data={dataRoundsActive}/>
          <AccumulatedInterests rounds={rounds}/>
        </div>
        <div className='d-flex'>
          <OperationsContextProvider>
            <LastOperations data={operations}/>
          </OperationsContextProvider>
          <NextPaymentContextProvider>
            <NextPayments data={nextPayments} />
          </NextPaymentContextProvider>
        </div>
      </CardBody>
    </Card>
  )
}
