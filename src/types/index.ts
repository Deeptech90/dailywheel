export interface Segment {
  id: string;
  label: string;
  color: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  angle: number;
  angularVelocity: number;
  shape: 'circle' | 'star' | 'rect';
}

export interface SpinResult {
  id: string;
  segment: Segment;
  timestamp: number;
}

export interface FloatingOrb {
  el: HTMLElement;
  originX: number;
  originY: number;
  animation: Animation | null;
}

export type AppState = {
  segments: Segment[];
  history: SpinResult[];
  isSpinning: boolean;
  soundEnabled: boolean;
  spinDirection: 1 | -1;  // 1 = CW, -1 = CCW
  showResult: boolean;
  currentResult: Segment | null;
  showEdit: boolean;
  showHistory: boolean;
};

export type AppAction =
  | { type: 'SPIN_START' }
  | { type: 'SPIN_END'; result: Segment }
  | { type: 'CLOSE_RESULT' }
  | { type: 'SET_SEGMENTS'; segments: Segment[] }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_DIRECTION' }
  | { type: 'TOGGLE_EDIT' }
  | { type: 'TOGGLE_HISTORY' };
