import React, { useRef, useState, useCallback, useMemo } from "react";
import Header from "./components/layout/Header.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import App from "./App.jsx";
import { seedPrompts } from "./data/seed.js";
import { SECTIONS } from "./config/sections.js";

export default function RootLayout() {
  const appRef = useRef(null);
  const [activeSection, setActiveSection] = useState("brand");

  const handleNavClick = useCallback((id) => appRef.current?.scrollTo(id), []);
  const handleSectionChange = useCallback((id) => setActiveSection(id), []);

  const countsByCat = useMemo(() => ({
    brand: seedPrompts.filter(p => p.category === "brand").length,
    batch: seedPrompts.filter(p => p.category === "batch").length,
    saas: seedPrompts.filter(p => p.category === "saas").length,
  }), []);

  const sidebarItems = useMemo(() =>
    SECTIONS.map(s => ({ ...s, count: countsByCat[s.id] ?? s.count })), [countsByCat]
  );

  return (
    <>
      <Header />
      <Sidebar
        activeSection={activeSection}
        onNavClick={handleNavClick}
        items={sidebarItems}
      />
      <App ref={appRef} onSectionChange={handleSectionChange} />
    </>
  );
}
