import React, { FC, useCallback } from "react";
import { useListBatchInfos, useChooseBatchInfo } from "./shared/BatchInfo";
import { Button } from "./shared/Button";
import { VerificationPair } from "./shared/Types";
import { useGotoClick } from "./shared/useGoto";
import { Vaccines } from "./shared/Vaccines";
import { useActivate } from "./useActivate";

const SelectCertificate: FC<{}> = () => {
  const allCertificates = useListBatchInfos();
  const choose = useChooseBatchInfo();
  const onClick = useCallback((cert) => () => choose(cert), [choose]);

  return (
    <select>
      {allCertificates.map((cert) => (
        <option key={cert.batchId} onClick={onClick(cert)}>
          {Vaccines[cert.vaccine].name} — {cert.batchId}
        </option>
      ))}
    </select>
  );
};

export const Activate: FC<{
  photo: string;
  pair: VerificationPair;
  onRetake: () => void;
}> = ({ photo, pair, onRetake }) => {
  const { activate, pending, activating, activated } = useActivate(photo, pair);
  const gotoScan = useGotoClick("scan");
  return (
    <div className="page">
      <h2>Activate</h2>
      <img src={photo} width="200" alt="" />
      {pending && (
        <div className="instructions">
          <p>
            <SelectCertificate />
          </p>
          <p>
            By activating this passport, you are promising that you personally
            completed the vaccination of this person.
          </p>
          <Button onClick={activate}>Activate</Button>
          <Button sx={{ marginTop: "15px" }} onClick={onRetake}>
            Retake
          </Button>
        </div>
      )}
      {activating && <p>activating...</p>}
      {activated && (
        <div className="instructions">
          <h3>Congratulations, the passport has been activated</h3>
          <p>Remind the patient to safeguard his passport!</p>
          <Button sx={{ marginTop: "15px" }} onClick={gotoScan}>
            Scan More
          </Button>
        </div>
      )}
    </div>
  );
};
