/* ═══════════════════════════════════════════════════════════════════════════
   v2-components.jsx — Logo, Icon, Header, Footer, shared atoms
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Icon set ──────────────────────────────────────────────────────────── */
const V2_ICONS = {
  "heart-pulse":"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z|M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
  "map-pin":"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z|M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  "phone":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z",
  "calendar":"M8 2v4M16 2v4|M3 10h18|M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  "search":"m21 21-4.3-4.3|M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0",
  "x":"M18 6 6 18M6 6l12 12",
  "menu":"M4 6h16M4 12h16M4 18h16",
  "arrow-right":"M5 12h14M12 5l7 7-7 7",
  "chevron-right":"m9 18 6-6-6-6",
  "check-circle":"M22 11.08V12a10 10 0 1 1-5.93-9.14|m9 11 3 3L22 4",
  "check":"M20 6 9 17l-5-5",
  "star":"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  "clock":"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z|M12 6v6l4 2",
  "globe":"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z|M2 12h20|M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z",
  "user":"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2|M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
  "users":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0|M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  "shield-plus":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z|M9 12h6M12 9v6",
  "video":"m22 8-6 4 6 4V8Z|M14 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z",
  "syringe":"m18 2 4 4M17 7 9 15M12 9l-2 2M16 5l-2 2M3 21l1.7-1.7M14 11l-8.5 8.5a2.12 2.12 0 0 1-3-3L11 8M9 7l4 4",
  "stethoscope":"M4 3v6a5 5 0 0 0 10 0V3|M4 3H2m2 0h2m6 0h2m-2 0h-2|M14 14a5 5 0 0 0 5 5 3 3 0 0 0 3-3v-2|M20 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
  "baby":"M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5|M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5",
  "award":"M12 8m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0|M15.5 12.9 17 22l-5-3-5 3 1.5-9.1",
  "locate":"M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0|M12 2v3M12 19v3M2 12h3M19 12h3",
  "message":"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
  "card":"M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z|M2 10h20",
  "facebook":"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z",
  "instagram":"M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z|M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z|M17.5 6.5h.01",
  "twitter":"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2Z",
  "youtube":"M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17|m10 15 5-3-5-3z",
};
function V2Icon({ name, size = 24, style, className }) {
  const d = V2_ICONS[name]; if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style}
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {d.split("|").map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

/* ── Logo ──────────────────────────────────────────────────────────────── */
function V2Logo({ onClick, dark }) {
  return (
    <a href="#" className="v2-logo" onClick={(e) => { e.preventDefault(); onClick && onClick(); }} aria-label="Kids & Teens Medical Group home">
      <span className="mark"><V2Icon name="heart-pulse" size={26} /></span>
      <span className="text">
        <b style={dark ? { color: "#fff" } : {}}>Kids &amp; Teens</b>
        <span style={dark ? { color: "var(--teal-light)" } : {}}>Medical Group</span>
      </span>
    </a>
  );
}

/* ── Header ────────────────────────────────────────────────────────────── */
function V2Header({ route, nav, onBook, lang, setLang }) {
  const [open, setOpen] = React.useState(false);
  const navItems = [["services", "Services"], ["locations", "Locations"], ["doctors", "Doctors"], ["resources", "Resources"], ["about", "About"]];
  const handle = (key) => { setOpen(false); nav(key); };
  React.useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <>
      {/* Topbar */}
      <div className="v2-topbar">
        <div className="wrap">
          <a href="tel:8183615437"><V2Icon name="phone" size={14} /> (818) 361-5437</a>
          <span className="sep" />
          <a href="sms:6262987121"><V2Icon name="message" size={14} /> Text (626) 298-7121</a>
          <span className="spacer" />
          <div className="lang" role="group">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="v2-header">
        <div className="wrap">
          <V2Logo onClick={() => nav("home")} />
          <nav className="v2-nav">
            {navItems.map(([k, label]) => (
              <a key={k} href="#" className={route === k ? "active" : ""}
                onClick={(e) => { e.preventDefault(); handle(k); }}>{label}</a>
            ))}
          </nav>
          <div className="v2-header-right">
            <button className="v2-icon-btn" aria-label="Search" onClick={() => nav("search")}><V2Icon name="search" size={19} /></button>
            <a href="#" className="btn btn-outline v2-desk-only" onClick={(e) => { e.preventDefault(); nav("locations"); }}>
              <V2Icon name="map-pin" size={18} /> Find a Clinic
            </a>
            <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onBook(); }}>
              <V2Icon name="calendar" size={18} /> Book Appointment
            </a>
            <button className="v2-icon-btn v2-menu-btn" aria-label="Menu" onClick={() => setOpen(true)}><V2Icon name="menu" size={19} /></button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="v2-drawer-scrim" onClick={() => setOpen(false)} />
          <div className="v2-drawer">
            <div className="v2-drawer-head">
              <V2Logo onClick={() => { setOpen(false); nav("home"); }} />
              <button className="v2-modal-close" onClick={() => setOpen(false)} aria-label="Close"><V2Icon name="x" size={18} /></button>
            </div>
            <div className="v2-drawer-nav">
              {navItems.map(([k, label]) => (
                <a key={k} href="#" className={route === k ? "active" : ""}
                  onClick={(e) => { e.preventDefault(); handle(k); }}>{label} <V2Icon name="chevron-right" size={16} /></a>
              ))}
              {[["testimonials","Testimonials"],["careers","Careers"],["forms","Forms & Refills"],["contact","Contact Directory"]].map(([k,label]) => (
                <a key={k} href="#" onClick={(e) => { e.preventDefault(); handle(k); }}>{label} <V2Icon name="chevron-right" size={16} /></a>
              ))}
            </div>
            <div className="v2-drawer-cta">
              <a href="#" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); setOpen(false); onBook(); }}>
                <V2Icon name="calendar" size={20} /> Book Appointment
              </a>
              <a href="tel:8183615437" className="btn btn-outline btn-lg"><V2Icon name="phone" size={20} /> (818) 361-5437</a>
            </div>
            <div className="v2-drawer-footer">
              <a href="tel:6262987121"><V2Icon name="message" size={16} /> Text (626) 298-7121</a>
              <a href="mailto:customerservice@ktdoctor.com"><V2Icon name="message" size={16} /> customerservice@ktdoctor.com</a>
            </div>
          </div>
        </>
      )}

      {/* Mobile sticky CTA */}
      <div className="v2-sticky-mobile" role="toolbar">
        <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onBook(); }}>
          <V2Icon name="calendar" size={18} /> Book Appointment
        </a>
        <a href="tel:8183615437" className="btn btn-outline">
          <V2Icon name="phone" size={18} /> Call Now
        </a>
      </div>
    </>
  );
}

/* ── Footer ────────────────────────────────────────────────────────────── */
function V2Footer({ nav }) {
  const col = (head, links) => (
    <div>
      <h4>{head}</h4>
      <ul>{links.map(([l, fn], i) => <li key={i}><a href="#" onClick={(e) => { e.preventDefault(); fn && fn(); }}>{l}</a></li>)}</ul>
    </div>
  );
  return (
    <footer className="v2-footer">
      <div className="wrap">
        <div className="v2-footer-grid">
          <div>
            <div className="v2-footer-logo">
              <V2Logo dark onClick={() => nav("home")} />
            </div>
            <p className="blurb" style={{ marginTop: 14 }}>The largest pediatric network in Los Angeles — caring for kids and teens from birth through age 21 at 25 neighborhood clinics.</p>
            <div className="socials" style={{ marginTop: 18 }}>
              {["facebook","instagram","twitter","youtube"].map(s => (
                <a key={s} href="#" aria-label={s}><V2Icon name={s} size={17} /></a>
              ))}
            </div>
          </div>
          {col("Care", [
            ["Primary Care", () => nav("services")], ["Telehealth", () => nav("services")],
            ["Urgent Care", () => nav("services")], ["All Services", () => nav("services")],
          ])}
          {col("Company", [
            ["About Us", () => nav("about")], ["Our Doctors", () => nav("doctors")],
            ["Locations", () => nav("locations")], ["Testimonials", () => nav("testimonials")],
            ["Careers", () => nav("careers")],
          ])}
          {col("Patients", [
            ["Patient Portal", null], ["Pay Online", null],
            ["Forms & Refills", () => nav("forms")],
            ["Parent Resources", () => nav("resources")], ["Insurance", null],
          ])}
          <div>
            <h4>Get in Touch</h4>
            <ul style={{ gap: 10 }}>
              <li><a href="tel:8183615437"><V2Icon name="phone" size={14} style={{ display:"inline",verticalAlign:"-2px",marginRight:6 }} />(818) 361-5437</a></li>
              <li><a href="sms:6262987121"><V2Icon name="message" size={14} style={{ display:"inline",verticalAlign:"-2px",marginRight:6 }} />Text us</a></li>
              <li><a href="mailto:customerservice@ktdoctor.com" style={{ fontSize:12.5 }}>customerservice@ktdoctor.com</a></li>
            </ul>
            <a href="#" className="btn btn-primary" style={{ marginTop:18 }} onClick={(e) => { e.preventDefault(); nav("locations"); }}>
              <V2Icon name="map-pin" size={18} /> Find a Clinic
            </a>
          </div>
        </div>
        <div className="v2-footer-bottom">
          <span>© 2026 Kids &amp; Teens Medical Group. All rights reserved.</span>
          <div className="legal">
            <a href="#" onClick={(e) => { e.preventDefault(); nav("privacy"); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); nav("terms"); }}>Terms</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Photo component ───────────────────────────────────────────────────── */
function V2Photo({ id, alt, style, className }) {
  const src = window.KT_PHOTOS?.[id];
  if (src) return <img src={src} alt={alt||""} loading="lazy" style={style} className={className} />;
  return <div style={{ background:"var(--teal-6)", display:"flex", alignItems:"center", justifyContent:"center", ...style, borderRadius:"inherit" }} className={className}>
    <V2Icon name="heart-pulse" size={32} style={{ color:"var(--teal)", opacity:.3 }} />
  </div>;
}

Object.assign(window, { V2Icon, V2Logo, V2Header, V2Footer, V2Photo });
