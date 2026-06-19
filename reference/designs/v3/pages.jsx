/* ═══════════════════════════════════════════════════════════════════════════
   Sub-pages: Care, Locations index, Location detail, Doctors, About
   ═══════════════════════════════════════════════════════════════════════════ */

function Crumbs({ items, nav }) {
  return (
    <div className="crumbs">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="chevron-right" size={14} />}
          {it.fn ? <a href="#" onClick={(e) => { e.preventDefault(); it.fn(); }}>{it.label}</a> : <span>{it.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Care detail page ──────────────────────────────────────────────────── */
function CarePage({ slug, t, nav, onBook, onLocations }) {
  const KT = window.KT;
  const c = KT.careTypes.find((x) => x.slug === slug) || KT.careTypes[0];
  const others = KT.careTypes.filter((x) => x.slug !== c.slug);
  const clinics = (c.slug === "urgent-care" ? KT.locations.filter((l) => l.urgent) : KT.locations).slice(0, 6);
  const relatedDocs = KT.doctors.filter((d) =>
    c.slug === "urgent-care" ? d.clinic && KT.locations.find((l) => l.slug === d.clinicSlug && l.urgent)
    : c.slug === "telehealth" ? true
    : d.specialty === "Pediatrics").slice(0, 3);
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home", "Inicio"), fn: () => nav("home") }, { label: t("Care", "Atención") }, { label: c.name }]} />
          <span className={"eyebrow care-accent-" + c.accent} style={{ color: "var(--ca)" }}>{c.name}</span>
          <h1 style={{ marginTop: 12 }}>{c.tagline}</h1>
          <p className="lede">{c.blurb}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="care-detail">
            <div>
              <PhotoSlot id={"care-" + c.slug + "-photo"} label={"photo — " + c.name.toLowerCase() + " in action"} aspect="4 / 3.4" shadow style={{ marginBottom: 32 }} />
              <h2 style={{ fontSize: 30, marginBottom: 8 }}>{t("What's included", "Qué incluye")}</h2>
              <div className={"care-accent-" + c.accent}>
                {c.bullets.map((b, i) => (
                  <div className="care-feature" key={i}>
                    <span className="ic" style={{ background: "color-mix(in srgb, var(--ca) 13%, #fff)", color: "var(--ca)" }}><Icon name="check" size={20} /></span>
                    <div><h4>{b}</h4></div>
                  </div>
                ))}
              </div>
              <h2 style={{ fontSize: 30, margin: "40px 0 16px" }}>{t("Related services", "Servicios relacionados")}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {KT.services.slice(0, 10).map((s) => (
                  <span key={s} style={{ background: "var(--bg-tint)", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 15px", fontSize: 13.5, fontWeight: 600, color: "var(--ink-2)" }}>{s}</span>
                ))}
              </div>

              <h2 style={{ fontSize: 30, margin: "40px 0 16px" }}>{t("Available near you", "Disponible cerca de usted")}</h2>
              <p className="muted" style={{ marginTop: -8, marginBottom: 16, fontSize: 14.5 }}>{c.slug === "telehealth" ? t("Offered from home and at all 25 clinics.", "Disponible desde casa y en las 25 clínicas.") : c.slug === "urgent-care" ? t("Clinics with urgent care and extended hours:", "Clínicas con urgencias y horario extendido:") : t("Offered at every Kids & Teens clinic — a few near you:", "Disponible en cada clínica — algunas cerca:")}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                {clinics.map((l) => (
                  <button key={l.slug} className="xlink-row" onClick={() => nav("location", l.slug)}>
                    <span className="xlink-ic"><Icon name="map-pin" size={16} /></span>
                    <span className="xlink-txt"><b>{l.name}</b><span>{l.hours}</span></span>
                    {l.urgent && <span className="pill-urgent">{t("Urgent", "Urg.")}</span>}
                    <Icon name="chevron-right" size={16} />
                  </button>
                ))}
              </div>

              {relatedDocs.length > 0 && (
                <>
                  <h2 style={{ fontSize: 30, margin: "40px 0 16px" }}>{t("Providers for this care", "Proveedores para esta atención")}</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                    {relatedDocs.map((d) => (
                      <button key={d.slug} className="xlink-card" onClick={() => nav("doctor", d.slug)}>
                        <Ph label="headshot (1:1)" style={{ aspectRatio: "1/1", borderRadius: 10, marginBottom: 10 }} />
                        <b>{d.name}</b>
                        <span>{d.specialty} · {d.clinic}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <aside>
              <div className={"sidecard care-accent-" + c.accent}>
                <h3>{t("Get this care", "Reciba atención")}</h3>
                <p className="muted" style={{ fontSize: 14 }}>{t("Book online or find the nearest clinic offering it.", "Reserve en línea o encuentre la clínica más cercana.")}</p>
                <div className="sc-row"><Icon name="clock" size={18} />{t("Same-day & weekend availability", "Disponibilidad el mismo día")}</div>
                <div className="sc-row"><Icon name="globe" size={18} />{t("English & Spanish providers", "Proveedores bilingües")}</div>
                <div className="sc-row"><Icon name="shield-plus" size={18} />{t("Most insurance accepted", "Aceptamos seguros")}</div>
                <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onBook(); }}><Icon name="calendar" size={18} /> {c.cta}</a>
                <a href="#" className="btn btn-ghost" style={{ width: "100%", marginTop: 10 }} onClick={(e) => { e.preventDefault(); onLocations(); }}><Icon name="map-pin" size={18} /> {t("Find a clinic", "Buscar clínica")}</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="wrap">
          <div className="sec-head center"><h2>{t("Explore other care", "Explore otra atención")}</h2></div>
          <div className="other-care">
            {others.map((o) => (
              <div key={o.slug} className={"care-card care-accent-" + o.accent} style={{ background: "#fff", boxShadow: "var(--shadow-sm)", border: "1px solid var(--line)" }}>
                <span className="ic"><Icon name={o.icon} size={28} /></span>
                <h3>{o.name}</h3>
                <p className="blurb">{o.tagline}</p>
                <div className="foot"><a href="#" className="link-arrow" onClick={(e) => { e.preventDefault(); nav("care", o.slug); }}>{t("Learn more", "Más")} <Icon name="arrow-right" size={16} /></a></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Locations index ───────────────────────────────────────────────────── */
function LocationsPage({ tw, t, nav, setTweak }) {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home", "Inicio"), fn: () => nav("home") }, { label: t("Locations", "Ubicaciones") }]} />
          <h1>{t("25 clinics across Los Angeles", "25 clínicas en Los Ángeles")}</h1>
          <p className="lede">{t("From the Valley to the South Bay — find a Kids & Teens clinic in your neighborhood, with hours, services and directions.",
            "Del Valle a South Bay — encuentre una clínica Kids & Teens en su vecindario.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 22, gap: 8 }}>
            <div className="region-chips" role="group" aria-label="View">
              {[["map", t("Map", "Mapa")], ["grid", t("Grid", "Cuadrícula")], ["list", t("List", "Lista")]].map(([v, label]) => (
                <button key={v} data-on={tw.locationsView === v ? "1" : "0"} onClick={() => setTweak("locationsView", v)}>{label}</button>
              ))}
            </div>
          </div>
          <LocationsFinder view={tw.locationsView} t={t} nav={nav} />
        </div>
      </section>
    </>
  );
}

/* ── Location detail ───────────────────────────────────────────────────── */
function LocationDetail({ slug, t, nav, onBook }) {
  const KT = window.KT;
  const l = KT.locations.find((x) => x.slug === slug) || KT.locations[0];
  const svc = ["Well Child Exam", "Sick Visit", "Immunizations", "Physicals", "Newborn Care", l.urgent ? "Urgent Care" : "Telehealth"];
  const providers = KT.doctors.filter((d) => d.clinicSlug === l.slug);
  const careHere = KT.careTypes.filter((ct) => ct.slug !== "urgent-care" || l.urgent);
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home", "Inicio"), fn: () => nav("home") }, { label: t("Locations", "Ubicaciones"), fn: () => nav("locations") }, { label: l.name }]} />
          <span className="eyebrow">{KT.REGIONS[l.region]}</span>
          <h1 style={{ marginTop: 12 }}>{l.name} {t("Clinic", "Clínica")}</h1>
          <p className="lede">{l.addr}, {l.city}, CA {l.zip}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="care-detail">
            <div>
              <Ph label="map placeholder — Google Maps embed" style={{ aspectRatio: "16/8", marginBottom: 28 }} />
              <h2 style={{ fontSize: 28, marginBottom: 14 }}>{t("Services at this clinic", "Servicios en esta clínica")}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {svc.map((s) => (
                  <span key={s} style={{ background: "var(--bg-tint)", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 15px", fontSize: 13.5, fontWeight: 600, color: "var(--ink-2)" }}>{s}</span>
                ))}
              </div>
              <h2 style={{ fontSize: 28, marginBottom: 14 }}>{t("About this location", "Acerca de esta ubicación")}</h2>
              <p className="muted" style={{ maxWidth: "62ch" }}>{t(
                `Our ${l.name} clinic offers comprehensive pediatric and adolescent care in a kid-friendly setting. Our bilingual team provides well-child visits, immunizations, sick visits and more — close to home.`,
                `Nuestra clínica de ${l.name} ofrece atención pediátrica integral en un ambiente amigable para niños, con un equipo bilingüe.`)}</p>

              <h2 style={{ fontSize: 28, margin: "36px 0 14px" }}>{t("Care available here", "Atención disponible aquí")}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {careHere.map((ct) => (
                  <button key={ct.slug} className={"xlink-care care-accent-" + ct.accent} onClick={() => nav("care", ct.slug)}>
                    <span className="xlink-ic" style={{ background: "color-mix(in srgb, var(--ca) 13%, #fff)", color: "var(--ca)" }}><Icon name={ct.icon} size={18} /></span>
                    <b>{ct.name}</b>
                    <Icon name="arrow-right" size={15} />
                  </button>
                ))}
              </div>

              {providers.length > 0 && (
                <>
                  <h2 style={{ fontSize: 28, margin: "36px 0 14px" }}>{t("Providers at this clinic", "Proveedores en esta clínica")}</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                    {providers.map((d) => (
                      <button key={d.slug} className="xlink-row" onClick={() => nav("doctor", d.slug)}>
                        <span className="xlink-ic"><Icon name="user" size={16} /></span>
                        <span className="xlink-txt"><b>{d.name}</b><span>{d.specialty} · {d.lang}</span></span>
                        {d.accepting && <span className="pill-ok">{t("Accepting", "Aceptando")}</span>}
                        <Icon name="chevron-right" size={16} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <aside>
              <div className="sidecard">
                <h3>{l.name}</h3>
                {l.urgent && <span className="pill-urgent" style={{ display: "inline-block", marginBottom: 4 }}>{t("Urgent care on-site", "Urgencias")}</span>}
                <div className="sc-row"><Icon name="map-pin" size={18} /><span>{l.addr}, {l.city}, CA {l.zip}</span></div>
                <div className="sc-row"><Icon name="phone" size={18} /><a href={"tel:" + l.phone.replace(/\D/g, "")}>{l.phone}</a></div>
                <div className="sc-row"><Icon name="clock" size={18} />{l.hours}</div>
                {l.email && <div className="sc-row"><Icon name="message" size={18} /><a href={"mailto:"+l.email}>{l.email}</a></div>}
                <div className="sc-row"><Icon name="globe" size={18} />{t("English & Spanish", "Inglés y Español")}</div>
                <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onBook(); }}><Icon name="calendar" size={18} /> {t("Book here", "Reservar aquí")}</a>
                <a href="#" className="btn btn-ghost" style={{ width: "100%", marginTop: 10 }}><Icon name="locate" size={18} /> {t("Get directions", "Cómo llegar")}</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Doctors ───────────────────────────────────────────────────────────── */
function DoctorsPage({ t, nav, onBook }) {
  const KT = window.KT;
  const [spec, setSpec] = React.useState("all");
  const specs = ["all", ...Array.from(new Set(KT.doctors.map((d) => d.specialty)))];
  const list = KT.doctors.filter((d) => spec === "all" || d.specialty === spec);
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home", "Inicio"), fn: () => nav("home") }, { label: t("Our Doctors", "Doctores") }]} />
          <h1>{t("Meet our pediatricians", "Conozca a nuestros pediatras")}</h1>
          <p className="lede">{t("Board-certified pediatric and adolescent specialists who treat only kids and teens — many fluent in more than one language.",
            "Especialistas pediátricos certificados que atienden solo a niños y adolescentes.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="region-chips" style={{ marginBottom: 28 }}>
            {specs.map((s) => (
              <button key={s} data-on={spec === s ? "1" : "0"} onClick={() => setSpec(s)}>{s === "all" ? t("All specialties", "Todas") : s}</button>
            ))}
          </div>
          <div className="doctor-grid">
            {list.map((d) => (
              <div className="doctor-card" key={d.slug}>
                <button onClick={() => nav("doctor", d.slug)} style={{ display: "block", width: "100%", padding: 0, border: 0, background: "none", textAlign: "left", cursor: "pointer" }}>
                  <PhotoSlot id={"doc-" + d.slug} label="doctor headshot" aspect="1 / 1" radius={0} />
                  <div className="body">
                    {d.accepting
                      ? <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--good)" }}>● {t("Accepting patients", "Aceptando pacientes")}</span>
                      : <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--ink-3)" }}>● {t("Waitlist", "Lista de espera")}</span>}
                    <h4 style={{ marginTop: 6 }}>{d.name}</h4>
                    <div className="role">{d.specialty} · {d.clinic}</div>
                    <div className="lang"><Icon name="globe" size={14} /> {d.lang}</div>
                  </div>
                </button>
                <div style={{ padding: "0 20px 20px", display: "flex", gap: 8 }}>
                  <a href="#" className="btn btn-soft" style={{ flex: 1 }} onClick={(e) => { e.preventDefault(); nav("doctor", d.slug); }}>{t("Profile", "Perfil")}</a>
                  <a href="#" className="btn btn-primary" style={{ flex: 1 }} onClick={(e) => { e.preventDefault(); onBook(); }}>{t("Book", "Reservar")}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── About ─────────────────────────────────────────────────────────────── */
function AboutPage({ t, nav, onLocations }) {
  const KT = window.KT;
  const values = [
    { icon: "heart", title: t("Kids first, always", "Niños primero"), body: t("Every decision starts with what's best for the child in front of us.", "Cada decisión comienza con lo mejor para el niño.") },
    { icon: "users", title: t("Care that reflects LA", "Atención que refleja LA"), body: t("Bilingual, culturally aware teams in the neighborhoods we serve.", "Equipos bilingües en los vecindarios que servimos.") },
    { icon: "award", title: t("Trusted for 18+ years", "18+ años de confianza"), body: t("Partnered with CHLA, Cedars-Sinai and Providence across the region.", "Asociados con CHLA, Cedars-Sinai y Providence.") },
  ];
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home", "Inicio"), fn: () => nav("home") }, { label: t("About", "Nosotros") }]} />
          <h1>{t("Growing healthy kids across LA since 2007", "Niños sanos en LA desde 2007")}</h1>
          <p className="lede">{t("What began as a single neighborhood practice is now the largest pediatric network in Los Angeles - 25 clinics, one mission.",
            "Lo que comenzó como una sola práctica es ahora la red pediátrica más grande de Los Ángeles.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="about-split">
            <PhotoSlot id="about-interior" label="photo — care team / clinic interior" aspect="4 / 3" shadow />
            <div>
              <span className="eyebrow">{t("Our mission", "Nuestra misión")}</span>
              <h2 style={{ fontSize: 34, margin: "14px 0 16px" }}>{t("Exceptional pediatric care, close to home.", "Atención pediátrica excepcional, cerca de casa.")}</h2>
              <p className="muted">{t("We believe every child in Los Angeles deserves a trusted medical home — regardless of language, neighborhood or insurance. That's why we've built 25 clinics staffed by specialists who care for kids and teens exclusively, from their first newborn visit through age 21.",
                "Creemos que todo niño en Los Ángeles merece un hogar médico de confianza, sin importar el idioma, vecindario o seguro.")}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>{t("What we stand for", "Nuestros valores")}</span><h2>{t("Our values", "Valores")}</h2></div>
          <div className="about-values">
            {values.map((v, i) => (
              <div className="value-card" key={i}><span className="ic"><Icon name={v.icon} size={24} /></span><h3>{v.title}</h3><p>{v.body}</p></div>
            ))}
          </div>
          <div className="stat-band" style={{ marginTop: 24 }}>
            {KT.stats.map((s, i) => <div className="st" key={i}><b>{s.num}</b><span>{s.label}</span></div>)}
          </div>
        </div>
      </section>
      <CtaBand t={t} onBook={() => nav("care", "primary-care")} onLocations={onLocations} />
    </>
  );
}

Object.assign(window, { Crumbs, CarePage, LocationsPage, LocationDetail, DoctorsPage, AboutPage });
