import { useState } from 'react';

export const useModal = () => {

  const [show, setShow] = useState(false);
  const [id, setId] = useState()

  const openModal = (id) => {
    if(id || id === 0){
      setId(id)
    }
    setShow(true)
  }
  const closeModal = () => {
    setShow(false)
  }

  return [show, openModal, closeModal, id]
};
