// import { useNavigate } from "react-router-dom";
// import { useDashboardFunctions } from "../../../../../contexts/dashboard/authFunctions";
// import { useDashboardContext } from "../../../../../hooks/useDashboardContext";
// import { useUserStore } from "../../../../../store";
// import {
//   deleteSuplierAccount,
//   verifyCBU,
// } from "../../../core/_requests_dashboard";
import React, { useState }  from "react";
import RoundedPicture from "./RoundedPicture";
import ButtonsContainerTable from "./ButtonsContainerTable";
// import Show from "./Show";
// import { ModalTemplate } from "../../../../../../_metronic/layout/components/modals/ModalTemplate";
// import { NotFoundCuit } from "../../../../../../_metronic/layout/components/modals/modalSteps/Juridicas/agent/step1/cuit/NotFoundCuit.tsx";
// import { ModalDeleteSuplierAccount } from "../modals/deleteSuplier/ModalDeleteSuplierAccount.tsx";
const BankAccountData = ({
  showButtons,
  showTransferButton,
  handleTransferButton,
  dataCvuSuplier,
  loadingTransfer,
  showView,
  transferIcon,
  trashIcon,
  idSuplier,
  refetch,
}) => {
//   const { userCredentialsStore } = useUserStore();
//   const { setNewTransferCBU, closeModal } = useDashboardFunctions();
//   const { showModal, setTransferStep, setIsTransferFromContact } =
//     useDashboardContext();
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCBU, setInvalidCBU] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const navigate = useNavigate();

const handleDelete = () => {
  setShowDeleteModal(true);  
};
  const handleTransfer = async () => {
    // try {
    //   const response = await verifyCBU(
    //     dataCvuSuplier?.cvu_cbu,
    //     userCredentialsStore
    //   );
    //   if (response.data.success) {
    //     setNewTransferCBU(response.data.data);
    //     setTransferStep(1);
    //     setIsTransferFromContact(true);
    //     closeModal("transfer_supplier");
    //     navigate("/transfers/new-transfers/cbu");
    //   } else {
    //     setInvalidCBU(true);
    //   }
    // } catch (error) {
    //   setInvalidCBU(true);
    //   console.error("Error:", error);
    // }
  };

  const closeModalError = () => {
    setInvalidCBU(false);
  };

  return (
    <div
      className={
        showButtons
          ? "position-relative d-flex ps-5 ps-md-20 py-4 align-items-center justify-content-between"
          : "position-relative d-flex ps-5 ps-md-20 py-4 align-items-center"
      }
      style={showButtons ? { maxWidth: "450px" } : {}}
    >
      {/* {showModal.delete_suplier_account && (
        <ModalDeleteSuplierAccount
          isLoading={isLoading}
          refetch={handleDelete}
        />
      )} */}
      {/* <Show.When isTrue={invalidCBU}>
        <ModalTemplate closeModalFn={() => closeModalError()}>
          <NotFoundCuit cuit="" setOpenModal={closeModalError} />
        </ModalTemplate>
      </Show.When> */}
      <RoundedPicture
        icon={
          <svg
            width="35"
            height="35"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.65"
              d="M3.86389 12.8262H10.0917V23.7248H13.2056V12.8262H19.4333V23.7248H22.5472V12.8262H28.775V23.7248C30.4948 23.7248 31.8889 25.1189 31.8889 26.8387V28.3956C31.8889 30.1154 30.4948 31.5095 28.775 31.5095H3.86389C2.14414 31.5095 0.75 30.1154 0.75 28.3956V26.8387C0.75 25.1189 2.14414 23.7248 3.86389 23.7248V12.8262Z"
              fill="#103F5A"
            />
            <path
              d="M0.75 8.70744C0.75 7.43415 1.52521 6.28915 2.70742 5.81627L15.163 0.834044C15.9054 0.53709 16.7335 0.537089 17.4759 0.834044L29.9315 5.81627C31.1137 6.28915 31.8889 7.43415 31.8889 8.70744V9.71312C31.8889 11.4329 30.4948 12.827 28.775 12.827H3.86389C2.14414 12.827 0.75 11.4329 0.75 9.71312V8.70744Z"
              fill="#103F5A"
            />
          </svg>
        }
      />
      <article className="ms-6">
        <p className="mb-0" style={{ color: "#103F5A" }}></p>
        <h6>{dataCvuSuplier.bank ? dataCvuSuplier.bank : "Sin Dato"}</h6>
        {/* <h6 style={{ color: "#103F5A" }}>Cuenta bancaria/virtual</h6> */}
        <p>
          <h5 className="fw-bold" style={{ color: "#103F5A" }}>
            {dataCvuSuplier.name ? dataCvuSuplier.name : "Sin Razon Social"}
          </h5>
          <span className="text-semibold" style={{ color: "#103F5A" }}>
            CVU {""}
          </span>
          <span className="text-gray-500">
            {dataCvuSuplier.cvu_cbu ? dataCvuSuplier.cvu_cbu : "Sin Dato"}
          </span>
        </p>
        {/* {loadingTransfer && <Spinner />}        */}
      </article>
      {showButtons ||
        (showTransferButton && !loadingTransfer && (
          <div
            onClick={handleTransfer}
            className="ms-14 btn border border-gray-300"
          >
            <svg
              width="9"
              height="13"
              viewBox="0 0 9 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.55705 6.46892L0.5625 1.53861L2.08258 0.0380859L8.59722 6.46892L2.08258 12.8998L0.5625 11.3992L5.55705 6.46892Z"
                fill="#103F5A"
              />
            </svg>
          </div>
        ))}
      {showButtons && (
        <ButtonsContainerTable
          isSuplierList={false}
          className="justify-content-end gap-4"
          id={dataCvuSuplier.id}
          showView={showView}
          transferIcon={transferIcon}
          trashIcon={trashIcon}
          handleDeleteAccount={handleDelete}
        />
      )}
    </div>
  );
};

export default BankAccountData;