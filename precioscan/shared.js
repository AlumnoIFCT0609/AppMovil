// ── DATOS DE EJEMPLO ──────────────────────────────────────────
const REGISTROS_INICIALES = [
  {id:1, emoji:'🥛', item:'Leche',          precio:0.89, sitio:'Lidl Triana',        contacto:'954 111 222', obs:'',                     fecha:'2025-06-12', lat:37.3841, lon:-5.9998},
  {id:2, emoji:'🍚', item:'Arroz',          precio:1.15, sitio:'Carrefour SF',        contacto:'',            obs:'Marca propia',          fecha:'2025-06-10', lat:37.3912, lon:-5.9812},
  {id:3, emoji:'🫒', item:'Aceite de oliva',precio:4.50, sitio:'Mercadona Nervión',   contacto:'',            obs:'1L virgen extra',       fecha:'2025-06-09', lat:37.3890, lon:-5.9920},
  {id:4, emoji:'🥤', item:'Refresco Cola',  precio:1.55, sitio:'Alcampo Este',        contacto:'',            obs:'2L',                    fecha:'2025-06-08', lat:37.4012, lon:-5.9654},
  {id:5, emoji:'🍉', item:'Sandía',         precio:2.30, sitio:'Mercadona Nervión',   contacto:'',            obs:'',                      fecha:'2025-06-07', lat:37.3890, lon:-5.9920},
  {id:6, emoji:'🍑', item:'Melocotón',      precio:3.20, sitio:'Lidl Triana',         contacto:'',            obs:'Precio por kg',         fecha:'2025-06-06', lat:37.3841, lon:-5.9998},
  {id:7, emoji:'🍈', item:'Melón',          precio:1.80, sitio:'Carrefour SF',        contacto:'',            obs:'',                      fecha:'2025-06-05', lat:37.3912, lon:-5.9812},
  {id:8, emoji:'🍗', item:'Pollo (kg)',     precio:3.90, sitio:'Mercadona Nervión',   contacto:'',            obs:'Pollo entero',          fecha:'2025-06-04', lat:37.3890, lon:-5.9920},
  {id:9, emoji:'🥚', item:'Huevos (docena)',precio:2.10, sitio:'Lidl Triana',         contacto:'',            obs:'Camperos L',            fecha:'2025-06-03', lat:37.3841, lon:-5.9998},
  {id:10,emoji:'🫙', item:'Yogur',          precio:0.65, sitio:'Alcampo Este',        contacto:'',            obs:'Natural sin azúcar',    fecha:'2025-06-02', lat:37.4012, lon:-5.9654},
  {id:11,emoji:'🥛', item:'Leche',          precio:0.95, sitio:'Mercadona Nervión',   contacto:'',            obs:'Desnatada',             fecha:'2025-06-01', lat:37.3890, lon:-5.9920},
  {id:12,emoji:'🍈', item:'Melón',          precio:2.10, sitio:'Alcampo Este',        contacto:'',            obs:'',                      fecha:'2025-05-31', lat:37.4012, lon:-5.9654},
];

const ITEMS_INICIALES = [
  'Aceite de oliva','Agua mineral','Arroz','Azúcar','Café','Cereales',
  'Cereza','Detergente lavadora','Galletas','Harina','Huevos (docena)',
  'Jamón serrano','Leche','Legumbres (kg)','Mantequilla','Melón',
  'Melocotón','Mermelada','Pan de molde','Pasta','Pescado (kg)',
  'Pollo (kg)','Queso','Refresco Cola','Sal','Sandía',
  'Tomate frito','Verdura (kg)','Yogur','Zumo',
];

// ── STORAGE ──────────────────────────────────────────────────
function getRegistros() {
  try {
    const d = sessionStorage.getItem('ps_registros');
    return d ? JSON.parse(d) : [...REGISTROS_INICIALES];
  } catch { return [...REGISTROS_INICIALES]; }
}
function setRegistros(data) {
  try { sessionStorage.setItem('ps_registros', JSON.stringify(data)); } catch {}
}
function getItems() {
  try {
    const d = sessionStorage.getItem('ps_items');
    return d ? JSON.parse(d) : [...ITEMS_INICIALES];
  } catch { return [...ITEMS_INICIALES]; }
}
function setItems(data) {
  try { sessionStorage.setItem('ps_items', JSON.stringify(data)); } catch {}
}
function nextId() {
  const regs = getRegistros();
  return regs.length ? Math.max(...regs.map(r => r.id)) + 1 : 1;
}

// ── TOAST ────────────────────────────────────────────────────
function toast(msg, duration = 2400) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

// ── DISTANCIA HAVERSINE ──────────────────────────────────────
function distanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
            Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ── FORMATO FECHA ────────────────────────────────────────────
function formatFecha(isoStr) {
  const [y,m,d] = isoStr.split('-');
  return `${d}/${m}/${y.slice(2)}`;
}

// ── SVG LOGO ─────────────────────────────────────────────────
const LOGO_SVG = `<svg viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="680" rx="140" fill="#1B5E20"/>
  <rect x="130" y="240" width="420" height="300" rx="40" fill="#FFFFFF"/>
  <rect x="240" y="195" width="140" height="65" rx="20" fill="#FFFFFF"/>
  <circle cx="340" cy="390" r="110" fill="#1B5E20"/>
  <circle cx="340" cy="390" r="85" fill="#145214"/>
  <circle cx="340" cy="390" r="60" fill="#E8F5E9"/>
  <circle cx="315" cy="365" r="18" fill="#FFFFFF" opacity="0.6"/>
  <rect x="160" y="268" width="44" height="30" rx="8" fill="#FFC107"/>
  <rect x="390" y="180" width="160" height="80" rx="12" fill="#FFC107"/>
  <circle cx="408" cy="220" r="10" fill="#1B5E20"/>
  <line x1="408" y1="210" x2="408" y2="180" stroke="#1B5E20" stroke-width="5" stroke-linecap="round"/>
  <text x="468" y="231" font-family="Arial" font-size="42" font-weight="700" fill="#1B5E20" text-anchor="middle">€</text>
</svg>`;

// ── NAVBAR ───────────────────────────────────────────────────
function renderNav(active) {
  const tabs = [
    {id:'foto',      href:'foto.html',      icon:'📷', label:'Foto'},
    {id:'registros', href:'registros.html', icon:'📋', label:'Registros'},
    {id:'listados',  href:'listados.html',  icon:'📊', label:'Listados'},
    {id:'busqueda',  href:'busqueda.html',  icon:'🔍', label:'Buscar'},
    {id:'productos', href:'productos.html', icon:'🏷️', label:'Productos'},
  ];
  return `<nav class="nav-tabs">
    ${tabs.map(t => `<a href="${t.href}" class="nav-tab ${active===t.id?'active':''}">${t.icon} ${t.label}</a>`).join('')}
  </nav>`;
}

function renderTopbar(title) {
  return `<div class="topbar">
    <a href="index.html" class="topbar-logo">
      ${LOGO_SVG}
      <span>PrecioScan</span>
    </a>
    <span class="topbar-title" style="text-align:right">${title}</span>
  </div>`;
}

function renderRegCard(r, showActions = true) {
  return `<div class="reg-card" id="card-${r.id}">
    <div class="reg-card-img">${r.emoji}</div>
    <div class="reg-card-top">
      <span class="reg-card-item">${r.item}</span>
      <span class="reg-card-precio">${r.precio.toFixed(2)} €</span>
    </div>
    <div class="reg-card-bottom">
      <div class="reg-card-meta">
        ${r.sitio}<br>
        ${r.contacto ? r.contacto + '<br>' : ''}
        📍 ${r.lat.toFixed(4)}° · 🗓 ${formatFecha(r.fecha)}
      </div>
      ${showActions ? `<div class="reg-card-actions">
        <button class="btn-icon" title="Editar" onclick="editarReg(${r.id})">✏️</button>
        <button class="btn-icon" title="Borrar" onclick="borrarReg(${r.id})">🗑️</button>
      </div>` : ''}
    </div>
  </div>`;
}
