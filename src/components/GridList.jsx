import React from "react";
import { PromptCard } from "./cards/PromptCardV2.jsx";

export function GridList({ items, emptyNote }) {
  if (!items.length) return <div className="empty">{emptyNote}</div>;
  return (
    <div className="grid">
      {items.map(p => <PromptCard key={p.id} p={p} />)}
    </div>
  );
}
