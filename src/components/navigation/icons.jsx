import React from "react";

const i = { w: 20, h: 20, sw: 1.8, cap: "round", join: "round" };

export const CodeIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <path stroke="currentColor" strokeWidth={i.sw} strokeLinecap={i.cap} strokeLinejoin={i.join}
      d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
  </svg>
);

export const GlobeIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={i.sw} />
    <path stroke="currentColor" strokeWidth={i.sw} d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
  </svg>
);

export const MailIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth={i.sw} />
    <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth={i.sw} />
  </svg>
);

export const ImageIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth={i.sw} />
    <circle cx="9" cy="10" r="2" stroke="currentColor" strokeWidth={i.sw} />
    <path d="M21 17l-6-5-5 4-7 6" stroke="currentColor" strokeWidth={i.sw} />
  </svg>
);

export const PenIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 20l4-1 9-9-3-3-9 9-1 4zM13 7l3 3" stroke="currentColor" strokeWidth={i.sw} />
  </svg>
);

export const MusicIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M9 18a2 2 0 11-4 0 2 2 0 014 0zm10-9l-8 2v7a2 2 0 11-2-2" stroke="currentColor" strokeWidth={i.sw} />
  </svg>
);

export const BulbIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M8 14a6 6 0 118 0l-1 1.5V18H9v-2.5L8 14z" stroke="currentColor" strokeWidth={i.sw} />
    <path d="M10 21h4" stroke="currentColor" strokeWidth={i.sw} />
  </svg>
);

export const GameIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="3" y="9" width="18" height="8" rx="3" stroke="currentColor" strokeWidth={i.sw} />
    <path d="M8 13h-3m1.5-1.5v3M17 12h.01M19 14h.01" stroke="currentColor" strokeWidth={i.sw} />
  </svg>
);

export const FolderIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M3 7h6l2 2h10v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth={i.sw} />
  </svg>
);

export const SparklesIcon = (p) => (
  <svg width={i.w} height={i.h} viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" stroke="currentColor" strokeWidth={i.sw}/>
    <path d="M18 14l.8 1.8L21 16l-1.8.8L19 19l-.8-1.8L16 16l1.8-.8L18 14z" stroke="currentColor" strokeWidth={i.sw}/>
  </svg>
);
