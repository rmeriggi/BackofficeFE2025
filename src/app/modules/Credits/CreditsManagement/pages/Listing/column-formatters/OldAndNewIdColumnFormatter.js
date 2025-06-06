import React from "react"

export const OldAndNewIdColumnFormatter = (cellContent,row) => {

  return (
   <div>
     <span>{row.id}{row.originalId ? " - " + row.originalId : ""}</span>
   </div>
  )
}
