import styled from "styled-components";
import React from "react";
import SidebarNav from "../navigation/SidebarNav.jsx";
import { SECTIONS } from "../../config/sections.js";

const Shell = styled.aside`
  position: fixed;
  top: var(--header-h);
  left: 0;
  bottom: 0;
  width: var(--sidebar-w);
  z-index: 0;

  background: transparent;
  padding: 16px;
  overflow-y: auto;

  & > div { position: sticky; top: 12px; }
`;

export default function Sidebar({ activeSection, onNavClick, items }) {
  const navItems = items ?? SECTIONS;

  return (
    <Shell>
      <SidebarNav
        title="Categories"
        items={navItems}
        activeId={activeSection}
        onSelect={onNavClick}
      />
    </Shell>
  );
}
