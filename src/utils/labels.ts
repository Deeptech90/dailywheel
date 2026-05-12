/**
 * Capitalizes the first letter of each word in a label.
 * Used consistently across the Wheel and Participants components
 * to ensure visual uniformity in segment text (Section 6.1).
 */
export function capitalizeLabel(label: string): string {
  return label
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Validates a segment label before adding to the wheel.
 * Returns an error message string or null if valid.
 */
export function validateLabel(
  label: string,
  existingLabels: string[],
): string | null {
  const trimmed = label.trim();

  if (!trimmed) {
    return 'Entry cannot be empty.';
  }
  if (trimmed.length < 2) {
    return 'Entry must be at least 2 characters.';
  }
  if (trimmed.length > 40) {
    return 'Entry cannot exceed 40 characters.';
  }
  if (existingLabels.some(l => l.toLowerCase() === trimmed.toLowerCase())) {
    return 'This entry already exists.';
  }
  return null;
}
