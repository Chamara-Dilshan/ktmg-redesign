/* ═══════════════════════════════════════════════════════════════════════════
   v2-home.jsx — All homepage sections for the premium v2 redesign
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Hero ──────────────────────────────────────────────────────────────── */
function V2Hero({ onBook, nav }) {
  return (
    <section className="v2-hero" aria-label="Hero">
      <div className="v2-hero-bg">
        <V2Photo id="hero-split-photo" alt="Pediatric doctor with child patient" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
      </div>
      <div className="wrap">
        <div style={{ maxWidth: 680 }}>
          <span className="eyebrow white">The Largest Pediatric Network in Los Angeles</span>
          <h1 style={{ marginTop: 16 }}>
            Compassionate Pediatric Care for <em>Every Stage</em> of Childhood
          </h1>
          <p className="sub">
            Trusted by thousands of families across Southern California. Board-certified pediatric specialists at 25 neighborhood clinics — from newborn through age 21.
          </p>
          <div className="v2-hero-actions">
            <a href="#" className="btn btn-amber btn-lg" onClick={(e) => { e.preventDefault(); onBook(); }}>
              <V2Icon name="calendar" size={20} /> Book Appointment
            </a>
            <a href="#" className="btn btn-outline-white btn-lg" onClick={(e) => { e.preventDefault(); nav("locations"); }}>
              <V2Icon name="map-pin" size={20} /> Find a Location
            </a>
          </div>
          <div className="hero-trust" role="list">
            {[
              ["check-circle", "Same-Day Appointments"],
              ["shield-plus", "Board-Certified Providers"],
              ["map-pin", "25+ Locations"],
              ["card", "Accepts Most Insurance"],
            ].map(([icon, label]) => (
              <span key={label} className="hero-trust-item" role="listitem">
                <V2Icon name={icon} size={16} /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats band ────────────────────────────────────────────────────────── */
function V2Stats() {
  const stats = [
    { num: "25+", label: "Clinics Across LA" },
    { num: "52+", label: "Board-Certified Providers" },
    { num: "100k+", label: "Families Served" },
    { num: "18+", label: "Years of Care" },
  ];
  return (
    <div className="v2-stats" role="region" aria-label="Key statistics">
      <div className="wrap">
        {stats.map((s) => (
          <div key={s.label} className="v2-stat">
            <div className="num">{s.num}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Why choose us ─────────────────────────────────────────────────────── */
function V2Why({ nav }) {
  const items = [
    { icon: "stethoscope", title: "Pediatric Specialists Only", body: "Every provider at Kids & Teens is trained exclusively in pediatric and adolescent medicine — no adult patients, ever." },
    { icon: "clock", title: "Same-Day & Weekend Hours", body: "Sick kids don't wait for Monday. We offer same-day visits, extended evening hours, and weekend urgent care at select locations." },
    { icon: "globe", title: "Bilingual Care", body: "English and Spanish-speaking providers and staff at every clinic, so every family feels heard and understood." },
    { icon: "shield-plus", title: "Accepts Most Insurance", body: "We work with Medi-Cal, L.A. Care, Molina, Optum, Regal and most major PPO plans. We'll verify your coverage on arrival." },
  ];
  return (
    <section className="section bg-white" aria-labelledby="why-head">
      <div className="wrap">
        <div className="v2-sec-head center">
          <span className="eyebrow">Why Families Choose Us</span>
          <h2 id="why-head">Pediatric care built around your family</h2>
          <p>From your baby's first checkup to your teen's sports physical — we're your neighborhood medical home for every stage.</p>
        </div>
        <div className="v2-why-grid">
          {items.map((it) => (
            <div key={it.title} className="v2-why-card">
              <div className="v2-why-ic"><V2Icon name={it.icon} size={30} /></div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services ──────────────────────────────────────────────────────────── */
function V2Services({ nav }) {
  const services = [
    { icon: "check-circle", name: "Well Child Visits", desc: "Annual checkups, growth tracking, developmental screenings and vaccines — all on the recommended schedule.", slug: "well-child-exam" },
    { icon: "heart-pulse", name: "Sick Visits", desc: "Fevers, ear infections, strep and more — often available the same day. Walk-ins welcome at urgent care locations.", slug: "sick-visit" },
    { icon: "syringe", name: "Immunizations", desc: "Full vaccine schedule including flu, Covid-19 and travel vaccines. VFC program available for eligible families.", slug: "free-vaccines" },
    { icon: "heart-pulse", name: "Asthma Care", desc: "LA air quality is tough on little lungs. Our Asthma & Allergy Center creates personalized action plans for every child.", slug: "asthma-allergy" },
    { icon: "stethoscope", name: "ADHD & Behavioral", desc: "Comprehensive evaluations, treatment planning and school coordination for children with ADHD or behavioral challenges.", slug: "adhd-behavioral" },
    { icon: "video", name: "Telehealth", desc: "Secure video visits for minor illnesses, follow-ups, prescription refills and nutrition counseling. Usually same-day.", slug: "telehealth-service" },
    { icon: "baby", name: "Newborn Care", desc: "In-hospital visits, discharge follow-up, feeding support and the reassurance that every new parent needs.", slug: "newborn-care" },
    { icon: "users", name: "Adolescent Medicine", desc: "Confidential, respectful care for teens — from sports physicals and reproductive health to mental wellness.", slug: "adolescent-medicine" },
    { icon: "award", name: "Sports Physicals", desc: "Same-day school and sports clearance forms, concussion evaluation, and return-to-play plans.", slug: "physicals" },
  ];
  return (
    <section className="section bg-bg" aria-labelledby="svc-head">
      <div className="wrap">
        <div className="v2-sec-head center">
          <span className="eyebrow">Our Services</span>
          <h2 id="svc-head">Comprehensive care from birth through age 21</h2>
          <p>Whether it's a routine checkup or a sudden fever — there's a Kids & Teens service built for it.</p>
        </div>
        <div className="v2-svc-grid">
          {services.map((s) => (
            <div key={s.name} className="v2-svc-card">
              <span className="ic"><V2Icon name={s.icon} size={26} /></span>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <a href="#" className="link" onClick={(e) => { e.preventDefault(); nav("service", s.slug); }}>
                Learn more <V2Icon name="arrow-right" size={16} />
              </a>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:36 }}>
          <a href="#" className="btn btn-outline btn-lg" onClick={(e) => { e.preventDefault(); nav("services"); }}>
            View All 20 Services <V2Icon name="arrow-right" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Doctors ───────────────────────────────────────────────────────────── */
function V2Doctors({ nav, onBook }) {
  const KT = window.KT;
  const featured = KT.doctors.slice(0, 6);
  return (
    <section className="section bg-white" aria-labelledby="doc-head">
      <div className="wrap">
        <div className="v2-sec-head" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", maxWidth:"none", marginBottom:44 }}>
          <div>
            <span className="eyebrow">Our Doctors</span>
            <h2 id="doc-head" style={{ marginTop:10 }}>Meet our pediatric specialists</h2>
            <p style={{ marginTop:12, maxWidth:"54ch" }}>Board-certified pediatricians and adolescent specialists — many fluent in two or more languages.</p>
          </div>
          <a href="#" className="btn btn-outline" style={{ flexShrink:0 }} onClick={(e) => { e.preventDefault(); nav("doctors"); }}>
            All Providers <V2Icon name="arrow-right" size={18} />
          </a>
        </div>
        <div className="v2-doc-grid">
          {featured.map((d) => (
            <div key={d.slug} className="v2-doc-card">
              <div className="v2-doc-photo">
                <V2Photo id={"doc-"+d.slug} alt={d.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <span className="accepting">
                  <span className={d.accepting ? "pill pill-good" : "pill pill-teal"} style={{ fontSize:11.5 }}>
                    {d.accepting ? "● Accepting Patients" : "● Waitlist"}
                  </span>
                </span>
              </div>
              <div className="v2-doc-body">
                <h3>{d.name}</h3>
                <div className="v2-doc-specialty">{d.specialty}</div>
                <div className="v2-doc-meta">
                  <span><V2Icon name="map-pin" size={14} />{d.clinic}</span>
                  <span><V2Icon name="globe" size={14} />{d.lang}</span>
                </div>
              </div>
              <div className="v2-doc-foot">
                <a href="#" className="btn btn-outline btn-sm" onClick={(e) => { e.preventDefault(); nav("doctor", d.slug); }}>View Profile</a>
                <a href="#" className="btn btn-primary btn-sm" onClick={(e) => { e.preventDefault(); onBook(); }}>Book</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Location finder ───────────────────────────────────────────────────── */
function V2Locations({ nav }) {
  const KT = window.KT;
  const [q, setQ] = React.useState("");
  const [region, setRegion] = React.useState("all");
  const shown = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    return KT.locations.filter((l) => {
      const okR = region === "all" || l.region === region;
      const okQ = !s || l.name.toLowerCase().includes(s) || l.city.toLowerCase().includes(s) || l.zip.includes(s);
      return okR && okQ;
    }).slice(0, 9);
  }, [q, region]);

  return (
    <section className="section bg-bg" aria-labelledby="loc-head">
      <div className="wrap">
        <div className="v2-sec-head center">
          <span className="eyebrow">25 Clinics Across LA</span>
          <h2 id="loc-head">Find your neighborhood clinic</h2>
          <p>From the Valley to the South Bay — a Kids & Teens clinic is never far from home.</p>
        </div>

        <div className="v2-loc-search">
          <div className="v2-loc-input" style={{ flex:"1" }}>
            <V2Icon name="search" size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by city, neighborhood or ZIP code…" aria-label="Search clinics" />
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[["all","All Areas"],["sfv","San Fernando Valley"],["sgv","San Gabriel Valley"],["west","Westside"],["south","South LA"]].map(([k,l]) => (
              <button key={k} className={"btn btn-sm " + (region===k ? "btn-primary" : "btn-outline")}
                onClick={() => setRegion(k)}>{l}</button>
            ))}
          </div>
        </div>

        <div className="v2-loc-grid">
          {shown.map((l) => (
            <button key={l.slug} className="v2-loc-card" onClick={() => nav("location", l.slug)}>
              <div className="v2-loc-region">{KT.REGIONS[l.region]}</div>
              <h4>{l.name}</h4>
              <div className="v2-loc-addr">{l.addr}, {l.city} {l.zip}</div>
              <div className="v2-loc-meta">
                <span><V2Icon name="clock" size={13} />{l.hours?.split(" ·")[0]}</span>
                <span><V2Icon name="phone" size={13} />{l.phone}</span>
              </div>
              <div className="v2-loc-foot">
                {l.urgent ? <span className="urgent-tag">Urgent Care</span> : <span style={{ fontSize:12.5, color:"var(--ink-3)", fontWeight:600 }}>Primary Care</span>}
                <span className="v2-loc-link">View clinic <V2Icon name="arrow-right" size={14} /></span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:28 }}>
          <a href="#" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); nav("locations"); }}>
            <V2Icon name="map-pin" size={20} /> Browse All 25 Locations
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Insurance ─────────────────────────────────────────────────────────── */
function V2Insurance() {
  const plans = ["Medi-Cal", "L.A. Care", "Molina", "Optum", "Regal Medical", "Providence", "Cedars-Sinai", "Blue Shield", "Anthem", "Kaiser"];
  return (
    <section className="section-sm bg-white" style={{ borderTop:"1px solid var(--line)", borderBottom:"1px solid var(--line)" }}>
      <div className="wrap">
        <div className="v2-sec-head center" style={{ marginBottom:28 }}>
          <span className="eyebrow">Insurance</span>
          <h2>We work with most major insurance plans</h2>
          <p>Including Medi-Cal, L.A. Care and all major HMO/PPO plans. No insurance? We have options for every family.</p>
        </div>
        <div className="v2-ins-row">
          {plans.map((p) => <span key={p} className="v2-ins-chip">{p}</span>)}
        </div>
        <div style={{ textAlign:"center", marginTop:28 }}>
          <a href="#" className="btn btn-outline">Verify Your Coverage <V2Icon name="arrow-right" size={18} /></a>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────────────────────────── */
function V2Testimonials() {
  const KT = window.KT;
  return (
    <section className="section bg-bg" aria-labelledby="testi-head">
      <div className="wrap">
        <div className="v2-sec-head center">
          <span className="eyebrow">What Families Say</span>
          <h2 id="testi-head">Trusted by thousands of LA families</h2>
          <p>Real words from the parents and children we care for every day.</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginTop:18 }}>
            <div style={{ fontFamily:"var(--font-head)", fontSize:44, fontWeight:800, color:"var(--teal)", lineHeight:1 }}>4.9</div>
            <div>
              <div style={{ display:"flex", gap:3, color:"var(--amber)" }}>
                {[1,2,3,4,5].map(i => <V2Icon key={i} name="star" size={18} style={{ fill:"var(--amber)", stroke:"none" }} />)}
              </div>
              <div style={{ fontSize:13, color:"var(--ink-3)", marginTop:2, fontWeight:600 }}>3,200+ verified reviews</div>
            </div>
          </div>
        </div>
        <div className="v2-testi-grid">
          {KT.testimonials.map((r, i) => (
            <figure key={i} className="v2-testi-card">
              <div className="v2-testi-stars">
                {[1,2,3,4,5].map(n => <V2Icon key={n} name="star" size={16} style={{ fill:"var(--amber)", stroke:"none" }} />)}
              </div>
              <blockquote>"{r.quote}"</blockquote>
              <figcaption>
                <div className="v2-testi-ava">{r.author.charAt(0)}</div>
                <div>
                  <b>{r.author}</b>
                  <span className="loc">{r.clinic}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:32, display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="https://www.google.com/search?q=Kids+Teens+Medical+Group+reviews+Los+Angeles" target="_blank" rel="noopener noreferrer"
            className="btn btn-outline" style={{ gap:8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google Reviews
          </a>
          <a href="https://www.yelp.com/search?find_desc=Kids+%26+Teens+Medical+Group&find_loc=Los+Angeles%2C+CA" target="_blank" rel="noopener noreferrer"
            className="btn btn-outline" style={{ gap:8, color:"#d32323", borderColor:"#d32323" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#d32323"><path d="M20.16 12.55c-.47-.4-4.12-2.44-4.67-2.62-.55-.18-1.08-.12-1.44.22-.35.32-.44.8-.27 1.35l1.2 3.67c.08.25.04.5-.12.7-.16.19-.4.3-.66.3-.22 0-.44-.09-.6-.24L10.82 13c-.3-.3-.42-.73-.3-1.15l1.8-6.22c.15-.51.07-1.01-.24-1.38-.3-.36-.77-.53-1.3-.46-.56.07-5.1 1.39-5.65 1.88C4.6 5.99 4.4 6.56 4.5 7.13l1.62 9.1c.1.56.44 1.03.93 1.27.49.25 1.06.24 1.55-.01l4.98-2.6c.32-.17.7-.15 1.01.05l2.44 1.54c.37.23.82.28 1.25.13.43-.14.76-.47.89-.9l1.03-3.16c.15-.46.05-.96-.25-1.3l.21.3z"/></svg>
            Yelp Reviews
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────────────────── */
function V2CtaSection({ onBook }) {
  return (
    <section className="v2-cta" aria-label="Call to action">
      <div className="wrap">
        <span className="eyebrow white" style={{ justifyContent:"center", display:"flex" }}>Ready to Schedule?</span>
        <h2 style={{ marginTop:14 }}>Ready to schedule your child's visit?</h2>
        <p>Book online in minutes. Same-day appointments available at most locations. Walk-ins welcome for urgent care.</p>
        <div className="v2-cta-btns">
          <a href="#" className="btn btn-amber btn-lg" onClick={(e) => { e.preventDefault(); onBook(); }}>
            <V2Icon name="calendar" size={20} /> Book Appointment
          </a>
          <a href="tel:8183615437" className="btn btn-outline-white btn-lg">
            <V2Icon name="phone" size={20} /> Call (818) 361-5437
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Homepage assembly ─────────────────────────────────────────────────── */
function V2HomePage({ onBook, nav }) {
  return (
    <>
      <V2Hero onBook={onBook} nav={nav} />
      <V2Stats />
      <V2Why nav={nav} />
      <V2Services nav={nav} />
      <V2Doctors nav={nav} onBook={onBook} />
      <V2Locations nav={nav} />
      <V2Insurance />
      <V2Testimonials />
      <V2CtaSection onBook={onBook} />
    </>
  );
}

Object.assign(window, { V2Hero, V2Stats, V2Why, V2Services, V2Doctors, V2Locations, V2Insurance, V2Testimonials, V2CtaSection, V2HomePage });
