// Usage: node scripts/generate-art.js <project-root> <dir-for-icon.svg>
// Generates original, unbranded SVG artwork to replace the NBA-licensed assets.
const fs = require('fs')
const path = require('path')

const ROOT = process.argv[2]
const A = (...p) => path.join(ROOT, 'assets', ...p)

const C = {
  navy: '#0B1622', deep: '#151E27', red: '#F81B28', blue: '#00428C', gold: '#F2B233',
  teal: '#1E7F86', purple: '#5B2A86', orange: '#E8742A', white: '#FFFFFF', green: '#1F6F43',
}
const FONT = "Impact, 'Arial Narrow Bold', 'Arial Black', sans-serif"

function rng(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

let uid = 0
const id = (p) => `${p}${++uid}`

function svg(w, h, body, defs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<defs>${defs}</defs>${body}</svg>\n`
}
function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}
function lin(gid, stops, x2 = 0, y2 = 1) {
  return `<linearGradient id="${gid}" x1="0" y1="0" x2="${x2}" y2="${y2}">` +
    stops.map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`).join('') +
    '</linearGradient>'
}
function rad(gid, stops, cx = 0.5, cy = 0.5, r = 0.5) {
  return `<radialGradient id="${gid}" cx="${cx}" cy="${cy}" r="${r}">` +
    stops.map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`).join('') +
    '</radialGradient>'
}

// ---------- motifs ----------
function ball(cx, cy, r, fill = C.orange, seam = '#1a1a1a') {
  const s = r * 0.055
  return `<g stroke="${seam}" stroke-width="${s}" fill="none" stroke-linecap="round">` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>` +
    `<path d="M${cx},${cy - r} V${cy + r} M${cx - r},${cy} H${cx + r}"/>` +
    `<path d="M${cx - r * 0.72},${cy - r * 0.69} Q${cx - r * 0.18},${cy} ${cx - r * 0.72},${cy + r * 0.69}"/>` +
    `<path d="M${cx + r * 0.72},${cy - r * 0.69} Q${cx + r * 0.18},${cy} ${cx + r * 0.72},${cy + r * 0.69}"/>` +
    `<ellipse cx="${cx - r * 0.35}" cy="${cy - r * 0.4}" rx="${r * 0.28}" ry="${r * 0.16}" fill="#fff" fill-opacity="0.18" stroke="none" transform="rotate(-35 ${cx - r * 0.35} ${cy - r * 0.4})"/>` +
    '</g>'
}

// Tank-top jersey drawn in a 100x120 box, placed at (x,y) with scale s
function jersey(x, y, s, color, trim, number, word = 'PINOY') {
  return `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M28,0 L40,0 Q50,16 60,0 L72,0 L73,6 Q75,30 92,34 L92,120 L8,120 L8,34 Q25,30 27,6 Z" fill="${color}" stroke="${trim}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M40,0 Q50,16 60,0" fill="none" stroke="${trim}" stroke-width="5"/>` +
    `<text x="50" y="56" text-anchor="middle" font-family="${FONT}" font-size="13" fill="${trim}" letter-spacing="1">${word}</text>` +
    `<text x="50" y="100" text-anchor="middle" font-family="${FONT}" font-size="38" fill="${trim}" stroke="${C.navy}" stroke-width="1">${number}</text>` +
    '</g>'
}

function hoop(x, y, s) {
  let net = ''
  for (let i = 0; i <= 6; i++) {
    const tx = 20 + i * 10, bx = 30 + i * 6.7
    net += `<path d="M${tx},62 L${bx},100"/>`
  }
  net += '<path d="M24,74 H76 M28,86 H72 M31,98 H69"/>'
  return `<g transform="translate(${x},${y}) scale(${s})">` +
    '<rect x="0" y="0" width="100" height="62" rx="4" fill="#fff" fill-opacity="0.92" stroke="#222" stroke-width="3"/>' +
    '<rect x="32" y="22" width="36" height="28" fill="none" stroke="#d32" stroke-width="3"/>' +
    `<g stroke="#fff" stroke-width="1.6" fill="none">${net}</g>` +
    '<ellipse cx="50" cy="62" rx="31" ry="6" fill="none" stroke="#e24a1a" stroke-width="4"/>' +
    '</g>'
}

function sneaker(x, y, s, upper, accent) {
  return `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M6,44 L6,28 Q10,18 28,16 L52,4 Q63,0 70,8 L80,24 Q108,26 116,38 L116,48 L6,48 Z" fill="${upper}" stroke="#111" stroke-width="2" stroke-linejoin="round"/>` +
    '<path d="M4,46 H118 V54 Q118,58 112,58 H10 Q4,58 4,54 Z" fill="#f4f4f4" stroke="#111" stroke-width="2"/>' +
    `<path d="M30,34 Q60,40 104,34" stroke="${accent}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    '<g stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M50,12 L60,20"/><path d="M45,16 L55,24"/><path d="M40,20 L50,28"/></g>' +
    '</g>'
}

function trophyShape(cx, top, s, gid) {
  // ball on a flared cup, column and base; ~ 300 x 520 units at s=1
  return `<g transform="translate(${cx - 150 * s},${top}) scale(${s})">` +
    `<path d="M40,170 Q150,230 260,170 L200,330 Q150,350 100,330 Z" fill="url(#${gid})" stroke="#8a5a12" stroke-width="3"/>` +
    `<rect x="128" y="332" width="44" height="80" fill="url(#${gid})" stroke="#8a5a12" stroke-width="3"/>` +
    `<path d="M80,412 H220 L236,440 H64 Z" fill="url(#${gid})" stroke="#8a5a12" stroke-width="3"/>` +
    '<rect x="50" y="440" width="200" height="80" rx="6" fill="#3b2412"/>' +
    `<rect x="95" y="462" width="110" height="34" rx="3" fill="url(#${gid})"/>` +
    ball(150, 95, 88, `url(#${gid})`, '#8a5a12') +
    '</g>'
}

function crowd(w, y0, y1, r, colors) {
  let out = ''
  for (let y = y0; y < y1; y += 34) {
    for (let x = -10 + (y % 68 ? 17 : 0); x < w + 20; x += 34) {
      const c = colors[Math.floor(r() * colors.length)]
      const jy = y + r() * 8
      out += `<circle cx="${x}" cy="${jy}" r="11" fill="${c}"/><rect x="${x - 15}" y="${jy + 10}" width="30" height="22" rx="10" fill="${c}"/>`
      if (r() < 0.06) out += `<path d="M${x + 10},${jy + 12} L${x + 22},${jy - 22}" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`
    }
  }
  return out
}

function scribble(x, y, w, r, color = '#111', sw = 3) {
  let d = `M${x},${y}`
  let cx = x
  for (let i = 0; i < 6; i++) {
    const nx = cx + w / 6
    d += ` C${cx + w / 18},${y - 18 - r() * 16} ${nx - w / 18},${y + 16 + r() * 12} ${nx},${y + (r() - 0.5) * 10}`
    cx = nx
  }
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/>`
}

function chalkPlay(ox, oy, s) {
  return `<g transform="translate(${ox},${oy}) scale(${s})" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.9">` +
    '<path d="M0,20 Q80,0 130,50"/><path d="M118,36 L130,50 L112,52"/>' +
    '<circle cx="150" cy="80" r="12"/>' +
    '<path d="M60,110 L80,135 M80,110 L60,135"/>' +
    '<path d="M150,120 Q120,220 20,250"/><path d="M34,238 L20,250 L38,256"/>' +
    '</g>'
}

function frame(x, y, w, h, inner) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#141414"/>` +
    `<rect x="${x + 12}" y="${y + 12}" width="${w - 24}" height="${h - 24}" fill="#e9e6df"/>` +
    inner +
    `<rect x="${x + w / 2 - 34}" y="${y + h - 38}" width="68" height="16" rx="2" fill="#c9a24a"/>`
}

function weave(w, h, color, op = 0.14, step = 28) {
  let out = `<g fill="${color}" fill-opacity="${op}">`
  for (let y = 0; y < h + step; y += step) {
    for (let x = ((y / step) % 2) * step / 2; x < w + step; x += step) {
      out += `<path d="M${x},${y - step / 2} L${x + step / 2},${y} L${x},${y + step / 2} L${x - step / 2},${y} Z"/>`
    }
  }
  return out + '</g>'
}

function courtLines(w, h, op = 0.06) {
  const cx = w / 2, cy = h / 2
  return `<g fill="none" stroke="#fff" stroke-opacity="${op}" stroke-width="4">` +
    `<circle cx="${cx}" cy="${cy}" r="${h * 0.16}"/><circle cx="${cx}" cy="${cy}" r="${h * 0.05}"/>` +
    `<path d="M${cx},0 V${h}"/>` +
    `<path d="M0,${h * 0.12} H${w * 0.14} A${h * 0.46},${h * 0.46} 0 0 1 ${w * 0.14},${h * 0.88} H0"/>` +
    `<path d="M${w},${h * 0.12} H${w * 0.86} A${h * 0.46},${h * 0.46} 0 0 0 ${w * 0.86},${h * 0.88} H${w}"/>` +
    `<rect x="0" y="${h * 0.34}" width="${w * 0.1}" height="${h * 0.32}"/>` +
    `<rect x="${w * 0.9}" y="${h * 0.34}" width="${w * 0.1}" height="${h * 0.32}"/>` +
    '</g>'
}

function silhouette(cx, base, s, color) {
  return `<g transform="translate(${cx},${base}) scale(${s})" fill="${color}">` +
    '<circle cx="0" cy="-150" r="46"/>' +
    '<path d="M-110,0 Q-110,-90 -40,-100 L40,-100 Q110,-90 110,0 Z"/>' +
    '</g>'
}

// ---------- carousel (hero) ----------
function arena(seed, accent, variant) {
  const W = 1920, H = 1080, r = rng(seed)
  const g1 = id('g'), g2 = id('g'), g3 = id('g')
  const defs = lin(g1, [[0, '#05090f'], [0.55, C.navy], [1, accent]]) +
    lin(g2, [[0, '#c98a4b'], [1, '#8a5a2b']]) +
    lin(g3, [[0, '#fff', 0.35], [1, '#fff', 0]])
  let beams = ''
  for (let i = 0; i < 6; i++) {
    const x = 160 + i * 320 + r() * 60
    beams += `<path d="M${x},0 L${x - 140},${H * 0.62} L${x + 140},${H * 0.62} Z" fill="url(#${g3})" opacity="${0.25 + r() * 0.3}"/>`
  }
  let body = `<rect width="${W}" height="${H}" fill="url(#${g1})"/>` + beams +
    crowd(W, 360, 700, r, ['#1b2633', '#243244', '#2d3d52', accent, '#10161f'])
  body += `<path d="M0,700 L${W},700 L${W},${H} L0,${H} Z" fill="url(#${g2})"/>` +
    `<g fill="none" stroke="#fff" stroke-opacity="0.8" stroke-width="6">` +
    `<ellipse cx="${W / 2}" cy="880" rx="330" ry="110"/><path d="M${W / 2},700 V${H}"/>` +
    `<path d="M0,760 L${W},760"/></g>`
  if (variant === 1) body += hoop(W / 2 - 150, 300, 3)
  if (variant === 2) {
    body += `<rect x="${W / 2 - 260}" y="40" width="520" height="220" rx="16" fill="#0b0f15" stroke="${accent}" stroke-width="6"/>` +
      `<text x="${W / 2}" y="185" text-anchor="middle" font-family="${FONT}" font-size="120" fill="${C.gold}">98 : 96</text>`
  }
  return svg(W, H, body, defs)
}

// ---------- gallery tiles ----------
function tile(i) {
  const W = 315, H = 320, r = rng(100 + i)
  const clip = id('c'), g = id('g')
  const bgs = [C.navy, C.blue, C.teal, C.purple, '#2b2b2b', C.green]
  const bg = bgs[i % bgs.length]
  const defs = `<clipPath id="${clip}"><rect width="${W}" height="${H}" rx="18"/></clipPath>` +
    rad(g, [[0, '#fff', 0.22], [1, '#fff', 0]], 0.5, 0.35, 0.7)
  const texts = { 5: ['ON THE', 'COURT'], 7: ['KULTURANG', 'PINOY'], 18: ['IN THE', 'ZONE'], 21: ['ELEVATE', 'YOUR', 'GAME'] }
  let inner
  if (texts[i]) {
    const lines = texts[i]
    inner = `<rect width="${W}" height="${H}" fill="${C.red}"/>` + chalkPlay(215, 185, 0.45) +
      lines.map((t, k) => `<text x="26" y="${96 + k * 78}" font-family="${FONT}" font-size="${t.length > 7 ? 58 : 76}" fill="#fff">${t}</text>`).join('')
    return { svg: svg(W, H, `<g clip-path="url(#${clip})">${inner}</g>`, defs), alt: lines.join(' ').toLowerCase() + ' graphic' }
  }
  const kinds = ['ball', 'jersey', 'hoop', 'crowd', 'sneaker', 'trophy', 'fan']
  const kind = kinds[i % kinds.length]
  inner = `<rect width="${W}" height="${H}" fill="${bg}"/><rect width="${W}" height="${H}" fill="url(#${g})"/>` + weave(W, H, '#fff', 0.05)
  let alt
  if (kind === 'ball') { inner += ball(W / 2, H / 2, 95); alt = 'basketball illustration' }
  if (kind === 'jersey') { inner += jersey(W / 2 - 85, 45, 1.7, [C.red, C.gold, '#fff'][i % 3], C.navy, String(1 + Math.floor(r() * 40))); alt = 'fan jersey illustration' }
  if (kind === 'hoop') { inner += hoop(W / 2 - 110, 60, 2.2); alt = 'basketball hoop illustration' }
  if (kind === 'crowd') { inner += crowd(W, 70, H, r, ['#0e141c', '#1d2835', C.red, C.gold, '#2e3f55']); alt = 'cheering crowd illustration' }
  if (kind === 'sneaker') { inner += sneaker(28, 120, 2.2, [C.red, '#222', C.blue][i % 3], C.gold); alt = 'basketball sneaker illustration' }
  if (kind === 'trophy') {
    const tg = id('g')
    return {
      svg: svg(W, H, `<g clip-path="url(#${clip})">${inner}${trophyShape(W / 2, 20, 0.54, tg)}</g>`, defs + lin(tg, [[0, '#ffe08a'], [0.5, C.gold], [1, '#b7791f']], 1, 1)),
      alt: 'championship trophy illustration',
    }
  }
  if (kind === 'fan') { inner += silhouette(W / 2, H, 1.1, '#0b0f15') + ball(W / 2 + 90, 120, 34); alt = 'fan holding a basketball illustration' }
  return { svg: svg(W, H, `<g clip-path="url(#${clip})">${inner}</g>`, defs), alt }
}

// ---------- artists ----------
function artist(i) {
  const W = 287, H = 382
  const cols = [[C.red, '#7a0d14'], [C.blue, '#021c3d'], [C.teal, '#0b3a3e'], [C.purple, '#2a1140']][i]
  const g = id('g')
  const body = `<rect width="${W}" height="${H}" rx="14" fill="url(#${g})"/>` + weave(W, H, '#fff', 0.12, 32) +
    `<circle cx="${W / 2}" cy="170" r="110" fill="#fff" fill-opacity="0.12"/>` +
    silhouette(W / 2, H, 1.15, '#0b0f15')
  return svg(W, H, body, lin(g, [[0, cols[0]], [1, cols[1]]]))
}

// ---------- collectors & collection items ----------
function collectorCover(i) {
  const W = 330, H = 345
  const g = id('g')
  let inner
  if (i === 0) inner = jersey(115, 55, 1.0, C.green, C.gold, '7', 'MANILA')
  if (i === 1) inner = sneaker(80, 130, 1.4, C.red, '#fff')
  if (i === 2) inner = jersey(115, 55, 1.0, C.purple, C.gold, '24', 'CEBU') + scribble(130, 150, 70, rng(9), '#fff', 2)
  const body = `<rect width="${W}" height="${H}" fill="url(#${g})"/>` + frame(35, 20, 260, 300, inner)
  return svg(W, H, body, lin(g, [[0, '#f5f5f5'], [1, '#d9d9d9']]))
}

function collectionItem(kind, seed) {
  const W = 330, H = 380, r = rng(seed)
  const g = id('g'), wood = id('g'), gold = id('g')
  let defs = lin(g, [[0, '#2a3440'], [1, '#0e141c']]) + lin(wood, [[0, '#d19a5b'], [1, '#9a6431']], 1, 0) +
    lin(gold, [[0, '#ffe08a'], [0.5, C.gold], [1, '#b7791f']], 1, 1)
  let body = `<rect width="${W}" height="${H}" fill="url(#${g})"/>`
  const caseBox = (inner) => inner +
    `<rect x="60" y="70" width="210" height="220" fill="#bfe3ff" fill-opacity="0.12" stroke="#dff" stroke-opacity="0.6" stroke-width="3"/>` +
    '<rect x="50" y="290" width="230" height="30" fill="#111" stroke="#444"/>'
  switch (kind) {
    case 'framed-jersey-red': body += frame(45, 30, 240, 320, jersey(115, 70, 1.0, C.red, C.gold, '21', 'MANILA') + scribble(125, 170, 80, r)); break
    case 'framed-jersey-white': body += frame(45, 30, 240, 320, jersey(115, 70, 1.0, '#fff', C.blue, '13', 'ROOKIE') + scribble(125, 170, 80, r, C.blue)); break
    case 'framed-photo': body += frame(45, 30, 240, 320, `<rect x="69" y="54" width="192" height="230" fill="${C.navy}"/>` + silhouette(165, 284, 0.8, '#000') + trophyShape(215, 110, 0.18, gold)); break
    case 'framed-combo': body += frame(35, 30, 260, 320, jersey(80, 70, 0.9, C.navy, C.gold, '8') + ball(240, 150, 34)); break
    case 'ball-case': body += caseBox(ball(165, 200, 80) + scribble(120, 190, 90, r, '#fff', 2.5)); break
    case 'ball-case-blue': body += caseBox(ball(165, 200, 80, C.blue, '#e7f0ff') + scribble(120, 190, 90, r, '#fff', 2.5)); break
    case 'vintage-ball': body += `<path d="M125,300 L205,300 L190,250 L140,250 Z" fill="url(#${wood})"/>` + ball(165, 170, 80, '#8b4a24') + scribble(125, 165, 80, r, '#f3e3c3', 2.5); break
    case 'sneaker-red': body += caseBox(sneaker(80, 160, 1.4, C.red, '#111')); break
    case 'sneaker-black': body += caseBox(sneaker(80, 160, 1.4, '#1b1b1b', C.gold)); break
    case 'hardwood':
      body += `<rect x="30" y="80" width="270" height="220" fill="url(#${wood})" stroke="#5c3a1a" stroke-width="4"/>`
      for (let k = 1; k < 7; k++) body += `<path d="M30,${80 + k * 31} H300" stroke="#5c3a1a" stroke-opacity="0.45" stroke-width="2"/>`
      body += '<path d="M30,230 Q165,150 300,230" fill="none" stroke="#fff" stroke-width="6"/>' + scribble(70, 140, 110, r, '#111') + scribble(160, 250, 100, r, '#111')
      break
  }
  return svg(W, H, body, defs)
}

// ---------- card stack ----------
// Same three scenes as the original Meta Zone cards (avatar, 360 hallway, dome theater), redrawn unbranded
function stackCard(i) {
  const W = 380, H = 476
  const clip = id('c'), bg = id('g'), glow = id('f'), red = id('g')
  let defs = `<clipPath id="${clip}"><rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="34"/></clipPath>` +
    lin(bg, [[0, '#2b2d31'], [1, '#0e0f11']]) + rad(red, [[0, C.red, 0.55], [1, C.red, 0]]) +
    `<filter id="${glow}" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" result="b"/>` +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
  let body = `<rect width="${W}" height="${H}" fill="url(#${bg})"/>`

  if (i === 0) {
    // floating blocky avatar head, a jersey body, and a red flame swirl
    const head = id('g')
    defs += lin(head, [[0, '#f2f2f2'], [1, '#b9b9b9']])
    body += `<ellipse cx="190" cy="320" rx="170" ry="120" fill="url(#${red})"/>` +
      '<path d="M132,62 L150,44 H262 L246,62 Z" fill="#f7f7f7"/>' +
      '<path d="M246,62 L262,44 V146 L246,166 Z" fill="#9c9c9c"/>' +
      `<rect x="132" y="62" width="114" height="104" rx="14" fill="url(#${head})"/>` +
      '<g fill="#c9c9c9" stroke="#8a8a8a" stroke-width="4"><circle cx="164" cy="108" r="13"/><circle cx="214" cy="108" r="13"/></g>' +
      '<g fill="#555"><circle cx="164" cy="108" r="5"/><circle cx="214" cy="108" r="5"/></g>' +
      '<path d="M174,140 H204" stroke="#777" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M150,388 Q190,420 230,388 V404 Q190,436 150,404 Z" fill="#cfcfcf"/>' +
      jersey(118, 196, 1.44, C.red, '#fff', '23')
    const flame = (d, w) => `<path d="${d}" fill="none" stroke="${C.red}" stroke-width="${w}" stroke-linecap="round"/>`
    body += `<g filter="url(#${glow})">` +
      flame('M70,300 Q58,360 120,392 Q190,420 270,384', 7) +
      flame('M300,268 Q336,330 282,378 Q240,408 180,410', 6) +
      flame('M92,262 Q70,300 96,334', 5) + flame('M288,210 Q318,240 304,286', 5) +
      flame('M112,420 Q160,446 236,430', 6) + flame('M60,352 Q48,318 66,290', 4) +
      flame('M260,330 Q300,300 292,250', 4) + flame('M100,372 Q140,398 170,390', 4) +
      '</g>'
  }

  if (i === 1) {
    // hallway of lit display pillars over a red and blue court, with a 360° turn arrow
    const vx = 190, vy = 262
    const P = (u, d) => [vx + u * 250 / d, vy + 214 / d]
    const ceil = id('g')
    defs += lin(ceil, [[0, '#26292e'], [1, '#0b0c0e']])
    body += `<rect width="${W}" height="${vy}" fill="url(#${ceil})"/>`
    const ds = [1, 1.35, 1.8, 2.5, 3.5, 5, 7.5, 12]
    const us = [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4]
    for (let r = 0; r < ds.length - 1; r++) {
      for (let c = 0; c < us.length - 1; c++) {
        const q = [P(us[c], ds[r]), P(us[c + 1], ds[r]), P(us[c + 1], ds[r + 1]), P(us[c], ds[r + 1])]
        const fill = (r + c) % 2 ? '#3a1216' : '#16224d'
        body += `<path d="M${q.map(pt => pt.join(',')).join(' L')} Z" fill="${fill}" stroke="#5a5d63" stroke-width="${3 / Math.sqrt(ds[r])}"/>`
      }
    }
    body += `<rect x="${vx - 9}" y="${vy - 30}" width="18" height="30" fill="#fff" filter="url(#${glow})"/>`
    const art = [C.orange, C.teal, C.purple, C.gold]
    for (const side of [-1, 1]) {
      ;[1.25, 1.9, 2.9, 4.4].forEach((d, k) => {
        const [x, yb] = P(side * 1.25, d)
        const h = 330 / d, w = 52 / d, f = 34 / d
        const inner = side < 0 ? x + w : x - w
        body += `<path d="M${x},${yb} L${x},${yb - h} L${inner},${yb - h - 6 / d} L${inner},${yb - 6 / d} Z" fill="#070708"/>`
        const fx = side < 0 ? inner + 2 / d : inner - 2 / d - f
        body += `<rect x="${fx}" y="${yb - h * 0.82}" width="${f}" height="${h * 0.6}" fill="#fff"/>` +
          `<rect x="${fx + 2.5 / d}" y="${yb - h * 0.82 + 2.5 / d}" width="${f - 5 / d}" height="${h * 0.6 - 5 / d}" fill="${art[k]}"/>` +
          silhouette(fx + f / 2, yb - h * 0.23, 0.13 / d, '#0b0f15')
      })
    }
    body += `<g filter="url(#${glow})" fill="none" stroke="${C.red}" stroke-width="13" stroke-linecap="round">` +
      '<path d="M196,388 A118,36 0 1 1 300,334"/></g>' +
      `<path d="M186,370 L226,389 L186,406 Z" fill="${C.red}" filter="url(#${glow})"/>`
  }

  if (i === 2) {
    // dome theater: ring light overhead, curved wall of screens, logo on the floor
    const scr = id('g'), court = id('g')
    defs += lin(scr, [[0, '#0b1f3a'], [1, '#1d3f78']]) + lin(court, [[0, '#b77a44'], [1, '#8a5530']])
    body += '<ellipse cx="170" cy="30" rx="210" ry="150" fill="#f4f4f4"/>' +
      '<ellipse cx="150" cy="44" rx="165" ry="118" fill="#0b0b0d"/>' +
      '<ellipse cx="150" cy="80" rx="120" ry="70" fill="#131316"/>'
    const screenAt = (x, y, w, h, seed) => {
      const r = rng(seed)
      let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${scr})"/>` +
        `<path d="M${x},${y + h} L${x + w * 0.15},${y + h * 0.62} H${x + w * 0.85} L${x + w},${y + h} Z" fill="url(#${court})"/>`
      const n = w > 100 ? 6 : 2
      for (let k = 0; k < n; k++) {
        const cx = x + w * (n > 1 ? 0.1 + k * 0.16 + r() * 0.04 : 0.3 + k * 0.4)
        g += silhouette(cx, y + h * (0.86 + r() * 0.08), h / 1100, k % 2 ? '#f2f2f2' : C.red)
      }
      return g + ball(x + w * 0.55, y + h * 0.25, Math.min(w, h) * 0.07)
    }
    body += '<path d="M0,214 Q120,196 250,206 V350 Q120,344 0,356 Z" fill="#000"/>' +
      screenAt(6, 216, 238, 126, 11) +
      '<path d="M0,210 Q120,192 250,202 V216 Q120,206 0,224 Z" fill="#0b0b0d"/>' +
      '<path d="M0,346 Q120,334 250,340 V352 Q120,346 0,358 Z" fill="#0b0b0d"/>' +
      `<path d="M0,358 Q120,346 250,352" stroke="${C.red}" stroke-width="4" fill="none" filter="url(#${glow})"/>` +
      '<path d="M300,200 L380,186 V352 L300,348 Z" fill="#000"/>' + screenAt(306, 204, 70, 138, 23) +
      '<path d="M258,150 L292,142 V412 L258,418 Z" fill="#1a1a1c"/><path d="M292,142 L304,146 V408 L292,412 Z" fill="#050505"/>'
    body += `<ellipse cx="160" cy="432" rx="250" ry="78" fill="${C.red}" fill-opacity="0.8"/>` +
      `<ellipse cx="150" cy="434" rx="200" ry="58" fill="${C.blue}"/>` +
      ball(78, 432, 24) +
      `<text x="112" y="446" font-family="${FONT}" font-size="36" fill="#fff" transform="skewX(-12) translate(95,0)">PINOY HOOPS</text>`
  }

  body = `<g clip-path="url(#${clip})">${body}</g>` +
    `<rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="34" fill="none" stroke="#fff" stroke-opacity="0.85" stroke-width="3"/>`
  return svg(W, H, body, defs)
}

// ---------- big images ----------
function trophyImage() {
  const W = 620, H = 1030, g = id('g')
  return svg(W, H, trophyShape(W / 2, 0, 1.95, g), lin(g, [[0, '#fff1bf'], [0.45, C.gold], [1, '#9c6415']], 1, 1))
}

function virtualMuseum() {
  const W = 966, H = 447
  const scr = id('g')
  const screen = (x, y, w, h) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${scr})"/>` +
    `<path d="M${x},${y + h} L${x + w * 0.2},${y + h * 0.62} H${x + w * 0.8} L${x + w},${y + h} Z" fill="#c98a4b"/>` +
    [0.1, 0.4, 0.7].map(f => `<rect x="${x + w * f}" y="${y + h * 0.18}" width="${w * 0.2}" height="${h * 0.3}" fill="#e9e6df"/>`).join('') +
    ball(x + w * 0.5, y + h * 0.33, h * 0.1) +
    `<text x="${x + w / 2}" y="${y + h * 0.12}" text-anchor="middle" font-family="${FONT}" font-size="${h * 0.08}" fill="#fff">PINOY HOOPS FANDOM MUSEUM</text>`
  const body =
    '<rect x="150" y="40" width="560" height="340" rx="18" fill="#111" stroke="#333" stroke-width="4"/>' +
    screen(170, 60, 520, 300) +
    '<path d="M90,380 H770 L800,410 Q800,418 790,418 H70 Q60,418 60,410 Z" fill="#cfcfd4" stroke="#999" stroke-width="2"/>' +
    '<rect x="680" y="130" width="170" height="300" rx="24" fill="#111" stroke="#333" stroke-width="4"/>' +
    screen(692, 160, 146, 240)
  return svg(W, H, body, lin(scr, [[0, C.navy], [1, C.blue]]))
}

function bgPattern() {
  const W = 1920, H = 1080, g = id('g')
  return svg(W, H, `<rect width="${W}" height="${H}" fill="url(#${g})"/>` + courtLines(W, H, 0.05) + weave(W, H, '#fff', 0.02, 60),
    rad(g, [[0, '#1d2a38'], [1, '#080d13']], 0.5, 0.45, 0.75))
}

function formBg() {
  const W = 2136, H = 693, g = id('g'), band = id('g')
  return svg(W, H,
    `<rect width="${W}" height="${H}" fill="url(#${g})"/>` +
    `<path d="M${W * 0.55},0 L${W * 0.8},0 L${W * 0.5},${H} L${W * 0.25},${H} Z" fill="url(#${band})"/>` +
    courtLines(W, H, 0.07),
    lin(g, [[0, '#04111f'], [0.6, C.blue], [1, '#04111f']], 1, 0) + lin(band, [[0, C.red, 0.55], [1, C.red, 0.1]]))
}

function logo() {
  const W = 137, H = 83
  return svg(W, H, ball(36, 41, 30) +
    `<text x="74" y="36" font-family="${FONT}" font-size="22" fill="#fff">PINOY</text>` +
    `<text x="74" y="62" font-family="${FONT}" font-size="22" fill="${C.red}">HOOPS</text>`)
}

function icon() {
  const S = 512
  return svg(S, S, `<rect width="${S}" height="${S}" rx="96" fill="${C.red}"/>` + ball(S / 2, S / 2, 170))
}

function thumbnail() {
  const W = 1920, H = 928, g = id('g'), r = rng(77)
  let body = `<rect width="${W}" height="${H}" fill="url(#${g})"/>` +
    `<path d="M0,${H} L520,560 H1400 L${W},${H} Z" fill="#b98049"/>` +
    '<path d="M520,560 H1400" stroke="#fff" stroke-opacity="0.4" stroke-width="4"/>'
  for (let k = 0; k < 4; k++) {
    body += `<rect x="${60 + k * 110}" y="${220 + k * 22}" width="${80 - k * 6}" height="${130 - k * 10}" fill="#e9e6df"/>`
    body += `<rect x="${W - 140 - k * 110}" y="${220 + k * 22}" width="${80 - k * 6}" height="${130 - k * 10}" fill="#e9e6df"/>`
  }
  body += `<rect x="660" y="160" width="600" height="320" rx="12" fill="#05090f" stroke="${C.red}" stroke-width="6"/>` +
    `<text x="960" y="300" text-anchor="middle" font-family="${FONT}" font-size="90" fill="#fff">360° VIRTUAL TOUR</text>` +
    `<text x="960" y="390" text-anchor="middle" font-family="${FONT}" font-size="48" fill="${C.gold}">PREVIEW</text>` +
    silhouette(820, 760, 0.9, '#0b0f15') + silhouette(1110, 780, 1.0, '#0b0f15') +
    ball(960, 700, 40)
  void r
  return svg(W, H, body, lin(g, [[0, '#0b1622'], [1, '#243447']]))
}

// ---------- write everything ----------
// Photos (CC0, see CREDITS.md) replaced the illustrated scenes, so only the graphics still in use are written.
// The unused scene helpers above (arena, artist, collectorCover, collectionItem, trophyImage, ...) are kept for reference.
const out = {}
const put = (rel, content) => { write(A(...rel.split('/')), content); out[rel] = true }

for (const i of [5, 7, 18, 21]) put(`gallery-imgs/img-${i}.svg`, tile(i).svg)
for (let i = 0; i < 3; i++) put(`stack-imgs/card-${i + 1}.svg`, stackCard(i))
put('images/logo.svg', logo())

write(path.join(process.argv[3], 'icon.svg'), icon())
console.log(Object.keys(out).length + ' assets written')