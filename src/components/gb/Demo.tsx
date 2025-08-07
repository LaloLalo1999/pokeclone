import React from "react";
import { DialogBox } from "./DialogBox";
import { Menu } from "./Menu";

export function DialogWithMenuDemo() {
  const [log, setLog] = React.useState<string[]>([]);
  return (
    <div className="space-y-3">
      <DialogBox text={log.at(-1) ?? "What will you do?"} />
      <Menu
        items={[
          { id: "FIGHT", label: "FIGHT" },
          { id: "BAG", label: "BAG" },
          { id: "CREATURE", label: "CREATURE" },
          { id: "RUN", label: "RUN" },
        ]}
        onSelect={(id) => setLog((l) => [...l, `You chose ${id}.`])}
      />
    </div>
  );
}

