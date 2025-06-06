import React from 'react'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ProgressDoughnut from './ProgressDoughnut'

function progressDataDoughnut (volume){
  const { cashout, internals, total, cashin} = volume
  let cashoutProgress = cashout * 100 / total
  let internalsProgress = internals * 100 / total
  let cashinProgress = cashin * 100 / total
  const dataDoughnut = [
  {progress: cashoutProgress, color: "#52D23D", title: "Transferencias" , value: cashout },
  {progress: internalsProgress, color: "#FBC93F", title: "Links de pago" , value: internals},
  {progress: cashinProgress, color: "#FBC98F", title: "Bocas de efectivo" , value: cashin},
  ]
  return dataDoughnut
} 

export default function FooterInversionDoughnutGraphic({volume}) {
  
  const dataDoughnut = progressDataDoughnut(volume)

  return (
    <>
    <div className="d-flex justify-content-between mt-5 py-3 px-4 border-top border-bottom">
      
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#52D23D" className="mr-3"/>
        Transferencias
      </span>
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#FFD400" className="mr-3"/>
        Links de pago
      </span>
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#FFD400" className="mr-3"/>
        Bocas de efectivo
      </span>
    </div>
    <div className="py-5 px-4 row">
      {
        dataDoughnut.map(data => 
          <ProgressDoughnut 
            key={data.title} 
            progress={data.progress} 
            color={data.color} 
            title={data.title} 
            value={data.value}/>)
      }
    </div>
    </>
  )
}
