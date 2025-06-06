import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CardGraphic from '../components/CardGraphic';
import CardsShow from '../components/CardsShow';
import GraphicBar from '../Graphics/GraphicBar';
import GraphicDoughnut from '../Graphics/GraphicDoughnut';
import GraphicLine from '../Graphics/GraphicLine';
import { LayoutSplashScreen, useSubheader } from '../../../../../_metronic/layout'
import { getClientStatistics } from '../utils/service';
import { FilterModal } from '../components/filterModal/FilterModal';
import { getCurrencies, getEntities } from '../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../hooks';

const initialValues = {
  idCurrency: 2,
  idEntity: 1
}

const StatisticsPage = () => {

  const [currency] = useFetchCombos('currencies', getCurrencies)
  const [entities] = useFetchCombos('entities', getEntities)
  const [dashboardInfo, setDashboardInfo] = useState()
  const [values, setValues] = useState(initialValues);
  const subheader = useSubheader()
  subheader.setTitle("Mes en curso")
  
  useEffect(()=>{
    const getStatistics = async()=> {
      const response = await getClientStatistics(values)
      setDashboardInfo(response)
    }
    getStatistics()
  },[values])
 
  if(!dashboardInfo){
    return <LayoutSplashScreen />
  }

  const { charts } = dashboardInfo;
  const { transactions, volume, balances } = charts

  return (
    <>
      <CardsShow data={dashboardInfo}/>
      <Grid container justify="space-between" className="mt-5">
          <CardGraphic title="Transacciones" data={transactions}>
            <GraphicBar data={transactions.data}/>
          </CardGraphic> 
          <CardGraphic title="Volumen" data={volume}>
            <GraphicDoughnut data={volume}/>
          </CardGraphic> 
          <CardGraphic title="Saldo promedio" data={balances}>
            <GraphicLine data={balances}/>
          </CardGraphic> 
      </Grid>    
      <FilterModal 
        show={subheader.openFilter}
        onHide={subheader.handleClose}
        currencies={currency} 
        entities={entities} 
        setValues={setValues} 
        values={values}
      />
    </>
  )
}

export default StatisticsPage;