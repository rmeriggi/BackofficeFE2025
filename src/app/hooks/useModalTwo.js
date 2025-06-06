import { useState } from 'react';

export const useModalTwo = () => {

  const [showTwo, setShow] = useState(false);
  const [id, setId] = useState()

  const openModalTwo = (id) => {
    if(id || id === 0){
      setId(id)
    }
    setShow(true)
  }
  const closeModalTwo = () => {
    setShow(false)
  }

  return [showTwo, openModalTwo, closeModalTwo, id]
};