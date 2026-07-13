import { useRef } from 'react';
import { CategoryData, BusinessCategory } from '../../data/businessNames';
import styles from './CategoryGrid.module.css';

interface CategoryGridProps {
  categories: CategoryData[];
  selected: BusinessCategory;
  onSelect: (id: BusinessCategory) => void;
  disabled?: boolean;
}

function addRipple(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  let x: number, y: number;

  if ('touches' in e && e.touches.length > 0) {
    x = e.touches[0].clientX - rect.left - size / 2;
    y = e.touches[0].clientY - rect.top - size / 2;
  } else if ('clientX' in e) {
    x = (e as React.MouseEvent).clientX - rect.left - size / 2;
    y = (e as React.MouseEvent).clientY - rect.top - size / 2;
  } else {
    x = rect.width / 2 - size / 2;
    y = rect.height / 2 - size / 2;
  }

  const ripple = document.createElement('span');
  ripple.className = styles.ripple;
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

export function CategoryGrid({ categories, selected, onSelect, disabled }: CategoryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: BusinessCategory, e: React.MouseEvent<HTMLButtonElement>) => {
    addRipple(e);
    onSelect(id);

    // Auto-scroll selected card into view on mobile
    const btn = e.currentTarget;
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Choose a Category</span>
        <span className={styles.sectionCount}>{categories.length} available</span>
      </div>

      <div className={styles.grid} ref={gridRef} role="listbox" aria-label="Business categories">
        {categories.map(cat => {
          const isSelected = selected === cat.id;
          return (
            <button
              key={cat.id}
              role="option"
              aria-selected={isSelected}
              aria-disabled={disabled}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              style={{
                background: `linear-gradient(135deg, ${cat.gradient[0]} 0%, ${cat.gradient[1]} 100%)`,
              }}
              onClick={e => handleSelect(cat.id, e)}
              disabled={disabled}
              title={cat.label}
            >
              {cat.popular && (
                <span className={styles.popularBadge}>🔥 Popular</span>
              )}
              <span className={styles.cardIcon} aria-hidden="true">{cat.icon}</span>
              <span className={styles.cardTitle}>{cat.label}</span>
              <span className={styles.cardDesc}>{cat.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
