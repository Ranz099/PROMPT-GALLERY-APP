https://drive.google.com/file/d/130S_RkBNayJQMhU591YETiVRS_7e5bRr/view

# 🎨 Prompt Gallery (React + Vite)  
**Central gallery to organize, browse, and reuse AI prompts** — with brand memory, reference images, fast search, and one-click copy.

---

## Prompt Gallery — Central Brain for AI Prompts

## What This Project Is
**Prompt Gallery** is a lightweight web app that centralizes AI prompts into a visual, searchable gallery. It replaces scattered prompts in docs/spreadsheets with a clean interface where teams can **organize, browse, preview, and copy** prompts in one click. Each prompt can include **brand memory** (tone/colors/style), model info, tags, and up to **3 reference images**.

## Purpose
- **Reduce chaos:** Put prompts in one shared place instead of Docs/Sheets/DMs.  
- **Speed up work:** Find the right prompt in seconds using search and categories.  
- **Keep consistency:** Reuse prompts with brand memory and reference images so results stay on-brand.  
- **Scale easily:** Add new brands/projects/batch styles/SaaS types without code changes (schema-first).

---

## Working — Step by Step

### A. Tabs & Search
**Tabs**
- **Brand POCs** (Brand → Project → Prompts)  
- **Production Batches** (Batch Type → Style)  
- **SaaS Tool Prompts** (Image / Code / Video)

**Search & Filtering**
1. Click a tab to choose the category.  
2. Start typing in the search box (brand, model, style, tags, keywords).  
3. The app builds a combined text **“haystack”** for each card (name, model, full prompt text, brand, brand memory, project, batch type, style, tags).  
4. If your query appears in that haystack, the card stays; otherwise it hides.  
5. The grid updates instantly as you type.

---

### B. Cards (PromptCard)
**Header**
- Prompt **name**, **model**, and up to **3 tags**.

**Body**
- Short preview of the **full prompt text**.  
- **1–3 thumbnails** (reference images).

**Actions**
- **Copy Full Prompt** → copies the entire prompt to clipboard.  
- **Brand Memory / Brand / Project / Style** (if present) → copies just that piece.  
- A **toast** appears to confirm the copy.

---

### C. Add Prompt (Modal)
**Flow**
1. Click **Add Prompt** to open the form.  
2. Fill **required** fields: `Name`, `Category (brand/batch/saas)`, `Model`, `Full Prompt`.  
3. Optionally add: `Brand Memory`, `Tags`, `Image URLs` (up to 3), `Brand`, `Project`, `Batch Type`, `Style`.  
4. Click **Create** — the new prompt is added to state and appears at the top of the current tab.  
5. Inputs use **StyledField** components so styles are isolated and consistent.

---

### D. Export JSON
**What It Does**
- Downloads the in-memory list of prompts as `prompts.json`.

**How to Use**
1. Click **Export JSON**.  
2. Use the file for backup, migration, or feeding other tools.

---


## 🧠 What this is
Teams usually scatter prompts in docs and sheets. **Prompt Gallery** puts them in one visual place, grouped by:
- **Brand POCs** (Brand → Project → Prompts)
- **Production Batches** (Batch Type → Style)
- **SaaS Tool Prompts** (Image / Code / Video)

Each card shows the model, tags, up to **3 thumbnails**, and buttons to **copy** the full prompt or individual pieces (e.g., brand memory). It’s extendable via a simple JSON schema and (optionally) a tiny Express API.

---

## ✅ Prerequisites
- **Node.js 18+** (Node 20 recommended)
- **npm** (comes with Node)

---

## 🚀 Getting started (step by step)

### 1) Clone & install
```bash
git clone <YOUR_REPO_URL> prompt-gallery
cd prompt-gallery
npm i
npm i styled-components
