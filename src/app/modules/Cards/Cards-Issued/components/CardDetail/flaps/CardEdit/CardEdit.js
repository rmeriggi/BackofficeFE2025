import React from "react";
import { CardEditForm } from "./CardEditForm";
import { Charts } from "./Charts";

export default function CardEdit({
  cardInfo,
  btnRef,
  setIsSubmitting,
  saveEditCard,
  idCard,
}) {
  const { card, charts } = cardInfo;

  return (
    <div className="row">
      <CardEditForm
        values={card}
        btnRef={btnRef}
        setIsSubmitting={setIsSubmitting}
        saveEditCard={saveEditCard}
        idCard={idCard}
      />
      <Charts charts={charts} />
    </div>
  );
}
