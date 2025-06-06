import React  from "react";
const RoundedPicture = ({ icon }) => {
    return (
      <div
        style={{
          backgroundColor: "#d1dde5",
          height: "60px",
          width: "64px",
          maxWidth: "100px",
          maxHeight: "100px",
        }}
        className="rounded-circle d-flex justify-content-center align-items-center position-relative"
      >
        {icon}
      </div>
    );
  };
  
export default RoundedPicture;