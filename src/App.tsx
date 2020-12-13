import React, { FC, useCallback, useState } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { useHash } from "./shared/useHash";
import "./App.css";
import { Photograph } from "./Photograph";
import { Warning } from "./shared/Warning";
import { HomePage } from "./HomePage";
import { ControlPanel } from "./shared/ControlPanel";
import { getVerificationPair } from "./shared/VerificationPair";
import { Logo } from "./shared/Logo";
import { Activate } from "./Activate";
import { getBatchToken } from "./shared/BatchInfo";
import { BatchMode } from "./BatchMode";
import { ScanPage } from "./ScanPage";
import { ApolloProvider } from "@apollo/client";

enum Mode {
  SCAN,
  PHOTOGRAPH,
  ACTIVATE,
  HOME,
  BATCH,
}

const ClinicianControlPanel: FC<{ mode: Mode }> = ({ mode }) => (
  <ControlPanel
    cancel={
      mode === Mode.SCAN || mode === Mode.PHOTOGRAPH || mode === Mode.ACTIVATE
    }
    done={mode === Mode.BATCH}
    scan={mode === Mode.HOME || mode === Mode.BATCH}
    more={mode === Mode.SCAN}
  />
);

// const uri =  "http://localhost:8002/graphql";
const uri =
  "https://lmq7t22sc4.execute-api.us-west-2.amazonaws.com/dev/graphql";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri,
  }),
});
const App: FC<{}> = () => {
  const [photo, setPhoto] = useState("");
  const clearPhoto = useCallback(() => setPhoto(""), []);
  const hash = useHash();
  const pair = getVerificationPair(hash);
  const batchToken = getBatchToken(hash);
  const mode =
    hash === "scan"
      ? Mode.SCAN
      : pair && !photo
      ? Mode.PHOTOGRAPH
      : pair && photo
      ? Mode.ACTIVATE
      : batchToken
      ? Mode.BATCH
      : Mode.HOME;

  if (mode !== Mode.ACTIVATE && photo) {
    clearPhoto();
  }
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Warning />
        <Logo />
        {mode === Mode.PHOTOGRAPH && <Photograph onSave={setPhoto} />}
        {mode === Mode.ACTIVATE && (
          <Activate photo={photo} pair={pair!} onRetake={clearPhoto} />
        )}
        {mode === Mode.SCAN && <ScanPage />}
        {mode === Mode.BATCH && <BatchMode token={batchToken} />}
        {mode === Mode.HOME && <HomePage />}

        <ClinicianControlPanel mode={mode} />
      </div>
    </ApolloProvider>
  );
};

export default App;
