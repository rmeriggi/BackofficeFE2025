import React from 'react';
// import { StateChangeCell } from '../../components/StateChangeCell';
import { StateAuthCell } from '../../components/StateAuthCell';

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
}]


function AuthColumnFormatter(cellContent,row, rowIndex, {changeStatusCharge}) {
  const AuthorizedChargeTitles = [
    'SI ',
    'NO'
  ];

  return (
    <>
     {false ?
      <span style={estilo[Number(row.authorized)]} className="badge badge-success">
      {AuthorizedChargeTitles[Number(row.authorized)]}
    </span>     
     :<StateAuthCell fetched={true} idCharge={Number(row.authorized)} id={row.id} TransferPrice={row.TransferPrice} performance={row.performance} FX={row.FX} notes={row.notes}/>}
    </>    
  );
}

export default AuthColumnFormatter;



