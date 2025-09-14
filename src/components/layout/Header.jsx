import React from 'react';
import styled from 'styled-components';
import { bus } from '../../events/bus.js';
import { PromptGalleryLogo } from '../../assets';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-h);
  z-index: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px;
  background: radial-gradient(circle, rgba(20,20,28,0.9) 0%, rgba(12,12,18,0.9) 100%);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(148,163,184,.18);
  box-shadow: 0 2px 10px rgba(0,0,0,.25);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoImg = styled.img`
  height: 28px;
  width: auto;
  display: block;
  object-fit: contain;
  border-radius: 6px;
`;

const BrandText = styled.span`
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: .3px;
  color: #e6e9f1;
  font-weight: 700;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: .5rem;
  }
`;

const NavLink = styled.a`
  color: #e6e9f1;
  text-decoration: none;
  font-size: .95rem;
  opacity: .92;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid transparent;

  transition:
    transform .12s ease,
    box-shadow .18s ease,
    background .18s ease,
    border-color .18s ease,
    opacity .18s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
    background: linear-gradient(180deg, rgba(36,42,58,.6), rgba(20,24,36,.6));
    border-color: rgba(148,163,184,.22);
    box-shadow: 0 8px 22px rgba(0,0,0,.28);
  }

  &:active {
    transform: translateY(0);
  }

  cursor: pointer;
`;

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const Header = () => {
  return (
    <StyledHeader>
      <Brand>
        <LogoImg src={PromptGalleryLogo} alt="Prompt Gallery logo" />
        <BrandText>Prompt Gallery</BrandText>
      </Brand>

      <Nav>
        <ul>
          <li>
            <NavLink href="#home" title="Home">Home</NavLink>
          </li>

          <li>
            <NavLink
              href="#add-prompt"
              title="Add a new prompt"
              onClick={(e) => {
                e.preventDefault();
                bus.emit('add-prompt:open');
              }}
            >
              <PlusIcon />
              Add Prompts
            </NavLink>
          </li>

          <li>
            <NavLink href="#about" title="About">About</NavLink>
          </li>
        </ul>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
