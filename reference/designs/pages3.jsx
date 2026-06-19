/* ═══════════════════════════════════════════════════════════════════════════
   pages3.jsx — Directory, Parent Resources, Terms, Privacy
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Directory ─────────────────────────────────────────────────────────── */
function DirectoryPage({ t, nav, onBook }) {
  const KT = window.KT;
  const [tab, setTab] = React.useState("doctors");
  const [q, setQ] = React.useState("");
  const [region, setRegion] = React.useState("all");
  const [spec, setSpec] = React.useState("all");
  const specs = ["all", ...Array.from(new Set(KT.doctors.map((d) => d.specialty)))];

  const filteredDocs = KT.doctors.filter((d) => {
    const s = q.trim().toLowerCase();
    const okQ = !s || d.name.toLowerCase().includes(s) || d.specialty.toLowerCase().includes(s) || d.clinic.toLowerCase().includes(s);
    const okS = spec === "all" || d.specialty === spec;
    return okQ && okS;
  });

  const filteredLocs = KT.locations.filter((l) => {
    const s = q.trim().toLowerCase();
    const okQ = !s || l.name.toLowerCase().includes(s) || l.city.toLowerCase().includes(s) || l.zip.includes(s);
    const okR = region === "all" || l.region === region;
    return okQ && okR;
  });

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home","Inicio"), fn: () => nav("home") }, { label: t("Directory","Directorio") }]} />
          <h1>{t("Provider & clinic directory","Directorio de médicos y clínicas")}</h1>
          <p className="lede">{t("Search our full network — 52 providers and 23 clinics across Los Angeles.","Busque en nuestra red completa — 52 proveedores y 23 clínicas en Los Ángeles.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          {/* Global search */}
          <div className="search-box big" style={{ marginBottom: 24 }}>
            <Icon name="search" size={22} />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder={t("Search doctors, clinics, specialties…","Buscar médicos, clínicas, especialidades…")} />
            {q && <button className="clear" onClick={() => setQ("")} aria-label="Clear"><Icon name="x" size={18} /></button>}
          </div>

          {/* Tab switcher */}
          <div className="dir-tabs">
            <button className={"dir-tab" + (tab === "doctors" ? " on" : "")} onClick={() => setTab("doctors")}>
              <Icon name="users" size={18} /> {t("Doctors","Médicos")} <span className="dir-count">{filteredDocs.length}</span>
            </button>
            <button className={"dir-tab" + (tab === "locations" ? " on" : "")} onClick={() => setTab("locations")}>
              <Icon name="map-pin" size={18} /> {t("Clinics","Clínicas")} <span className="dir-count">{filteredLocs.length}</span>
            </button>
          </div>

          {/* Doctors tab */}
          {tab === "doctors" && (
            <>
              <div className="region-chips" style={{ margin: "16px 0 22px" }}>
                {specs.slice(0, 8).map((s) => (
                  <button key={s} data-on={spec === s ? "1" : "0"} onClick={() => setSpec(s)}>
                    {s === "all" ? t("All specialties","Todas") : s}
                  </button>
                ))}
              </div>
              <div className="dir-grid">
                {filteredDocs.map((d) => (
                  <button key={d.slug} className="dir-card" onClick={() => nav("doctor", d.slug)}>
                    <Ph label="headshot" style={{ width: 56, height: 56, borderRadius: 12, flexShrink: 0 }} />
                    <div className="dir-info">
                      <div className="dir-status" style={{ color: d.accepting ? "var(--good)" : "var(--ink-3)" }}>
                        ● {d.accepting ? t("Accepting","Aceptando") : t("Waitlist","Lista de espera")}
                      </div>
                      <b>{d.name}</b>
                      <span>{d.specialty} · {d.clinic}</span>
                      <span className="dir-lang"><Icon name="globe" size={13} /> {d.lang}</span>
                    </div>
                    <Icon name="chevron-right" size={18} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
                  </button>
                ))}
                {filteredDocs.length === 0 && <div className="dir-empty">{t("No providers match.","Sin resultados.")}</div>}
              </div>
            </>
          )}

          {/* Locations tab */}
          {tab === "locations" && (
            <>
              <div className="region-chips" style={{ margin: "16px 0 22px" }}>
                <button data-on={region === "all" ? "1" : "0"} onClick={() => setRegion("all")}>{t("All areas","Todas")}</button>
                {Object.entries(KT.REGIONS).map(([k, v]) => (
                  <button key={k} data-on={region === k ? "1" : "0"} onClick={() => setRegion(k)}>{v}</button>
                ))}
              </div>
              <div className="loc-cards">
                {filteredLocs.map((l) => (
                  <button key={l.slug} className="loc-card" onClick={() => nav("location", l.slug)}>
                    <span className="region-tag">{KT.REGIONS[l.region]}</span>
                    <h4>{l.name}</h4>
                    <span className="addr">{l.addr}, {l.city} {l.zip}</span>
                    <div className="meta">
                      <span><Icon name="clock" size={14} />{l.hours}</span>
                      <span><Icon name="phone" size={14} />{l.phone}</span>
                    </div>
                    <div className="card-foot">
                      {l.urgent ? <span className="pill-urgent">{t("Urgent care","Urgencias")}</span>
                        : <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{t("Primary care","Atención primaria")}</span>}
                      <span className="link-arrow">{t("Details","Detalles")} <Icon name="arrow-right" size={16} /></span>
                    </div>
                  </button>
                ))}
                {filteredLocs.length === 0 && <div className="dir-empty">{t("No clinics match.","Sin resultados.")}</div>}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

/* ── Parent Resources ──────────────────────────────────────────────────── */
function ParentResourcesPage({ t, nav, onBook }) {
  const KT = window.KT;
  const categories = [
    {
      icon: "syringe", title: t("Vaccines & immunizations","Vacunas"),
      desc: t("Schedules, VFC free vaccines, Covid booster info.","Calendarios, vacunas gratuitas VFC, refuerzo Covid."),
      links: [
        { label: t("2026 immunization schedule (PDF)","Calendario 2026 (PDF)") },
        { label: t("Free vaccines — VFC program","Vacunas gratis — VFC") },
        { label: t("Covid-19 vaccine info","Info vacuna Covid-19"), fn: () => nav("service","covid-vaccine") },
      ],
    },
    {
      icon: "baby", title: t("Newborns & infants","Recién nacidos"),
      desc: t("Safe sleep, feeding, jaundice, developmental milestones.","Sueño seguro, alimentación, ictericia, hitos del desarrollo."),
      links: [
        { label: t("Safe sleep guide (AAP)","Guía de sueño seguro") },
        { label: t("Breastfeeding & formula tips","Consejos de lactancia") },
        { label: t("Book a newborn visit","Reservar visita recién nacido"), fn: onBook },
      ],
    },
    {
      icon: "users", title: t("Child development","Desarrollo infantil"),
      desc: t("Milestones, ADHD, autism screening, school readiness.","Hitos, TDAH, autismo, preparación escolar."),
      links: [
        { label: t("CDC milestone tracker","Rastreador de hitos CDC") },
        { label: t("ADHD & behavioral services","Servicios TDAH"), fn: () => nav("service","adhd-behavioral") },
        { label: t("Autism spectrum resources","Recursos autismo"), fn: () => nav("service","autism-special-needs") },
      ],
    },
    {
      icon: "heart-pulse", title: t("Asthma & allergies","Asma y alergias"),
      desc: t("LA air quality, action plans, triggers and treatment.","Calidad del aire en LA, planes de acción, tratamiento."),
      links: [
        { label: t("Download asthma action plan","Descargar plan de asma") },
        { label: t("Asthma & Allergy Center","Centro de Asma"), fn: () => nav("service","asthma-allergy") },
        { label: t("LA air quality alerts","Alertas de calidad del aire") },
      ],
    },
    {
      icon: "award", title: t("Sports & school physicals","Físicos deportivos"),
      desc: t("Required forms, same-day scheduling, digital delivery.","Formularios requeridos, horarios el mismo día."),
      links: [
        { label: t("Download sports physical form","Descargar formulario") },
        { label: t("Book a physical","Reservar físico"), fn: onBook },
        { label: t("School physical requirements CA","Requisitos CA") },
      ],
    },
    {
      icon: "shield-plus", title: t("Insurance & financial help","Seguros y ayuda financiera"),
      desc: t("Medi-Cal, L.A. Care, free programs for uninsured families.","Medi-Cal, L.A. Care, programas gratuitos."),
      links: [
        { label: t("Check your coverage","Verificar cobertura") },
        { label: t("Medi-Cal enrollment help","Ayuda inscripción Medi-Cal") },
        { label: t("No insurance? See options","¿Sin seguro? Ver opciones") },
      ],
    },
    {
      icon: "file", title: t("Forms & records","Formularios y registros"),
      desc: t("All downloadable forms, records requests and refills.","Todos los formularios, registros y recetas."),
      links: [
        { label: t("All forms & refills","Todos los formularios"), fn: () => nav("forms") },
        { label: t("Medical records request","Solicitar registros"), fn: () => nav("forms") },
        { label: t("Patient portal login","Acceder al portal") },
      ],
    },
    {
      icon: "video", title: t("Video guides for parents","Videos para padres"),
      desc: t("Short, practical guides on fevers, feeding, sleep, and more.","Guías prácticas sobre fiebre, alimentación, sueño."),
      links: [
        { label: t("Fever: when to worry","Fiebre: cuándo preocuparse") },
        { label: t("Starting solids guide","Guía de alimentos sólidos") },
        { label: t("Sleep safety for babies","Seguridad del sueño") },
      ],
    },
  ];

  const tools = [
    { icon: "clock", title: t("Symptom checker","Verificador de síntomas"), desc: t("ER, urgent care or wait? Answer 5 questions.","¿ER, urgencias o esperar? 5 preguntas."), cta: t("Check now","Verificar ahora") },
    { icon: "map-pin", title: t("Find a clinic","Buscar clínica"), desc: t("Nearest open clinic with hours and directions.","Clínica más cercana con horarios y direcciones."), cta: t("Find one","Buscar"), fn: () => nav("locations") },
    { icon: "calendar", title: t("Book an appointment","Reservar cita"), desc: t("Online in 2 minutes — same-day available.","En línea en 2 minutos — disponible el mismo día."), cta: t("Book now","Reservar ahora"), fn: onBook },
    { icon: "stethoscope", title: t("Ask a nurse (text)","Preguntar a enfermera (SMS)"), desc: t("Text (626) 298-7121 for quick clinical questions.","Envíe texto al (626) 298-7121."), cta: t("Text now","Enviar texto") },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home","Inicio"), fn: () => nav("home") }, { label: t("Parent Resources","Recursos") }]} />
          <h1>{t("Parent resources","Recursos para padres")}</h1>
          <p className="lede">{t("Everything you need between visits — guides, forms, schedules, and quick tools to help your family stay healthy.",
            "Todo lo que necesita entre visitas — guías, formularios, calendarios y herramientas.")}</p>
        </div>
      </div>

      {/* Quick-action tools */}
      <section className="section section-tint" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="wrap">
          <div className="res-grid">
            {tools.map((tool, i) => (
              <div key={i} className="res-card">
                <span className="ic"><Icon name={tool.icon} size={22} /></span>
                <h4>{tool.title}</h4>
                <p>{tool.desc}</p>
                <a href="#" className="link-arrow" onClick={(e) => { e.preventDefault(); tool.fn && tool.fn(); }}>
                  {tool.cta} <Icon name="arrow-right" size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource categories */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">{t("Guides & downloads","Guías y descargas")}</span>
            <h2>{t("Browse by topic","Explorar por tema")}</h2>
          </div>
          <div className="pr-grid">
            {categories.map((cat, i) => (
              <div key={i} className="pr-card">
                <div className="pr-head">
                  <span className="ic"><Icon name={cat.icon} size={22} /></span>
                  <h3>{cat.title}</h3>
                </div>
                <p>{cat.desc}</p>
                <ul className="pr-links">
                  {cat.links.map((lk, j) => (
                    <li key={j}>
                      <a href="#" className="form-row" style={{ padding: "11px 0", border: 0, borderTop: j > 0 ? "1px solid var(--line)" : "none" }}
                        onClick={(e) => { e.preventDefault(); lk.fn && lk.fn(); }}>
                        <span><Icon name="file" size={16} />{lk.label}</span>
                        <span className="dl"><Icon name="arrow-right" size={15} /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="section section-tint">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">{t("From the blog","Del blog")}</span>
            <h2>{t("Pediatric tips & seasonal guides","Consejos y guías")}</h2>
          </div>
          <div className="story-grid">
            {KT.stories.map((s, i) => (
              <a href="#" key={i} className="story-card" onClick={(e) => e.preventDefault()}>
                <Ph label="article image (16:10)" />
                <div className="body">
                  <span className="stag">{s.tag}</span>
                  <h4>{s.title}</h4>
                  <div className="smeta"><span>{s.date}</span><span>{s.read}</span></div>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* Developmental Journey section */}
        <div style={{ marginTop:64 }}>
          <span className="eyebrow">{t("Your child's developmental journey","El viaje del desarrollo de su hijo")}</span>
          <h2 style={{ fontSize:"clamp(26px,3vw,40px)", margin:"12px 0 6px" }}>{t("Celebrating Every Step!","¡Celebrando cada paso!")}</h2>
          <p style={{ color:"var(--ink-2)", marginBottom:32 }}>{t("Download our milestone guides to track your baby's growth — from first smiles to first steps.","Descargue nuestras guías de hitos para seguir el desarrollo de su bebé.")}</p>
          <div className="milestone-grid">
            {[
              { n:1, mo:"2", label:t("2 Months","2 Meses") },
              { n:2, mo:"4", label:t("4 Months","4 Meses") },
              { n:3, mo:"6", label:t("6 Months","6 Meses") },
              { n:4, mo:"12", label:t("12 Months","12 Meses") },
              { n:5, mo:"16", label:t("16 Months","16 Meses") },
              { n:6, mo:"24", label:t("24 Months","24 Meses") },
            ].map((m) => (
              <div key={m.n} className="milestone-card">
                <span className="milestone-no">{m.n}</span>
                <div className="milestone-icon">
                  <Icon name={m.n<=2?"baby":m.n<=4?"heart":"users"} size={36} />
                </div>
                <div className="milestone-label">{m.label}</div>
                <div className="milestone-sub">{t("What do babies do?","¿Qué hacen los bebés?")}</div>
                <a href="#" className="link-arrow" style={{ fontSize:13 }} onClick={(e) => e.preventDefault()}>
                  {t("Download now","Descargar")} <Icon name="arrow-right" size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Terms of Use ───────────────────────────────────────────── */
function TermsPage({ t, nav }) {
  const secs = [
    { h: t("Acceptance of terms","Aceptación de los términos"), body: t("By accessing or using the Kids & Teens Medical Group website (ktdoctor.com) and any related mobile applications, you agree to be bound by these Terms of Use. If you do not agree, please do not use our services.","Al acceder o utilizar el sitio web de Kids & Teens Medical Group, usted acepta estar sujeto a estos Términos de Uso.") },
    { h: t("Not a substitute for medical advice","No es sustituto de consejo médico"), body: t("Information on this site is provided for general educational purposes only. It does not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.","La información en este sitio se proporciona solo con fines educativos generales. No constituye consejo médico profesional, diagnóstico ni tratamiento.") },
    { h: t("Use of services","Uso de servicios"), body: t("Our online appointment scheduling, telehealth services, and patient portal are provided for the convenience of our patients and their authorized representatives. You agree to provide accurate and complete information and to use these services only for lawful purposes.","Nuestros servicios de programación de citas, telesalud y portal del paciente se proporcionan para conveniencia de nuestros pacientes.") },
    { h: t("Intellectual property","Propiedad intelectual"), body: t("All content on this site — including text, graphics, logos, images, and software — is the property of Kids & Teens Medical Group or its content suppliers and is protected by United States and international copyright laws.","Todo el contenido de este sitio es propiedad de Kids & Teens Medical Group o sus proveedores de contenido.") },
    { h: t("Privacy","Privacidad"), body: t("Your use of this site is also governed by our Privacy Policy, which is incorporated into these Terms of Use by reference. Please review our Privacy Policy carefully.","Su uso de este sitio también se rige por nuestra Política de Privacidad.") },
    { h: t("Limitation of liability","Limitación de responsabilidad"), body: t("To the fullest extent permitted by law, Kids & Teens Medical Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this site or our services.","En la medida máxima permitida por la ley, Kids & Teens Medical Group no será responsable de daños indirectos derivados del uso de este sitio.") },
    { h: t("Changes to terms","Cambios en los términos"), body: t("We reserve the right to modify these Terms of Use at any time. We will provide notice of significant changes by updating the date at the top of this page. Continued use of this site after changes constitutes your acceptance of the revised terms.","Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento.") },
    { h: t("Governing law","Ley aplicable"), body: t("These Terms of Use are governed by the laws of the State of California, without regard to its conflict of law provisions. Any dispute shall be resolved in the courts of Los Angeles County, California.","Estos Términos de Uso se rigen por las leyes del Estado de California.") },
    { h: t("Contact","Contacto"), body: t("Questions about these Terms? Contact our compliance team at legal@ktdoctor.com or write to Kids & Teens Medical Group, Legal Department, Los Angeles, CA.","¿Preguntas sobre estos Términos? Contáctenos en legal@ktdoctor.com.") },
  ];
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home","Inicio"), fn: () => nav("home") }, { label: t("Terms of Use","Términos de uso") }]} />
          <h1>{t("Terms of Use","Términos de uso")}</h1>
          <p className="lede">{t("Last updated: June 2026. Please read these terms carefully before using our website or services.",
            "Última actualización: junio 2026. Por favor lea estos términos antes de usar nuestro sitio.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="legal-doc">
            {secs.map((s, i) => (
              <div key={i} className="legal-sec">
                <h2>{s.h}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Privacy Policy ────────────────────────────────────────────────────── */
function PrivacyPage({ t, nav }) {
  const secs = [
    { h: t("Information we collect","Información que recopilamos"), body: t("We collect information you provide directly to us — such as when you schedule an appointment, create a patient portal account, or contact us. This may include name, date of birth, contact information, insurance details, and health information. We also collect information automatically when you use our website, such as IP address, browser type, and pages visited.","Recopilamos información que usted nos proporciona directamente, como cuando programa una cita o crea una cuenta en el portal del paciente.") },
    { h: t("How we use your information","Cómo usamos su información"), body: t("We use the information we collect to: provide and improve our healthcare services; schedule and manage appointments; communicate with you about your care; process payments; comply with legal obligations; and send you health reminders and educational content (with your consent).","Usamos la información que recopilamos para proporcionar y mejorar nuestros servicios de salud, programar citas y cumplir con obligaciones legales.") },
    { h: t("HIPAA notice","Aviso HIPAA"), body: t("As a covered healthcare entity, Kids & Teens Medical Group is subject to the Health Insurance Portability and Accountability Act (HIPAA). We maintain a separate Notice of Privacy Practices for Protected Health Information (PHI) which describes how we may use and disclose your health information. You received or can request a copy at any clinic.","Como entidad de salud cubierta, Kids & Teens Medical Group está sujeto a HIPAA. Mantenemos un Aviso separado de Prácticas de Privacidad para Información de Salud Protegida.") },
    { h: t("Information sharing","Compartir información"), body: t("We do not sell your personal information. We may share your information with: healthcare providers involved in your care; insurance companies for billing purposes; service providers who help us operate our business (under strict confidentiality agreements); and as required by law.","No vendemos su información personal. Podemos compartirla con proveedores de atención médica involucrados en su cuidado y con compañías de seguros para facturación.") },
    { h: t("Cookies & tracking","Cookies y rastreo"), body: t("Our website uses cookies and similar tracking technologies to improve your experience. You can control cookie settings through your browser. We use Google Analytics to understand how visitors use our site — this data is anonymized and aggregated.","Nuestro sitio usa cookies para mejorar su experiencia. Puede controlar la configuración de cookies a través de su navegador.") },
    { h: t("Data security","Seguridad de datos"), body: t("We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our patient portal and telehealth services use end-to-end encryption.","Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado.") },
    { h: t("Your rights","Sus derechos"), body: t("You have the right to: access the personal information we hold about you; correct inaccurate data; request deletion of your data (subject to legal retention requirements); opt out of marketing communications; and file a complaint with a supervisory authority. Contact privacy@ktdoctor.com to exercise these rights.","Tiene derecho a acceder, corregir y solicitar la eliminación de su información personal. Contáctenos en privacy@ktdoctor.com.") },
    { h: t("Children's privacy","Privacidad de los niños"), body: t("Our services are designed for pediatric patients under the care of a parent or guardian. We do not knowingly collect personal information from minors without verifiable parental consent. Parents and guardians may review, correct, or request deletion of their child's information at any time.","Nuestros servicios están diseñados para pacientes pediátricos bajo la tutela de un padre o guardián.") },
    { h: t("Contact our privacy team","Contactar a nuestro equipo de privacidad"), body: t("If you have questions about this Privacy Policy or our data practices, contact: Privacy Officer, Kids & Teens Medical Group, Los Angeles, CA. Email: privacy@ktdoctor.com. Phone: (818) 361-5437.","Si tiene preguntas sobre esta Política de Privacidad, contáctenos: Oficial de Privacidad, Kids & Teens Medical Group, privacy@ktdoctor.com.") },
  ];
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home","Inicio"), fn: () => nav("home") }, { label: t("Privacy Policy","Política de privacidad") }]} />
          <h1>{t("Privacy Policy","Política de privacidad")}</h1>
          <p className="lede">{t("Last updated: June 2026. Kids & Teens Medical Group is committed to protecting your privacy and the privacy of your children.",
            "Última actualización: junio 2026. Estamos comprometidos con la protección de su privacidad.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="legal-doc">
            {secs.map((s, i) => (
              <div key={i} className="legal-sec">
                <h2>{s.h}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Extra care type page (Family Practice, After-Hours, Hospital Newborn) */
function ExtraCarePage({ slug, t, nav, onBook, onLocations }) {
  const KT = window.KT;
  const c = (KT.extraCareTypes || []).find((x) => x.slug === slug) || KT.extraCareTypes?.[0];
  if (!c) return null;
  const urgentClinics = KT.locations.filter((l) => l.urgent).slice(0, 6);
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[
            { label: t("Home","Inicio"), fn: () => nav("home") },
            { label: t("Care","Atención"), fn: () => nav("care","primary-care") },
            { label: c.name },
          ]} />
          <span className={"eyebrow care-accent-" + c.accent} style={{ color: "var(--ca)" }}>{c.name}</span>
          <h1 style={{ marginTop: 12 }}>{c.tagline}</h1>
          <p className="lede">{c.blurb}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="care-detail">
            <div>
              <PhotoSlot id={"extra-care-" + c.slug + "-photo"} label={"photo — " + c.name.toLowerCase()} aspect="4 / 3" shadow style={{ marginBottom: 32 }} />
              <h2 style={{ fontSize: 28, marginBottom: 14 }}>{t("What's included","Qué incluye")}</h2>
              <div className={"care-accent-" + c.accent}>
                {c.bullets.map((b, i) => (
                  <div className="care-feature" key={i}>
                    <span className="ic" style={{ background:"color-mix(in srgb, var(--ca) 13%, #fff)", color:"var(--ca)" }}><Icon name="check" size={20} /></span>
                    <div><h4>{b}</h4></div>
                  </div>
                ))}
              </div>
              {c.slug === "after-hours" && (
                <>
                  <h2 style={{ fontSize: 28, margin: "34px 0 14px" }}>{t("After-hours locations","Ubicaciones de horario extendido")}</h2>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                    {urgentClinics.map((l) => (
                      <button key={l.slug} className="xlink-row" onClick={() => nav("location", l.slug)}>
                        <span className="xlink-ic"><Icon name="map-pin" size={16} /></span>
                        <span className="xlink-txt"><b>{l.name}</b><span>{l.hours}</span></span>
                        <Icon name="chevron-right" size={16} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <aside>
              <div className={"sidecard care-accent-" + c.accent}>
                <h3>{t("Get this care","Recibir atención")}</h3>
                <p className="muted" style={{ fontSize:14 }}>{t("Book online or find the nearest location.","Reserve en línea o encuentre la ubicación más cercana.")}</p>
                <div className="sc-row"><Icon name="globe" size={18} />{t("English & Spanish","Inglés y Español")}</div>
                <div className="sc-row"><Icon name="shield-plus" size={18} />{t("Most insurance accepted","Seguros aceptados")}</div>
                {c.external ? (
                  <a href={c.external} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width:"100%", marginTop:18 }}>
                    <Icon name="arrow-right" size={18} /> {c.cta}
                  </a>
                ) : (
                  <>
                    <a href="#" className="btn btn-primary" style={{ width:"100%", marginTop:18 }} onClick={(e) => { e.preventDefault(); onBook(); }}><Icon name="calendar" size={18} /> {t("Book now","Reservar")}</a>
                    <a href="#" className="btn btn-ghost" style={{ width:"100%", marginTop:10 }} onClick={(e) => { e.preventDefault(); onLocations(); }}><Icon name="map-pin" size={18} /> {t("Find a clinic","Buscar clínica")}</a>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
      {/* Other care types */}
      <section className="section section-tint">
        <div className="wrap">
          <div className="sec-head center"><h2>{t("Explore all care","Explorar toda la atención")}</h2></div>
          <div className="other-care">
            {KT.careTypes.map((o) => (
              <div key={o.slug} className={"care-card care-accent-" + o.accent} style={{ background:"#fff", boxShadow:"var(--shadow-sm)", border:"1px solid var(--line)" }}>
                <span className="ic"><Icon name={o.icon} size={28} /></span>
                <h3>{o.name}</h3>
                <p className="blurb">{o.tagline}</p>
                <div className="foot"><a href="#" className="link-arrow" onClick={(e) => { e.preventDefault(); nav("care", o.slug); }}>{t("Learn more","Más")} <Icon name="arrow-right" size={16} /></a></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Patient Portal page ───────────────────────────────────────── */
function PatientPortalPage({ t, nav, onBook }) {
  const faqs = [
    t("Do I have to pay to get access to the Patient Portal and healow app?", "¿Debo pagar para acceder al Portal del Paciente?"),
    t("Is having online access secure?", "¿Es seguro el acceso en línea?"),
    t("What can I access through the healow mobile app and Patient Portal?", "¿Qué puedo acceder a través de la aplicación healow?"),
    t("What if I need technical assistance?", "¿Qué pasa si necesito asistencia técnica?"),
    t("I forgot my login or password. How can I reset or obtain new login credentials?", "Olvidé mi contraseña. ¿Cómo puedo restablecerla?"),
    t("How do I sign up?", "¿Cómo me registro?"),
  ];
  const features = [
    t("Communicate with your provider. Get reminders.", "Comunicarse con su proveedor. Recibir recordatorios."),
    t("Manage your appointments", "Administrar sus citas"),
    t("Access your test results", "Acceder a sus resultados de laboratorio"),
    t("View your medications and request refills", "Ver sus medicamentos y solicitar recetas"),
  ];
  const steps = [
    { n: 1, label: t("Download the healow™ app from App Store (iPhone) or Google Play (Android Phone).", "Descargue la aplicación healow del App Store o Google Play.") },
    { n: 2, label: t("Search our practice by entering practice code:", "Busque nuestra clínica ingresando el código:"), code: "BBHICD" },
    { n: 3, label: t("Enter your portal username and password to login.", "Ingrese su nombre de usuario y contraseña.") },
    { n: 4, label: t("Set up your PIN to securely access your health records.", "Configure su PIN para acceder de forma segura.") },
  ];
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home","Inicio"), fn: () => nav("home") }, { label: t("Patient Portal","Portal del Paciente") }]} />
          <h1>{t("Welcome to Kids and Teens Medical Group","Bienvenido al portal de Kids & Teens")}</h1>
          <p className="lede">{t("HealthCare Support Portal facilitates better communication with your physician's office by providing convenient 24x7 access from the comfort and privacy of your own home.","El Portal de Salud facilita mejor comunicación con la oficina de su médico.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          {/* 3-column top actions */}
          <div className="pp-actions">
            <a href="https://mycw178.ecwcloud.com/portal5504/jsp/100mp/login_otp.jsp" target="_blank" rel="noopener noreferrer" className="pp-action primary">
              <span className="pp-ic"><Icon name="user" size={26} /></span>
              <div><b>{t("Login To Patient Portal","Iniciar sesión")}</b><span>{t("Access your health record","Acceda a su historial médico")}</span></div>
              <Icon name="arrow-right" size={20} />
            </a>
            <a href="#" className="pp-action" onClick={(e) => { e.preventDefault(); onBook(); }}>
              <span className="pp-ic"><Icon name="calendar" size={26} /></span>
              <div><b>{t("Book an appointment","Reservar una cita")}</b><span>{t("Connect with a doctor in minutes","Conéctese con un médico")}</span></div>
              <Icon name="arrow-right" size={20} />
            </a>
            <a href="#" className="pp-action">
              <span className="pp-ic"><Icon name="card" size={26} /></span>
              <div><b>{t("Pay your bill","Pagar su factura")}</b><span>{t("View and settle your statements","Ver y pagar sus estados de cuenta")}</span></div>
              <Icon name="arrow-right" size={20} />
            </a>
          </div>

          {/* Pre-register + download app */}
          <div className="pp-mid">
            <div className="pp-mid-card">
              <Icon name="plus" size={28} style={{ color:"var(--c-primary)" }} />
              <h3>{t("New to Practice?","¿Nuevo paciente?")}</h3>
              <p>{t("Pre-register for hassle-free appointment booking and easy check-in for your first visit.","Registrese previamente para una reserva sin complicaciones.")}</p>
              <a href="#" className="btn btn-primary" style={{ marginTop:12 }}>{t("Pre Register","Pre-registro")}</a>
            </div>
            <div className="pp-mid-card">
              <Icon name="phone" size={28} style={{ color:"var(--c-accent)" }} />
              <h3>{t("Download App","Descargar aplicación")}</h3>
              <p>{t("healow app is a secure and convenient way to manage what's important and puts you in control of your health.","La aplicación healow es segura y conveniente para gestionar su salud.")}</p>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop:12 }}>{t("Know More","Saber más")}</a>
            </div>
          </div>

          {/* Portal features */}
          <div className="pp-feature-row">
            <div>
              <span className="eyebrow">{t("View your health record","Ver su historial")}</span>
              <h2 style={{ fontSize:"clamp(26px,3vw,38px)", margin:"14px 0 16px" }}>{t("Patient Portal is a secure, convenient, and easy way to access your health information","El Portal del Paciente es una forma segura y conveniente de acceder a su información de salud")}</h2>
              <p style={{ fontWeight:600, color:"var(--ink-2)", marginBottom:16 }}>{t("Here's what you can do with our portal –","Esto es lo que puede hacer con nuestro portal –")}</p>
              <ul className="pp-list">
                {features.map((f,i) => <li key={i}><Icon name="check-circle" size={18} />{f}</li>)}
              </ul>
              <a href="https://mycw178.ecwcloud.com/portal5504/jsp/100mp/login_otp.jsp" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop:22 }}>{t("Login","Iniciar sesión")}</a>
            </div>
            <PhotoSlot id="portal-screenshot" label="patient portal app screenshot" aspect="16 / 11" shadow style={{ borderRadius:"var(--radius)", marginBottom: 36 }} />
          </div>

          {/* Healow app setup */}
          <div className="pp-healow">
            <div className="pp-healow-head">
              <h2>{t("healow™ is free and available on the Apple app store and Google Play store.","healow™ está disponible gratis en el App Store y Google Play.")}</h2>
              <div className="pp-stores">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Icon name="phone" size={18} /> {t("App Store","App Store")}</a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Icon name="phone" size={18} /> {t("Google Play","Google Play")}</a>
              </div>
            </div>
            <div className="pp-steps">
              <div className="pp-steps-head">{t("Set up the healow smartphone app in four steps:","Configure la aplicación healow en cuatro pasos:")}</div>
              <div className="pp-step-grid">
                {steps.map((s,i) => (
                  <div key={i} className="pp-step">
                    <span className="pp-step-n">{s.n}</span>
                    <p>{s.label}{s.code && <><br/><span className="pp-code">{t("Practice Code","Código")}<b>{s.code}</b></span></>}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div style={{ marginTop:52 }}>
            <h2 style={{ fontSize:26, marginBottom:22 }}>{t("Patient Portal & Healow FAQs","Preguntas Frecuentes")}</h2>
            <div className="pp-faqs">
              {faqs.map((q,i) => (
                <details key={i} className="pp-faq">
                  <summary><Icon name="chevron-right" size={18} />{q}</summary>
                  <p style={{ padding:"12px 16px 12px 42px", color:"var(--ink-2)", fontSize:14.5 }}>
                    {t("For assistance, please contact our office at (818) 361-5437 or email customerservice@ktdoctor.com.","Para asistencia, contáctenos al (818) 361-5437 o email customerservice@ktdoctor.com.")}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Contact / Clinic Email Directory page (“Forms Only” equivalent) ─────── */
function ContactDirectoryPage({ t, nav }) {
  const KT = window.KT;
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs nav={nav} items={[{ label: t("Home","Inicio"), fn: () => nav("home") }, { label: t("Contact Directory","Directorio de contacto") }]} />
          <h1>{t("Contact your preferred office","Contacte a su oficina de preferencia")}</h1>
          <p className="lede">{t("Use the email addresses below to contact your preferred Kids & Teens clinic directly. For urgent matters please call the clinic.","Use los correos electrónicos a continuación para contactar a su clínica de Kids & Teens. Para asuntos urgentes, por favor llame.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap" style={{ maxWidth:720 }}>
          <div style={{ background:"var(--bg-tint)", border:"1px solid var(--line)", borderRadius:"var(--radius)", overflow:"hidden", marginBottom:28 }}>
            <div style={{ background:"var(--c-primary-dark)", color:"#fff", padding:"14px 24px", fontWeight:700, fontSize:15, display:"flex", justifyContent:"space-between" }}>
              <span>{t("Clinic","Clínica")}</span><span>{t("Email Address","Correo electrónico")}</span>
            </div>
            {(KT.clinicEmails || []).map((c,i) => (
              <div key={c.slug} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 24px", borderBottom: i < (KT.clinicEmails.length-1) ? "1px solid var(--line)" : "none", background: i%2===0 ? "#fff" : "var(--bg-tint)" }}>
                <b style={{ fontSize:15, color:"var(--ink)" }}>{c.name}</b>
                <a href={"mailto:"+c.email} style={{ color:"var(--c-primary)", fontWeight:600, fontSize:14 }}>{c.email}</a>
              </div>
            ))}
          </div>
          <div className="notice">
            <Icon name="phone" size={20} />
            <p>{t("For same-day appointments, urgent care, or billing questions, please call (818) 361-5437 or text (626) 298-7121.","Para citas el mismo día, urgencias o preguntas de facturación, llame al (818) 361-5437 o envíe texto al (626) 298-7121.")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { DirectoryPage, ParentResourcesPage, TermsPage, PrivacyPage, ExtraCarePage, PatientPortalPage, ContactDirectoryPage });
