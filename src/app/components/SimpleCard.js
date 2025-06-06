import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
      border: '1px solid #d5d5d5',
      width: '250px',
      height: '80px',
      borderRadius: '10px'
  },
  number: {
      fontWeight: '600'
  },
  cardHeader: {
      height: '50%',
      borderBottom: '1px solid #d5d5d5',
      textAlign: 'center'
  },
}));
const formatAmount = (data) => {
    if(data){
        const balancesFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(data) 
        return balancesFormated
    }else if(data === 0){
        return 0
    }
}

export function SimpleCard({title, data}) {
  const classes = useStyles()
  const amountFormated = formatAmount(data)
 
  return (
    <div className={`px-3 py-2 mr-2 mb-2 ${classes.card} `}>
      <div className={classes.cardHeader}>
          <span className={`font-weight-bold  font-size-h9 text-center`}> 
              {title}
          </span>
      </div>
      <div>
          <span className={` font-size-h2 text-center text-center mt-2 d-block my-2 ${classes.number}`}> 
              {data || data === 0 ? `$${amountFormated}` : "-"}
          </span>
      </div>
  </div>
  )
}
