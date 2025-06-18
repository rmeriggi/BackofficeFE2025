import React from "react";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

export default function ErrorPageMenu() {
  return (
    <div className="d-flex flex-column flex-root h-100">
      <div
        className="error error-6 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/error/bg6.jpg")})`,
        }}
      >
        <div className="d-flex flex-column flex-row-fluid text-center">
          <h1
            className="font-weight-boldest text-white mb-12"
            style={{ fontSize: "8rem" }}
          >
            Oops...
          </h1>
          <p className="display-4 font-weight-bold text-white">
            Parece que algo salió mal.
            <br />
            Estamos trabajando en ello
          </p>
        </div>
      </div>
    </div>
  );
}
