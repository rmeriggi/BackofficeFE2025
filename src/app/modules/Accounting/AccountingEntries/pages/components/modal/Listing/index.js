import React from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "../../../../../../../../_metronic/_partials/controls";
import { formatMoney } from "../../../../../../../utils/formatData";
import { ListingTable } from "./ListingTable";

export default function Listing({id, open, accountEntry}) {

    const formattedData = accountEntry.map((e)=> {
        const debitAmount = formatMoney(e.debitAmount)
        const creditAmount = formatMoney(e.creditAmount)
        return {
            ...e,
            debitAmount,
            creditAmount
        }
    })
    const debitAmounts = accountEntry.map((e)=> Number(e.debitAmount))
    const creditAmounts = accountEntry.map((e)=> Number(e.creditAmount))
    const totalDebit = debitAmounts.reduce((previusValue, currentValue)=> previusValue + currentValue, 0)
    const totalCredit = creditAmounts.reduce((previusValue, currentValue)=> previusValue + currentValue, 0)

    formattedData.push({
        idAux: 'TOTALES:',
        auxName:'',
        debitAmount: formatMoney(totalDebit),
        creditAmount: formatMoney(totalCredit)
    })

    return (
        <Card>
            <CardBody>
                <ListingTable 
                    accountingEntriesData={formattedData} 
                />
            </CardBody>
        </Card>
    )
}