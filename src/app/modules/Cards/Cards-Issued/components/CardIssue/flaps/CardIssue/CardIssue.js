import React from "react";
import { CardIssueForm } from "./CardIssueForm";
import { Charts } from "./Charts";

export default function CardIssueContent({
  cardInfo,
  btnRef,
  setIsSubmitting,
  saveEditCard,
}) {
  const { card, charts } = cardInfo;

  return (
    <div className="row">
      <CardIssueForm
        values={card}
        btnRef={btnRef}
        setIsSubmitting={setIsSubmitting}
        saveEditCard={saveEditCard}
      />
      <Charts charts={charts} />
    </div>
  );
}
