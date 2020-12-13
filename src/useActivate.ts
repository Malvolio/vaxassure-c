import _ from "lodash";
import * as urllib from "url";
import * as Crypto from "crypto-js";
import axios from "axios";
import {
  useChosenBatchInfo,
  // useChosenBatchInfo,
} from "./shared/BatchInfo";

import {
  convertDataUriUint8Array,
  convertStringUint8Array,
  convertUint8ArrayToWordArray,
} from "./shared/convert";
import JsonFormatter from "./shared/JsonFormatter";
import scaleImage from "./scaleImage";
import {
  useActivatePassportMutation,
  useCompleteActivationMutation,
} from "./generated/graphql";

import { VerificationPair } from "./shared/Types";
import { useBooleanState } from "./shared/useBooleanState";
import { useCallback, useState } from "react";

const getS3Headers = (url: string): { [k: string]: string } =>
  _.reduce(
    urllib
      .parse(url, true)
      .search?.substring(1)
      .split("&")
      .map((s) => {
        const [k, v] = s.split("=");
        return k === "AWSAccessKeyId" ? {} : { [k]: decodeURIComponent(v) };
      }) || [],
    (acc, n) => ({ ...acc, ...n }),
    {}
  );

const writeEncryptedToS3 = async (
  url: string,
  content: Uint8Array,
  password: string
) => {
  const waFile = convertUint8ArrayToWordArray(content);
  const enFile = Crypto.AES.encrypt(waFile, password, {
    format: JsonFormatter,
  });

  const headers = getS3Headers(url);

  await axios.put(url, enFile.toString(), {
    headers,
  });
};

export const useActivate = (
  photo: string,
  { passportId, password }: VerificationPair
) => {
  const [error, setError] = useState("");
  const [pending, , clearPending] = useBooleanState(true);
  const [activated, setActivated] = useBooleanState(false);
  const { token, vaccine } = useChosenBatchInfo()!;
  const [
    commenceActivation,
    { loading: loading1 },
  ] = useActivatePassportMutation();
  const [
    completeActivation,
    { loading: loading3 },
  ] = useCompleteActivationMutation();
  const activate = useCallback(() => {
    const go = async () => {
      clearPending();
      const r = await commenceActivation({
        variables: { token, passportId: passportId },
      });
      const aresult = r?.data?.activatePassport?.result;
      if (aresult !== "success") {
        setError(aresult || "network-failure");
        return;
      }
      const { headshotURL, infoURL } = r?.data?.activatePassport!;
      await writeEncryptedToS3(
        infoURL!,
        convertStringUint8Array(
          JSON.stringify({
            administered: Date.now(),
            vaccine,
          })
        ),
        password
      );
      await writeEncryptedToS3(
        headshotURL!,
        convertDataUriUint8Array(scaleImage(photo, 1 / 3.0)),
        password
      );

      const activationId = r?.data?.activatePassport?.activationId!;
      const p = await completeActivation({ variables: { activationId } });
      const cresult = p?.data?.completeActivation?.result;

      if (cresult === "success") {
        setActivated();
      } else {
        setError(cresult || "network-failure");
      }
    };
    go();
  }, [
    clearPending,
    commenceActivation,
    completeActivation,
    passportId,
    password,
    photo,
    setActivated,
    token,
    vaccine,
  ]);
  return {
    pending,
    activating: loading1 || loading3,
    activate,
    error,
    activated,
  };
};
