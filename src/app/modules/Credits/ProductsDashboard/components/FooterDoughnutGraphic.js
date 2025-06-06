import React from 'react'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ProgressDoughnut from './ProgressDoughnut'

function progressDataDoughnut (volume){
  const { credits, collections, total} = volume
  //let cashinProgress = cashin * 100 / total
  let creditsProgress = credits * 100 / total
  let collectionsProgress = collections * 100 / total
  const dataDoughnut = [
  //{progress: cashinProgress, color: "#289DF5", title: "cash in", value: cashin },
  {progress: creditsProgress, color: "#52D23D", title: "Créditos" , value: credits },
  {progress: collectionsProgress, color: "#FBC93F", title: "Cobros" , value: collections},
  ]
  return dataDoughnut
} 

export default function FooterDoughnutGraphic({volume}) {
  
  const dataDoughnut = progressDataDoughnut(volume)

  return (
    <>
    <div className="d-flex justify-content-between mt-5 py-3 px-4 border-top border-bottom" style={{heigth:'75%'}}> 
      
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#52D23D" className="mr-3"/>
        Créditos
      </span>
      <span style={{fontSize: "0.75rem"}}>
        <RadioButtonUncheckedIcon fontSize="small" htmlColor="#FFD400" className="mr-3"/>
        Cobros
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
