import React from 'react'
import FooterBarGraphic from './FootersCharts/FooterBarGraphic'
import FooterDoughnutGraphic from './FootersCharts/FooterDoughnutGraphic'
import FooterLineGraphic from './FootersCharts/FooterLineGraphic'

export default function CardGraphic({children, title, data}) {
  const {total, variation} = data
  
  return (
    <div className="bg-white mh-100 rounded shadow-sm col-3" style={{height: "600px"}}>
      <div className="d-flex justify-content-between align-items-start my-2">
        <h4>{title}</h4>
        <div className="text-center">
          {title === "Transacciones" ? (
            <>
              <h4 >{total}</h4>
              <span className={variation > 0 ? 'text-success' : 'text-warning'}>
                {`${variation}%`}
              </span>
            </>
          ): (
            <>
            <h4>$ {new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(total) }</h4>
            <span className={variation > 0 ? 'text-success' : 'text-warning'}>
              {variation > 0 ? `+ ${variation}%`: `${variation}%`}
            </span>
          </>
          )}
        </div>
      </div>
      <div style={{width: "100%", height: "auto"}} className="my-5">
        {children}
      </div>
      {title === "Transacciones" && <FooterBarGraphic transactions={data}/>}
      {title === "Volumen" && <FooterDoughnutGraphic volume={data}/>}
      {title === "Saldo promedio" && <FooterLineGraphic balances={data}/>}

     
    </div>  
    
  )
}
