import React from "react";

export function ModeChips({ mode, setMode }) {
  const modes = ["walk", "bike", "transit", "drive"];
  return (
    <div className="mode-chips">
      {modes.map((m) => (
        <button key={m} className={m === mode ? "active" : ""} onClick={() => setMode(m)}>
          {m[0].toUpperCase() + m.slice(1)}
        </button>
      ))}
    </div>
  );
}
