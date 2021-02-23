import { VerificationPair, Key } from "./Types";

const VerificationPairRE = /^v\/([a-z0-9]{10,})\/([a-z0-9-]{10,})$/i;

export const getVerificationPair = (path: string): VerificationPair | null => {
  const match = VerificationPairRE.exec(path);
  if (!match) return null;
  return { passportId: Key(match[1]), password: Key(match[2]) };
};
