import React, { FC, useEffect } from "react";
import { useFetchBatchInfo } from "./useFetchBatchInfo";
import { useAddBatchInfo, useListBatchInfos } from "./shared/BatchInfo";
import { Vaccines } from "./shared/Vaccines";
import { count } from "./words";

export const BatchMode: FC<{ token: string }> = ({ token }) => {
  const { loading, error, certificate } = useFetchBatchInfo(token);
  const allCertificates = useListBatchInfos();
  const update = useAddBatchInfo();
  useEffect(() => {
    if (certificate) {
      update(certificate);
    }
  }, [certificate, update]);

  return (
    <div className="page">
      <h2>Batch Certificate</h2>
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {certificate && (
        <div className="instructions">
          <h3>Batch Certificate loaded successfully.</h3>
          {Vaccines[certificate.vaccine].test && (
            <h3 style={{ color: "red" }}>Test Only</h3>
          )}
          <table>
            <tbody>
              <tr>
                <th>Vaccine</th>
                <td>{Vaccines[certificate.vaccine].name}</td>
              </tr>
              <tr>
                <th>Batch ID</th>
                <td>{certificate.batchId}</td>
              </tr>
              <tr>
                <th>Doses Remaining</th>
                <td>{certificate.dosesRemaining}</td>
              </tr>
            </tbody>
          </table>
          <p>
            You now have {count("Batch Certificate", allCertificates.length)}.
          </p>
        </div>
      )}
    </div>
  );
};
