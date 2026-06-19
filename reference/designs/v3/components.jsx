/* ═══════════════════════════════════════════════════════════════════════════
   Shared chrome + primitives — exported to window for the other babel scripts.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Icon set (line icons, currentColor) ───────────────────────────────── */
const ICON_PATHS = {
  "map-pin": "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z|M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z",
  video: "m22 8-6 4 6 4V8Z|M14 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z",
  calendar: "M8 2v4M16 2v4|M3 10h18|M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  search: "M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0|m21 21-4.3-4.3",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-right": "m9 18 6-6-6-6",
  "chevron-left": "m15 18-6-6 6-6",
  "arrow-right": "M5 12h14M12 5l7 7-7 7",
  menu: "M4 6h16M4 12h16M4 18h16",
  globe: "M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0|M2 12h20|M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z",
  x: "M18 6 6 18M6 6l12 12",
  clock: "M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0|M12 6v6l4 2",
  message: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
  card: "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z|M2 10h20",
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2|M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0|M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  plus: "M5 12h14M12 5v14",
  "heart-pulse": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z|M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
  "shield-plus": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z|M9 12h6M12 9v6",
  baby: "M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5|M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5",
  syringe: "m18 2 4 4M17 7 9 15M12 9l-2 2M16 5l-2 2M3 21l1.7-1.7M14 11l-8.5 8.5a2.12 2.12 0 0 1-3-3L11 8M9 7l4 4",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z|M14 2v6h6M16 13H8M16 17H8M10 9H8",
  play: "M6 3v18l14-9z",
  check: "M20 6 9 17l-5-5",
  "check-circle": "M22 11.08V12a10 10 0 1 1-5.93-9.14|m9 11 3 3L22 4",
  heart: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  award: "M12 8m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0|M15.5 12.9 17 22l-5-3-5 3 1.5-9.1",
  hospital: "M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18|M2 22h20|M12 6v4M10 8h4|M9 22v-4h6v4",
  locate: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0|M12 2v3M12 19v3M2 12h3M19 12h3",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z|M9 4v14M15 6v14",
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z|M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z|M17.5 6.5h.01",
  twitter: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2Z",
  youtube: "M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17|m10 15 5-3-5-3z",
  sparkle: "M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z",
  stethoscope: "M4 3v6a5 5 0 0 0 10 0V3|M4 3H2m2 0h2m6 0h2m-2 0h-2|M14 14a5 5 0 0 0 5 5 3 3 0 0 0 3-3v-2|M20 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
};
const FILLED = new Set(["play"]);

function Icon({ name, size, filled, style, className }) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  const isFill = filled || FILLED.has(name);
  return (
    <svg viewBox="0 0 24 24" width={size || 24} height={size || 24} className={className}
    style={style} fill={isFill ? "currentColor" : "none"}
    stroke={isFill ? "none" : "currentColor"} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.split("|").map((p, i) => <path key={i} d={p} />)}
    </svg>);

}

/* ── Placeholder image ─────────────────────────────────────────────────── */
function Ph({ label, className, style }) {
  return <div className={"ph " + (className || "")} data-label={label} style={style} />;
}

/* ── User-fillable photo slot (drag & drop, persists) ──────────────────── */
function PhotoSlot({ id, label, aspect, radius, shadow, className, style }) {
  // Auto-pick from photo registry; users can still drag a replacement via image-slot.
  const src = window.KT_PHOTOS?.[id];
  const wrapStyle = {
    aspectRatio: aspect, width: "100%",
    borderRadius: (radius != null ? radius + "px" : "var(--radius)"),
    overflow: "hidden",
    boxShadow: shadow ? "var(--shadow-lg)" : undefined,
    ...style
  };
  return (
    <div className={"photo-slot-wrap " + (className || "")} style={wrapStyle}>
      {src ?
      <img src={src} alt={label || ""} loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> :
      React.createElement("image-slot", {
        id,
        placeholder: label || "Drop a photo",
        shape: "rect",
        className: "photo-slot",
        style: { display: "block", width: "100%", height: "100%" }
      })
      }
    </div>);

}

/* ── Logo ──────────────────────────────────────────────────────────────── */
function Logo({ onClick, lang }) {
  return (
    <a href="#" className="logo" onClick={(e) => {e.preventDefault();onClick && onClick();}} aria-label="Kids & Teens Medical Group home">
      <img src={window.RES("assets/kt-logo.png")} alt="Kids & Teens Medical Group" className="logo-img" />
    </a>);

}

/* ── Top utility bar ───────────────────────────────────────────────────── */
function TopBar({ lang, setLang, t }) {
  return (
    <div className="topbar">
      <div className="wrap">
        <a href="tel:8183615437" className="desktop-only"><Icon name="phone" size={14} /> (818) 361-5437</a>
        <span className="sep desktop-only" />
        <a href="sms:6262987121" className="desktop-only"><Icon name="message" size={14} /> {t("Text us", "Envíe texto")} (ENG)</a>
        <a href="sms:8184235637" className="desktop-only"><Icon name="message" size={14} /> {t("Text us", "Envíe texto")} (ESP)</a>
        <span className="spacer" />
        <a href="#" className="desktop-only" onClick={(e) => {e.preventDefault();location.hash = '/contact';}}><Icon name="map" size={14} /> {t("Directory", "Directorio")}</a>
        <span className="sep desktop-only" />
        <a href="#" className="desktop-only"><Icon name="card" size={14} /> {t("Pay Online", "Pagar en línea")}</a>
        <span className="sep desktop-only" />
        <a href="#" className="desktop-only"><Icon name="user" size={14} /> {t("Patient Portal", "Portal del Paciente")}</a>
        <div className="lang-toggle" role="group" aria-label="Language">
          <button data-on={lang === "en" ? "1" : "0"} onClick={() => setLang("en")}>EN</button>
          <button data-on={lang === "es" ? "1" : "0"} onClick={() => setLang("es")}>ES</button>
        </div>
      </div>
    </div>);

}

/* ── Header / nav ──────────────────────────────────────────────────────── */
function Header({ nav, route, lang, setLang, t, onBook, onLocations, onSearch }) {
  const [open, setOpen] = React.useState(false);
  const items = [
  ["home", t("Home", "Inicio")],
  ["doctors", t("Our Doctors", "Doctores")],
  ["resources", t("Parent Resources", "Recursos")],
  ["testimonials", t("Testimonials", "Testimonios")],
  ["forms", t("Forms Only", "Formularios")],
  ["about", t("About", "Nosotros")]];

  const drawerItems = [
  ...items,
  ["directory", t("Directory", "Directorio")],
  ["careers", t("Careers", "Empleos")]];

  const handle = (key) => {setOpen(false);key === "locations" ? onLocations() : nav(key);};
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {document.body.style.overflow = "";};
  }, [open]);
  return (
    <>
      <TopBar lang={lang} setLang={setLang} t={t} />
      <header className="header">
        <div className="wrap">
          <Logo lang={lang} onClick={() => {setOpen(false);nav("home");}} />
          <nav className="nav">
            {items.map(([key, label]) =>
            <a key={key} href="#" className={route.page === key ? "active" : ""}
            onClick={(e) => {e.preventDefault();handle(key);}}>{label}</a>
            )}
          </nav>
          <div className="header-cta">
            <button className="icon-btn search-btn" aria-label="Search" onClick={onSearch}><Icon name="search" size={19} /></button>
            <button className="icon-btn menu-btn" aria-label="Menu" onClick={() => setOpen(true)}>
              <Icon name="menu" size={19} />
            </button>
          </div>
        </div>
      </header>
      {open &&
      <>
          <div className="mobile-scrim" onClick={() => setOpen(false)} />
          <div className="mobile-drawer">
            <div className="drawer-head">
              <Logo lang={lang} onClick={() => {setOpen(false);nav("home");}} />
              <button className="modal-close" aria-label="Close" onClick={() => setOpen(false)}><Icon name="x" size={18} /></button>
            </div>
            <div className="drawer-nav">
              {drawerItems.map(([key, label]) =>
            <a key={key} href="#" className={route.page === key ? "active" : ""}
            onClick={(e) => {e.preventDefault();handle(key);}}>{label} <Icon name="chevron-right" size={16} /></a>
            )}
            </div>
            <div className="drawer-cta">
              <a href="#" className="btn btn-primary" onClick={(e) => {e.preventDefault();setOpen(false);onBook();}}><Icon name="calendar" size={18} /> {t("Book a same-day appointment", "Reservar cita el mismo día")}</a>
              <a href="#" className="btn btn-ghost" onClick={(e) => {e.preventDefault();setOpen(false);onSearch();}}><Icon name="search" size={18} /> {t("Search", "Buscar")}</a>
            </div>
            <div className="drawer-lang" role="group" aria-label="Language">
              <button data-on={lang === "en" ? "1" : "0"} onClick={() => setLang("en")}>English</button>
              <button data-on={lang === "es" ? "1" : "0"} onClick={() => setLang("es")}>Español</button>
            </div>
            <div className="drawer-util">
              <a href="tel:8183615437"><Icon name="phone" size={16} /> (818) 361-5437</a>
              <a href="sms:6262987121"><Icon name="message" size={16} /> {t("Text us (ENG)", "Texto (ENG)")}</a>
              <a href="#"><Icon name="card" size={16} /> {t("Pay Online", "Pagar en línea")}</a>
              <a href="#"><Icon name="user" size={16} /> {t("Patient Portal", "Portal del Paciente")}</a>
            </div>
          </div>
        </>
      }
    </>);

}

/* ── Footer ────────────────────────────────────────────────────────────── */
function Footer({ nav, lang, t, onLocations }) {
  const col = (head, links) =>
  <div>
      <h4>{head}</h4>
      <ul>{links.map(([label, fn], i) =>
      <li key={i}><a href="#" onClick={(e) => {e.preventDefault();fn && fn();}}>{label}</a></li>
      )}</ul>
    </div>;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo lang={lang} onClick={() => nav("home")} />
            <p className="blurb">{t(
                "Kids and Teens Medical Group is the leading provider of pediatric care with extended hours in Southern California. We are focused on changing the way you think about children's health.",
                "La red pediátrica más grande de Los Ángeles — cuidando a niños y adolescentes desde el nacimiento hasta los 21 años en 25 clínicas.")}</p>
            <div className="socials">
              {["facebook", "instagram", "twitter", "youtube"].map((s) =>
              <a key={s} href="#" aria-label={s}><Icon name={s} size={18} /></a>
              )}
            </div>
          </div>
          {col(t("Care", "Atención"), [
          [t("Primary Care", "Atención Primaria"), () => nav("care", "primary-care")],
          [t("Telehealth", "Telesalud"), () => nav("care", "telehealth")],
          [t("Urgent Care", "Atención Urgente"), () => nav("care", "urgent-care")],
          [t("All Services", "Servicios"), () => nav("services")]]
          )}
          {col(t("Company", "Empresa"), [
          [t("About Us", "Nosotros"), () => nav("about")],
          [t("Our Doctors", "Doctores"), () => nav("doctors")],
          [t("Directory", "Directorio"), () => nav("directory")],
          [t("Testimonials", "Testimonios"), () => nav("testimonials")],
          [t("Careers", "Empleos"), () => nav("careers")]]
          )}
          {col(t("Patients", "Pacientes"), [
          [t("Patient Portal", "Portal"), null],
          [t("Pay Online", "Pagar"), null],
          [t("Forms & Refills", "Formularios"), () => nav("forms")],
          [t("Parent Resources", "Recursos"), () => nav("resources")],
          [t("Insurance", "Seguros"), null]]
          )}
          <div>
            <h4>{t("Get in touch", "Contáctenos")}</h4>
            <ul>
              <li><a href="tel:8183615437"><Icon name="phone" size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />(818) 361-5437</a></li>
              <li><a href="tel:6267958811"><Icon name="phone" size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />(626) 795-8811</a></li>
              <li><a href="mailto:customerservice@ktdoctor.com"><Icon name="message" size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />customerservice@ktdoctor.com</a></li>
            </ul>
            <a href="#" className="btn btn-primary" style={{ marginTop: 16 }} onClick={(e) => {e.preventDefault();onLocations();}}>
              <Icon name="map-pin" size={18} /> {t("Find a clinic", "Buscar clínica")}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kids &amp; Teens Medical Group. {t("All rights reserved.", "Todos los derechos reservados.")}</span>
          <div className="legal">
            <a href="#" onClick={(e) => {e.preventDefault();nav("privacy");}}>{t("Privacy Policy", "Privacidad")}</a>
            <a href="#" onClick={(e) => {e.preventDefault();nav("terms");}}>{t("Terms", "Términos")}</a>
            <a href="#">{t("Accessibility", "Accesibilidad")}</a>
          </div>
        </div>
      </div>
    </footer>);

}

/* ── Generic modal ─────────────────────────────────────────────────────── */
function Modal({ title, onClose, children, wide }) {
  React.useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" style={wide ? { maxWidth: 980 } : null} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>);

}

/* ── Sticky quick-action bar (appears on scroll, home only) ────────────── */
function StickyBar({ t, onBook, onLocations, onSearch }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={"sticky-bar" + (show ? " show" : "")} aria-hidden={!show}>
      <div className="wrap">
        <div className="sb-brand">
          <img src={window.RES("assets/kt-logo.png")} alt="Kids & Teens Medical Group" className="sb-logo" />
        </div>
        <div className="sb-actions">
          <button className="sb-icon" aria-label="Search" onClick={onSearch}><Icon name="search" size={18} /></button>
          <a href="#" className="btn btn-ghost sb-find" onClick={(e) => { e.preventDefault(); onLocations(); }}>
            <Icon name="map-pin" size={17} /> {t("Find a clinic", "Buscar clínica")}
          </a>
          <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onBook(); }}>
            <Icon name="calendar" size={17} /> {t("Book", "Reservar")}
          </a>
        </div>
      </div>
    </div>);

}

Object.assign(window, { Icon, Ph, PhotoSlot, Logo, TopBar, Header, Footer, Modal, StickyBar });