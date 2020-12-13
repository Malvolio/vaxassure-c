import { useCallback } from "react";
import { createLocalStorageStateHook } from "use-local-storage-state";

export interface BatchInfo {
  uid: string;
  vaccine: string;
  batchId: string;
  token: string;
  dosesRemaining: number;
  lastUsed: Date;
}

interface BatchInfoState {
  currentBatchInfo: string | null;
  allBatchInfos: { [id: string]: BatchInfo };
}

const BlankState = { currentBatchInfo: null, allBatchInfos: {} };

const useBatchInfoState = createLocalStorageStateHook<BatchInfoState>(
  "BatchInfos",
  BlankState
);

export const useHasBatchInfos = () => {
  const [{ currentBatchInfo }] = useBatchInfoState();
  return !!currentBatchInfo;
};

export const useClearBatchInfo = () => {
  const [, setBatchInfoState] = useBatchInfoState();
  const update = useCallback(() => {
    setBatchInfoState(BlankState);
  }, [setBatchInfoState]);
  return update;
};

export const useListBatchInfos = () => {
  const [{ allBatchInfos }] = useBatchInfoState();
  return Object.values(allBatchInfos).filter(
    ({ dosesRemaining }) => dosesRemaining > 0
  );
};
export const useAddBatchInfo = () => {
  const [, setBatchInfoState] = useBatchInfoState();
  const update = useCallback(
    (bc: BatchInfo) => {
      setBatchInfoState(({ allBatchInfos }) => ({
        currentBatchInfo: bc.uid,
        allBatchInfos: {
          [bc.uid]: bc,
          ...allBatchInfos,
        },
      }));
    },
    [setBatchInfoState]
  );
  return update;
};

export const useChooseBatchInfo = () => {
  const [, setBatchInfoState] = useBatchInfoState();
  const update = useCallback(
    (bc: BatchInfo) => {
      setBatchInfoState(({ allBatchInfos }) => ({
        currentBatchInfo: bc.uid,
        allBatchInfos,
      }));
    },
    [setBatchInfoState]
  );
  return update;
};

export const useChosenBatchInfo = (): BatchInfo | undefined => {
  const [{ currentBatchInfo, allBatchInfos }] = useBatchInfoState();

  return allBatchInfos[currentBatchInfo || ""];
};

const BatchTokenRE = /^bt\/(.{10,})$/;

export const getBatchToken = (path: string): string => {
  const match = BatchTokenRE.exec(path);
  return match ? match[1] : "";
};
