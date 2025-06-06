import React from "react";
import clsx from "clsx";

const ButtonIcon = ({
  className,
  icon,
  width,
  height,
  disabled,
  functionButton,
}) => {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={functionButton ? () => functionButton() : () => {}}
      style={{ width: width, height: height }}
      className={clsx(`${className} btn-pencil rounded-circle`, {
        "bg-gray-500 text-gray-500": disabled,
      })}
    >
      {typeof icon === "string" ? <i className={icon} /> : icon}
    </button>
  );
};

export default ButtonIcon;