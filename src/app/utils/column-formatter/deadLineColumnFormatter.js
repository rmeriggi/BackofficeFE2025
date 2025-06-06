import React from "react";

export const BlotterDeadLineCssClasses = [
  "success",
  "warning",
  "info",
  "info",
];
export const BlotterDeadLineTitles = [
  'CI',
  '24hs',
  '48hs',
  'PPL'
];

export function DeadLineColumnFormatter(cellContent, row) {
  let index=0
  if(row.deadline.trim() == 'CI'){
    index=0
  }
  if(row.deadline.trim() == '24 Hs.'){
    index=1
  }
  if(row.deadline.trim() == '48hs'){
    index=2
  }
  if(row.deadline.trim() == 'PPL'){
    index=3
  }
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      BlotterDeadLineCssClasses[index]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {row.deadline.trim()}
    </span>
  );
}

