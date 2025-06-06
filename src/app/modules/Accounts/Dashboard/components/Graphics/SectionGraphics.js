import React from 'react'
import { BalancesGraphics } from './BalancesGraphics'
import { CashinGraphics } from './CashinGraphics'
import { CashoutGraphics } from './CashoutGraphics'
import { InternalsGraphics } from './InternalsGraphics'
import GraphicBar  from './GraphicBar';
import CardGraphic from './CardGraphic';

export default function SectionGraphics({data}) {

  const { balances, cashin, cashout, internals, transactions } = data

  return (
    <>
      <div className="row">
        <div className="col-lg-8 col-xxl-8 col-md-6">
          <BalancesGraphics
            title="Saldos"
            data={balances}
            className="card-stretch gutter-b"
            symbolShape="symbol-circle"
            baseColor="primary"
          />
        </div>
        <div className="col-lg-4 col-xxl-4">
          <CardGraphic title="Transacciones" data={transactions}>
            <GraphicBar data={transactions.data}/>
          </CardGraphic>
        </div>  
      </div>
      <div className="row">
       <div className="col-lg-4 col-xxl-4 col-md-6">
          <CashinGraphics 
            className="card-stretch gutter-b" 
            title="Cash in"
            data={cashin}
            />
        </div>
        <div className="col-lg-4 col-xxl-4">
          <CashoutGraphics
            className="card-stretch gutter-b"
            symbolShape="symbol-circle"
            baseColor="danger"
            title="Cash out"
            data={cashout}
          />
        </div>
        <div className="col-lg-4 col-xxl-4 col-md-6">
          <InternalsGraphics
            className="gutter-b"
            symbolShape="symbol-circle"
            baseColor="danger"
            title="Internas"
            data={internals}
          />
        </div>
      </div>
    </>
  )
}
