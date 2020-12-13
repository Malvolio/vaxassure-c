import React, { FC } from "react";
import { useClearBatchInfo, useListBatchInfos } from "./shared/BatchInfo";
import { Button } from "./shared/Button";
import { count } from "./words";

export const HomePage: FC<{}> = () => {
  const allCertificates = useListBatchInfos();
  const clear = useClearBatchInfo();

  return (
    <div className="page">
      <h2>Home</h2>
      <div className="instructions">
        <p>This is the VaxAssure&trade; clinician’s tool. Use it to</p>
        <ol style={{ textAlign: "left" }}>
          <li>
            Scan the Batch Certificate from each batch of vaccines before you
            administer them to the patients.
          </li>
          <li>
            After you administer each vaccination, scan the patient’s
            VaxAssure&trade; passport, take their photograph, and activate the
            passport.
          </li>
        </ol>
        {allCertificates.length > 0 && (
          <>
            <p>
              You now have {count("Batch Certificate", allCertificates.length)}{" "}
              loaded. If you are giving up control of this device, you should
              clear all certificates:
            </p>
            <div>
              <Button onClick={clear}>Clear All Certificates</Button>
            </div>
          </>
        )}
        {allCertificates.length === 0 && (
          <p>
            You now have no Batch Certificates loaded, so you cannot activate
            passports. Press the Scan button below to scan a Batch Certificates
            included with a batch of vaccines.
          </p>
        )}
      </div>
    </div>
  );
};
