import React, { FC } from "react";

export const Warning: FC<{}> = () => (
  <div
    style={{
      width: "100%",
      backgroundColor: "yellow",
      padding: "5px 0",
    }}
  >
    Protect against fraud: check that the URL is
    <span style={{ fontFamily: "monospace" }}> https://vaxassure.me</span> !
  </div>
);
