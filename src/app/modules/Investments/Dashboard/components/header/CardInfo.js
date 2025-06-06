import React from 'react'
import { Grid } from '@material-ui/core'

export default function CardInfo({number, title}) {
  return (
    <Grid item xs={6} sm={4} md={2} className={`text-center ${title=== "Clientes" ? "" : "border-left"} my-2`}>
      <p className="mt-1" style={{fontSize: "1rem"}}>{number}</p>
      <span className="text-muted text-uppercase" style={{fontSize: "0.75rem"}}> {title}</span>
    </Grid>
  )
}
