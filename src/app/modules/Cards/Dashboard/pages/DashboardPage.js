import { Grid } from '@material-ui/core';
import React from 'react';
import CardGraphic from '../components/CardGraphic';
import CardsShow from '../components/CardsShow';
import GraphicBar from '../Graphics/GraphicBar';
import GraphicDoughnut from '../Graphics/GraphicDoughnut';
import GraphicLine from '../Graphics/GraphicLine';
import { useSubheader } from '../../../../../_metronic/layout'
import statisticsMocks from '../__mocks__/statisticsMocks';
import { Card, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { FilterModal } from '../components/modals/FilterModal';
import { productsTypesAdapter } from '../../adapters/cardsAdapters';

let id
const productTypesArr = [
  {
    id: id++,
    name: "Visa débito"
  },
  {
    id: id++,
    name: "MasterDebit"
  },
  {
    id: id++,
    name: "Visa crédito"
  },
  {
    id: id++,
    name: "Mastercard crédito"
  },
  {
    id: id++,
    name: "Visa prepaga"
  },
]

const DashboardPage = () => {

  const subheader = useSubheader()
  subheader.setTitle("Mes en curso")

  const {transactions, volume, balances} = statisticsMocks.charts
  const productTypes = productsTypesAdapter(productTypesArr)

  return (
    <>
      <Card>       
        <CardHeaderToolbar>
          <FilterModal
            show={subheader.openFilter}
            onHide={subheader.handleClose}
            productTypes={productTypes}
          />
        </CardHeaderToolbar>    
      </Card> 
      <CardsShow data={statisticsMocks}/>
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
    </>
  )
}

export default DashboardPage;