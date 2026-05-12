import { useState } from 'react';
import { Segment } from '../../types';
import { recolorSegments } from '../../utils/colors';
import { capitalizeLabel, validateLabel } from '../../utils/labels';
import styles from './EditPanel.module.css';

interface EditPanelProps {
  segments: Segment[];
  onSave: (segments: Segment[]) => void;
  onClose: () => void;
}

export function EditPanel({ segments, onSave, onClose }: EditPanelProps) {
  const [draft, setDraft] = useState<Segment[]>(segments);
  const [newLabel, setNewLabel] = useState('');
  const [addError, setAddError] = useState<string | null>(null);

  const add = () => {
    const error = validateLabel(newLabel, draft.map(s => s.label));
    if (error) {
      setAddError(error);
      return;
    }
    if (draft.length >= 20) {
      setAddError('Maximum of 20 entries reached.');
      return;
    }
    const capitalized = capitalizeLabel(newLabel);
    const updated = recolorSegments([
      ...draft,
      { id: String(Date.now()), label: capitalized, color: '' },
    ]);
    setDraft(updated);
    setNewLabel('');
    setAddError(null);
  };

  const remove = (id: string) => {
    if (draft.length <= 2) return;
    setDraft(recolorSegments(draft.filter(s => s.id !== id)));
  };

  const rename = (id: string, raw: string) => {
    // Capitalize on rename as well
    setDraft(draft.map(s => s.id === id ? { ...s, label: raw } : s));
  };

  const renameBlur = (id: string, raw: string) => {
    // Commit capitalization when focus leaves the input
    const capitalized = capitalizeLabel(raw);
    setDraft(draft.map(s => s.id === id ? { ...s, label: capitalized || s.label } : s));
  };

  const sortAZ = () => {
    setDraft(recolorSegments([...draft].sort((a, b) => a.label.localeCompare(b.label))));
  };

  const shuffle = () => {
    const arr = [...draft];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setDraft(recolorSegments(arr));
  };

  const save = () => {
    // Filter out any empty labels before saving
    const valid = draft.filter(s => s.label.trim().length >= 2);
    if (valid.length < 2) return;
    onSave(recolorSegments(valid));
    onClose();
  };

  return (
    <div
      id="edit-panel-overlay"
      className={styles.overlay}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Edit wheel segments"
    >
      <div className={styles.panel}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <h2 className={styles.title}>✏️ Edit Wheel</h2>
          <button
            id="edit-panel-close"
            className={styles.closeX}
            onClick={onClose}
            aria-label="Close edit panel"
          >
            ✕
          </button>
        </div>

        <div className={styles.hint}>
          {draft.length}/20 entries · Minimum 2 required
        </div>

        {/* Sort / Shuffle toolbar */}
        <div className={styles.toolbar}>
          <button
            id="sort-segments-btn"
            className={styles.toolbarBtn}
            onClick={sortAZ}
            title="Sort A–Z"
          >
            🔤 Sort A–Z
          </button>
          <button
            id="shuffle-segments-btn"
            className={styles.toolbarBtn}
            onClick={shuffle}
            title="Shuffle randomly"
          >
            🔀 Shuffle
          </button>
        </div>

        {/* Add new entry */}
        <div className={styles.addRow}>
          <input
            id="new-segment-input"
            type="text"
            placeholder="Add a new entry…"
            value={newLabel}
            onChange={e => {
              setNewLabel(e.target.value);
              setAddError(null);
            }}
            onKeyDown={e => e.key === 'Enter' && add()}
            maxLength={40}
            className={`${styles.input} ${addError ? styles.inputError : ''}`}
            aria-describedby={addError ? 'add-error-msg' : undefined}
          />
          <button
            id="add-segment-btn"
            className={styles.addBtn}
            onClick={add}
            disabled={!newLabel.trim() || draft.length >= 20}
          >
            + Add
          </button>
        </div>

        {/* Validation error */}
        {addError && (
          <p id="add-error-msg" className={styles.errorMsg} role="alert">
            ⚠ {addError}
          </p>
        )}

        {/* Entry list */}
        <div className={styles.list}>
          {draft.map((seg, i) => (
            <div key={seg.id} className={styles.item}>
              <span
                className={styles.dot}
                style={{ background: seg.color }}
              />
              <input
                type="text"
                value={seg.label}
                onChange={e => rename(seg.id, e.target.value)}
                onBlur={e => renameBlur(seg.id, e.target.value)}
                maxLength={40}
                className={styles.itemInput}
                aria-label={`Entry ${i + 1} label`}
              />
              <button
                className={styles.removeBtn}
                onClick={() => remove(seg.id)}
                disabled={draft.length <= 2}
                aria-label={`Remove ${seg.label}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          id="save-segments-btn"
          className={styles.saveBtn}
          onClick={save}
          disabled={draft.filter(s => s.label.trim().length >= 2).length < 2}
        >
          💾 Save &amp; Apply
        </button>
      </div>
    </div>
  );
}
