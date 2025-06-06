import React from "react";
import { Grid } from '@material-ui/core'
import {Card, CardBody, CardHeader} from "../../../../../../_metronic/_partials/controls";
import {ListingTable} from "./ListingTable";
import { useSubheader } from "../../../../../../_metronic/layout";
import statisticsMocks from "../../__mocks__/statisticsMocks";
import CardGraphic from "../../components/CardGraphic";
import DebitBarGraphic from "../../Graphics/DebitBarGraphic"
import CreditBarGraphic from "../../Graphics/CreditBarGraphic"
import CreditBarGraphic2 from "../../Graphics/CreditBarGraphic2"
import GraphicDoughnut from "../../Graphics/GraphicDoughnut"
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

const programsMock = [
    
    {
        actives: 'ACTIVOS',
        quantity: '',
        buyPrice: '',
        marketPrice: '',
        totalInvested: '',
        totalMarket: '',        
        pl: '',
        percentage: '',
        cuponDividends: '',        
        walletPercentage: '',
        sellMade: '',
    },
    {
        actives: 'Liquidez',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'RENTA VARIABLE',
        quantity: '',
        buyPrice: '',
        marketPrice: '',
        totalInvested: '',
        totalMarket: '',        
        pl: '',
        percentage: '',
        cuponDividends: '',        
        walletPercentage: '',
        sellMade: '',
    },
    {
        actives: 'Gold',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'Home',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'Adj',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'TOTAL',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'RENTA FIJA',
        quantity: '',
        buyPrice: '',
        marketPrice: '',
        totalInvested: '',
        totalMarket: '',        
        pl: '',
        percentage: '',
        cuponDividends: '',        
        walletPercentage: '',
        sellMade: '',
    },
    {
        actives: 'Arcor23',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'Cgc25',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'TOTAL',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'GANANCIA/PÉRDIDA',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'POSICIONES CERRADAS',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    },
    {
        actives: 'TOTAL',
        quantity: 1260,
        buyPrice: 79,
        marketPrice: 942.5,
        totalInvested: 79.85,
        totalMarket: 948.57,        
        pl: 82.5,
        percentage: 979.15,
        cuponDividends: 1021.259,        
        walletPercentage: 36.791,
        sellMade: 120.264,
    }
]


const {charts} = statisticsMocks;

export default function Listing() {

    const history = useHistory()

    const suhbeader = useSubheader();
    suhbeader.setTitle("Cliente Externo");

    return (
        <Card>
           <CardHeader title="Cuenta 7443 - Gentile Héctor Ángel">
              <Button 
              variant="transparent"
              color="secondary"
              style={{ marginBottom:"10px"}}
              className="ml-4"
              size="large"
              onClick={() => history.push(`/investments/testtable`)}
              > Reporte 1 
              </Button>
        
              <Button 
              variant="transparent"
              color="secondary"
              style={{ marginBottom:"10px"}}
              className="ml-4"
              size="large"
              onClick={() => history.push(`/investments/wallet`)}
              > Reporte Cartera Socio
              </Button>
        
              <Button 
              variant="transparent"
              color="secondary"
              className="ml-4"
              style={{ marginBottom:"10px"}}
              size="large"
              onClick={() => history.push(`/investments/external`)}
              > Cliente Externo
              </Button>
              </CardHeader>
            <CardBody> 
            {<div> 
                <table>
                <tr>
                <th>Cliente:</th>
                <td>Ejemplo</td>
            </tr>
            <tr>
                <th>Período:</th>
                <td>Inicio a Hoy</td>
            </tr>
            <tr>
                <th>Fecha de Hoy:</th>
                <td>09/06/2022</td>
            </tr>
                </table>
                <table>
        <tr>
            <th>Fecha</th>
            <th> </th>
            <th>Fondos Recibidos</th>
        </tr>
        <tr>
            <td>18-Ago-21</td>
            <td> </td>
            <td>$57.610.852</td>           
        </tr>
        <tr>
            <td>15-nov-21</td>
            <td> </td>
            <td>$41.258.363</td>            
        </tr>        
        <tr>
            <td>15-feb-22</td>
            <td> </td>
            <td>$19.362.215</td>            
        </tr>        
        <tr>
            <td>TOTAL</td>
            <td>$101.362.215</td>            
        </tr>
        </table>
            </div>}
            </CardBody>
            <CardBody>
                <ListingTable programsData={programsMock}  />
                <Grid container justify="space-between" className="mt-9">
             <CardGraphic title="Asset Class" data ={charts.volume}> 
                <GraphicDoughnut data={charts.volume} />
            </CardGraphic>
            <CardGraphic title="Geografía" data={charts.credits}>
                <CreditBarGraphic data={charts.credits.data} />
            </CardGraphic>        
            <CardGraphic title="Valor de la Cartera" data={charts.collections}>
                <DebitBarGraphic data={charts.collections.data} />
            </CardGraphic> 
            <CardGraphic title="P-L" data={charts.credits}>
                <CreditBarGraphic2 data={charts.credits.data} />
            </CardGraphic>   
            </Grid>
            </CardBody>
        </Card>
    )
}