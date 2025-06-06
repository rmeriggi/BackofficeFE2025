import React from "react";
import {Card, CardBody, CardHeader} from "../../../../../../_metronic/_partials/controls";
import {ListingTable} from "./ListingTable";
import {ListingTable2} from "./ListingTable2";
import {ListingTable3} from "./ListingTable3";
import {ListingTable4} from "./ListingTable4";
import { useSubheader } from "../../../../../../_metronic/layout";
import statisticsMocks from "../../__mocks__/statisticsMocks";
import CardGraphic from "../../components/CardGraphic";
import GraphicDoughnut from "../../Graphics/GraphicDoughnut"
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";



const table3Mock = [
    {
        pasive: "Caución MEP",
        quantity: 10231
    },
    {
        pasive: "Caución Pesos",
        quantity: 100000
    },
    {
        pasive: "Préstamos",
        quantity: 1585320
    },
    {
        pasive: "TOTAL",
        quantity: 16542310
    },
]

const table2Mock = [
    {
        active:"Posicion Monetaria DOLAR Cable",
        quantity:100000
    },
    {
        active:"Posicion Monetaria EURO Cable",
        quantity:11000
    },
    {
        active:"Acciones Locales",
        quantity:298452
    },
    {
        active:"Acciones Exterior",
        quantity:7854
    },
    {
        active:"Obligaciones Negociables",
        quantity:8412
    },
    {
        active:"Titulos Publicos",
        quantity:100000
    },
    {
        active:"Opciones",
        quantity:100000
    },
    {
        active:"TOTAL",
        quantity:854210
    }
    
    
]

const programsMock = [
    
    {
        activeType:" ",
        activeName:"SUPV",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" Dólar Blue",
        activeName:"BBAR",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" ",
        activeName:"CEPU",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" ",
        activeName:"GGAL",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    }, 
     {
        activeType:" ",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:"",
        alyc2:"",
        prsh:"",
        foreign:"",
        total:"",
        h24: "",
        d7:"",
        last14:"",
        plDay:""
    },
    {
        activeType:" Euro Cable",
        activeName:"GGAL",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    }, 
    {
        activeType:" ",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:"",
        alyc2:"",
        prsh:"",
        foreign:"",
        total:"",
        h24: "",
        d7:"",
        last14:"",
        plDay:""
    },
    {
        activeType:" ",
        activeName:"PAMP",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" Acciones Locales",
        activeName:"LOMA",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" ",
        activeName:"GGAL",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" ",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:"",
        alyc2:"",
        prsh:"",
        foreign:"",
        total:"",
        h24: "",
        d7:"",
        last14:"",
        plDay:""
    },
    {
        activeType:" ",
        activeName:"XMELI",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },{
        activeType:" Acciones Exterior",
        activeName:"XAPPL",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" ",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:"",
        alyc2:"",
        prsh:"",
        foreign:"",
        total:"",
        h24: "",
        d7:"",
        last14:"",
        plDay:""
    },
     {
        activeType:" ",
        activeName:"ONYPF",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" Obligaciones Negociables",
        activeName:"ONMOLINOS",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" ",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:"",
        alyc2:"",
        prsh:"",
        foreign:"",
        total:"",
        h24: "",
        d7:"",
        last14:"",
        plDay:""
    },
    {
        activeType:" ",
        activeName:"GD35",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:"Títulos Públicos",
        activeName:"AL30",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" ",
        activeName:"AE38",
        ppp:0.2,
        quantity:30000,
        closingPrice:0.43,
        alyc:28.236,
        alyc2:" ",
        prsh:" ",
        foreign:" ",
        total:" ",
        h24: "+4.2%",
        d7:"+5.2%",
        last14:" ",
        plDay:100
    },
    {
        activeType:" TOTAL INVERSIONES",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:" ",
        alyc:352145,
        alyc2:656962,
        prsh:25416,
        foreign:54785,
        total:365874,
        h24: " ",
        d7:"",
        last14:" ",
        plDay:5478547
    },
]

const pasiveTableMock = [
    {
        activeType:"Caución Cta. Correiente Dolar MEP",
        activeName:"",
        ppp:"",
        quantity:10000,
        closingPrice:1.03,
        alyc:10323,
        alyc2:"",
        prsh:"",
        foreign:"",
        total:365874,
        h24: " ",
        d7:"",
        last14:" ",
        plDay:""
    },
    {
        activeType:" ",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:"",
        alyc2:"",
        prsh:"",
        foreign:"",
        total:"",
        h24: "",
        d7:"",
        last14:"",
        plDay:""
    },
    {
        activeType:"Caución Cta. Correiente PESOS",
        activeName:"",
        ppp:"",
        quantity:10000,
        closingPrice:1.03,
        alyc:10323,
        alyc2:"",
        prsh:"",
        foreign:"",
        total:365874,
        h24: " ",
        d7:"",
        last14:" ",
        plDay:""
    },
    {
        activeType:" ",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:"",
        alyc2:"",
        prsh:"",
        foreign:"",
        total:"",
        h24: "",
        d7:"",
        last14:"",
        plDay:""
    },
    {
        activeType:"Préstamo CP Operaciones Abiertas",
        activeName:"",
        ppp:"",
        quantity:10000,
        closingPrice:1.03,
        alyc:10323,
        alyc2:"",
        prsh:"",
        foreign:"",
        total:365874,
        h24: " ",
        d7:"",
        last14:" ",
        plDay:""
    },
    {
        activeType:" ",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:"",
        alyc2:"",
        prsh:"",
        foreign:"",
        total:"",
        h24: "",
        d7:"",
        last14:"",
        plDay:""
    },
    {
        activeType:"Préstamo CP Operaciones Cerradas",
        activeName:"",
        ppp:"",
        quantity:10000,
        closingPrice:1.03,
        alyc:10323,
        alyc2:"",
        prsh:"",
        foreign:"",
        total:365874,
        h24: " ",
        d7:"",
        last14:" ",
        plDay:""
    },
    {
        activeType:" ",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:"",
        alyc2:"",
        prsh:"",
        foreign:"",
        total:"",
        h24: "",
        d7:"",
        last14:"",
        plDay:""
    },
    {
        activeType:"TOTAL DEUDAS",
        activeName:"",
        ppp:"",
        quantity:"",
        closingPrice:"",
        alyc:12547865,
        alyc2:12547865,
        prsh:"",
        foreign:258963,
        total:365874,
        h24: " ",
        d7:"",
        last14:" ",
        plDay:""
    },

]



const {charts} = statisticsMocks;

export default function Listing() {

    const suhbeader = useSubheader();
    const history = useHistory()
    suhbeader.setTitle("Cartera");

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
            {<div > 
                <div style={{width:'50%', float:'left'}}>
                <table>
                <tr>
                <th>Total Activo:</th>
                <td>$1.000.000</td>
            </tr>
            <tr>
                <th>Total Pasivo:</th>
                <td style={{color:'red'}}>$1.799.965</td>
            </tr>
            <tr>
                <th>PN:</th>
                <td>$779.362</td>
            </tr>
                </table>
             <CardGraphic title="Asset Class" data ={charts.volume}> 
                <GraphicDoughnut data={charts.volume} />
            </CardGraphic>
            </div>
            <div style={{width:'50%', float:'left'}}> 
            <ListingTable2 programsData={table2Mock}  />    
            <ListingTable3 programsData={table3Mock}  />  
            </div>
            </div>}
            </CardBody>
            <CardBody>
                <ListingTable programsData={programsMock}  />  
                
                <ListingTable4 programsData={pasiveTableMock}  style={{paddingTop: "15px"}}/>                    
                
            </CardBody>
        </Card>
    )
}