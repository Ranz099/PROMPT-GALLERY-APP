import styled, { css } from 'styled-components'

export const FieldWrap = styled.label`
  display: block;
  & + & { margin-top: 12px; }
`

export const FieldLabel = styled.div`
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 6px;
`

const sharedInput = css`
  width: 100%;
  background: linear-gradient(180deg, #0c111a, #0a0f17);
  color: var(--text);
  border: 1px solid rgba(148,163,184,.22);
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  
  transition: box-shadow .2s ease, border-color .2s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59,130,246,.25);
  }
`

export const Input = styled.input`${sharedInput}`
export const Textarea = styled.textarea`
  ${sharedInput};
  resize: vertical;
`
export const SelectEl = styled.select`${sharedInput}`
