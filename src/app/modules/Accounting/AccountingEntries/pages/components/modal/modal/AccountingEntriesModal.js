import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import useIsMountedRef from "../../../../../../../hooks/useIsMountedRef";
import { useOneEntryDetail } from "../../../../utils/apihooks";
import { formatMoney } from "../../../../../../../utils/formatData";
import Listing from "../Listing";
import { ListingTableContextProvider } from "../Listing/ListingTableContext";

export function AccountingEntriesModal({ show, onHide, idEntryDetail }) {

  const isMounted = useIsMountedRef()
  const [oneEntryDetail, oneEntryDetailCompleted] = useOneEntryDetail(isMounted, idEntryDetail, show)

  if(!oneEntryDetailCompleted) return null

  const headerDetail = oneEntryDetail?.headerDetail || {}
  const details = oneEntryDetail?.details || []

  return (
    <Modal
      show={show}
      onHide={onHide}
      size={'xl'}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Body className="overlay overlay-block cursor-default">
        {headerDetail === undefined  ? (
          <>
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div> 
          </>
        ) : (
         <>
          <div className="row justify-content-center">
            <div className="col-3">
              <p className="text-center"><strong>Nro. Asiento</strong></p>
              <p className="text-center">{headerDetail.idEntry}</p>
            </div>
            <div className="col-3">
              <p className="text-center"><strong>Fecha</strong></p>
              <p className="text-center">{headerDetail?.date}</p>
            </div>
            <div className="col-3">
              <p className="text-center"><strong>Descripción</strong></p>
              <p className="text-center">{headerDetail?.description}</p>
            </div>
            <div className="col-3">
              <p className="text-center"><strong>Importe</strong></p>
              <p className="text-center">{formatMoney(headerDetail?.total)}</p>
            </div>
          </div>
          <div className="px-5 pt-5 border-top">
            <ListingTableContextProvider >
              <Listing 
                id={headerDetail.idEntry}
                open={show}
                accountEntry={details}
              />       
            </ListingTableContextProvider>   
          </div>
        </>
        )}

      </Modal.Body>
      <Modal.Footer className="form">
          <Button
              variant="contained"
              color="secondary"
              size="large"
              className="mr-5"
              onClick={()=> window.print()}
          >
              Imprimir
          </Button>
          <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={onHide}
          >
              Volver
          </Button>
      </Modal.Footer>
    </Modal>
  );
}
