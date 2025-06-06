import React, { useState } from "react";
import RoundedPicture from "./RoundedPicture";
import ButtonsContainerTable from "./ButtonsContainerTable";
import { DeleteModal } from "../../../Clients/BankAccounts/pages/Listing/components/DeleteModal";

const BankAccountData = ({
  showButtons,
  dataCvuSuplier,
  idSuplier,
  refetch,
  showView = false,
  transferIcon = false,
  trashIcon = true,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(true); 
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
        <h6>{dataCvuSuplier.bank || "Sin Dato"}</h6>
        <h5 className="fw-bold" style={{ color: "#103F5A" }}>
          {dataCvuSuplier.name || "Sin Razon Social"}
        </h5>
        <span className="text-semibold" style={{ color: "#103F5A" }}>
          CVU {""}
        </span>
        <span className="text-gray-500">
          {dataCvuSuplier.cvu_cbu || "Sin Dato"}
        </span>
      </article>
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
    <DeleteModal
  show={showDeleteModal}
  setShow={setShowDeleteModal}
  accountId={dataCvuSuplier.id}
  clientId={idSuplier}
  refetch={refetch}
/>
    </div>
  );
};

export default BankAccountData;
