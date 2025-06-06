import React from "react";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import ListingFilterSelects from "./ListingFilterSelects";
import ListingFilter from "./ListingFilter";
import {ListingTable} from"./ListingTable"


const states = [
    {
        id:1,
        state: "Com"
    },
    {
        id:2,
        state: "Incompleta"
    },    
]


const products = [
    {
        id:1,
        product: "Fondo A",
        status:"Com",
        type:"SUS",
        orderDate:"10-09-21",
        amount:"425",
        order:"Mercado",
        price:"15",
        operationDate:"10-09-21",
        quantity:321,
        operationPrice:"4141",
        operationAmount:"458",
        operator:"Juan"
    },
    {
        id:2,
        product: "Fondo B",
        status:"Com",
        type:"SUS",
        orderDate:"10-09-21",
        amount:"425",
        order:"Mercado",
        price:"15",
        operationDate:"10-09-21",
        quantity:"321",
        operationPrice:"4141",
        operationAmount:"458",
        operator:"Juan"
    },
    {
        id:3,
        product: "ASAP30D",
        status:"Com",
        type:"SUS",
        orderDate:"10-09-21",
        amount:"425",
        order:"Mercado",
        price:"15",
        operationDate:"10-09-21",
        quantity:"321",
        operationPrice:"4141",
        operationAmount:"458",
        operator:"Juan"
    },
    {
        id:4,
        product: "RATA60D",
        status:"Com",
        type:"SUS",
        orderDate:"10-09-21",
        amount:"425",
        order:"Mercado",
        price:"15",
        operationDate:"10-09-21",
        quantity:"321",
        operationPrice:"4141",
        operationAmount:"458",
        operator:"Juan"
    },        
]


export default function Listing() {

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter
                        disabled={products.length === 0}
                        products={products}
                    /> 
                    <ListingFilterSelects                    
                        states={states}
                        products={products}/> 
                                        
                </CardHeaderToolbar>                
            </CardHeader>  
            <CardBody>
                <ListingTable productsData={products}/>
            </CardBody>  
            
        </Card>

    )



}