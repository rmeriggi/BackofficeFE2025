import { useRef } from "react";

const usePrint = () => {
  const printRef = useRef();

  const handlePrint = () => {
    if (!printRef.current) return;

    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return { printRef, handlePrint };
};

export default usePrint;
