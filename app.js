// ═══════════════════════════════════════════════════════════
//  DecisionWheel — Premium Engine v2
// ═══════════════════════════════════════════════════════════

// ─── CATEGORY DATA ──────────────────────────────────────────
const CATEGORIES = {
  food:     { label:'🍽️ Food',      emoji:'🍕', items:['Pizza','Sushi','Tacos','Biryani','Pasta','Burger','Ramen','Salad','BBQ Ribs','Dumplings'],          colors:['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#1DD1A1','#54A0FF','#5F27CD','#FF6B9D','#C44569','#F8B739'] },
  music:    { label:'🎵 Music',      emoji:'🎸', items:['Pop','Rock','Jazz','Classical','Hip-Hop','EDM','R&B','Country','Reggae','Metal'],                    colors:['#A29BFE','#FD79A8','#FDCB6E','#00CEC9','#E17055','#74B9FF','#55EFC4','#FAB1A0','#6C5CE7','#00B894'] },
  movie:    { label:'🎬 Movie',      emoji:'🎬', items:['Action','Comedy','Romance','Thriller','Sci-Fi','Horror','Animation','Documentary','Fantasy','Drama'], colors:['#FF6B6B','#FECA57','#FD79A8','#FF9F43','#74B9FF','#636E72','#55EFC4','#00CEC9','#A29BFE','#FDCB6E'] },
  travel:   { label:'✈️ Travel',     emoji:'🌍', items:['Beach','Mountains','Safari','City Break','Rainforest','Desert','Cruise','Island','Historical','Ski'], colors:['#00CEC9','#6C5CE7','#FDCB6E','#FD79A8','#55EFC4','#FF9F43','#74B9FF','#00B894','#A29BFE','#FF6B6B'] },
  exercise: { label:'🏋️ Exercise',   emoji:'💪', items:['Running','Yoga','Cycling','Swimming','HIIT','Pilates','Walking','Weights','Dance','Stretching'],      colors:['#FF6B6B','#FF9F43','#FECA57','#55EFC4','#00CEC9','#74B9FF','#A29BFE','#FD79A8','#FDCB6E','#00B894'] },
  drink:    { label:'☕ Drink',      emoji:'🧋', items:['Coffee','Green Tea','Smoothie','Lemonade','Chai','Matcha','Hot Cocoa','Juice','Milkshake','Sparkling'],colors:['#6F4E37','#2ECC71','#FF9F43','#F1C40F','#C0392B','#27AE60','#7F8C8D','#E74C3C','#FD79A8','#3498DB'] },
  hobby:    { label:'🎨 Hobby',      emoji:'🖌️', items:['Painting','Gardening','Photography','Cooking','Knitting','Reading','Gaming','Journaling','Baking','Origami'], colors:['#FD79A8','#55EFC4','#FDCB6E','#FF6B6B','#A29BFE','#74B9FF','#00CEC9','#FF9F43','#FECA57','#00B894'] },
  book:     { label:'📚 Book',       emoji:'📖', items:['Mystery','Fantasy','Self-Help','Romance','Sci-Fi','Biography','Thriller','History','Horror','Philosophy'],colors:['#6C5CE7','#A29BFE','#FDCB6E','#FD79A8','#74B9FF','#FF9F43','#FF6B6B','#00CEC9','#636E72','#55EFC4'] },
  outfit:   { label:'👗 Outfit',     emoji:'👚', items:['Casual','Formal','Sporty','Boho','Minimalist','Street','Vintage','Smart','Cozy','Chic'],              colors:['#B2BEC3','#2D3436','#55EFC4','#FDCB6E','#DFE6E9','#FF6B6B','#E17055','#74B9FF','#A29BFE','#FD79A8'] },
  selfcare: { label:'🧘 Self-Care',  emoji:'🛁', items:['Meditation','Face Mask','Bubble Bath','Journaling','Nap','Skincare','Breathwork','Stretch','Detox','Gratitude'], colors:['#A29BFE','#FD79A8','#74B9FF','#FDCB6E','#6C5CE7','#FF9F43','#00CEC9','#55EFC4','#D980FA','#00B894'] },
  weekend:  { label:'🎉 Weekend',    emoji:'🌅', items:['Road Trip','Picnic','Movie Night','Game Night','Hiking','Museum','New Recipe','Spa Day','Volunteer','Stargazing'], colors:['#FDCB6E','#55EFC4','#A29BFE','#74B9FF','#00CEC9','#FD79A8','#FF6B6B','#FF9F43','#6C5CE7','#00B894'] },
  game:     { label:'🎮 Game',       emoji:'🕹️', items:['RPG','FPS','Puzzle','Sports','Strategy','Adventure','Horror','Racing','Simulation','Fighting'],       colors:['#A29BFE','#FF6B6B','#FECA57','#55EFC4','#74B9FF','#FF9F43','#636E72','#00CEC9','#FD79A8','#6C5CE7'] },
  outdoor:  { label:'🌿 Outdoor',    emoji:'🏕️', items:['Hiking','Camping','Cycling','Rock Climbing','Bird Watching','Fishing','Kayaking','Star Gazing','Nature Walk','Photography'], colors:['#00B894','#55EFC4','#00CEC9','#6C5CE7','#FECA57','#74B9FF','#1DD1A1','#A29BFE','#FF9F43','#48DBFB'] },
  diy:      { label:'🔨 DIY & Crafts',emoji:'🎨', items:['Painting','Knitting','Woodworking','Scrapbooking','Jewelry Making','Candle Making','Origami','Embroidery','Pottery','Home Decor'], colors:['#FD79A8','#FF9F43','#C0392B','#FDCB6E','#A29BFE','#F39C12','#55EFC4','#E17055','#74B9FF','#00B894'] },
  reading:  { label:'📖 Reading',    emoji:'📚', items:['Mystery Novel','Sci-Fi','Biography','Self-Help','Fantasy','Historical Fiction','Poetry','Thriller','Non-Fiction','Graphic Novel'], colors:['#6C5CE7','#A29BFE','#FDCB6E','#00CEC9','#FF6B6B','#74B9FF','#FD79A8','#E17055','#55EFC4','#FF9F43'] },
  cooking:  { label:'🍳 Cooking',    emoji:'👨‍🍳', items:['Bake a Cake','New Recipe','Make Pasta','Stir-Fry','Grill BBQ','Make Sushi','Bake Bread','Smoothies','Indian Curry','Meal Prep'], colors:['#FF6B6B','#FF9F43','#FECA57','#E17055','#C0392B','#1DD1A1','#F39C12','#74B9FF','#FD79A8','#00B894'] },
  culture:  { label:'🌍 Cultural',   emoji:'🏛️', items:['Visit Museum','Documentary','Learn Language','Live Concert','Local Cuisine','World History','Art Gallery','Foreign Film','Traditions','Attend Festival'], colors:['#74B9FF','#A29BFE','#FDCB6E','#FD79A8','#FF9F43','#00CEC9','#55EFC4','#6C5CE7','#FF6B6B','#00B894'] }
};

// ─── AUDIO ENGINE ────────────────────────────────────────────
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  return _audioCtx;
}
function resumeAudio() { const a = getAudioCtx(); if (a?.state === 'suspended') a.resume(); }

function playTick(speed = 5) {
  const ac = getAudioCtx(); if (!ac) return;
  try {
    const frames = Math.floor(ac.sampleRate * 0.035);
    const buf = ac.createBuffer(1, frames, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < frames; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / frames, 5);
    const src = ac.createBufferSource(); src.buffer = buf;
    const gain = ac.createGain();
    gain.gain.value = Math.min(Math.max(speed / 25, 0.04), 0.32);
    src.connect(gain); gain.connect(ac.destination); src.start();
  } catch(e) {}
}

// ─── CANVAS SETUP ────────────────────────────────────────────
const canvas = document.getElementById('wheel');
const ctx    = canvas.getContext('2d');
const DPR    = Math.min(window.devicePixelRatio || 1, 2);
const DRAW   = 400; // Smaller overall size
canvas.width  = DRAW * DPR;
canvas.height = DRAW * DPR;
canvas.style.width  = DRAW + 'px';
canvas.style.height = DRAW + 'px';
ctx.scale(DPR, DPR);
const CX = DRAW / 2, CY = DRAW / 2, R = DRAW / 2 - 12;

// ─── CANVAS INTERACTION ──────────────────────────────────────
canvas.addEventListener('click', (e) => {
  if (spinning) return;
  const rect = canvas.getBoundingClientRect();
  // Adjust for CSS display size
  const x = (e.clientX - rect.left) * (DRAW / rect.width);
  const y = (e.clientY - rect.top) * (DRAW / rect.height);
  const dist = Math.sqrt((x - CX)**2 + (y - CY)**2);
  // Center hub has radius 44
  if (dist <= 44) spinWheel();
});

canvas.addEventListener('mousemove', (e) => {
  if (spinning) { canvas.style.cursor = 'default'; return; }
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (DRAW / rect.width);
  const y = (e.clientY - rect.top) * (DRAW / rect.height);
  const dist = Math.sqrt((x - CX)**2 + (y - CY)**2);
  canvas.style.cursor = dist <= 44 ? 'pointer' : 'default';
});

// ─── COLOR HELPERS ────────────────────────────────────────────
function hexToRgb(hex) {
  const n = parseInt(hex.replace('#',''), 16);
  return [(n>>16)&255, (n>>8)&255, n&255];
}
function shiftColor(hex, amt) {
  const [r,g,b] = hexToRgb(hex);
  return `rgb(${Math.min(255,Math.max(0,r+amt))},${Math.min(255,Math.max(0,g+amt))},${Math.min(255,Math.max(0,b+amt))})`;
}

// ─── DRAW ENGINE ─────────────────────────────────────────────
function drawWheel(angle) {
  const cat = CATEGORIES[currentCategory];
  const n = cat.items.length;
  const slice = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, DRAW, DRAW);

  // Outer metallic ring
  // Outer flat ring
  ctx.beginPath(); ctx.arc(CX, CY, R + 6, 0, 2*Math.PI);
  ctx.fillStyle = '#e2e8f0'; ctx.fill();

  // Slices
  for (let i = 0; i < n; i++) {
    const sa = angle + i * slice, ea = sa + slice, mid = sa + slice / 2;
    const col = cat.colors[i % cat.colors.length];

    ctx.beginPath(); ctx.moveTo(CX, CY); ctx.arc(CX, CY, R, sa, ea); ctx.closePath();
    ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(CX, CY); ctx.rotate(mid);
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.font = `600 ${n > 8 ? 12 : 14}px Inter,sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(cat.items[i], R - 20, 0);
    ctx.restore();
  }

  // Center hub — outer ring
  ctx.beginPath(); ctx.arc(CX, CY, 42, 0, 2*Math.PI);
  ctx.fillStyle = '#ffffff'; ctx.fill();
  ctx.shadowColor = 'rgba(0,0,0,0.1)'; ctx.shadowBlur = 10;
  
  // Center hub — inner flat circle
  ctx.shadowBlur = 0;
  ctx.beginPath(); ctx.arc(CX, CY, 34, 0, 2*Math.PI);
  ctx.fillStyle = '#334155'; ctx.fill(); // dark slate

  // SPIN label in center
  ctx.save();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = `800 16px Poppins,Inter,sans-serif`; // Increased font size for visibility
  ctx.fillStyle = spinning ? '#94a3b8' : '#ffffff';
  ctx.fillText(spinning ? '...' : 'SPIN', CX, CY + 1);
  ctx.restore();
}

// ─── STATE ───────────────────────────────────────────────────
let currentCategory = 'food';
let wheelAngle      = 0;
let spinning        = false;
let rafId           = null;
let lastSliceAtTop  = 0;
let targetItemIndex = 0;
let spinStart       = 0, spinDuration = 0, spinStartAngle = 0, spinEndAngle = 0;

// ─── SLICE AT TOP ─────────────────────────────────────────────
function getSliceAtTop() {
  const n = CATEGORIES[currentCategory].items.length;
  const sliceAngle = (2 * Math.PI) / n;
  const norm = (( (-Math.PI/2) - wheelAngle ) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI);
  return Math.floor(norm / sliceAngle) % n;
}

// ─── FLAPPER BOUNCE ──────────────────────────────────────────
function animateFlapper() {
  const el = document.getElementById('wheel-pointer');
  if (!el) return;
  el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
}

// ─── EASING ──────────────────────────────────────────────────
function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

// ─── SPIN ────────────────────────────────────────────────────
function spinWheel() {
  if (spinning) return;
  resumeAudio();
  spinning = true;
  drawWheel(wheelAngle); // Redraw to update SPIN text to spinning state

  const n = CATEGORIES[currentCategory].items.length;
  const sliceAngle = (2 * Math.PI) / n;
  targetItemIndex = Math.floor(Math.random() * n);

  const targetFinal = -Math.PI/2 - (targetItemIndex + 0.5) * sliceAngle;
  const extra  = (6 + Math.random() * 5) * 2 * Math.PI;
  const delta  = ((targetFinal - wheelAngle) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI);
  const total  = extra + delta;

  spinStartAngle  = wheelAngle;
  spinEndAngle    = wheelAngle + total;
  spinDuration    = 4000 + Math.random() * 3000;
  spinStart       = performance.now();
  lastSliceAtTop  = getSliceAtTop();

  rafId = requestAnimationFrame(spinLoop);
}

function spinLoop(now) {
  const elapsed = now - spinStart;
  const t = Math.min(elapsed / spinDuration, 1);

  const prev   = wheelAngle;
  wheelAngle   = spinStartAngle + (spinEndAngle - spinStartAngle) * easeOutQuart(t);

  // Tick: detect slice boundary crossings
  const sliceNow = getSliceAtTop();
  if (sliceNow !== lastSliceAtTop) {
    const speed = Math.abs(wheelAngle - prev) * 60;
    playTick(speed);
    animateFlapper();
    lastSliceAtTop = sliceNow;
  }

  drawWheel(wheelAngle);

  if (t < 1) {
    rafId = requestAnimationFrame(spinLoop);
  } else {
    wheelAngle = spinEndAngle;
    spinning   = false;
    drawWheel(wheelAngle);
    onSpinComplete();
  }
}

// ─── RESULT ──────────────────────────────────────────────────
function onSpinComplete() {
  const cat    = CATEGORIES[currentCategory];
  const result = cat.items[targetItemIndex];

  // canvas-confetti
  if (typeof confetti === 'function') {
    confetti({ particleCount: 140, spread: 90, origin: { y: 0.55 }, colors: cat.colors });
    setTimeout(() => confetti({ particleCount: 60, spread: 120, angle: 60,  origin: { x: 0, y: 0.6 }, colors: cat.colors }), 300);
    setTimeout(() => confetti({ particleCount: 60, spread: 120, angle: 120, origin: { x: 1, y: 0.6 }, colors: cat.colors }), 400);
  }

  showModal(result, cat.emoji, cat.label);
}

// ─── MODAL ───────────────────────────────────────────────────
function showModal(result, emoji, category) {
  document.getElementById('modal-emoji').textContent     = emoji;
  document.getElementById('modal-category').textContent  = category;
  document.getElementById('modal-result').textContent    = result;
  document.getElementById('modal').classList.add('open');
}
function closeModal() { document.getElementById('modal').classList.remove('open'); }

// ─── CATEGORY CHANGE ─────────────────────────────────────────
function onCategoryChange(val) {
  if (spinning) return;
  currentCategory = val;
  wheelAngle = 0; lastSliceAtTop = 0;
  drawWheel(0);
  document.querySelectorAll('.cat-card').forEach(c => c.classList.toggle('active', c.dataset.cat === val));
  const t = document.getElementById('wheel-category-title');
  if (t) t.textContent = CATEGORIES[val].label;
}

// ─── PWA INSTALL ─────────────────────────────────────────────
let deferredPrompt = null;
const installBtn = document.getElementById('install-btn');
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); deferredPrompt = e; installBtn?.classList.add('visible');
});
installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') installBtn.classList.remove('visible');
  deferredPrompt = null;
});
window.addEventListener('appinstalled', () => installBtn?.classList.remove('visible'));

// ─── MOBILE NAV ──────────────────────────────────────────────
document.getElementById('menu-toggle')?.addEventListener('click', () => {
  document.querySelector('nav')?.classList.toggle('open');
});

// ─── SERVICE WORKER ──────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  );
}

// ─── INIT ────────────────────────────────────────────────────
(function init() {
  const params = new URLSearchParams(location.search);
  const cat = params.get('category');
  if (cat && CATEGORIES[cat]) { currentCategory = cat; }
  document.querySelectorAll('.cat-card').forEach(c => c.classList.toggle('active', c.dataset.cat === currentCategory));
  const t = document.getElementById('wheel-category-title');
  if (t) t.textContent = CATEGORIES[currentCategory].label;
  drawWheel(0);
})();
