import { Grid } from '@material-ui/core'
import React from 'react'
import FooterDoughnutGraphic from './FooterDoughnutGraphic'

export default function CardGraphic({children, title, data}) {
  const {total, variation} = data
  
  return (
    <Grid item xs={12} md={3} className="bg-white mh-100 mt-5 rounded shadow-sm" style={{height: "530px", minWidth: "335px"}}>
      <div className="d-flex justify-content-between my-5 p-4">
        <h3>{title}</h3>
        <div className="text-center">    
              {title === "Asset Class" ? (
            <>
              <h4 style={{fontSize: "1.75rem"}}>${total}</h4>
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
          )
          }   
        </div>
      </div>
      <div style={{width: "100%", height: "auto"}} className="my-5">
        {children}
      </div>
        <FooterDoughnutGraphic volume={data}/>
  
    </Grid>  
  )
}
