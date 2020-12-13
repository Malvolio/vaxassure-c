import React, { FC, useCallback } from "react";
import QrReader from "react-qr-reader";

export const ScanMode: FC<{ approveScan?: (s: string) => boolean }> = ({
  children,
  approveScan = () => true,
}) => {
  const onScan = useCallback(
    (s: string | null) => {
      if (!s) {
        return;
      }

      const approve = approveScan(s);
      if (!approve) {
        return;
      }
      const match = /#.*/.exec(s);
      if (match) {
        window.location.replace(match[0]);
      }
    },
    [approveScan]
  );
  return (
    <div className="page">
      <h2>Scan</h2>

      <div style={{ width: 250 }}>
        <QrReader onError={console.error} onScan={onScan} />
      </div>
      {children}
    </div>
  );
};
