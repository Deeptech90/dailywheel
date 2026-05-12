import { Particle } from '../types';

// ── Vector type ──────────────────────────────────────────────────────────────
interface Vector {
  x: number;
  y: number;
}

// ── Physics configuration ─────────────────────────────────────────────────────
export interface PhysicsConfig {
  gravity: number;       // Downward acceleration per frame (px/frame²). Default: 0.3
  damping: number;       // Velocity damping on bounce (0–1). Default: 0.75
  antiGravity: number;   // Upward acceleration when inverted. Default: -0.15
  airResistance: number; // Horizontal drag per frame (0–1). Default: 0.98
}

const DEFAULT_CONFIG: PhysicsConfig = {
  gravity: 0.3,
  damping: 0.75,
  antiGravity: -0.15,
  airResistance: 0.98,
};

// ── FloatingElement ───────────────────────────────────────────────────────────
// Implements the physics model from Section 4.4 of the design document.
// Each floating UI element has its own position, velocity, gravity, and damping.
export class FloatingElement {
  position: Vector;
  velocity: Vector;
  gravity: number;
  damping: number;
  bounceCoefficient: number;
  el: HTMLElement | null;
  originX: number;
  originY: number;
  active: boolean;

  constructor(
    initialX: number,
    initialY: number,
    options: {
      gravity?: number;
      damping?: number;
      bounceCoefficient?: number;
      el?: HTMLElement;
    } = {},
  ) {
    this.position = { x: initialX, y: initialY };
    this.velocity = { x: 0, y: 0 };
    this.gravity = options.gravity ?? DEFAULT_CONFIG.gravity;
    this.damping = options.damping ?? DEFAULT_CONFIG.damping;
    this.bounceCoefficient = options.bounceCoefficient ?? DEFAULT_CONFIG.damping;
    this.el = options.el ?? null;
    this.originX = initialX;
    this.originY = initialY;
    this.active = false;
  }

  /** Apply one frame of physics simulation */
  applyPhysics(invertGravity = false) {
    if (!this.active) return;

    // Apply gravity (downward) or anti-gravity (upward)
    const gravityForce = invertGravity
      ? DEFAULT_CONFIG.antiGravity
      : this.gravity;

    this.velocity.y += gravityForce;
    this.velocity.x *= DEFAULT_CONFIG.airResistance;

    // Integrate position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // ── Viewport collision detection ────────────────────────────────────────
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const elW = this.el?.offsetWidth ?? 40;
    const elH = this.el?.offsetHeight ?? 40;

    // Bottom boundary — bounce back up
    if (this.position.y > vpH - elH) {
      this.position.y = vpH - elH;
      this.velocity.y = -this.velocity.y * this.damping;
      // Kill tiny bounces to prevent jitter
      if (Math.abs(this.velocity.y) < 0.5) this.velocity.y = 0;
    }

    // Top boundary — bounce back down
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y = Math.abs(this.velocity.y) * this.damping;
    }

    // Right boundary — bounce left
    if (this.position.x > vpW - elW) {
      this.position.x = vpW - elW;
      this.velocity.x = -this.velocity.x * this.damping;
    }

    // Left boundary — bounce right
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x = Math.abs(this.velocity.x) * this.damping;
    }

    // Apply transform to DOM element if provided
    if (this.el) {
      this.el.style.transform = `translate(${this.position.x - this.originX}px, ${this.position.y - this.originY}px)`;
    }
  }

  /** Launch the element with an initial impulse */
  launch(vx: number, vy: number) {
    this.active = true;
    this.velocity = { x: vx, y: vy };
    this.position = { x: this.originX, y: this.originY };
  }

  /** Spring-return to origin */
  returnToOrigin() {
    this.active = false;
    this.velocity = { x: 0, y: 0 };
    if (this.el) {
      this.el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      this.el.style.transform = 'translate(0, 0)';
      setTimeout(() => {
        if (this.el) this.el.style.transition = '';
      }, 900);
    }
  }
}

// ── Particle types (for burst effect) ────────────────────────────────────────
const PARTICLE_COLORS = [
  '#f59e0b', '#a855f7', '#3b82f6', '#10b981',
  '#ef4444', '#f97316', '#ec4899', '#06b6d4',
  '#84cc16', '#8b5cf6', '#fbbf24', '#34d399',
];

// ── PhysicsEngine (orchestrates both FloatingElements and Particles) ──────────
export class PhysicsEngine {
  // Particle system (canvas-drawn)
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particleRaf = 0;
  private particlesRunning = false;

  // Floating element system (DOM-based)
  private floatingElements: FloatingElement[] = [];
  private floatRaf = 0;
  private floatRunning = false;
  private invertGravity = false;

  // Configurable parameters
  config: PhysicsConfig;

  constructor(config: Partial<PhysicsConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ── Canvas init ────────────────────────────────────────────────────────────
  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  resize(width: number, height: number) {
    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  // ── Parameter customization API ────────────────────────────────────────────
  setGravity(g: number) { this.config.gravity = g; }
  setDamping(d: number) { this.config.damping = d; }
  setAirResistance(r: number) { this.config.airResistance = r; }

  // ── Floating element management ────────────────────────────────────────────
  registerElement(el: HTMLElement, options?: Partial<PhysicsConfig>): FloatingElement {
    const rect = el.getBoundingClientRect();
    const fe = new FloatingElement(rect.left, rect.top, {
      gravity: options?.gravity ?? this.config.gravity,
      damping: options?.damping ?? this.config.damping,
      el,
    });
    this.floatingElements.push(fe);
    return fe;
  }

  /** Activate anti-gravity — launches all registered elements upward */
  activateAntiGravity() {
    this.invertGravity = true;
    this.floatingElements.forEach((fe, i) => {
      const vx = (Math.random() - 0.5) * 4;
      const vy = -(2 + Math.random() * 5);
      setTimeout(() => fe.launch(vx, vy), i * 60);
    });
    if (!this.floatRunning) this._startFloatLoop();
  }

  /** Deactivate anti-gravity — returns all elements to origin */
  deactivateAntiGravity() {
    this.invertGravity = false;
    this.floatingElements.forEach(fe => fe.returnToOrigin());
    this.floatRunning = false;
    cancelAnimationFrame(this.floatRaf);
  }

  private _startFloatLoop() {
    this.floatRunning = true;
    const loop = () => {
      if (!this.floatRunning) return;
      this.floatingElements.forEach(fe => fe.applyPhysics(this.invertGravity));
      this.floatRaf = requestAnimationFrame(loop);
    };
    this.floatRaf = requestAnimationFrame(loop);
  }

  // ── Particle burst system ──────────────────────────────────────────────────
  burst(cx: number, cy: number, count = 80) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 4 + Math.random() * 8;
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      const shape = (['circle', 'star', 'rect'] as const)[Math.floor(Math.random() * 3)];

      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.8,
        color,
        size: 4 + Math.random() * 8,
        angle: Math.random() * Math.PI * 2,
        angularVelocity: (Math.random() - 0.5) * 0.3,
        shape,
      });
    }
    if (!this.particlesRunning) this._startParticleLoop();
  }

  private _startParticleLoop() {
    this.particlesRunning = true;
    const loop = () => {
      this._updateParticles();
      this._renderParticles();
      if (this.particles.length > 0) {
        this.particleRaf = requestAnimationFrame(loop);
      } else {
        this.particlesRunning = false;
        if (this.ctx && this.canvas) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
    };
    this.particleRaf = requestAnimationFrame(loop);
  }

  private _updateParticles() {
    const dead: number[] = [];
    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += this.config.gravity;   // Use configurable gravity
      p.vx *= this.config.airResistance;
      p.angle += p.angularVelocity;
      p.life -= 0.012;
      if (p.life <= 0) dead.push(i);
    });
    for (let i = dead.length - 1; i >= 0; i--) {
      this.particles.splice(dead[i], 1);
    }
  }

  private _renderParticles() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach(p => {
      const alpha = Math.max(0, p.life);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;

      switch (p.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'rect':
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          break;
        case 'star':
          this._drawStar(ctx, 0, 0, 5, p.size / 2, p.size / 4);
          break;
      }
      ctx.restore();
    });
  }

  private _drawStar(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number,
    spikes: number, outerR: number, innerR: number,
  ) {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerR);
    ctx.closePath();
    ctx.fill();
  }

  // ── Cleanup ────────────────────────────────────────────────────────────────
  stop() {
    cancelAnimationFrame(this.particleRaf);
    cancelAnimationFrame(this.floatRaf);
    this.particles = [];
    this.particlesRunning = false;
    this.floatRunning = false;
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
