import { Grid } from '@material-ui/core'
import React from 'react'
import FooterBarGraphic from './FooterBarGraphic'
import FooterDoughnutGraphic from './FooterDoughnutGraphic'
import FooterLineGraphic from './FooterLineGraphic'

export default function CardGraphic({children, title, data}) {
  const {total, variation} = data
  
  return (
    <Grid item xs={12} md={3} className="bg-white mh-100 mt-5 rounded shadow-sm" style={{height: "600px", minWidth: "335px"}}>
      <div className="d-flex justify-content-between my-5 p-4">
        <h3>{title}</h3>
        <div className="text-center">
          {title === "Transacciones" ? (
            <>
              <h4 style={{fontSize: "1.75rem"}}>{total}</h4>
              <span className={variation > 0 ? 'text-success' : 'text-warning'}>
                {`${variation}%`}
              </span>
            </>
          ): (
            <>
            <h4 style={{fontSize: "1.75rem"}}>$ {new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(total) }</h4>
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
    </Grid>  
  )
}
