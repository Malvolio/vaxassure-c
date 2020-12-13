import { useEffect } from "react";
import { useCreateBatchTokenMutation } from "./generated/graphql";
import { BatchInfo } from "./shared/BatchInfo";
export const useFetchBatchInfo = (
  batchCertificate: string
): {
  loading: boolean;
  error: string | null;
  certificate: BatchInfo | null;
} => {
  const [fx, { error, data, loading }] = useCreateBatchTokenMutation({
    variables: { batchCertificate },
  });

  useEffect(() => {
    fx();
  }, [fx]);

  const result = data?.createBatchToken?.result;
  const serverError = result === "success" ? null : result || null;
  const bi = data?.createBatchToken?.batchInfo;
  const token = data?.createBatchToken?.token || "";
  const certificate = bi ? { ...bi, token, lastUsed: new Date() } : null;

  return {
    loading,
    error: error ? "network-failure" : serverError,
    certificate,
  };
};
