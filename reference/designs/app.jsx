/* ═══════════════════════════════════════════════════════════════════════════
   App — router, tweaks, language, modals
   ═══════════════════════════════════════════════════════════════════════════ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": ["#0a7c8c", "#073f49", "#1668c5"],
  "heroLayout": "feature",
  "careStyle": "soft",
  "locationsView": "map",
  "typePair": "lora",
  "radius": 5,
  "showPartners": true
}/*EDITMODE-END*/;

const TYPE_PAIRS = {
  lora: { head: '"Lora", Georgia, serif', body: '"Hanken Grotesk", system-ui, sans-serif', label: "Lora + Hanken" },
  news: { head: '"Newsreader", Georgia, serif', body: '"Figtree", system-ui, sans-serif', label: "Newsreader + Figtree" },
  sans: { head: '"Hanken Grotesk", system-ui, sans-serif', body: '"Hanken Grotesk", system-ui, sans-serif', label: "Hanken Grotesk" },
};

const THEMES = [
  ["#1668c5", "#0c3f7a", "#0aa2b8"],
  ["#1b3a6b", "#102544", "#2f9e8f"],
  ["#0a7c8c", "#073f49", "#1668c5"],
  ["#3457b3", "#1d2f6b", "#5ab0d6"],
];

// URL params let the comparison canvas embed isolated, pre-tweaked views.
const URLP = new URLSearchParams(location.search);
function initialTweaks() {
  const d = { ...TWEAK_DEFAULTS };
  if (URLP.get("theme") != null && THEMES[+URLP.get("theme")]) d.theme = THEMES[+URLP.get("theme")];
  ["heroLayout", "careStyle", "locationsView", "typePair"].forEach((k) => { if (URLP.get(k)) d[k] = URLP.get(k); });
  if (URLP.get("radius")) d.radius = +URLP.get("radius");
  if (URLP.get("showPartners")) d.showPartners = URLP.get("showPartners") === "1";
  return d;
}

/* ── Booking modal ─────────────────────────────────────────────────────── */
function BookingModal({ t, onClose }) {
  const KT = window.KT;
  const [done, setDone] = React.useState(false);
  const [f, setF] = React.useState({ clinic: "", care: "Well-child visit", name: "", phone: "" });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const field = { width: "100%", padding: "12px 14px", border: "1.5px solid var(--line-2)", borderRadius: 11, font: "inherit", fontSize: 15, color: "var(--ink)", background: "#fff", outline: "none" };
  const lab = { fontSize: 13, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 7 };
  if (done) {
    return (
      <Modal title={t("Appointment requested", "Cita solicitada")} onClose={onClose}>
        <div style={{ textAlign: "center", padding: "16px 8px 8px" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "color-mix(in srgb, var(--good) 14%, #fff)", color: "var(--good)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}><Icon name="check-circle" size={34} /></div>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: 22 }}>{t("You're all set!", "¡Todo listo!")}</h3>
          <p className="muted" style={{ maxWidth: "42ch", margin: "10px auto 0" }}>{t("Our team will call you shortly to confirm. For urgent needs, please call your nearest clinic directly.", "Nuestro equipo le llamará pronto para confirmar.")}</p>
          <button className="btn btn-primary" style={{ marginTop: 22 }} onClick={onClose}>{t("Done", "Listo")}</button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal title={t("Book an appointment", "Reservar una cita")} onClose={onClose}>
      <p className="muted" style={{ marginTop: -6, marginBottom: 20 }}>{t("Request a visit and we'll confirm by phone. It only takes a minute.", "Solicite una visita y la confirmaremos por teléfono.")}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lab}>{t("Choose a clinic", "Elija una clínica")}</label>
          <select style={field} value={f.clinic} onChange={(e) => set("clinic", e.target.value)}>
            <option value="">{t("Select a location…", "Seleccione…")}</option>
            {KT.locations.map((l) => <option key={l.slug} value={l.slug}>{l.name} — {l.city}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lab}>{t("Type of visit", "Tipo de visita")}</label>
          <select style={field} value={f.care} onChange={(e) => set("care", e.target.value)}>
            {["Well-child visit", "Sick visit", "Telehealth / video visit", "Urgent care", "Vaccines", "Sports physical"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label style={lab}>{t("Parent / guardian name", "Nombre del tutor")}</label>
          <input style={field} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder={t("Full name", "Nombre completo")} />
        </div>
        <div>
          <label style={lab}>{t("Phone", "Teléfono")}</label>
          <input style={field} value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(555) 555-5555" />
        </div>
      </div>
      <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 22 }} onClick={() => setDone(true)}>
        <Icon name="calendar" size={18} /> {t("Request appointment", "Solicitar cita")}
      </button>
      <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 12 }}>{t("This is a prototype — no real appointment is booked.", "Esto es un prototipo.")}</p>
    </Modal>
  );
}

/* ── Locations modal ───────────────────────────────────────────────────── */
function LocationsModal({ t, nav, onClose }) {
  const KT = window.KT;
  const go = (slug) => { onClose(); nav("location", slug); };
  return (
    <Modal title={t("Find a location", "Buscar una ubicación")} onClose={onClose} wide>
      <p className="muted" style={{ marginTop: -6, marginBottom: 18 }}>{t("25 clinics across Los Angeles. Pick a neighborhood to see hours and services.", "25 clínicas en Los Ángeles.")}</p>
      {Object.entries(KT.REGIONS).map(([k, label]) => (
        <div key={k}>
          <div className="modal-region-label">{label}</div>
          <div className="modal-loc-grid">
            {KT.locations.filter((l) => l.region === k).map((l) => (
              <a href="#" key={l.slug} onClick={(e) => { e.preventDefault(); go(l.slug); }}>
                <Icon name="map-pin" size={15} /> {l.name}{l.urgent && <span className="pill-urgent" style={{ marginLeft: "auto" }}>{t("Urgent", "Urg.")}</span>}
              </a>
            ))}
          </div>
        </div>
      ))}
      <button className="btn btn-ghost" style={{ width: "100%", marginTop: 22 }} onClick={() => { onClose(); nav("locations"); }}>
        <Icon name="map" size={18} /> {t("Open full locations map", "Abrir mapa completo")}
      </button>
    </Modal>
  );
}

/* ── Services modal ────────────────────────────────────────────────────── */
function ServicesModal({ t, nav, onClose }) {
  const KT = window.KT;
  return (
    <Modal title={t("All services", "Todos los servicios")} onClose={onClose} wide>
      <p className="muted" style={{ marginTop: -6, marginBottom: 18 }}>{t("20 specialty and everyday services for kids and teens.", "20 servicios para niños y adolescentes.")}</p>
      <div className="svc-grid">
        {KT.services.map((s) => {
          const detail = KT.serviceBySlug?.[s.replace(/ & /g,"-").replace(/ \/ /g,"-").replace(/ /g,"-").toLowerCase()] ||
            KT.serviceDetails?.find((d) => d.name === s);
          return (
            <a href="#" key={s} onClick={(e) => { e.preventDefault(); onClose(); detail ? nav("service", detail.slug) : nav("services"); }}>{s}</a>
          );
        })}
      </div>
    </Modal>
  );
}

/* ── App ───────────────────────────────────────────────────────────────── */
function parseHash() {
  const h = (location.hash || "").replace(/^#\/?/, "").split("/");
  return { page: h[0] || "home", param: h[1] || null };
}

function App() {
  const [tw, setTweak] = useTweaks(initialTweaks());
  const [lang, setLang] = React.useState(() => localStorage.getItem("kt_lang") || "en");
  const [route, setRoute] = React.useState(parseHash);
  const [modal, setModal] = React.useState(null);
  const only = URLP.get("only");

  const t = React.useCallback((en, es) => (lang === "es" ? es : en), [lang]);

  React.useEffect(() => { localStorage.setItem("kt_lang", lang); }, [lang]);
  React.useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Scroll-reveal: default-visible; adds a one-shot entry animation as elements
  // approach the viewport. Never hides content (no stranding if JS/IO is absent).
  React.useEffect(() => {
    if (only) return;
    document.documentElement.classList.add("js-reveal");
    const sel = ".sec-head, .care-card, .loc-card, .res-card, .story-card, .job-row, .testi-card, .value-card, .insurance, .finder, .doctor-card, .form-group, .stat-band, .partner-row";
    const mark = () => {
      const vh = window.innerHeight;
      document.querySelectorAll(sel).forEach((el) => {
        if (el.dataset.rv) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) { el.dataset.rv = "1"; el.classList.add("reveal-in"); }
      });
    };
    let last = 0;
    const onScroll = () => { const now = Date.now(); if (now - last > 60) { last = now; mark(); } };
    mark();
    const tid = setTimeout(mark, 90);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); clearTimeout(tid); };
  }, [route, only]);

  const nav = React.useCallback((page, param) => {
    location.hash = "/" + page + (param ? "/" + param : "");
    setRoute({ page, param: param || null });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const onBook = () => setModal("book");
  const onLocations = () => setModal("locations");
  const onSearch = () => nav("search");

  // theme vars
  const [primary, dark, accent] = tw.theme;
  const tp = TYPE_PAIRS[tw.typePair] || TYPE_PAIRS.lora;
  const rootStyle = {
    "--c-primary": primary, "--c-primary-dark": dark, "--c-accent": accent,
    "--radius": tw.radius + "px", "--font-head": tp.head, "--font-body": tp.body,
  };

  // Isolated section render for the comparison canvas (no chrome).
  if (only) {
    const noop = () => {};
    let inner = null;
    if (only === "hero") inner = <Hero layout={tw.heroLayout} t={t} onBook={noop} onLocations={noop} nav={noop} />;
    else if (only === "care") inner = <div style={{ padding: "44px 0" }}><div className="wrap"><CareSection careStyle={tw.careStyle} t={t} nav={noop} bare /></div></div>;
    else if (only === "finder") inner = <div style={{ padding: "36px 0" }}><div className="wrap"><LocationsFinder view={tw.locationsView} t={t} nav={noop} limit={tw.locationsView === "map" ? null : 6} /></div></div>;
    return <div className="kt-root" style={{ ...rootStyle, minHeight: 0, background: "#fff" }}>{inner}</div>;
  }

  // Resolve page components from window (all exported by pages3.jsx at load time)
  const TermsPage = window.TermsPage;
  const PrivacyPage = window.PrivacyPage;
  const PatientPortalPage = window.PatientPortalPage;
  const ContactDirectoryPage = window.ContactDirectoryPage;
  const DirectoryPage = window.DirectoryPage;
  const ParentResourcesPage = window.ParentResourcesPage;
  const ExtraCarePage = window.ExtraCarePage;
  const CareersPage = window.CareersPage;
  const FormsPage = window.FormsPage;
  const TestimonialsPage = window.TestimonialsPage;
  const SearchPage = window.SearchPage;

  let page;
  switch (route.page) {
    case "care": page = <CarePage slug={route.param || "primary-care"} t={t} nav={nav} onBook={onBook} onLocations={onLocations} />; break;
    case "locations": page = <LocationsPage tw={tw} t={t} nav={nav} setTweak={setTweak} />; break;
    case "location": page = <LocationDetail slug={route.param} t={t} nav={nav} onBook={onBook} />; break;
    case "doctors": page = <DoctorsPage t={t} nav={nav} onBook={onBook} />; break;
    case "doctor": page = <DoctorDetail slug={route.param} t={t} nav={nav} onBook={onBook} />; break;
    case "about": page = <AboutPage t={t} nav={nav} onLocations={onLocations} />; break;
    case "careers": page = <CareersPage t={t} nav={nav} />; break;
    case "forms": page = <FormsPage t={t} nav={nav} onBook={onBook} />; break;
    case "testimonials": page = <TestimonialsPage t={t} nav={nav} />; break;
    case "search": page = <SearchPage initial={route.param ? decodeURIComponent(route.param) : ""} t={t} nav={nav} onLocations={onLocations} />; break;
    case "services": page = <ServicesIndexPage t={t} nav={nav} />; break;
    case "service": page = <ServicePage slug={route.param} t={t} nav={nav} onBook={onBook} />; break;
    case "directory": page = <DirectoryPage t={t} nav={nav} onBook={onBook} />; break;
    case "resources": page = <ParentResourcesPage t={t} nav={nav} onBook={onBook} />; break;
    case "terms": page = <TermsPage t={t} nav={nav} />; break;
    case "privacy": page = <PrivacyPage t={t} nav={nav} />; break;
    case "patient-portal": page = <PatientPortalPage t={t} nav={nav} onBook={onBook} />; break;
    case "contact": page = <ContactDirectoryPage t={t} nav={nav} />; break;
    case "extra-care": page = <ExtraCarePage slug={route.param} t={t} nav={nav} onBook={onBook} onLocations={onLocations} />; break;
    default: page = <HomePage tw={tw} t={t} nav={nav} onBook={onBook} onLocations={onLocations} />;
  }

  return (
    <div className="kt-root" style={rootStyle}>
      <Header nav={nav} route={route} lang={lang} setLang={setLang} t={t} onBook={onBook} onLocations={onLocations} onSearch={onSearch} />
      <main>{page}</main>
      <Footer nav={nav} lang={lang} t={t} onLocations={onLocations} />

      {modal === "book" && <BookingWizard t={t} onClose={() => setModal(null)} />}
      {modal === "locations" && <LocationsModal t={t} nav={nav} onClose={() => setModal(null)} />}
      {modal === "services" && <ServicesModal t={t} nav={nav} onClose={() => setModal(null)} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color theme" />
        <TweakColor label="Palette" value={tw.theme}
          options={THEMES}
          onChange={(v) => setTweak("theme", v)} />
        <TweakSection label="Hero" />
        <TweakSelect label="Layout" value={tw.heroLayout} options={[{ value: "feature", label: "Feature (immersive)" }, { value: "split", label: "Split" }, { value: "center", label: "Center" }, { value: "bold", label: "Bold" }, { value: "video", label: "Video" }]} onChange={(v) => setTweak("heroLayout", v)} />
        <TweakSection label="Care cards" />
        <TweakRadio label="Style" value={tw.careStyle} options={[{ value: "soft", label: "Soft" }, { value: "outline", label: "Outline" }, { value: "bold", label: "Bold" }]} onChange={(v) => setTweak("careStyle", v)} />
        <TweakSection label="Locations finder" />
        <TweakRadio label="View" value={tw.locationsView} options={[{ value: "map", label: "Map" }, { value: "grid", label: "Grid" }, { value: "list", label: "List" }]} onChange={(v) => setTweak("locationsView", v)} />
        <TweakSection label="Typography" />
        <TweakSelect label="Pairing" value={tw.typePair} options={Object.entries(TYPE_PAIRS).map(([k, v]) => ({ value: k, label: v.label }))} onChange={(v) => setTweak("typePair", v)} />
        <TweakSection label="Shape" />
        <TweakSlider label="Corner radius" value={tw.radius} min={4} max={26} unit="px" onChange={(v) => setTweak("radius", v)} />
        <TweakToggle label="Show partner logos" value={tw.showPartners} onChange={(v) => setTweak("showPartners", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
