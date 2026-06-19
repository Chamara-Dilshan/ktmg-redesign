/* ═══════════════════════════════════════════════════════════════════════════
   services.jsx — ServicesIndexPage + ServicePage (templated, entity-rich)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Services index ────────────────────────────────────────────────────── */
function ServicesIndexPage({ t, nav }) {
  const KT = window.KT;
  const [filter, setFilter] = React.useState("all");
  const filters = [
    ["all", t("All services", "Todos")],
    ["primary-care", t("Primary Care", "Primaria")],
    ["urgent-care", t("Urgent Care", "Urgencias")],
    ["telehealth", t("Telehealth", "Telesalud")],
  ];
  const list = KT.serviceDetails.filter((s) =>
    filter === "all" || s.careTypes.includes(filter)
  );
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home","Inicio"), fn: () => nav("home") }, { label: t("Services","Servicios") }]} />
          <h1>{t("Pediatric services, soup to nuts","Servicios pediátricos, de todo")}</h1>
          <p className="lede">{t("20 specialty and everyday services for kids and teens — from newborn care through age 21.","20 servicios especializados para niños y adolescentes desde el nacimiento hasta los 21 años.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="region-chips" style={{ marginBottom: 28 }}>
            {filters.map(([v, label]) => (
              <button key={v} data-on={filter === v ? "1" : "0"} onClick={() => setFilter(v)}>{label}</button>
            ))}
          </div>
          <div className="svc-index-grid">
            {list.map((s) => (
              <button key={s.slug} className="svc-index-card" onClick={() => nav("service", s.slug)}>
                <span className="svc-ic"><Icon name={s.icon} size={24} /></span>
                <div className="svc-body">
                  <h3>{s.name}</h3>
                  <p>{s.tagline}</p>
                </div>
                <Icon name="chevron-right" size={18} style={{ color:"var(--ink-3)", flexShrink:0 }} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Service detail ────────────────────────────────────────────────────── */
function ServicePage({ slug, t, nav, onBook }) {
  const KT = window.KT;
  const s = KT.serviceBySlug?.[slug] || KT.serviceDetails[0];
  const providers = KT.doctors.filter((d) =>
    d.specialty === s.name ||
    d.specialty.toLowerCase().includes(s.slug.split("-")[0].toLowerCase()) ||
    (s.slug === "adhd-behavioral" && d.specialty === "ADHD & Behavioral") ||
    (s.slug === "asthma-allergy" && d.specialty === "Asthma & Allergy") ||
    (s.slug === "childhood-obesity" && d.specialty === "Childhood Obesity") ||
    (s.slug === "infectious-disease" && d.specialty === "Infectious Disease") ||
    (s.slug === "newborn-care" && d.specialty === "Newborn Care") ||
    (s.slug === "sports-injuries" && d.specialty === "Sports Medicine") ||
    (s.slug === "teenage-gynecology" && d.specialty === "Adolescent Medicine") ||
    (s.slug === "telehealth-service" && true) ||
    (["well-child-exam","same-day-visit","sick-visit","physicals","free-vaccines","covid-vaccine","walk-ins"].includes(s.slug) && d.specialty === "Pediatrics")
  ).slice(0, 6);
  const related = (s.relatedSlugs || []).map((rs) => KT.serviceBySlug?.[rs]).filter(Boolean).slice(0, 4);
  const careLinks = (s.careTypes || []).map((ct) => KT.careTypes.find((c) => c.slug === ct)).filter(Boolean);

  return (
    <>
      <div className="page-hero svc-page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[
            { label: t("Home","Inicio"), fn: () => nav("home") },
            { label: t("Services","Servicios"), fn: () => nav("services") },
            { label: s.name },
          ]} />
          <div className="svc-hero-head">
            <span className="svc-hero-ic"><Icon name={s.icon} size={32} /></span>
            <div>
              <h1>{s.name}</h1>
              <p className="lede" style={{ marginTop: 8 }}>{s.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="care-detail">
            <div>
              <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: "64ch" }}>{s.description}</p>

              <h2 style={{ fontSize: 26, margin: "34px 0 14px" }}>{t("Conditions addressed","Condiciones atendidas")}</h2>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {(s.conditions || []).map((c) => (
                  <span key={c} style={{ background:"var(--bg-tint)", border:"1px solid var(--line)", borderRadius:999, padding:"8px 15px", fontSize:13.5, fontWeight:600, color:"var(--ink-2)" }}>{c}</span>
                ))}
              </div>

              {careLinks.length > 0 && (
                <>
                  <h2 style={{ fontSize: 26, margin: "34px 0 14px" }}>{t("Available through","Disponible en")}</h2>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                    {careLinks.map((ct) => (
                      <button key={ct.slug} className={"xlink-care care-accent-" + ct.accent} onClick={() => nav("care", ct.slug)}>
                        <span className="xlink-ic" style={{ background:`color-mix(in srgb, var(--ca) 13%, #fff)`, color:"var(--ca)" }}><Icon name={ct.icon} size={18} /></span>
                        <b>{ct.name}</b>
                        <Icon name="arrow-right" size={15} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {s.clinics?.length > 0 && (
                <>
                  <h2 style={{ fontSize: 26, margin: "34px 0 14px" }}>
                    {s.allClinics ? t("Available at all 25 clinics","En las 25 clínicas") : t("Offering clinics","Clínicas que ofrecen este servicio")}
                  </h2>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                    {(s.allClinics ? s.clinics.slice(0, 6) : s.clinics).map((l) => (
                      <button key={l.slug} className="xlink-row" onClick={() => nav("location", l.slug)}>
                        <span className="xlink-ic"><Icon name="map-pin" size={16} /></span>
                        <span className="xlink-txt"><b>{l.name}</b><span>{l.city} · {l.hours?.split(" ·")[0]}</span></span>
                        {l.urgent && <span className="pill-urgent" style={{ fontSize:10 }}>Urgent</span>}
                        <Icon name="chevron-right" size={16} />
                      </button>
                    ))}
                  </div>
                  {s.allClinics && (
                    <button className="btn btn-ghost" style={{ marginTop:14 }} onClick={() => nav("locations")}>
                      <Icon name="map" size={18} /> {t("View all 25 clinics","Ver las 25 clínicas")}
                    </button>
                  )}
                </>
              )}

              {providers.length > 0 && (
                <>
                  <h2 style={{ fontSize: 26, margin: "34px 0 14px" }}>{t("Providers for this service","Proveedores para este servicio")}</h2>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                    {providers.map((d) => (
                      <button key={d.slug} className="xlink-card" onClick={() => nav("doctor", d.slug)}>
                        <Ph label="headshot" style={{ aspectRatio:"1/1", borderRadius:10, marginBottom:10 }} />
                        <b>{d.name.replace(", MD","").replace(", DO","")}</b>
                        <span>{d.clinic}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {related.length > 0 && (
                <>
                  <h2 style={{ fontSize: 26, margin: "34px 0 14px" }}>{t("Related services","Servicios relacionados")}</h2>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {related.map((r) => (
                      <button key={r.slug} className="xlink-row" onClick={() => nav("service", r.slug)}>
                        <span className="xlink-ic"><Icon name={r.icon} size={16} /></span>
                        <span className="xlink-txt"><b>{r.name}</b><span>{r.tagline?.slice(0,42)}…</span></span>
                        <Icon name="chevron-right" size={16} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <aside>
              <div className="sidecard">
                <h3>{t("Book this service","Reservar este servicio")}</h3>
                <p className="muted" style={{ fontSize:14 }}>{t("Available at most locations. Book online or call your nearest clinic.","Disponible en la mayoría de las ubicaciones.")}</p>
                <div className="sc-row"><Icon name="clock" size={18} />{t("Same-day availability","Disponibilidad el mismo día")}</div>
                <div className="sc-row"><Icon name="shield-plus" size={18} />{t("Most insurance accepted","Seguros aceptados")}</div>
                <div className="sc-row"><Icon name="globe" size={18} />{t("English & Spanish","Inglés y Español")}</div>
                <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onBook(); }}><Icon name="calendar" size={18} /> {t("Book now","Reservar ahora")}</a>
                <a href="#" className="btn btn-ghost" style={{ width:"100%", marginTop:10 }} onClick={(e) => { e.preventDefault(); nav("locations"); }}><Icon name="map-pin" size={18} /> {t("Find a clinic","Buscar clínica")}</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ServicesIndexPage, ServicePage });
