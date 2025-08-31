import React from 'react'
import { FieldWrap, FieldLabel, Input, Textarea as TextareaEl, SelectEl } from './StyledField.js'

export function Field({ label, children }) {
  return (
    <FieldWrap>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </FieldWrap>
  )
}

export function TextField({ label, value, onChange, placeholder }) {
  return (
    <Field label={label}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Field>
  )
}

export function TextArea({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <Field label={label}>
      <TextareaEl
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Field>
  )
}

export function Select({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <SelectEl
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(op => <option key={op} value={op}>{op}</option>)}
      </SelectEl>
    </Field>
  )
}
