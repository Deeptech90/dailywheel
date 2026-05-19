import { Segment } from '../types';

const TWO_PI = Math.PI * 2;
const MIN_VELOCITY = 0.002;
const FRICTION = 0.985;
const POINTER_ANGLE = -Math.PI / 2; // Top-center (12 o'clock)

export class WheelEngine {
  segments: Segment[];
  angle: number;
  angularVelocity: number;
  isSpinning: boolean;
  direction: 1 | -1; // 1 = clockwise, -1 = counterclockwise
  private onStop: ((winner: Segment) => void) | null = null;
  private onTick: (() => void) | null = null;
  private tickInterval = 0;
  private lastTickAt = 0;

  constructor(segments: Segment[]) {
    this.segments = segments;
    this.angle = 0;
    this.angularVelocity = 0;
    this.isSpinning = false;
    this.direction = 1;
  }

  setCallbacks(onStop: (winner: Segment) => void, onTick: () => void) {
    this.onStop = onStop;
    this.onTick = onTick;
  }

  spin(velocityOverride?: number) {
    if (this.isSpinning) return;
    this.isSpinning = true;
    // Random initial velocity between 15 and 25 rad/s
    this.angularVelocity = velocityOverride ?? (15 + Math.random() * 10);
    this.tickInterval = Math.PI / 4;
    this.lastTickAt = this.angle;
  }

  update(): boolean {
    if (!this.isSpinning) return false;

    // Apply direction to the angle update
    this.angle += this.direction * this.angularVelocity * (1 / 60);
    this.angle = ((this.angle % TWO_PI) + TWO_PI) % TWO_PI;
    this.angularVelocity *= FRICTION;

    // Tick sound trigger
    if (this.onTick) {
      const delta = Math.abs(this.angle - this.lastTickAt);
      if (delta >= this.tickInterval || delta < 0.01) {
        this.onTick();
        this.lastTickAt = this.angle;
      }
    }

    if (this.angularVelocity < MIN_VELOCITY) {
      this.angularVelocity = 0;
      this.isSpinning = false;
      const winner = this.getWinner();
      this.onStop?.(winner);
      return false;
    }

    return true;
  }

  getWinner(): Segment {
    const count = this.segments.length;
    const sliceAngle = TWO_PI / count;

    // Segment i is drawn from angle: (this.angle + i*sliceAngle)
    // The pointer sits at -PI/2 (12 o'clock in canvas coords).
    // We need the segment i whose range contains -PI/2:
    //   this.angle + i*sliceAngle <= -PI/2 < this.angle + (i+1)*sliceAngle
    // => i = floor( (-PI/2 - this.angle) / sliceAngle )  [normalised to [0, count)]
    const relativeAngle = ((POINTER_ANGLE - this.angle) % TWO_PI + TWO_PI) % TWO_PI;
    const index = Math.floor(relativeAngle / sliceAngle) % count;

    return this.segments[index] ?? this.segments[0];
  }

  draw(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 10;
    const count = this.segments.length;
    const sliceAngle = TWO_PI / count;

    ctx.clearRect(0, 0, w, h);

    // --- Draw outer glow ring ---
    const glowGradient = ctx.createRadialGradient(cx, cy, radius - 4, cx, cy, radius + 18);
    glowGradient.addColorStop(0, 'rgba(168, 85, 247, 0.6)');
    glowGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 12, 0, TWO_PI);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // --- Draw segments ---
    for (let i = 0; i < count; i++) {
      const startAngle = this.angle + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const midAngle = startAngle + sliceAngle / 2;

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = this.segments[i].color;
      ctx.fill();

      // Segment border
      ctx.strokeStyle = 'rgba(10, 10, 26, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label — placed along the radial midline of the segment
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(midAngle);
      // Text reads outward from center; anchor at 70% of radius
      const labelRadius = radius * 0.68;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${this._labelFontSize(count)}px Outfit, sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;

      const label = this.segments[i].label;
      const maxWidth = radius * 0.55;
      const truncated = this._truncate(ctx, label, maxWidth);
      ctx.fillText(truncated, labelRadius, 0);
      ctx.restore();
    }

    // --- Draw inner shadow ring ---
    const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 48);
    innerGrad.addColorStop(0, 'rgba(10,10,26,0.9)');
    innerGrad.addColorStop(1, 'rgba(10,10,26,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 48, 0, TWO_PI);
    ctx.fillStyle = innerGrad;
    ctx.fill();

    // --- Draw fixed needle from center hub toward 12 o'clock ---
    // Needle is FIXED (doesn't rotate with wheel) — always points UP
    const needleLength = radius - 18; // tip stops just inside the rim
    const hubEdge = 36;               // starts just outside the hub
    ctx.save();
    ctx.translate(cx, cy);
    // Glow
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 6;
    // Needle line
    ctx.beginPath();
    ctx.moveTo(0, -hubEdge);
    ctx.lineTo(0, -needleLength);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
    // Arrowhead triangle at tip
    ctx.beginPath();
    ctx.moveTo(0, -needleLength - 8);
    ctx.lineTo(-6, -needleLength + 4);
    ctx.lineTo(6,  -needleLength + 4);
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // --- Draw center hub (on top of needle base) ---
    ctx.beginPath();
    ctx.arc(cx, cy, 34, 0, TWO_PI);
    const hubGrad = ctx.createRadialGradient(cx - 6, cy - 6, 2, cx, cy, 34);
    hubGrad.addColorStop(0, '#a855f7');
    hubGrad.addColorStop(1, '#4c1d95');
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(168,85,247,0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Hub icon
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('▶', 2, 1);
    ctx.restore();
  }

  // _drawPointer removed — needle is now drawn from the center hub

  private _labelFontSize(count: number): number {
    if (count <= 6) return 14;
    if (count <= 10) return 12;
    if (count <= 14) return 10;
    return 9;
  }

  private _truncate(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let truncated = text;
    while (ctx.measureText(truncated + '…').width > maxWidth && truncated.length > 0) {
      truncated = truncated.slice(0, -1);
    }
    return truncated + '…';
  }
}
