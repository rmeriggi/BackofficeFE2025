import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {TotalColumnFormatter} from '../../../../../../utils/column-formatter/TotalColumnFormatter';
import { AmountColumnFormatter } from '../../../../../../utils/column-formatter/AmountColumnFormatter';

const columns = [
    {
        dataField: "user",
        text: "Gestor",
        sort: true,
        headerClasses: "align-top",
        formatter: TotalColumnFormatter,
        classes: 'text-center'
    },
    {
        dataField: "amount",
        text: "Monto total",
        sort: true,
        headerClasses: "align-top pl-10",
        classes: 'text-center',
        formatter: AmountColumnFormatter
    },
    {
        dataField: "credits",
        text: "Total de créditos",
        sort: true,
        headerClasses: "align-top pl-10",
        classes: 'text-center'
    },
]
export function ListingWallet({assignList}) {

    const {asignCredits} = assignList

    const getTotals = (list) => {
        const noTotal = list.find(e=> e.user === 'TOTAL')
        if(noTotal === undefined){
            let totalAmount=0;
            let totalCredits=0;
            for(let i = 0; i < list.length; i++) {
                totalAmount = totalAmount + list[i].amount;
                totalCredits = totalCredits + list[i].credits;
            }
            const total= {
                user: 'TOTAL',
                amount: totalAmount,
                credits: totalCredits,
            }
            list.push(total)
            return list
        } else {
            return list
        }
    }

    return (
         <BootstrapTable
          wrapperClasses="table-responsive"
          classes="table table-head-custom table-vertical-center overflow-hidden"
          bordered={false}
          bootstrap4
          remote
          keyField="user"
          data={getTotals(asignCredits)}
          columns={columns}
         >
         </BootstrapTable>
    )
}