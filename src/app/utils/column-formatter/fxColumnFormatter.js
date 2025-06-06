import React from 'react';
import { StateChangeCell } from '../../components/StateChangeCell';

export const estilo =[{
  backgroundColor:'#B6FF89',
  borderRadius: '5px', 
  color: '#38970C',
  border: 'none',
  paddingRight: '2px', 
  width: '60px'
},
{
  backgroundColor:'#F6C3C9',
  borderRadius: '5px', 
  color: '#F64E60',
  border: 'none',
  paddingRight: '2px',
  width: '60px' 
},
{
  backgroundColor:'#FFF96E',
  borderRadius: '5px', 
  color: '#844F00',
  border: 'none',
  paddingRight: '2px',
  width: '80px' 
},
{
  backgroundColor:'#CCD1D1 ',
  borderRadius: '5px', 
  color: '030303',
  border: 'none',
  paddingRight: '2px',
  width: '80px' 
}]


function FxColumnFormatter(cellContent,row, rowIndex, {changeStatusCharge}) {

  const AuthorizedChargeTitles = [
    'FX ',
    'OP',
    'PASE',
    'ANULAR'
  ];

  return (
    <>
     {true ?
      <span style={estilo[Number(row.FX)-1]} className="badge badge-success">
      {AuthorizedChargeTitles[Number(row.FX)-1]}
    </span>     
     :<StateChangeCell fetched={true} idCharge={Number(row.idAuthorized)} id={row.id}/>}
    </>    
  );
}

export default FxColumnFormatter;


