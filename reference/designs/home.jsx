/* ═══════════════════════════════════════════════════════════════════════════
   Homepage sections + reusable LocationsFinder
   ═══════════════════════════════════════════════════════════════════════════ */

/* deterministic scatter so map pins are stable across renders */
const REGION_POS = { sfv: [27, 32], sgv: [66, 26], west: [24, 64], south: [70, 66] };
function pinPos(loc, i) {
  const base = REGION_POS[loc.region] || [50, 50];
  const a = i * 47 % 360,r = 7 + i * 13 % 9;
  return [base[0] + Math.cos(a) * r * 0.9, base[1] + Math.sin(a) * r * 0.7];
}

/* ── Reusable locations finder (map / grid / list) ─────────────────────── */
function LocationsFinder({ view, t, nav, limit }) {
  const KT = window.KT;
  const [q, setQ] = React.useState("");
  const [region, setRegion] = React.useState("all");
  const [active, setActive] = React.useState(KT.locations[0].slug);

  const filtered = KT.locations.filter((l) => {
    const okR = region === "all" || l.region === region;
    const s = q.trim().toLowerCase();
    const okQ = !s || l.name.toLowerCase().includes(s) || l.city.toLowerCase().includes(s) || l.zip.includes(s);
    return okR && okQ;
  });
  const shown = limit ? filtered.slice(0, limit) : filtered;

  const regionChips =
  <div className="region-chips">
      <button data-on={region === "all" ? "1" : "0"} onClick={() => setRegion("all")}>{t("All areas", "Todas")}</button>
      {Object.entries(KT.REGIONS).map(([k, label]) =>
    <button key={k} data-on={region === k ? "1" : "0"} onClick={() => setRegion(k)}>{label}</button>
    )}
    </div>;

  const searchBox =
  <div className="search-box">
      <Icon name="search" size={18} />
      <input placeholder={t("Search city, neighborhood or ZIP…", "Buscar ciudad o código postal…")}
    value={q} onChange={(e) => setQ(e.target.value)} />
    </div>;


  if (view === "grid") {
    return (
      <div>
        <div className="finder-search" style={{ background: "transparent", padding: 0, border: 0, marginBottom: 22 }}>
          {searchBox}{regionChips}
        </div>
        <div className="finder-count">{t("Showing", "Mostrando")} <b>{filtered.length}</b> {t("of 25 clinics", "de 25 clínicas")}</div>
        <div className="loc-cards">
          {shown.map((l) =>
          <button key={l.slug} className="loc-card" onClick={() => nav("location", l.slug)}>
              <span className="region-tag">{KT.REGIONS[l.region]}</span>
              <h4>{l.name}</h4>
              <span className="addr">{l.addr}, {l.city} {l.zip}</span>
              <div className="meta">
                <span><Icon name="clock" size={14} />{l.hours}</span>
                <span><Icon name="phone" size={14} />{l.phone}</span>
              </div>
              <div className="card-foot">
                {l.urgent ? <span className="pill-urgent">{t("Urgent care", "Urgencias")}</span> : <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{t("Primary care", "Atención primaria")}</span>}
                <span className="link-arrow">{t("Details", "Detalles")} <Icon name="arrow-right" size={16} /></span>
              </div>
            </button>
          )}
        </div>
      </div>);

  }

  if (view === "list") {
    return (
      <div>
        <div className="finder-search" style={{ background: "transparent", padding: 0, border: 0, marginBottom: 22 }}>
          {searchBox}{regionChips}
        </div>
        <div className="finder-count">{t("Showing", "Mostrando")} <b>{filtered.length}</b> {t("of 25 clinics", "de 25 clínicas")}</div>
        <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden", background: "#fff", boxShadow: "var(--shadow-sm)" }}>
          {shown.map((l) =>
          <button key={l.slug} className="loc-row" onClick={() => nav("location", l.slug)}>
              <div className="lr-top">
                <h4>{l.name} <span style={{ fontWeight: 500, color: "var(--ink-3)", fontSize: 14 }}>· {KT.REGIONS[l.region]}</span></h4>
                {l.urgent && <span className="pill-urgent">{t("Urgent care", "Urgencias")}</span>}
              </div>
              <div className="addr">{l.addr}, {l.city} {l.zip}</div>
              <div className="meta">
                <span><Icon name="clock" size={13} />{l.hours}</span>
                <span><Icon name="phone" size={13} />{l.phone}</span>
              </div>
            </button>
          )}
        </div>
      </div>);

  }

  // map view — uses real SVG InteractiveMap
  return (
    <div className="finder">
      <div className="finder-panel">
        <div className="finder-search">{searchBox}{regionChips}</div>
        <div className="finder-list">
          {filtered.length === 0 && <div style={{ padding: 24, color: "var(--ink-2)" }}>{t("No clinics match your search.", "Ninguna clínica coincide.")}</div>}
          {filtered.map((l) =>
          <button key={l.slug} className="loc-row" data-active={l.slug === active ? "1" : "0"}
          onMouseEnter={() => setActive(l.slug)} onClick={() => nav("location", l.slug)}>
              <div className="lr-top">
                <h4>{l.name}</h4>
                {l.urgent && <span className="pill-urgent">{t("Urgent", "Urgente")}</span>}
              </div>
              <div className="addr">{l.addr}, {l.city}</div>
              <div className="meta">
                <span><Icon name="clock" size={13} />{l.hours}</span>
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="finder-map" style={{ padding: 0, background: "transparent", overflow: "hidden" }}>
        <InteractiveMap filtered={filtered} active={active} setActive={setActive} nav={nav} t={t} />
      </div>
    </div>);

}

/* ── Hero (3 layouts) ──────────────────────────────────────────────────── */
function Hero({ layout, t, onBook, onLocations, nav }) {
  const KT = window.KT;
  const eyebrow = <span className="eyebrow">{t("Pediatric & Adolescent Care", "Atención Pediátrica")}</span>;
  const head =
  <h1>{t("The largest", "La mayor red")} <em>{t("pediatric network", "pediátrica")}</em> {t("in Los Angeles.", "en Los Ángeles.")}</h1>;

  const lede =
  <p className="lede">{t(
      "Trusted, friendly care for kids and teens from birth through age 21 - at 25 neighborhood clinics across LA.",
      "Atención confiable y amable para niños y adolescentes desde el nacimiento hasta los 21 años — en 25 clínicas.")}</p>;

  const onDark = layout === "bold" || layout === "feature";
  const actions =
  <div className="hero-actions">
      <a href="#" className={"btn btn-lg " + (onDark ? "btn-on-dark" : "btn-primary")} onClick={(e) => {e.preventDefault();onBook();}}>
        <Icon name="calendar" size={18} /> {t("Book a same-day appointment", "Reservar cita el mismo día")}
      </a>
      <a href="#" className={"btn btn-lg " + (onDark ? "btn-on-dark" : "btn-ghost")} onClick={(e) => {e.preventDefault();onLocations();}}>
        <Icon name="map-pin" size={18} /> {t("Find a clinic", "Buscar clínica")}
      </a>
    </div>;

  const trustChips =
  <div className="hero-trust-row">
      {[
    ["check-circle", t("Same-day visits", "Visitas el mismo día")],
    ["shield-plus", t("Board-certified", "Certificados")],
    ["map-pin", t("25 LA locations", "25 ubicaciones")],
    ["globe", t("English & Spanish", "Inglés y Español")]].
    map(([ic, label]) =>
    <span key={label} className="hero-trust-chip"><Icon name={ic} size={16} /> {label}</span>
    )}
    </div>;

  const quick =
  <div className="hero-quick">
      <a href="#" onClick={(e) => {e.preventDefault();nav("doctors");}}><Icon name="users" size={17} /> {t("Find a doctor", "Buscar doctor")}</a>
      <a href="#" onClick={(e) => {e.preventDefault();nav("care", "telehealth");}}><Icon name="video" size={17} /> {t("Start a video visit", "Visita por video")}</a>
      <a href="#" onClick={(e) => {e.preventDefault();nav("care", "urgent-care");}}><Icon name="shield-plus" size={17} /> {t("Urgent care", "Atención urgente")}</a>
    </div>;

  const stats =
  <div className="hero-stats">
      {KT.stats.map((s, i) => <div className="s" key={i}><b>{s.num}</b><span>{s.label}</span></div>)}
    </div>;


  if (layout === "center") {
    return (
      <section className="hero center">
        <div className="wrap">
          {eyebrow}{head}{lede}{actions}{quick}
          <div className="hero-banner-img"><PhotoSlot id="hero-center-photo" label="hero photo — happy family at clinic (16:6)" aspect="16 / 6.2" shadow /></div>
        </div>
      </section>);

  }
  if (layout === "video") {
    return (
      <section className="hero video-hero">
        <div className="video-bg">
          <PhotoSlot id="hero-video-bg" label="hero background video / photo — clinic or family (16:9)" aspect="16/9" radius={0}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="video-overlay" />
        </div>
        <div className="wrap video-content">
          {eyebrow}{head}{lede}{actions}{quick}
        </div>
      </section>);

  }
  if (layout === "bold") {
    return (
      <section className="hero bold">
        <div className="wrap">
          {eyebrow}{head}{lede}{actions}{quick}{stats}
        </div>
      </section>);

  }
  if (layout === "feature") {
    const qsRows = [
    { ic: "calendar", title: t("Book an appointment", "Reservar cita"), sub: t("Online in under a minute", "En menos de un minuto"), fn: onBook },
    { ic: "map-pin", title: t("Find a clinic near you", "Buscar clínica"), sub: t("25 neighborhoods across LA", "25 vecindarios en LA"), fn: onLocations },
    { ic: "video", title: t("Start a video visit", "Visita por video"), sub: t("See a provider from home", "Vea a un proveedor desde casa"), fn: () => nav("care", "telehealth") }];

    return (
      <section className="hero feature">
        <div className="hero-feature-bg">
          <PhotoSlot id="hero-split-photo" label="hero photo — pediatrician with child" radius={0}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="hero-feature-scrim" />
        </div>
        <div className="wrap">
          <div className="hero-feature-content">
            {eyebrow}{head}{lede}{actions}{trustChips}
          </div>
          <aside className="hero-quickstart" style={{ opacity: "0" }}>
            <span className="qs-eyebrow">{t("Get care, fast", "Atención rápida")}</span>
            <h3>{t("How can we help today?", "¿Cómo podemos ayudar hoy?")}</h3>
            {qsRows.map((r) =>
            <button key={r.title} className="qs-row" onClick={r.fn}>
                <span className="qs-ic"><Icon name={r.ic} size={20} /></span>
                <span className="qs-tx"><b>{r.title}</b><span>{r.sub}</span></span>
                <Icon name="arrow-right" size={18} className="qs-arrow" />
              </button>
            )}
            <div className="qs-note"><Icon name="clock" size={15} /> {t("Walk-ins welcome for urgent care", "Atención sin cita para urgencias")}</div>
          </aside>
        </div>
      </section>);

  }

  // split (default)
  return (
    <section className="hero split">
      <div className="wrap">
        <div>
          {eyebrow}{head}{lede}{quick}{stats}
        </div>
        <div className="hero-visual">
          <PhotoSlot id="hero-split-photo" label="hero photo — pediatrician with child" aspect="4 / 4.4" shadow />
          <div className="hero-badge">
            <span className="ic"><Icon name="check-circle" size={22} /></span>
            <div className="bt"><b>{t("Same-day visits", "Visitas el mismo día")}</b><span>{t("at most locations", "en la mayoría")}</span></div>
          </div>
          <div className="hero-badge top">
            <span className="ic" style={{ background: "color-mix(in srgb, var(--c-primary) 13%, #fff)", color: "var(--c-primary)" }}><Icon name="globe" size={22} /></span>
            <div className="bt"><b>{t("English & Spanish", "Inglés y Español")}</b><span>{t("bilingual staff", "personal bilingüe")}</span></div>
          </div>
        </div>
      </div>
    </section>);

}

/* ── Care cards ────────────────────────────────────────────────────────── */
function CareSection({ careStyle, t, nav, bare, onBook }) {
  const KT = window.KT;
  const grid =
  <div className={"care-grid care-" + careStyle}>
      {KT.careTypes.map((c) =>
    <div key={c.slug} className={"care-card care-accent-" + c.accent}>
          <span className="ic"><Icon name={c.icon} size={28} /></span>
          <h3>{c.name}</h3>
          <div className="tag">{c.tagline}</div>
          <ul className="care-bullets">
            {c.bullets.slice(0,4).map((b) => <li key={b}><Icon name="check" size={14} />{b}</li>)}
          </ul>
          <div className="foot">
            <a href="#" className="btn btn-primary btn-sm" onClick={(e) => {e.preventDefault();nav("care", c.slug);}}>
              <Icon name="arrow-right" size={15} /> {t("Learn more", "Más información")}
            </a>
          </div>
        </div>
    )}
    </div>;

  if (bare) return grid;
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">{t("How we care for your child", "Cómo cuidamos")}</span>
          <h2>{t("Three ways to get care", "Tres formas de recibir atención")}</h2>
          <p>{t("Whether it's a routine checkup or a sudden fever at 7pm, there's a Kids & Teens option built for it.",
            "Desde un chequeo de rutina hasta una fiebre repentina, hay una opción de Kids & Teens para cada caso.")}</p>
        </div>
        {grid}
        {/* Extra care types — promo cards (matches ktdoctor.com treatments) */}
        {(window.KT?.extraCareTypes || []).length > 0 &&
        <div className="extra-care-section">
            <div className="extra-care-head">
              <h3>{t("More ways we support your family", "Más formas de apoyar a su familia")}</h3>
            </div>
            <div className="ecp-grid">
              {window.KT.extraCareTypes.map((c) => {
              const go = (e) => {e.preventDefault();c.slug === "after-hours" && onBook ? onBook() : nav("extra-care", c.slug);};
              const isLight = c.treatment === "light";
              return (
                <a key={c.slug} href="#" className={"ecp ecp-overlay ecp-" + c.treatment + (c.treatment === "teal" ? " ecp-wide" : "")} onClick={go}>
                    <img className="ecp-bg" src={c.photo} alt={c.name} loading="lazy" />
                    <span className="ecp-scrim" />
                    <div className="ecp-overlay-text">
                      <span className={"ecp-icon" + (isLight ? "" : " ecp-icon-light")}><Icon name={c.icon} size={20} /></span>
                      <h4>{t(c.promoTitle || c.name, c.promoTitle || c.name)}</h4>
                      <p>{t(c.promoText, c.promoText)}</p>
                      <span className={"ecp-btn " + (isLight ? "ecp-btn-solid" : "ecp-btn-warm")}>{t(c.promoCta, c.promoCta)} <Icon name="arrow-right" size={15} /></span>
                    </div>
                  </a>);

            })}
            </div>
          </div>
        }
      </div>
    </section>);

}

/* ── Partners ──────────────────────────────────────────────────────────── */
function Partners({ t }) {
  return (
    <div className="partners">
      <div className="wrap">
        <div className="lead">{t("Our partners", "Nuestros socios")}</div>
        <div className="partner-grid">
          {window.KT.partners.map((p) =>
          <div key={p.name} className="partner-logo-card" title={p.name}>
              <img src={p.logo} alt={p.name} className="partner-logo-img" loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </div>);

}

/* ── Resources ─────────────────────────────────────────────────────────── */
function Resources({ t, nav }) {
  const cards = [
  { icon: "syringe", title: t("Vaccine schedule", "Calendario de vacunas"), body: t("Download the recommended immunization schedule, birth to 18.", "Descargue el calendario de vacunas recomendado."), cta: t("Download PDF", "Descargar PDF") },
  { icon: "users", title: t("Find a doctor", "Buscar doctor"), body: t("Browse our pediatricians and book with someone who fits your family.", "Explore nuestros pediatras y reserve."), cta: t("Browse doctors", "Ver doctores"), fn: () => nav("doctors") },
  { icon: "file", title: t("Forms, Refills & Labs", "Formularios"), body: t("Sports physicals, prescription refills, lab requests and more.", "Físicos deportivos, recetas y laboratorios."), cta: t("Open forms", "Abrir"), fn: () => nav("forms") },
  { icon: "play", title: t("Must-watch videos", "Videos"), body: t("Short parent guides on fevers, feeding, sleep and milestones.", "Guías cortas para padres."), cta: t("Watch now", "Ver ahora") }];

  return (
    <section className="section">
      <div className="wrap">
        <div className="res-layout">
          <div className="res-feature">
            <span className="eyebrow">{t("Parent resources", "Recursos")}</span>
            <h2>{t("Everything you need between visits", "Todo lo que necesita entre visitas")}</h2>
            <p className="res-feature-lede">{t("Vaccine schedules, forms, refills and trusted guides — the everyday tools that keep your family on track between appointments.", "Calendarios de vacunas, formularios, recetas y guías de confianza — las herramientas que mantienen a su familia al día entre citas.")}</p>
            <PhotoSlot id="resources-photo" label="parent and child" aspect="4 / 3.1" shadow />
          </div>
          <div className="res-grid">
            {cards.map((c, i) =>
            <div key={i} className="res-card">
                <span className="ic"><Icon name={c.icon} size={22} /></span>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
                <a href="#" className="link-arrow" onClick={(e) => {e.preventDefault();c.fn && c.fn();}}>{c.cta} <Icon name="arrow-right" size={16} /></a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

/* ── Insurance band ────────────────────────────────────────────────────── */
function Insurance({ t }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="insurance">
          <div>
            <span className="eyebrow" style={{ color: "#fff" }}>{t("Insurance", "Seguro")}</span>
            <h2>{t("We accept all insurance.", "Aceptamos todos los seguros.")}</h2>
            <p>{t("No matter your plan, our team will check your coverage and help you get the care your child needs.",
              "Sin importar su plan, nuestro equipo verificará su cobertura y le ayudará a obtener la atención que su hijo necesita.")}</p>
            <div className="ins-actions">
              <a href="#" className="btn btn-on-dark"><Icon name="shield-plus" size={18} /> {t("Find out more", "Más información")} <Icon name="arrow-right" size={16} /></a>
            </div>
          </div>
          <div className="plan-card">
            <img src={window.RES("uploads/insurance-coverage.webp")} alt={t("Healthcare coverage", "Cobertura de salud")} className="plan-card-photo" loading="lazy" />
            <div className="plan-card-body">
              <h3>{t("SoCal's best kept secret — Serendib Healthways", "El secreto mejor guardado de SoCal — Serendib Healthways")}</h3>
              <p>{t("No doctor restrictions. Affordable membership care for families paying out of pocket.", "Sin restricciones de médico. Atención por membresía asequible para familias.")}</p>
              <div className="plan-card-foot">
                <a href="#" className="btn btn-primary"><Icon name="check-circle" size={17} /> {t("Check eligibility", "Verificar elegibilidad")}</a>
                <img src={window.RES("uploads/Serendib-Healthways-Logo.png")} alt="Serendib Healthways" className="plan-card-logo" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ── Stories ───────────────────────────────────────────────────────────── */
function Stories({ t }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "none" }}>
          <div>
            <span className="eyebrow">{t("From the blog", "Del blog")}</span>
            <h2>{t("Pediatric tips & seasonal guides", "Consejos y guías")}</h2>
          </div>
          <a href="#" className="link-arrow desktop-only">{t("All articles", "Todos los artículos")} <Icon name="arrow-right" size={16} /></a>
        </div>
        <div className="story-grid">
          {window.KT.stories.map((s, i) =>
          <a href="#" key={i} className="story-card" onClick={(e) => e.preventDefault()}>
              <PhotoSlot id={"story-" + i} label="article image" aspect="16 / 10" radius={0} />
              <div className="body">
                <span className="stag">{s.tag}</span>
                <h4>{s.title}</h4>
                <div className="smeta"><span>{s.date}</span><span>{s.read}</span></div>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>);

}

/* ── Event banner (homepage) ───────────────────────────────────────────── */
function EventBanner({ t }) {
  return (
    <section className="section event-feature-sec">
      <div className="wrap">
        <div className="ef-card">
          <span className="ef-motif" aria-hidden="true"></span>
          <a href={window.RES("uploads/back-to-school-event.jpeg")} target="_blank" rel="noopener noreferrer" className="ef-flyer">
            <img src={window.RES("uploads/back-to-school-event.jpeg")} alt="Back to School Event flyer" loading="lazy" />
          </a>
          <div className="ef-main">
            <span className="ef-kicker">{t("Community Event · Northridge", "Evento comunitario · Northridge")}</span>
            <h2>{t("Back to School — Free Backpacks", "Regreso a clases — Mochilas gratis")}</h2>
            <p>{t("Sign up to receive a free backpack, with on-site vaccinations and physical exams. First come, first serve — plus an LAPD Seatbelt Safety presentation.",
              "Regístrese para recibir una mochila gratis, con vacunas y exámenes físicos en el lugar. Por orden de llegada.")}</p>
            <div className="ef-meta">
              <div className="ef-date">
                <span className="ef-mon">{t("SEP", "SEP")}</span>
                <span className="ef-day">3</span>
              </div>
              <div className="ef-when">
                <b>{t("Wednesday · 4:00 – 5:00 PM", "Miércoles · 4:00 – 5:00 PM")}</b>
                <span>8628 Reseda Blvd, Northridge, CA 91324</span>
              </div>
            </div>
            <a href="mailto:northridge@ktdoctor.com?subject=Back%20to%20School%20Event%20RSVP" className="ef-cta">
              {t("RSVP for this event", "Reservar para este evento")} <Icon name="arrow-right" size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>);

}

/* ── Careers promo strip (homepage) ────────────────────────────────────── */
function CareersPromo({ t, nav }) {
  return (
    <section className="careers-promo">
      <div className="wrap">
        <div className="careers-promo-inner">
          <div className="cp-text">
            <span className="eyebrow">{t("Join the team", "Únase al equipo")}</span>
            <h2>{t("Build the career you want at Kids & Teens", "Construya su carrera en Kids & Teens")}</h2>
            <p>{t("With 18 years of excellence, Kids & Teens offers a respected, supportive and our patient-centric approach fosters a nurturing space for healthcare providers and families.",
              "Con 18 años de excelencia, Kids & Teens ofrece un entorno de apoyo para proveedores de salud y familias.")}</p>
            <a href="#" className="btn btn-ghost" style={{ marginTop: 18 }} onClick={(e) => {e.preventDefault();nav("careers");}}>
              {t("Find out More", "Saber más")} <Icon name="arrow-right" size={16} />
            </a>
          </div>
          <PhotoSlot id="careers-team-photo" label="team photo — doctors and staff" aspect="16 / 10" shadow style={{ maxWidth: 460 }} />
        </div>
      </div>
    </section>);

}

/* ── Hospital newborn section (homepage) ────────────────────────────────── */
function HospitalNewborn({ t, nav }) {
  return (
    <section className="hosp-newborn" style={{ backgroundSize: "cover" }}>
      <div className="wrap">
        <div className="hosp-newborn-inner">
          <div className="hn-left">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,.9)" }}>{t("Partner hospitals", "Hospitales asociados")}</span>
            <h2 style={{ color: "#fff", fontSize: "clamp(24px,2.8vw,36px)", margin: "12px 0 14px" }}>
              {t("Delivering your baby at a partner hospital?", "¿Dando a luz en un hospital asociado?")}
            </h2>
            <p style={{ color: "rgba(255,255,255,.85)", maxWidth: "52ch" }}>
              {t("If you are delivering at an affiliated hospital we can arrange to have your selected pediatrician conduct their first visit on the hospital.",
              "Si está dando a luz en un hospital afiliado, podemos coordinar que su pediatra seleccionado realice la primera visita en el hospital.")}
            </p>
            <a href="#" className="btn btn-on-dark" style={{ marginTop: 22 }} onClick={(e) => {e.preventDefault();nav("extra-care", "hospital-newborn");}}>
              {t("Find out More", "Saber más")} <Icon name="arrow-right" size={16} />
            </a>
          </div>
          <div className="hn-right">
            <div className="sec-head" style={{ marginBottom: 18 }}>
              <h3 style={{ color: "#fff", fontSize: 18, fontFamily: "var(--font-body)" }}>{t("OUR PARTNERS", "NUESTROS SOCIOS")}</h3>
            </div>
            <div className="hn-partners">
              {window.KT.partners.slice(0, 4).map((p) =>
              <span key={p.name} className="hn-partner">{p.name}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ── CTA band ──────────────────────────────────────────────────────────── */
function CtaBand({ t, onBook, onLocations }) {
  return (
    <section className="cta-band section-tint">
      <div className="wrap">
        <span className="eyebrow center" style={{ justifyContent: "center", display: "flex" }}>{t("Ready when you are", "Cuando esté listo")}</span>
        <h2 style={{ marginTop: 14 }}>{t("Let's find the right care for your child.", "Encontremos la atención adecuada.")}</h2>
        <p>{t("Book online in minutes, or call your nearest clinic. Same-day and weekend visits available.", "Reserve en línea en minutos o llame a su clínica más cercana.")}</p>
        <div className="row">
          <a href="#" className="btn btn-primary btn-lg" onClick={(e) => {e.preventDefault();onBook();}}><Icon name="calendar" size={18} /> {t("Book a same-day appointment", "Reservar cita el mismo día")}</a>
          <a href="#" className="btn btn-ghost btn-lg" onClick={(e) => {e.preventDefault();onLocations();}}><Icon name="map-pin" size={18} /> {t("Find a clinic", "Buscar clínica")}</a>
        </div>
      </div>
    </section>);

}

/* ── Home page ─────────────────────────────────────────────────────────── */
function HomePage({ tw, t, nav, onBook, onLocations }) {
  return (
    <>
      <Hero layout={tw.heroLayout} t={t} onBook={onBook} onLocations={onLocations} nav={nav} />
      <CareersPromo t={t} nav={nav} />
      <EventBanner t={t} />
      <CareSection careStyle={tw.careStyle} t={t} nav={nav} onBook={onBook} />
      {tw.showPartners && <Partners t={t} />}
      <section className="section section-tint">
        <div className="wrap">
          <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "none", marginBottom: 32 }}>
            <div>
              <span className="eyebrow">{t("25 clinics, one near you", "25 clínicas")}</span>
              <h2>{t("Find your neighborhood clinic", "Encuentre su clínica")}</h2>
            </div>
            <a href="#" className="link-arrow desktop-only" onClick={(e) => {e.preventDefault();onLocations();}}>{t("Browse all locations", "Ver todas")} <Icon name="arrow-right" size={16} /></a>
          </div>
          <LocationsFinder view="grid" limit={6} t={t} nav={nav} />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <a href="#" className="btn btn-primary btn-lg" onClick={(e) => {e.preventDefault();onLocations();}}>
              <Icon name="map-pin" size={18} /> {t("Browse all 25 locations", "Ver las 25 ubicaciones")}
            </a>
          </div>
        </div>
      </section>
      <Resources t={t} nav={nav} />
      <Insurance t={t} />
      <Stories t={t} />
      <CtaBand t={t} onBook={onBook} onLocations={onLocations} />
    </>);

}

Object.assign(window, { LocationsFinder, Hero, CareSection, Partners, Resources, Insurance, Stories, CtaBand, CareersPromo, EventBanner, HospitalNewborn, HomePage });