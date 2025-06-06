import React from 'react'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ProgressDoughnut from './ProgressDoughnut'

function progressDataDoughnut (volume){
  const {cashin, cashout, internals, total} = volume
  let cashinProgress = cashin * 100 / total
  let cashoutProgress = cashout * 100 / total
  let internalsProgress = internals * 100 / total
  const dataDoughnut = [
  {progress: cashinProgress, color: "#289DF5", title: "FCI", value: cashin },
  {progress: cashoutProgress, color: "#52D23D", title: "Acciones" , value: cashout },
  {progress: internalsProgress, color: "#FBC93F", title: "Bonos" , value: internals},
  ]
  return dataDoughnut
} 

export default function FooterDoughnutGraphic({volume}) {
  
  const dataDoughnut = progressDataDoughnut(volume)

  return (
    <>
    <div className="d-flex justify-content-between mt-5 py-5 px-4 border-top border-bottom">
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#2CA0F7" className="mr-3"/>
        Cash IN
      </span>
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#52D23D" className="mr-3"/>
        Cash OUT
      </span>
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#FFD400" className="mr-3"/>
        Internas
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
