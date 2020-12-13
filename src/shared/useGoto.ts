import { useCallback } from "react";

export function useGoto(): (hash: string) => void;
export function useGoto(hash: string): (hash?: string) => void;
export function useGoto(hash?: string): (hash?: string) => void {
  return useCallback(
    (hash1) => {
      window.location.replace(`#${hash1 ?? hash}`);
    },
    [hash]
  );
}

export function useGotoClick(hash: string): () => void {
  const goto = useGoto(hash);
  return useCallback(() => {
    goto();
  }, [goto]);
}
