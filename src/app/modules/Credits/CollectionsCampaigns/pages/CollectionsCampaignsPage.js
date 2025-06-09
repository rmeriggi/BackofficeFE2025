import React, { useState } from "react";
import { withSnackbar } from "../../../../HOCs/withSnackbar";
import ConfirmationModal from "../components/ConfirmationModal";

const CollectionsCampaignsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState();

  const openActionModal = () => {
    setShowModal(true);
  };

  const closeActionModal = () => {
    setShowModal(false);
  };

  const campaigns = [
    {
      id: 1,
      title: "Campaña cobro cuenta corriente",
      description: "Gestión de cobranzas para cuentas activas.",
    },
    {
      id: 2,
      title: "Campaña cobro mora temprana",
      description: "Campaña dirigida a clientes con mora reciente.",
    },
    {
      id: 3,
      title: "Campaña cobro mora tardía",
      description: "Cobro enfocado en cuentas con mora prolongada.",
    },
  ];

  return (
    <div className="container bg-white py-5">
      <div className="row">
        {campaigns.map((campaign) => (
          <div className="col-md-4 col-sm-6 mb-4" key={campaign.id}>
            <div
              className="card h-100 shadow-md card-animated cursor-pointer"
              onClick={() => {
                setId(campaign.id);
                openActionModal();
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <h6 style={{ color: "rgb(0, 51, 102)" }} className="mb-3">
                  {campaign.title}
                </h6>
                <p className="text-secondary">{campaign.description}</p>
                <button className="btn btn-secondary mt-3">
                  Seleccionar campaña
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConfirmationModal show={showModal} onHide={closeActionModal} id={id} />
    </div>
  );
};

export default withSnackbar(CollectionsCampaignsPage);
