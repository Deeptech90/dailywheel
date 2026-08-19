/* ============================================================
   Color Palette Picker — preset palettes + custom hex inputs
   ============================================================ */
import { PRESET_PALETTES, ColorPalette } from '../../types/logoMaker';
import styles from './LogoMaker.module.css';

interface ColorPalettePickerProps {
  primaryColor: string;
  secondaryColor: string;
  onChange: (primary: string, secondary: string) => void;
}

export function ColorPalettePicker({ primaryColor, secondaryColor, onChange }: ColorPalettePickerProps) {
  const isActivePalette = (p: ColorPalette) =>
    p.primary === primaryColor && p.secondary === secondaryColor;

  return (
    <div className={styles.colorSection}>
      <p className={styles.fieldLabel}>Color Palette</p>

      {/* Preset Palettes */}
      <div className={styles.paletteGrid}>
        {PRESET_PALETTES.map((palette) => (
          <button
            key={palette.name}
            className={`${styles.paletteChip} ${isActivePalette(palette) ? styles.paletteChipActive : ''}`}
            onClick={() => onChange(palette.primary, palette.secondary)}
            title={palette.name}
            type="button"
            aria-label={`Select ${palette.name} palette`}
          >
            <span
              className={styles.paletteSwatchA}
              style={{ background: palette.primary }}
            />
            <span
              className={styles.paletteSwatchB}
              style={{ background: palette.secondary }}
            />
          </button>
        ))}
      </div>

      {/* Custom color pickers */}
      <div className={styles.customColors}>
        <div className={styles.colorPickerGroup}>
          <label className={styles.colorLabel} htmlFor="primary-color-picker">
            Primary
          </label>
          <div className={styles.colorInputRow}>
            <input
              id="primary-color-picker"
              type="color"
              value={primaryColor}
              onChange={(e) => onChange(e.target.value, secondaryColor)}
              className={styles.colorInput}
              aria-label="Primary color"
            />
            <span className={styles.colorHex}>{primaryColor.toUpperCase()}</span>
          </div>
        </div>

        <div className={styles.colorPickerGroup}>
          <label className={styles.colorLabel} htmlFor="secondary-color-picker">
            Accent
          </label>
          <div className={styles.colorInputRow}>
            <input
              id="secondary-color-picker"
              type="color"
              value={secondaryColor}
              onChange={(e) => onChange(primaryColor, e.target.value)}
              className={styles.colorInput}
              aria-label="Accent color"
            />
            <span className={styles.colorHex}>{secondaryColor.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
