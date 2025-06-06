import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import CardGraphic from '../components/CardGraphic';
import CardsShow from '../components/CardsShow';
import DebitBarGraphic from '../Graphics/DebitBarGraphic';
import GraphicDoughnut from '../Graphics/GraphicDoughnut';
import CreditBarGraphic from '../Graphics/CreditBarGraphic';
import {  useSubheader } from '../../../../../_metronic/layout'
import {Card, CardHeaderToolbar} from "../../../../../_metronic/_partials/controls";
import {getDashboardInfo} from '../../../Credits/CollectionsDashboard/utils/service';
import statisticsMocks from '../../../Credits/CollectionsDashboard/__mocks__/statisticsMocks';
import { FilterModal } from '../components/filterModal/FilterModal';
import { getCurrencies, getEntities } from '../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../hooks';

const date2 = new Date()

const initialValues = {
    group: 0,
    idEntity: 0,
    module: 0,
    idCurrency: 0,
    fromDate: new Date(date2.getTime() - (7 * 24 * 60 * 60 * 1000)),
    toDate: new Date()
}

const groupsMock = {
    groups: [
        {
            id: '1',
            group: 'Grupo 1'
        },
        {
            id: '2',
            group: 'Grupo 2'
        }
    ]
}

const modulesMock = {
    modules: [
        {
            id: '1',
            module: 'Módulo 1'
        },
        {
            id: '2',
            module: 'Módulo 2'
        }
    ]
}
const StatisticsPage = () => {

  const subheader = useSubheader()
  subheader.setTitle("Dashboard De Contabilidad"); 
  const [currencies] = useFetchCombos('currencies', getCurrencies)
  const [entities] = useFetchCombos('entities', getEntities) 

  useEffect(() => {
    const getDashboard = async () => {
       await getDashboardInfo(initialValues)
    }
    getDashboard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
   
  const {groups} = groupsMock;
  const {modules} = modulesMock;
  const {charts} = statisticsMocks;

  return (
    <>
        <Card>       
            <CardHeaderToolbar style={{margin: '0 auto'}}>
                <FilterModal
                    initialValues={initialValues}
                    currencies={currencies}
                    entities ={entities}
                    groups = {groups}
                    modules = {modules}
                    show={subheader.openFilter}
                    onHide={subheader.handleClose}
                />
            </CardHeaderToolbar>    
        </Card>
        <CardsShow /*data={statisticsMocks}*/ /> 
        <Grid container justify="space-between" className="mt-9">
            <CardGraphic title="Crédito" data={charts.credits}>
                <CreditBarGraphic data={charts.credits.data} />
            </CardGraphic>        
            <CardGraphic title="Débito" data={charts.collections}>
                <DebitBarGraphic data={charts.collections.data} />
            </CardGraphic> 
            <CardGraphic title="Volumen" data ={charts.volume}> 
                <GraphicDoughnut data={charts.volume} />
            </CardGraphic>  
        </Grid>    
        <Grid> 
        <div style={{ position: 'relative', textAlign: 'center', paddingTop:'25px'}}> 
            <h6 >
            Última actulización: {`${new Date().toLocaleString()}`} 
            </h6>
        </div>   
        </Grid>
    </>
  )
}

export default StatisticsPage;