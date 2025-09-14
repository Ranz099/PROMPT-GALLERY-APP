import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { copyToClipboard } from "../../utils/clipboard.js";
import { Tag } from "../ui/Tag/Tag.jsx";
import CardDetailsModal from "./CardDetailsModal.jsx";

const T = {
  radius: 16,
  cardH: 440,
  pad: 14,
  border: "rgba(148,163,184,.18)",
  glow: "0 12px 30px rgba(0,0,0,.35)",
  bg: "linear-gradient(180deg, rgba(13,16,22,.96), rgba(10,13,19,.94))",
  codeBg: "linear-gradient(180deg, rgba(18,22,32,.85), rgba(14,18,28,.82))",
  title: "#e6e9f1",
  sub: "#94a3b8",
  success: "#16a34a",
};

const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: ${T.cardH}px;
  border-radius: ${T.radius}px;
  background: ${T.bg};
  border: 1px solid ${T.border};
  box-shadow: ${T.glow};
  overflow: hidden;
  transition: transform .16s ease, box-shadow .2s ease, border-color .2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 44px rgba(0,0,0,.45);
    border-color: rgba(148,163,184,.28);
    background: rgba(44, 29, 75, .5);
  }
`;

const Head = styled.header`
  padding: ${T.pad + 2}px ${T.pad + 2}px ${T.pad}px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;

const Title = styled.h3`
  margin: 0;
  color: ${T.title};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .1px;
  line-height: 1.25;
`;

const TagRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ThumbRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 8px;
  padding: 8px ${T.pad + 2}px 0;
`;

const Thumb = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${T.border};
  box-shadow: 0 6px 16px rgba(0,0,0,.25);
  flex: 0 0 48px;
`;

const BodyWrap = styled.div`
  position: relative;
  margin: 8px ${T.pad}px 0;
  border: 1px solid ${T.border};
  border-radius: 12px;
  background: ${T.codeBg};
  button { opacity: 1; }
  &:hover button,
  &:focus-within button { opacity: 1; }
`;

const Body = styled.div`
  color: #FFFFFF60;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 13px;
  line-height: 1.5;
  padding: 12px 38px 12px 14px;
  max-height: 200px;
  overflow: auto;
  border-radius: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: rgba(148,163,184,.28); border-radius: 8px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &:hover{
    color: #FF6363;
  }
`;

const IconBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 2;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 10px;
  border: 1px solid ${T.border};
  background: linear-gradient(180deg, rgba(24,28,40,.7), rgba(16,20,30,.7));
  color: #e6e9f1;
  cursor: pointer;
  opacity: 0;
  transition: opacity .15s ease, transform .12s ease, box-shadow .18s ease, border-color .18s ease, color .18s ease, background .18s ease;
  &:hover { transform: translateY(-1px); box-shadow: 0 10px 20px rgba(0,0,0,.25); border-color: rgba(148,163,184,.32); }
  &:focus-visible { outline: 0; box-shadow: 0 0 0 3px rgba(59,130,246,.35); opacity: 1; }
  &.copied { opacity: 1; color: ${T.success}; border-color: rgba(34,197,94,.45); background: linear-gradient(180deg, rgba(30,41,30,.8), rgba(18,30,18,.8)); }
  svg { width: 16px; height: 16px; }
`;

const Foot = styled.footer`
  padding: 10px ${T.pad + 2}px ${T.pad + 2}px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  border: 1px solid ${T.border};
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: ${T.sub};
  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
`;

const CTAWrap = styled.div`
  display: inline-flex;
  gap: 10px;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 10px;
  border: 1px solid ${T.border};
  color: #e6e9f1;
  background: linear-gradient(180deg, rgba(21,28,44,.9), rgba(16,22,37,.9));
  cursor: pointer;
  transition: transform .12s ease, box-shadow .18s ease, border-color .18s ease;
  &:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(0,0,0,.3); border-color: rgba(148,163,184,.32); }
`;

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

function normalizeThumb(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("images.unsplash.com")) {
      if (!u.searchParams.get("w")) u.searchParams.set("w", "96");
      if (!u.searchParams.get("q")) u.searchParams.set("q", "60");
      if (!u.searchParams.get("auto")) u.searchParams.set("auto", "format");
      if (!u.searchParams.get("fit")) u.searchParams.set("fit", "crop");
    }
    return u.toString();
  } catch {
    return url;
  }
}

function compileFullCardText(p) {
  const rows = [
    `Name: ${p.name}`,
    p.brand ? `Brand: ${p.brand}` : null,
    p.project ? `Project: ${p.project}` : null,
    p.model ? `Model: ${p.model}` : null,
    p.toolGroup ? `Tool Group: ${p.toolGroup}` : null,
    p.batchType ? `Batch Type: ${p.batchType}` : null,
    p.style ? `Style: ${p.style}` : null,
    p.tags?.length ? `Tags: ${p.tags.join(", ")}` : null,
    p.brandMemory ? `Brand Memory:\n${p.brandMemory}` : null,
    `Prompt:\n${p.fullText}`,
  ].filter(Boolean);
  return rows.join("\n\n");
}

export function PromptCard({ p }) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => () => resetTimerRef.current && clearTimeout(resetTimerRef.current), []);

  const doCopyPrompt = async () => {
    await copyToClipboard(p.fullText);
    setCopied(true);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setCopied(false), 1500);
  };

  const doDownloadAll = async () => {
    const txt = compileFullCardText(p);
    await copyToClipboard(txt);
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (p.name || "prompt").replace(/\s+/g, "_") + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const tags = (p.tags || []).slice(0, 3);
  const thumbs = (p.images || []).slice(0, 3).filter(Boolean);

  return (
    <>
      <Card>
        <Head>
          <Title title={p.name}>{p.name}</Title>
          {!!tags.length && (
            <TagRow>
              {tags.map(t => <Tag key={t}>{t}</Tag>)}
            </TagRow>
          )}
        </Head>

        {thumbs.length > 0 && (
          <ThumbRow>
            {thumbs.map((img, i) => (
              <Thumb
                key={i}
                src={normalizeThumb(img.url)}
                alt={img.alt || `ref-${i + 1}`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
              />
            ))}
          </ThumbRow>
        )}

        <BodyWrap>
          <IconBtn
            className={copied ? "copied" : ""}
            aria-label={copied ? "Copied!" : "Copy full prompt"}
            title={copied ? "Copied!" : "Copy full prompt"}
            onClick={doCopyPrompt}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </IconBtn>
          <Body title="Scroll to view full prompt">{p.fullText}</Body>
        </BodyWrap>

        <Foot>
         
          <CTAWrap>
            <CTAButton onClick={() => setOpen(true)} title="View details">
              <EyeIcon /> View
            </CTAButton>
            <CTAButton onClick={doDownloadAll} title="Copy whole card & download .txt">
              <DownloadIcon /> Download
            </CTAButton>
          </CTAWrap>
        </Foot>
      </Card>

      <CardDetailsModal open={open} onClose={() => setOpen(false)} p={p} />
    </>
  );
}
