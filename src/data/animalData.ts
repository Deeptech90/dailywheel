export interface AnimalEntry {
  name: string;
  icon: string;
  trait: string;
  color: string;
}

export const ANIMALS: AnimalEntry[] = [
  { name: 'Lion', icon: '🦁', trait: 'Bold leader with unshakable confidence', color: '#f59e0b' },
  { name: 'Owl', icon: '🦉', trait: 'Wise strategist who sees what others miss', color: '#6366f1' },
  { name: 'Dolphin', icon: '🐬', trait: 'Creative communicator who builds connections', color: '#06b6d4' },
  { name: 'Wolf', icon: '🐺', trait: 'Loyal team player with fierce determination', color: '#64748b' },
  { name: 'Eagle', icon: '🦅', trait: 'Visionary with a high-altitude perspective', color: '#8b5cf6' },
  { name: 'Fox', icon: '🦊', trait: 'Quick-thinking innovator full of surprises', color: '#f97316' },
  { name: 'Bear', icon: '🐻', trait: 'Powerful protector with quiet strength', color: '#78716c' },
  { name: 'Butterfly', icon: '🦋', trait: 'Transformer who embraces change gracefully', color: '#ec4899' },
  { name: 'Cheetah', icon: '🐆', trait: 'Lightning-fast executor who seizes opportunities', color: '#eab308' },
  { name: 'Elephant', icon: '🐘', trait: 'Patient builder with an unforgettable memory', color: '#94a3b8' },
  { name: 'Hawk', icon: '🦅', trait: 'Focused achiever with razor-sharp instincts', color: '#b91c1c' },
  { name: 'Octopus', icon: '🐙', trait: 'Adaptable multi-tasker who thrives under pressure', color: '#7c3aed' },
];
