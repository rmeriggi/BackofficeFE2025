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
}]


function ChargeColumnFormatter(cellContent,row, rowIndex, {changeStatusCharge}) {
  const AuthorizedChargeTitles = [
    'SI ',
    'NO',
    'QUANTEX'
  ];

  return (
    <>
     {false ?
      <span style={estilo[row.charge-1]} className="badge badge-success">
      {AuthorizedChargeTitles[row.charge-1]}
    </span>     
     :<StateChangeCell fetched={true} idCharge={Number(row.charge)} market={row.market} id={row.id}/>}
    </>    
  );
}

export default ChargeColumnFormatter;


