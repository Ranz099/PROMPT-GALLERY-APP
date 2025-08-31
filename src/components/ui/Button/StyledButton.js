import styled from "styled-components";

export const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: linear-gradient(180deg, #151c2c, #101625);
  color: var(--text);
  padding: 9px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 13px;
  transition: transform 0.12s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    bottom: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    transition: bottom 0.5s ease;
    z-index: -1;
  }

  &:hover::before {
    bottom: 0;
  }

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default StyledButton;
