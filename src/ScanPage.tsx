import React, { FC, useCallback, useState } from "react";
import { useHasBatchInfos } from "./shared/BatchInfo";
import { ScanMode } from "./shared/ScanMode";

export const ScanPage: FC<{}> = () => {
  const hasBatchInfos = useHasBatchInfos();
  const [error, setError] = useState("");
  const checkCerts = useCallback(
    (scannedValue: string) => {
      const goodScan = hasBatchInfos || !scannedValue.includes("#v/");
      setError(
        goodScan
          ? ""
          : "You must scan a Batch Certificate before you can activate passports"
      );

      return goodScan;
    },

    [hasBatchInfos]
  );
  return (
    <ScanMode approveScan={checkCerts}>
      <p className="error">{error}</p>
      <p className="instruction">
        Please scan a Batch Certificate{" "}
        {hasBatchInfos && <span>or VaxAssure&trade; passport</span>}.
      </p>
    </ScanMode>
  );
};
