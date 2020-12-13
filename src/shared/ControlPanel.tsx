import React, { FC } from "react";
import { Button } from "./Button";
import { useGotoClick } from "./useGoto";

export const ControlPanel: FC<{
  cancel: boolean;
  scan: boolean;
  done?: boolean;
  more?: boolean;
}> = ({ cancel, scan, more, done }) => {
  const onCancel = useGotoClick("");
  const onScan = useGotoClick("scan");
  return (
    <div>
      {cancel && <Button onClick={onCancel}>Cancel</Button>}
      {scan && <Button onClick={onScan}>Scan {more && "More"} </Button>}
      {done && <Button onClick={onCancel}>Done</Button>}
    </div>
  );
};
