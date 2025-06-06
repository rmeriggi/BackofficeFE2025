import { Grid } from '@material-ui/core'
import React from 'react'
import FooterDoughnutGraphic from '../components/FooterDoughnutGraphic'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';




export default function HorizontalCardGraphic({children, title, data}) {

   const {total, variation} = data
  return (
    <Grid item xs={12} md={3} className="bg-white mh-100 mt-5 rounded shadow-sm" style={{height: "auto", minWidth: "40%"}}>  
    <Grid>
     <div className="d-flex justify-content-between my-5 p-4">
        <h3>{title}</h3>
        <div className="text-center">
          {title === "Situación de Cartera" ? (
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
      <div>
        {children}
      </div> 
        <div className="d-flex justify-content-between px-4 py-5 border-bottom border-top align-items-center">
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#2CA0F7" className="mr-3"/>
        Al día
      </span>
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#52D23D" className="mr-3"/>
        Mora +30
      </span>
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#FFD400" className="mr-3"/>
       Mora +60
      </span>
    </div>
            
    </Grid>  
     <Grid className="bg-white mh-100 mt-5"  style={{width:"50%"}}>
       {title === "Situación de Cartera" && <FooterDoughnutGraphic volume={data}/>} 
    </Grid>
    </Grid>
    
  )
}
