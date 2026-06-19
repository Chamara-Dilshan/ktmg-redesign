/* ═══════════════════════════════════════════════════════════════════════════
   Additional pages: Doctor detail, Careers, Forms & Refills, Testimonials, Search
   ═══════════════════════════════════════════════════════════════════════════ */

function Stars({ n }) {
  return (
    <span className="stars" aria-label={n + " out of 5"}>
      {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={16} filled={i <= n} />)}
    </span>
  );
}

/* ── Doctor detail ─────────────────────────────────────────────────────── */
function DoctorDetail({ slug, t, nav, onBook }) {
  const KT = window.KT;
  const d = KT.doctors.find((x) => x.slug === slug) || KT.doctors[0];
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home", "Inicio"), fn: () => nav("home") }, { label: t("Our Doctors", "Doctores"), fn: () => nav("doctors") }, { label: d.name }]} />
        </div>
      </div>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="care-detail">
            <div>
              <div className="doc-header">
                <PhotoSlot id={"doc-" + d.slug} label="doctor headshot" aspect="1 / 1" style={{ width: 168, flexShrink: 0 }} />
                <div>
                  {d.accepting
                    ? <span className="avail-pill on">● {t("Accepting new patients", "Aceptando pacientes")}</span>
                    : <span className="avail-pill off">● {t("Waitlist only", "Lista de espera")}</span>}
                  <h1 style={{ fontSize: 38, margin: "12px 0 6px" }}>{d.name}</h1>
                  <div className="doc-spec">{d.specialty}</div>
                  <div className="doc-meta">
                    <span><Icon name="map-pin" size={16} /> <a href="#" onClick={(e) => { e.preventDefault(); nav("location", d.clinicSlug); }}>{d.clinic} {t("Clinic", "Clínica")}</a></span>
                    <span><Icon name="globe" size={16} /> {d.lang}</span>
                  </div>
                </div>
              </div>
              <h2 style={{ fontSize: 26, margin: "36px 0 12px" }}>{t("About", "Acerca de")}</h2>
              <p className="muted" style={{ maxWidth: "62ch", fontSize: 16 }}>{d.bio}</p>
              <h2 style={{ fontSize: 26, margin: "32px 0 14px" }}>{t("Areas of focus", "Áreas de enfoque")}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {d.focus.map((f) => (
                  <span key={f} style={{ background: "var(--bg-tint)", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 15px", fontSize: 13.5, fontWeight: 600, color: "var(--ink-2)" }}>{f}</span>
                ))}
              </div>
              <h2 style={{ fontSize: 26, margin: "32px 0 12px" }}>{t("Education & training", "Educación")}</h2>
              <p className="muted" style={{ display: "flex", alignItems: "center", gap: 10 }}><Icon name="award" size={20} style={{ color: "var(--c-primary)" }} /> {d.edu}</p>
            </div>
            <aside>
              <div className="sidecard">
                <h3>{t("Book with", "Reservar con")} {d.name.split(",")[0].replace("Dr. ", "Dr. ")}</h3>
                <p className="muted" style={{ fontSize: 14 }}>{d.accepting ? t("Now accepting new patients at the", "Aceptando pacientes nuevos en") : t("Currently waitlisting at the", "En lista de espera en")} {d.clinic} {t("clinic.", "clínica.")}</p>
                <div className="sc-row"><Icon name="map-pin" size={18} />{d.clinic} {t("Clinic", "Clínica")}</div>
                <div className="sc-row"><Icon name="globe" size={18} />{d.lang}</div>
                <div className="sc-row"><Icon name="shield-plus" size={18} />{t("Most insurance accepted", "Aceptamos seguros")}</div>
                <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onBook(); }}><Icon name="calendar" size={18} /> {t("Book appointment", "Reservar cita")}</a>
                <a href="#" className="btn btn-ghost" style={{ width: "100%", marginTop: 10 }} onClick={(e) => { e.preventDefault(); nav("doctors"); }}><Icon name="users" size={18} /> {t("All doctors", "Todos los doctores")}</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Careers ───────────────────────────────────────────────────────────── */
function CareersPage({ t, nav }) {
  const KT = window.KT;
  const [dept, setDept] = React.useState("all");
  const depts = ["all", ...Array.from(new Set(KT.jobs.map((j) => j.dept)))];
  const jobs = KT.jobs.filter((j) => dept === "all" || j.dept === dept);
  const perks = [
    { icon: "heart-pulse", title: t("Mission that matters", "Misión que importa"), body: t("Care for LA's kids alongside people who treat it as a calling.", "Cuide a los niños de LA junto a personas dedicadas.") },
    { icon: "award", title: t("Grow with us", "Crezca con nosotros"), body: t("Mentorship, CME support and real paths to advance across 25 clinics.", "Mentoría y rutas de crecimiento en 25 clínicas.") },
    { icon: "clock", title: t("Real balance", "Equilibrio real"), body: t("Predictable schedules and a culture that respects your time off.", "Horarios predecibles y respeto por su tiempo.") },
    { icon: "shield-plus", title: t("Full benefits", "Beneficios completos"), body: t("Medical, dental, 401(k) match, and generous PTO from day one.", "Médico, dental, 401(k) y PTO generoso.") },
  ];
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home", "Inicio"), fn: () => nav("home") }, { label: t("Careers", "Empleos") }]} />
          <h1>{t("Build your career caring for kids", "Construya su carrera cuidando niños")}</h1>
          <p className="lede">{t("Join the largest pediatric network in Los Angeles. We're hiring compassionate clinicians and team members across all 25 clinics.",
            "Únase a la red pediátrica más grande de Los Ángeles. Estamos contratando en las 25 clínicas.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="about-values">
            {perks.map((p, i) => (
              <div className="value-card" key={i}><span className="ic"><Icon name={p.icon} size={24} /></span><h3 style={{ fontSize: 19 }}>{p.title}</h3><p>{p.body}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tint" style={{ paddingTop: 0, background: "linear-gradient(#fff 40%, var(--bg-tint) 40%)" }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 28 }}>
            <span className="eyebrow">{t("Open roles", "Vacantes")}</span>
            <h2>{t("Current openings", "Vacantes actuales")}</h2>
          </div>
          <div className="region-chips" style={{ marginBottom: 22 }}>
            {depts.map((dp) => (
              <button key={dp} data-on={dept === dp ? "1" : "0"} onClick={() => setDept(dp)}>{dp === "all" ? t("All teams", "Todos") : dp}</button>
            ))}
          </div>
          <div className="job-list">
            {jobs.map((j, i) => (
              <div className="job-row" key={i}>
                <div>
                  <h4>{j.title}</h4>
                  <div className="job-meta">
                    <span><Icon name="users" size={14} />{j.dept}</span>
                    <span><Icon name="map-pin" size={14} />{j.location}</span>
                    <span><Icon name="clock" size={14} />{j.type}</span>
                  </div>
                </div>
                <a href="#" className="btn btn-ghost" onClick={(e) => e.preventDefault()}>{t("Apply", "Aplicar")} <Icon name="arrow-right" size={16} /></a>
              </div>
            ))}
          </div>
          <div className="notice">
            <Icon name="shield-plus" size={20} />
            <p><b>{t("Beware of job scams.", "Cuidado con las estafas.")}</b> {t("Kids & Teens Medical Group never asks for payment or banking details during hiring. Official offers come only from an @ktdoctor.com address.",
              "Kids & Teens Medical Group nunca pide pagos durante la contratación. Las ofertas oficiales provienen solo de @ktdoctor.com.")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Forms & Refills ───────────────────────────────────────────────────── */
function FormsPage({ t, nav, onBook }) {
  const KT = window.KT;
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home", "Inicio"), fn: () => nav("home") }, { label: t("Forms Only", "Formularios") }]} />
          <h1>{t("Forms only", "Formularios")}</h1>
          <p className="lede">{t("Download what you need before your visit, request a prescription refill, or email your preferred office directly — all in one place.",
            "Descargue lo que necesita, solicite recetas o escriba a su oficina preferida — todo en un solo lugar.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="forms-grid">
            {KT.formGroups.map((g, i) => (
              <div className="form-group" key={i}>
                <div className="fg-head"><span className="ic"><Icon name={g.icon} size={22} /></span><h3>{g.label}</h3></div>
                <div className="fg-list">
                  {g.items.map((it) => (
                    <a href="#" key={it} className="form-row" onClick={(e) => e.preventDefault()}>
                      <span><Icon name="file" size={18} /> {it}</span>
                      <span className="dl"><Icon name="arrow-right" size={16} /> PDF</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="forms-cta">
            <div>
              <h3>{t("Need a prescription refill?", "¿Necesita una receta?")}</h3>
              <p>{t("Request refills through the patient portal or call your clinic. Allow 48 hours for processing.", "Solicite recetas en el portal o llame a su clínica. Permita 48 horas.")}</p>
            </div>
            <div className="forms-cta-actions">
              <a href="#" className="btn btn-on-dark"><Icon name="user" size={18} /> {t("Open patient portal", "Abrir portal")}</a>
              <a href="#" className="btn btn-outline-dark" onClick={(e) => { e.preventDefault(); onBook(); }}>{t("Book a visit instead", "Reservar visita")}</a>
            </div>
          </div>

          <div className="email-directory">
            <div className="ed-head">
              <h3>{t("Email your preferred office", "Escriba a su oficina preferida")}</h3>
              <p>{t("Send completed forms or questions straight to the clinic you visit. Use the email address for your preferred office below.",
                "Envíe formularios completados o preguntas directamente a la clínica que visita.")}</p>
            </div>
            <div className="ed-grid">
              {(KT.clinicEmails || []).map((c) => (
                <a href={"mailto:" + c.email} key={c.slug} className="ed-row">
                  <span className="ed-name">{c.name}</span>
                  <span className="ed-email"><Icon name="message" size={15} /> {c.email}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Testimonials ──────────────────────────────────────────────────────── */
function TestimonialsPage({ t, nav }) {
  const KT = window.KT;
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home", "Inicio"), fn: () => nav("home") }, { label: t("Testimonials", "Testimonios") }]} />
          <h1>{t("What LA families say", "Lo que dicen las familias")}</h1>
          <p className="lede">{t("Real words from the parents and kids we care for across Los Angeles.", "Palabras reales de las familias que cuidamos en Los Ángeles.")}</p>
          <div className="rating-summary">
            <div className="rs-score">4.9</div>
            <div>
              <Stars n={5} />
              <div className="muted" style={{ fontSize: 14, marginTop: 2 }}>{t("from 3,200+ verified reviews", "de más de 3,200 reseñas")}</div>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          {/* Google + Yelp review platform buttons */}
          <div className="testi-platform-row">
            <a href="https://www.google.com/search?q=Kids+Teens+Medical+Group+reviews+Los+Angeles" target="_blank" rel="noopener noreferrer" className="testi-platform-btn google">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              {t("Google Reviews", "Reseñas de Google")}
            </a>
            <a href="https://www.yelp.com/search?find_desc=Kids+%26+Teens+Medical+Group&find_loc=Los+Angeles%2C+CA" target="_blank" rel="noopener noreferrer" className="testi-platform-btn yelp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#d32323" xmlns="http://www.w3.org/2000/svg"><path d="M20.16 12.55c-.47-.4-4.12-2.44-4.67-2.62-.55-.18-1.08-.12-1.44.22-.35.32-.44.8-.27 1.35l1.2 3.67c.08.25.04.5-.12.7-.16.19-.4.3-.66.3-.22 0-.44-.09-.6-.24L10.82 13c-.3-.3-.42-.73-.3-1.15l1.8-6.22c.15-.51.07-1.01-.24-1.38-.3-.36-.77-.53-1.3-.46-.56.07-5.1 1.39-5.65 1.88C4.6 5.99 4.4 6.56 4.5 7.13l1.62 9.1c.1.56.44 1.03.93 1.27.49.25 1.06.24 1.55-.01l4.98-2.6c.32-.17.7-.15 1.01.05l2.44 1.54c.37.23.82.28 1.25.13.43-.14.76-.47.89-.9l1.03-3.16c.15-.46.05-.96-.25-1.3l.21.3z"/></svg>
              {t("Yelp Reviews", "Reseñas de Yelp")}
            </a>
          </div>

          <div className="testi-grid">
            {KT.testimonials.map((r, i) => (
              <figure className="testi-card" key={i}>
                <Stars n={r.rating} />
                <blockquote>“{r.quote}”</blockquote>
                <figcaption>
                  <span className="ava">{r.author.charAt(0)}</span>
                  <span><b>{r.author}</b><span className="muted">{r.clinic}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="share-card">
            <div>
              <span className="eyebrow">{t("Share your experience", "Comparta su experiencia")}</span>
              <h2 style={{ fontSize: 30, margin: "12px 0 8px" }}>{t("Were we there for your family?", "¿Estuvimos ahí para su familia?")}</h2>
              <p className="muted">{t("Your story helps other LA parents find care they can trust. It only takes a minute.", "Su historia ayuda a otros padres a encontrar atención confiable.")}</p>
            </div>
            <a href="#" className="btn btn-primary btn-lg" onClick={(e) => e.preventDefault()}><Icon name="heart" size={18} /> {t("Write a review", "Escribir reseña")}</a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Search ────────────────────────────────────────────────────────────── */
function SearchPage({ initial, t, nav, onLocations }) {
  const KT = window.KT;
  const [q, setQ] = React.useState(initial || "");
  const inputRef = React.useRef(null);
  React.useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  const s = q.trim().toLowerCase();

  const results = React.useMemo(() => {
    if (!s) return null;
    const m = (txt) => txt.toLowerCase().includes(s);
    return {
      locations: KT.locations.filter((l) => m(l.name) || m(l.city) || l.zip.includes(s)).map((l) => ({ title: l.name, sub: l.city + ", CA " + l.zip, go: () => nav("location", l.slug), icon: "map-pin" })),
      doctors: KT.doctors.filter((d) => m(d.name) || m(d.specialty) || m(d.clinic)).map((d) => ({ title: d.name, sub: d.specialty + " · " + d.clinic, go: () => nav("doctor", d.slug), icon: "user" })),
      care: KT.careTypes.filter((c) => m(c.name) || m(c.blurb)).map((c) => ({ title: c.name, sub: c.tagline, go: () => nav("care", c.slug), icon: c.icon })),
      services: KT.services.filter((sv) => m(sv)).map((sv) => ({ title: sv, sub: t("Service", "Servicio"), go: () => nav("care", "primary-care"), icon: "check-circle" })),
    };
  }, [s]);

  const total = results ? Object.values(results).reduce((a, b) => a + b.length, 0) : 0;
  const groups = results ? [
    ["locations", t("Clinics", "Clínicas")],
    ["doctors", t("Doctors", "Doctores")],
    ["care", t("Care types", "Atención")],
    ["services", t("Services", "Servicios")],
  ] : [];
  const suggestions = ["Telehealth", "Pasadena", "Vaccines", "Sports physical", "Urgent care", "Newborn"];

  return (
    <section className="section search-page">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <h1 style={{ fontSize: 38, marginBottom: 18 }}>{t("Search", "Buscar")}</h1>
        <div className="search-box big">
          <Icon name="search" size={22} />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search clinics, doctors, services…", "Buscar clínicas, doctores, servicios…")} />
          {q && <button className="clear" onClick={() => setQ("")} aria-label="Clear"><Icon name="x" size={18} /></button>}
        </div>

        {!s && (
          <div style={{ marginTop: 30 }}>
            <div className="muted" style={{ fontWeight: 600, marginBottom: 12 }}>{t("Popular searches", "Búsquedas populares")}</div>
            <div className="region-chips">
              {suggestions.map((sg) => <button key={sg} onClick={() => setQ(sg)}>{sg}</button>)}
            </div>
          </div>
        )}

        {s && (
          <div style={{ marginTop: 26 }}>
            <div className="finder-count">{total > 0 ? <span><b>{total}</b> {t("results for", "resultados para")} “{q}”</span> : <span>{t("No results for", "Sin resultados para")} “{q}”</span>}</div>
            {total === 0 && (
              <div className="no-results">
                <p>{t("Try a clinic name, a doctor, or a service like “telehealth” or “vaccines”.", "Pruebe el nombre de una clínica, un doctor o un servicio.")}</p>
                <a href="#" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); onLocations(); }}><Icon name="map-pin" size={18} /> {t("Browse all clinics", "Ver clínicas")}</a>
              </div>
            )}
            {groups.map(([key, label]) => results[key].length > 0 && (
              <div key={key} className="search-group">
                <div className="search-group-label">{label} <span>{results[key].length}</span></div>
                {results[key].map((it, i) => (
                  <button key={i} className="search-result" onClick={it.go}>
                    <span className="sr-ic"><Icon name={it.icon} size={18} /></span>
                    <span className="sr-txt"><b>{it.title}</b><span className="muted">{it.sub}</span></span>
                    <Icon name="chevron-right" size={18} />
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { Stars, DoctorDetail, CareersPage, FormsPage, TestimonialsPage, SearchPage });
