import { Grid } from '@material-ui/core'
import React from 'react'
import { FooterBarGraphic } from '../../../../components'
import { formatMoney } from '../../../../utils/formatData'
import { CollectionsFooterBarGraphic } from './FooterBarGraphic'
import FooterDoughnutGraphic from './FooterDoughnutGraphic'
import FooterInversionDoughnutGraphic from './FooterInversionGraphic'
import FooterLineGrapchic from './FooterLineGraphic'

export default function CardGraphic({children, title, data}) {
  const {total, variation} = data
  
  return (
    <Grid item xs={12} md={3} className="bg-white mh-100 mt-5 rounded shadow-sm" style={{height: "600px", minWidth: "335px"}}>
      <div className="d-flex justify-content-between my-5 p-4">
        <h3>{title}</h3>
        <div className="text-center">    

              {title === "Volumen" || title ==="Canales" || title === "Cobranzas"? (
            <>
              <h4 style={{fontSize: "1.75rem"}}>{formatMoney(total)}</h4>
              <span className={variation > 0 ? 'text-success' : 'text-warning'}>
                {`${variation}%`}
              </span>
            </>
          ): title==="Cobrabilidad"? ( <>
              <h4 style={{fontSize: "1.75rem"}}>%{total}</h4>
              <span className={variation > 0 ? 'text-success' : 'text-warning'}>
                {`${variation}%`}
              </span>
            </>
          ):          
           (
            <>
            <h4 style={{fontSize: "1.75rem"}}>{total}</h4>
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
      {title === "Cobros" && <FooterBarGraphic transactions={data}/>}
      {title === "Volumen" && <FooterDoughnutGraphic volume={data}/>}
      {title === "Créditos" && <FooterBarGraphic transactions={data}/>}
      {title === "Cobrabilidad" && <FooterLineGrapchic balances={data}/>}
      {title === "Canales" && <FooterInversionDoughnutGraphic volume={data}/>}
      {title === "Cobranzas" && <CollectionsFooterBarGraphic transactions={data}/>}

    </Grid>  
  )
}
