import React, { useMemo, useRef, useEffect, useImperativeHandle, useState } from 'react'
import { seedPrompts } from './data/seed.js'
import { GridList } from './components/GridList.jsx'
import { SectionHero } from './components/SectionHero.jsx'
import { AddPromptModal } from './components/AddPromptModal.jsx'
import { bus } from './events/bus.js'
import styled from 'styled-components'

const ContentWrap = styled.main`
  position: fixed;
  top: var(--header-h);
  left: var(--sidebar-w);
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: 16px 18px 24px;
  scroll-behavior: smooth;
`

const Section = styled.section`
  scroll-margin-top: calc(var(--header-h) + 12px);
  padding: 4px 0 24px 0;
`

const SectionTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0b0e14;
`

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(0,0,0,.08), rgba(0,0,0,.18), rgba(0,0,0,.08));
  margin: 18px 0 14px 0;
`

function useActiveSection(containerRef, sectionRefs, onActive, { minRatio = 0.8 } = {}) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let lastId = null;

    const compute = () => {
      const rootRect = root.getBoundingClientRect();
      const midY = rootRect.top + rootRect.height / 2;

      let bestByRatio = { id: null, ratio: -1 };
      let bestByCenter = { id: null, dist: Infinity };

      for (const ref of sectionRefs) {
        const el = ref.current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= rootRect.top || rect.top >= rootRect.bottom) continue;

        const visibleTop = Math.max(rect.top, rootRect.top);
        const visibleBottom = Math.min(rect.bottom, rootRect.bottom);
        const visibleH = Math.max(0, visibleBottom - visibleTop);
        const ratio = Math.min(1, visibleH / Math.max(1, rect.height));

        if (ratio > bestByRatio.ratio) bestByRatio = { id: el.dataset.sectionId, ratio };

        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - midY);
        if (dist < bestByCenter.dist) bestByCenter = { id: el.dataset.sectionId, dist };
      }

      const nextId =
        bestByRatio.ratio >= minRatio
          ? bestByRatio.id
          : (bestByCenter.id ?? sectionRefs[0]?.current?.dataset.sectionId);

      if (nextId && nextId !== lastId) {
        lastId = nextId;
        onActive?.(nextId);
      }
    };

    compute();
    const onScroll = () => compute();
    root.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(compute);
    ro.observe(root);
    sectionRefs.forEach(ref => ref.current && ro.observe(ref.current));

    return () => {
      root.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [containerRef, sectionRefs, onActive, minRatio]);
}

const App = React.forwardRef(function App({ onSectionChange }, ref) {
  const [prompts, setPrompts] = useState(seedPrompts)

  const brandItems = useMemo(() => prompts.filter(p => p.category === 'brand'), [prompts])
  const batchItems = useMemo(() => prompts.filter(p => p.category === 'batch'), [prompts])
  const saasItems  = useMemo(() => prompts.filter(p => p.category === 'saas'),  [prompts])

  const contentRef = useRef(null)
  const brandRef   = useRef(null)
  const batchRef   = useRef(null)
  const saasRef    = useRef(null)

  useActiveSection(contentRef, [brandRef, batchRef, saasRef], onSectionChange, { minRatio: 0.8 })

  const addPromptRef = useRef(null)
  useEffect(() => {
    return bus.on('add-prompt:open', () => addPromptRef.current?.open())
  }, [])

  const handleAdd = (p) => setPrompts(prev => [p, ...prev])

  useImperativeHandle(ref, () => ({
    scrollTo(id) {
      const map = { brand: brandRef, batch: batchRef, saas: saasRef }
      const el = map[id]?.current
      const root = contentRef.current
      if (!el || !root) return
      root.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' })
    }
  }), [])

  return (
    <ContentWrap ref={contentRef}>
      <Section ref={brandRef} data-section-id="brand" id="brand">
        <SectionHero
          title="Brand POCs"
          subtitle="Brands → Projects → Prompts with brand memory & refs"
          chips={['Lippi','Vuitton','Palette','Mood','Style']}
        />
        <GridList items={brandItems} emptyNote="Add your first brand prompt." />
      </Section>

      <Divider />

      <Section ref={batchRef} data-section-id="batch" id="batch">
        <SectionHero
          title="Production Batches"
          subtitle="Batch Type → Style (e.g., Lifestyle • Person holding product)"
          chips={['Lifestyle','Flatlay','Outdoor','Candid']}
        />
        <GridList items={batchItems} emptyNote="Add your first batch prompt." />
      </Section>

      <Divider />

      <Section ref={saasRef} data-section-id="saas" id="saas">
        <SectionHero
          title="SaaS Tool Prompts"
          subtitle="Image • Code • Video prompt snippets for client tools"
          chips={['Image','Code','Video','Hero','Catalog']}
        />
        <GridList items={saasItems} emptyNote="Add your first SaaS prompt." />
      </Section>

      <AddPromptModal ref={addPromptRef} onAdd={handleAdd} showTrigger={false} />

      <footer className="footer">
        API-ready: Swap the in-memory array with a fetch to /api/prompts (see server/server.js).
      </footer>
    </ContentWrap>
  )
})

export default App
