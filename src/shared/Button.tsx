import React, { CSSProperties, FC } from "react";

export const Button: FC<{
  sx?: CSSProperties;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ onClick, sx, children }) => (
  <div
    onClick={onClick}
    style={{
      display: "inline-block",
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      marginBottom: 5,
      padding: "2px 5px",
      border: "thin solid darkgray",
      borderRadius: 4,
      ...sx,
    }}
  >
    {children}
  </div>
);
