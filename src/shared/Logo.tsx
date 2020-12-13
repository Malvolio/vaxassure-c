import React, { FC } from "react";

export const Logo: FC<{}> = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img src="./logo-color.svg" alt="" style={{ height: 48, margin: 5 }} />
    <span style={{ fontFamily: '"Philosopher"', fontSize: 28 }}>VaxAssure</span>
    &trade;
  </div>
);
