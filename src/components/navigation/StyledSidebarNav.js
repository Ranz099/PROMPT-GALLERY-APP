import styled from "styled-components";

export const Card = styled.div`
  background: #111418;
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,.25);
`;

export const Title = styled.div`
  color: #cbd5e1;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
`;

export const ItemButton = styled.button`
  width: 100%;
  background: ${({$active}) => $active ? "rgba(255,255,255,.06)" : "transparent"};
  border: 1px solid ${({$active}) => $active ? "rgba(255,255,255,.12)" : "transparent"};
  color: #e5e7eb;
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background .15s ease, transform .12s ease, border-color .15s ease;

  &:hover { background: rgba(255,255,255,.04); transform: translateY(-1px); }
  &:focus-visible { outline: 2px solid var(--accent, #7c3aed); outline-offset: 2px; }
`;

export const IconWrap = styled.span`
  display: inline-flex; align-items: center; justify-content: center;
  color: ${({$active}) => $active ? "white" : "#cbd5e1"};
`;

export const Label = styled.span`
  text-align: left; font-size: 14px;
`;

export const Badge = styled.span`
  min-width: 28px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 12px;
  color: #e9d5ff;
  background: linear-gradient(135deg, #7c3aed, #5b21b6);
  box-shadow: 0 6px 14px rgba(124,58,237,.35);
`;
