import React, { useMemo, useState } from 'react'
import { seedPrompts } from './data/seed.js';
import { exportJSON } from './utils/fileUtils.js';
import { GridList } from './components/GridList.jsx'
import { SectionHero } from './components/SectionHero.jsx'
import { AddPromptModal } from './components/AddPromptModal.jsx'
import { TextField } from './components/ui/Field/Field.jsx'
import { Button } from './components/ui/Button/Button.jsx'
import Images from './assets'



export default function App() {
  const [prompts, setPrompts] = useState(seedPrompts)
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('brand')


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return prompts.filter(p => {
      if (p.category !== tab) return false
      if (!q) return true
      const hay = [p.name, p.model, p.fullText, p.brand, p.brandMemory, p.project, p.batchType, p.style, ...(p.tags || [])]
        .filter(Boolean).join(' • ').toLowerCase()
      return hay.includes(q)
    })
  }, [prompts, query, tab])


  function addPrompt(p) { setPrompts(prev => [p, ...prev]) }


  function handleExportJSON() {
    exportJSON(prompts, 'prompts.json');
  }


  return (
    <div className="container">
      <header className="header">
       
        <div className="brand">
          <img
            className="brand-logo"
            src={Images.PromptGallery}
            alt="Prompt Gallery logo"
            
          />
          <div>
          <div className="h1">Prompt Gallery</div>
          <div className="muted">Central prompt brain for brands, production & SaaS tools.</div>
        </div>
        </div>
        
        <div className="row gap">
          <Button kind='secondary' onClick={handleExportJSON} title="Download prompts.json">⬇ Export JSON</Button>
          <AddPromptModal onAdd={addPrompt} />
        </div>
      </header>


      <div className="toolbar">
        <div className="search">
          <span className="search-icon">🔎</span>
          <input className="search-input" placeholder="Search by brand, style, model, tags…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="tabs">
          <button className={`tab ${tab === 'brand' ? 'active' : ''}`} onClick={() => setTab('brand')}>Brand POCs</button>
          <button className={`tab ${tab === 'batch' ? 'active' : ''}`} onClick={() => setTab('batch')}>Production Batches</button>
          <button className={`tab ${tab === 'saas' ? 'active' : ''}`} onClick={() => setTab('saas')}>SaaS Tool Prompts</button>
        </div>
      </div>


      {tab === 'brand' && <>
        <SectionHero title="Brand POCs" subtitle="Brands → Projects → Prompts with brand memory & refs" chips={["Lippi", "Vuitton", "Palette", "Mood", "Style"]} />
        <GridList items={filtered} emptyNote="Add your first brand prompt." />
      </>}
      {tab === 'batch' && <>
        <SectionHero title="Production Batches" subtitle="Batch Type → Style (e.g., Lifestyle • Person holding product)" chips={["Lifestyle", "Flatlay", "Outdoor", "Candid"]} />
        <GridList items={filtered} emptyNote="Add your first batch prompt." />
      </>}
      {tab === 'saas' && <>
        <SectionHero title="SaaS Tool Prompts" subtitle="Image • Code • Video prompt snippets for client tools" chips={["Image", "Code", "Video", "Hero", "Catalog"]} />
        <GridList items={filtered} emptyNote="Add your first SaaS prompt." />
      </>}


      <footer className="footer">API‑ready: Swap the in‑memory array with a fetch to /api/prompts (see server/server.js).</footer>
    </div>
  )
}