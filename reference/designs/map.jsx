/* ═══════════════════════════════════════════════════════════════════════════
   map.jsx — Interactive SVG map replacing the placeholder in LocationsFinder
   ═══════════════════════════════════════════════════════════════════════════ */

const MAP_W = 800, MAP_H = 530;

const REGION_COLORS = {
  sfv: "#1668c5", sgv: "#0aa2b8", west: "#3457b3", south: "#0a7c8c",
};
const REGION_ZONES = [
  { id:"sfv",  cx:230, cy:150, rx:165, ry:110, label:"San Fernando Valley" },
  { id:"sgv",  cx:610, cy:215, rx:120, ry:100, label:"San Gabriel Valley" },
  { id:"west", cx:355, cy:310, rx:110, ry: 90, label:"Westside & Central" },
  { id:"south",cx:615, cy:400, rx:135, ry: 95, label:"South & Southeast" },
];

/* cluster algorithm — groups pins within THRESHOLD px */
const CLUSTER_D = 40;
function cluster(locs) {
  const used = new Set();
  const clusters = [];
  locs.forEach((a, i) => {
    if (used.has(a.slug)) return;
    const group = [a];
    used.add(a.slug);
    locs.forEach((b, j) => {
      if (i === j || used.has(b.slug)) return;
      const dx = a.x - b.x, dy = a.y - b.y;
      if (Math.sqrt(dx * dx + dy * dy) < CLUSTER_D) { group.push(b); used.add(b.slug); }
    });
    const cx = group.reduce((s, l) => s + l.x, 0) / group.length;
    const cy = group.reduce((s, l) => s + l.y, 0) / group.length;
    clusters.push({ locs: group, cx, cy, key: a.slug });
  });
  return clusters;
}

function InteractiveMap({ filtered, active, setActive, nav, t }) {
  const [hoverCluster, setHoverCluster] = React.useState(null);
  const clusters = React.useMemo(() => cluster(filtered), [filtered]);
  const activeLoc = filtered.find((l) => l.slug === active);

  return (
    <div className="imap-wrap">
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="imap-svg" aria-label="LA clinic map">
        <defs>
          <filter id="pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.22" />
          </filter>
          <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.2" fill="rgba(180,200,220,0.55)" />
          </pattern>
        </defs>

        {/* Base */}
        <rect width={MAP_W} height={MAP_H} fill="#f0f6fc" rx="12" />
        <rect width={MAP_W} height={MAP_H} fill="url(#dot-grid)" rx="12" />

        {/* Region zone blobs */}
        {REGION_ZONES.map((z) => (
          <g key={z.id}>
            <ellipse cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry}
              fill={REGION_COLORS[z.id]} fillOpacity="0.07"
              stroke={REGION_COLORS[z.id]} strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x={z.cx} y={z.cy - z.ry + 14} textAnchor="middle"
              fill={REGION_COLORS[z.id]} fillOpacity="0.65"
              fontSize="10" fontWeight="700" fontFamily="Hanken Grotesk, system-ui, sans-serif"
              letterSpacing="0.08em" style={{ textTransform:"uppercase" }}>
              {z.label}
            </text>
          </g>
        ))}

        {/* Cluster groups */}
        {clusters.map((cl) => {
          const isActive = cl.locs.some((l) => l.slug === active);
          const isHover = hoverCluster === cl.key;
          const color = REGION_COLORS[cl.locs[0].region] || "#1668c5";
          const urgent = cl.locs.some((l) => l.urgent);
          const multi = cl.locs.length > 1;
          return (
            <g key={cl.key} style={{ cursor:"pointer" }}
              onClick={() => { if (!multi) { nav("location", cl.locs[0].slug); } else { setActive(cl.locs[0].slug); } }}
              onMouseEnter={() => { setActive(cl.locs[0].slug); setHoverCluster(cl.key); }}
              onMouseLeave={() => setHoverCluster(null)}>
              {/* glow ring for active */}
              {isActive && <circle cx={cl.cx} cy={cl.cy} r={multi ? 22 : 18} fill={color} fillOpacity="0.15" />}
              {/* pin body */}
              <circle cx={cl.cx} cy={cl.cy} r={multi ? 16 : 12}
                fill={isActive ? color : "#fff"}
                stroke={color} strokeWidth={isActive ? 0 : 2.5}
                filter="url(#pin-shadow)"
                style={{ transition:"all .2s" }} />
              {/* urgent badge */}
              {urgent && !multi && (
                <circle cx={cl.cx + 8} cy={cl.cy - 8} r={5} fill="#e8743b" stroke="#fff" strokeWidth="1.5" />
              )}
              {/* count or icon */}
              {multi ? (
                <text x={cl.cx} y={cl.cy + 4} textAnchor="middle" fontSize="11" fontWeight="800"
                  fill={isActive ? "#fff" : color} fontFamily="Hanken Grotesk, system-ui, sans-serif">{cl.locs.length}</text>
              ) : (
                <circle cx={cl.cx} cy={cl.cy} r={4}
                  fill={isActive ? "#fff" : color} />
              )}
            </g>
          );
        })}

        {/* Active callout */}
        {activeLoc && (() => {
          const x = activeLoc.x, y = activeLoc.y;
          const bw = 180, bh = 68, bx = Math.max(6, Math.min(x - bw / 2, MAP_W - bw - 6)), by = Math.max(6, y - bh - 18);
          return (
            <g className="map-callout-g" style={{ pointerEvents:"none" }}>
              <rect x={bx} y={by} width={bw} height={bh} rx="10" fill="#fff"
                stroke="var(--line, #e2eaf2)" strokeWidth="1.5"
                filter="url(#pin-shadow)" />
              <text x={bx + 12} y={by + 21} fontSize="13" fontWeight="700"
                fill="#122031" fontFamily="Hanken Grotesk, system-ui, sans-serif">{activeLoc.name}</text>
              <text x={bx + 12} y={by + 37} fontSize="11" fill="#6b7e90"
                fontFamily="Hanken Grotesk, system-ui, sans-serif">{activeLoc.city}, CA {activeLoc.zip}</text>
              <text x={bx + 12} y={by + 53} fontSize="11" fill="#41566a"
                fontFamily="Hanken Grotesk, system-ui, sans-serif">{activeLoc.hours?.split(" · ")[0]}</text>
              {activeLoc.urgent && (
                <rect x={bx + bw - 58} y={by + 8} width={50} height={16} rx="8" fill="#e8743b" fillOpacity="0.15" />
              )}
              {activeLoc.urgent && (
                <text x={bx + bw - 33} y={by + 19} fontSize="9.5" fontWeight="700"
                  fill="#e8743b" textAnchor="middle" fontFamily="Hanken Grotesk, system-ui, sans-serif">URGENT</text>
              )}
            </g>
          );
        })()}
      </svg>

      {/* Map tag */}
      <div className="imap-tag">
        <span>{filtered.length} {t("clinics", "clínicas")}</span>
      </div>
    </div>
  );
}

Object.assign(window, { InteractiveMap });
