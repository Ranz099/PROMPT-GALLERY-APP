import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from './ui/Button/Button.jsx'
import { TextArea, TextField, Select } from './ui/Field/Field.jsx'
import { toast } from '../utils/toast.js'

export const AddPromptModal = forwardRef(function AddPromptModal({ onAdd, showTrigger = true }, ref) {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }), [])

  const [category, setCategory] = useState('brand')
  const [name, setName] = useState('')
  const [model, setModel] = useState('')
  const [fullText, setFullText] = useState('')
  const [brand, setBrand] = useState('')
  const [project, setProject] = useState('')
  const [brandMemory, setBrandMemory] = useState('')
  const [batchType, setBatchType] = useState('')
  const [style, setStyle] = useState('')
  const [toolGroup, setToolGroup] = useState('Image')
  const [tags, setTags] = useState('')
  const [imageUrls, setImageUrls] = useState('')

  const makeId = () =>
    `${category}-${Math.random().toString(36).slice(2, 7)}-${Date.now().toString(36).slice(-5)}`

  const resetForm = () => {
    setCategory('brand'); setName(''); setModel(''); setFullText('');
    setBrand(''); setProject(''); setBrandMemory(''); setBatchType('');
    setStyle(''); setToolGroup('Image'); setTags(''); setImageUrls('');
  }

  const handleCreate = () => {
    if (!name || !model || !fullText) {
      toast('Name, Model, Prompt required')
      return
    }
    const images = imageUrls
      ? imageUrls.split(',').map(s => s.trim()).filter(Boolean).slice(0, 3).map(u => ({ url: u }))
      : undefined
    const now = new Date().toISOString()
    onAdd({
      id: makeId(), name, category, model, fullText, images,
      tags: tags ? tags.split(',').map(s => s.trim()).filter(Boolean) : undefined,
      brand, project, brandMemory, batchType, style, toolGroup,
      createdAt: now, updatedAt: now
    })
    setOpen(false); resetForm(); toast('Prompt added')
  }

  return (
    <>
      {showTrigger && <Button onClick={() => setOpen(true)}>＋ Add Prompt</Button>}

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add a New Prompt</div>
            </div>

            <div className="modal-body grid2">
              <TextField label="Name" value={name} onChange={setName} placeholder="Summer Campaign – Hero Shot" />
              <Select label="Category" value={category} onChange={setCategory} options={["brand", "batch", "saas"]} />
              <TextField label="Model" value={model} onChange={setModel} placeholder="SDXL, MJ v6, GPT-4o…" />
              <Select label="Tool Group (SaaS)" value={toolGroup} onChange={setToolGroup} options={["Image", "Code", "Video"]} />
              <TextArea label="Full Prompt" value={fullText} onChange={setFullText} rows={4} placeholder="Write the full prompt here…" />

              <TextField label="Brand" value={brand} onChange={setBrand} />
              <TextField label="Project" value={project} onChange={setProject} />
              <TextArea label="Brand Memory" value={brandMemory} onChange={setBrandMemory} rows={3} />
              <TextField label="Batch Type" value={batchType} onChange={setBatchType} />
              <TextField label="Style" value={style} onChange={setStyle} />
              <TextField label="Tags (comma)" value={tags} onChange={setTags} placeholder="Lippi, Summer, Terrace" />
              <TextField label="Ref Image URLs (comma, max 3)" value={imageUrls} onChange={setImageUrls} placeholder="https://… , https://…" />
            </div>

            <div className="modal-actions">
              <Button kind='ghost' onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={handleCreate}>Create</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
