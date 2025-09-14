import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { copyToClipboard } from "../../utils/clipboard.js";


const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background: rgba(2, 6, 23, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
`;

const Sheet = styled.div`
  position: relative; 
  width: min(1000px, 78vw);
  max-height: 92vh;
  background: #fff;
  color: #0b0e14;
  border-radius: 16px;
  box-shadow: 0 24px 70px rgba(0,0,0,.5);
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 24px;
  padding: 22px;
  overflow: hidden;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    max-height: 90vh;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: 1px solid rgba(148,163,184,.25);
  background: #fff;
  border-radius: 10px;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background .2s ease, box-shadow .2s ease, transform .12s ease;
  &:hover { background: #f6f7fb; box-shadow: 0 6px 18px rgba(0,0,0,.12); transform: translateY(-1px); }
`;

const CopyAllBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 54px;
  height: 32px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 10px;
  border: 1px solid rgba(148,163,184,.25);
  background: #fff;
  color: #111827;
  cursor: pointer;
  border: 1px solid #111827;
  box-shadow: 0 6px 14px rgba(124, 58, 237, .35);
  transition: background .2s ease, box-shadow .2s ease, transform .12s ease, border-color .2s ease;

  &:hover { box-shadow: 0 8px 20px rgba(0,0,0,.12); transform: translateY(-1px); }
  &:active { transform: translateY(0); }

  ${(p) => p.$success && `
    background: #ecfdf5;
    border-color: #34d39966;
    color: #065f46;
  `}

  svg { width: 14px; height: 14px; }
`;

const ColTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 700;
`;

const ImageWrap = styled.div`
  position: relative;
  background: #f7f8fb;
  border: 1px solid #eef0f4;
  border-radius: 14px;
  height: 420px;
  display: grid;
  place-items: center;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ArrowBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(p) => (p.left ? "left: 10px" : "right: 10px")};
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,.08);
  background: #fff;
  box-shadow: 0 8px 20px rgba(0,0,0,.15);
  display: grid;
  place-items: center;
  cursor: pointer;
  &:hover { background: #f3f5f9; }
  &:disabled { opacity: .4; cursor: default; }
`;

const ImageCTARow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

const GhostBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #111827;
  text-decoration: none;
  cursor: pointer;
  transition: background .2s ease, transform .12s ease, box-shadow .2s ease;
  &:hover { background: #f9fafb; transform: translateY(-1px); box-shadow: 0 6px 14px rgba(0,0,0,.08); }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  overflow: auto;
  padding-right: 6px;
  max-height: calc(92vh - 80px);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    max-height: 40vh;
  }
`;

const Block = styled.div`
  border: 1px solid #e9ecf2;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  overflow: scroll;
`;

const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 700;
`;

const CopyLink = styled.button`
  border: none;
  color: #6b7280;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  transition: background .2s ease, color .2s ease;
  &:hover { background: #f3f4f6; color: #111827;   border: 1px solid #4a515f;
}
`;

const Text = styled.div`
  font-size: 14px;
  color: #111827;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ScrollText = styled(Text)`
  max-height: 160px;
  overflow: auto;
  padding-right: 6px;
`;


function compileSelectedFields(p, currentImageUrl) {
  const rows = [
    `Name: ${p.name || "—"}`,
    `Category: ${p.category || "—"}`,
    `Model: ${p.model || "—"}`,
    `Tool Group (SaaS): ${p.toolGroup || "—"}`,
    `Image: ${currentImageUrl || "—"}`,
    `Full Prompt:\n${p.fullText || "—"}`,
    `Brand: ${p.brand || "—"}`,
    `Project: ${p.project || "—"}`,
    p.brandMemory ? `Brand Memory:\n${p.brandMemory}` : `Brand Memory: —`,
    `Batch Type: ${p.batchType || "—"}`,
    `Style: ${p.style || "—"}`,
    `Tags (comma): ${p.tags?.length ? p.tags.join(", ") : "—"}`,
    `Created: ${p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}`,
  ];
  return rows.join("\n\n");
}


export default function CardDetailsModal({ open, onClose, p }) {
  const imgs = useMemo(() => (p?.images || []).filter(Boolean), [p]);
  const [idx, setIdx] = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    if (!open) return;
    setIdx(0);
    setCopiedAll(false);
  }, [open]);

  if (!open || !p) return null;

  const current = imgs[idx];
  const currentUrl = current?.url || "";

  const copyField = (value) => copyToClipboard(value ?? "");

  const copyAll = () => {
    copyToClipboard(compileSelectedFields(p, currentUrl));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1200);
  };

  return (
    <Backdrop onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <CopyAllBtn
          onClick={copyAll}
          title="Copy all fields"
          aria-label="Copy all fields"
          $success={copiedAll}
        >
          {copiedAll ? (
            <>
=              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy All
            </>
          )}
        </CopyAllBtn>

        <CloseBtn onClick={onClose} aria-label="Close">✕</CloseBtn>

        <div>
          <ColTitle>Reference Image</ColTitle>
          <ImageWrap>
            {current ? <Img src={currentUrl} alt={current?.alt || "reference"} /> : <span>No image</span>}
            <ArrowBtn left disabled={idx === 0} onClick={() => setIdx(i => Math.max(0, i - 1))}>◀</ArrowBtn>
            <ArrowBtn disabled={idx >= imgs.length - 1} onClick={() => setIdx(i => Math.min(imgs.length - 1, i + 1))}>▶</ArrowBtn>
          </ImageWrap>

          <ImageCTARow>
            <GhostBtn href={currentUrl || "#"} target="_blank" rel="noreferrer" onClick={(e) => !currentUrl && e.preventDefault()}>
              👁️ View
            </GhostBtn>
          </ImageCTARow>
        </div>

        <div>
          <ColTitle>Card Details</ColTitle>
          <InfoGrid>

            <Block style={{ gridColumn: "1 / -1" }}>
              <BlockHeader>
                <span>Name</span>
                <CopyLink onClick={() => copyField(p.name || "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.name || "—"}</Text>
            </Block>

            <Block>
              <BlockHeader>
                <span>Category</span>
                <CopyLink onClick={() => copyField(p.category || "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.category || "—"}</Text>
            </Block>

            <Block>
              <BlockHeader>
                <span>Model</span>
                <CopyLink onClick={() => copyField(p.model || "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.model || "—"}</Text>
            </Block>

            <Block>
              <BlockHeader>
                <span>Tool Group (SaaS)</span>
                <CopyLink onClick={() => copyField(p.toolGroup || "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.toolGroup || "—"}</Text>
            </Block>

            <Block>
              <BlockHeader>
                <span>Image</span>
                <CopyLink onClick={() => copyField(currentUrl)}>Copy</CopyLink>
              </BlockHeader>
              <Text>{currentUrl || "—"}</Text>
            </Block>

            <Block style={{ gridColumn: "1 / -1" }}>
              <BlockHeader>
                <span>Full Prompt</span>
                <CopyLink onClick={() => copyField(p.fullText || "")}>Copy</CopyLink>
              </BlockHeader>
              <ScrollText>{p.fullText || "—"}</ScrollText>
            </Block>

            <Block>
              <BlockHeader>
                <span>Brand</span>
                <CopyLink onClick={() => copyField(p.brand || "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.brand || "—"}</Text>
            </Block>

            <Block>
              <BlockHeader>
                <span>Project</span>
                <CopyLink onClick={() => copyField(p.project || "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.project || "—"}</Text>
            </Block>

            <Block style={{ gridColumn: "1 / -1" }}>
              <BlockHeader>
                <span>Brand Memory</span>
                <CopyLink onClick={() => copyField(p.brandMemory || "")}>Copy</CopyLink>
              </BlockHeader>
              <ScrollText>{p.brandMemory || "—"}</ScrollText>
            </Block>

            <Block>
              <BlockHeader>
                <span>Batch Type</span>
                <CopyLink onClick={() => copyField(p.batchType || "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.batchType || "—"}</Text>
            </Block>

            <Block>
              <BlockHeader>
                <span>Style</span>
                <CopyLink onClick={() => copyField(p.style || "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.style || "—"}</Text>
            </Block>

            <Block style={{ gridColumn: "1 / -1" }}>
              <BlockHeader>
                <span>Tags (comma)</span>
                <CopyLink onClick={() => copyField(p.tags?.length ? p.tags.join(", ") : "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.tags?.length ? p.tags.join(", ") : "—"}</Text>
            </Block>

            <Block>
              <BlockHeader>
                <span>Created</span>
                <CopyLink onClick={() => copyField(p.tags?.length ? p.tags.join(", ") : "")}>Copy</CopyLink>
              </BlockHeader>
              <Text>{p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}</Text>
            </Block>
          </InfoGrid>
        </div>
      </Sheet>
    </Backdrop>
  );
}
