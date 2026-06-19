/* ═══════════════════════════════════════════════════════════════════════════
   v2-app.jsx — Router, Booking wizard, sub-page shell, App root
   Reuses v1 data and page components wrapped in the new v2 chrome.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── v2 Booking wizard ─────────────────────────────────────────────────── */
const V2_REASONS = [
  { id:"well-child", label:"Well-child checkup", icon:"check-circle" },
  { id:"sick",       label:"Sick visit",          icon:"heart-pulse" },
  { id:"telehealth", label:"Telehealth / video",  icon:"video" },
  { id:"urgent",     label:"Urgent care",          icon:"shield-plus" },
  { id:"vaccines",   label:"Vaccines / shots",     icon:"syringe" },
  { id:"physical",   label:"Sports or school physical", icon:"award" },
];
const V2_AGES = ["Newborn (0–3 mo)","Infant (3–12 mo)","Toddler (1–3 yr)","Child (4–11 yr)","Teen (12–21 yr)"];
function makeV2Slots() {
  const slots = {}; const today = new Date();
  const dow = today.getDay(); const d2mon = dow === 0 ? 1 : (8-dow)%7||7;
  for (let d = 0; d < 5; d++) {
    const dt = new Date(today); dt.setDate(today.getDate() + d2mon + d);
    const k = dt.toISOString().slice(0,10);
    slots[k] = ["8:30 AM","9:00 AM","9:30 AM","10:15 AM","11:00 AM","1:00 PM","2:00 PM","3:15 PM","4:00 PM","5:00 PM"].filter((_,i) => (i*7+d*3)%5!==0);
  }
  return slots;
}
const V2_SLOTS = makeV2Slots();
const V2_DAYS = Object.keys(V2_SLOTS);
const fmtDay = (k) => new Date(k+"T12:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});

function V2BookingModal({ onClose, prefill }) {
  const KT = window.KT;
  const [step, setStep] = React.useState(1);
  const [f, setF] = React.useState({ clinic:"", reason:"", age:"", date:"", time:"", name:"", phone:"", child:"", email:"", ...prefill });
  const set = (k,v) => setF(p => ({...p,[k]:v}));
  const fi = { width:"100%", padding:"12px 14px", border:"1.5px solid var(--line-2)", borderRadius:"var(--r-md)", font:"inherit", fontSize:15, color:"var(--ink)", background:"#fff", outline:"none" };
  const lb = { fontSize:13, fontWeight:700, color:"var(--ink-2)", display:"block", marginBottom:7 };
  const TOTAL = 4;
  const canNext = () => {
    if (step===1) return !!f.clinic; if (step===2) return !!f.reason&&!!f.age;
    if (step===3) return !!f.date&&!!f.time; if (step===4) return !!f.name&&!!f.phone;
    return true;
  };

  const renderStep = () => {
    if (step === 5) {
      const loc = KT.locations.find(l=>l.slug===f.clinic);
      const reason = V2_REASONS.find(r=>r.id===f.reason)?.label||f.reason;
      return (
        <div style={{ textAlign:"center", padding:"8px 0 4px" }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:"var(--good-10)", color:"var(--good)", display:"grid", placeItems:"center", margin:"0 auto 20px" }}>
            <V2Icon name="check-circle" size={38} />
          </div>
          <h3 style={{ fontFamily:"var(--font-head)", fontSize:26 }}>You're all set! 🎉</h3>
          <p style={{ color:"var(--ink-2)", maxWidth:"42ch", margin:"10px auto 0" }}>Our team will call you shortly to confirm. For urgent matters, call your clinic directly.</p>
          <div style={{ background:"var(--bg)", borderRadius:"var(--r-lg)", padding:"20px 24px", margin:"22px 0 18px", textAlign:"left", display:"flex", flexDirection:"column", gap:10 }}>
            {loc && <div style={{ display:"flex", gap:10, alignItems:"center", fontSize:14.5, color:"var(--ink-2)" }}><V2Icon name="map-pin" size={18} style={{ color:"var(--teal)" }} /><b style={{ color:"var(--ink)" }}>{loc.name}</b> · {loc.city}</div>}
            <div style={{ display:"flex", gap:10, alignItems:"center", fontSize:14.5, color:"var(--ink-2)" }}><V2Icon name="stethoscope" size={18} style={{ color:"var(--teal)" }} />{reason}{f.age && ` · ${f.age}`}</div>
            {f.date && f.time && <div style={{ display:"flex", gap:10, alignItems:"center", fontSize:14.5, color:"var(--ink-2)" }}><V2Icon name="calendar" size={18} style={{ color:"var(--teal)" }} />{fmtDay(f.date)} at {f.time}</div>}
          </div>
          {loc && <a href={"tel:"+loc.phone.replace(/\D/g,"")} className="btn btn-outline" style={{ marginRight:8 }}><V2Icon name="phone" size={18} />{loc.phone}</a>}
          <button className="btn btn-primary" style={{ marginTop:8 }} onClick={onClose}>Done</button>
        </div>
      );
    }
    if (step === 1) return (
      <div>
        <div style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:6 }}>Choose a clinic</div>
        <p style={{ color:"var(--ink-2)", fontSize:15, marginBottom:18 }}>Pick the location that's closest to you.</p>
        <div className="v2-loc-input" style={{ marginBottom:14 }}>
          <V2Icon name="search" size={18} />
          <input placeholder="Search by city or ZIP…" id="bk-q" />
        </div>
        <div style={{ maxHeight:300, overflowY:"auto", display:"flex", flexDirection:"column", gap:6 }}>
          {KT.locations.filter(l => { const v = document.getElementById("bk-q")?.value?.toLowerCase()||""; return !v || l.name.toLowerCase().includes(v) || l.city.toLowerCase().includes(v) || l.zip.includes(v); }).map(l => (
            <button key={l.slug} onClick={() => set("clinic",l.slug)}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", borderRadius:"var(--r-md)", border:`1.5px solid ${f.clinic===l.slug?"var(--teal)":"var(--line)"}`, background:f.clinic===l.slug?"var(--teal-6)":"#fff", textAlign:"left", transition:".15s" }}>
              <span style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${f.clinic===l.slug?"var(--teal)":"var(--line-2)"}`, background:f.clinic===l.slug?"var(--teal)":"transparent", display:"grid", placeItems:"center", flexShrink:0 }}>
                {f.clinic===l.slug && <V2Icon name="check" size={13} style={{ color:"#fff" }} />}
              </span>
              <span style={{ flex:1 }}><b style={{ fontSize:14.5 }}>{l.name}</b><span style={{ display:"block", fontSize:12.5, color:"var(--ink-3)" }}>{l.city} · {l.hours?.split(" ·")[0]}</span></span>
              {l.urgent && <span style={{ fontSize:10.5, fontWeight:700, color:"#d97706", background:"rgba(245,158,11,.12)", padding:"3px 8px", borderRadius:99 }}>Urgent</span>}
            </button>
          ))}
        </div>
      </div>
    );
    if (step === 2) return (
      <div>
        <div style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:6 }}>What brings you in?</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
          {V2_REASONS.map(r => (
            <button key={r.id} onClick={() => set("reason",r.id)}
              style={{ display:"flex", alignItems:"center", gap:11, padding:"14px 16px", borderRadius:"var(--r-md)", border:`1.5px solid ${f.reason===r.id?"var(--teal)":"var(--line)"}`, background:f.reason===r.id?"var(--teal-6)":"#fff", textAlign:"left", fontSize:14.5, fontWeight:600, fontFamily:"var(--font-head)", transition:".15s" }}>
              <span style={{ width:38, height:38, borderRadius:10, background:f.reason===r.id?"var(--teal-10)":"var(--bg)", color:"var(--teal)", display:"grid", placeItems:"center", flexShrink:0 }}><V2Icon name={r.icon} size={20} /></span>
              {r.label}
            </button>
          ))}
        </div>
        <label style={lb}>Child's age group</label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {V2_AGES.map(a => (
            <button key={a} onClick={() => set("age",a)}
              style={{ padding:"9px 15px", borderRadius:99, border:`1.5px solid ${f.age===a?"var(--teal)":"var(--line)"}`, background:f.age===a?"var(--teal)":"#fff", color:f.age===a?"#fff":"var(--ink-2)", fontSize:13.5, fontWeight:600, fontFamily:"var(--font-head)", transition:".15s" }}>
              {a}
            </button>
          ))}
        </div>
      </div>
    );
    if (step === 3) return (
      <div>
        <div style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:6 }}>Pick a date & time</div>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {V2_DAYS.map(k => (
            <button key={k} onClick={() => { set("date",k); set("time",""); }}
              style={{ flex:1, padding:"12px 6px", borderRadius:"var(--r-md)", border:`1.5px solid ${f.date===k?"var(--teal)":"var(--line)"}`, background:f.date===k?"var(--teal)":"#fff", display:"flex", flexDirection:"column", alignItems:"center", gap:3, transition:".15s" }}>
              <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".05em", color:f.date===k?"rgba(255,255,255,.8)":"var(--ink-3)" }}>{new Date(k+"T12:00").toLocaleDateString("en-US",{weekday:"short"})}</span>
              <span style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, color:f.date===k?"#fff":"var(--ink)" }}>{new Date(k+"T12:00").getDate()}</span>
            </button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
          {(V2_SLOTS[f.date]||[]).map(sl => (
            <button key={sl} onClick={() => set("time",sl)}
              style={{ padding:"11px 8px", borderRadius:"var(--r-md)", border:`1.5px solid ${f.time===sl?"var(--teal)":"var(--line)"}`, background:f.time===sl?"var(--teal)":"#fff", color:f.time===sl?"#fff":"var(--ink)", fontSize:13, fontWeight:600, fontFamily:"var(--font-head)", transition:".15s" }}>
              {sl}
            </button>
          ))}
        </div>
      </div>
    );
    if (step === 4) return (
      <div>
        <div style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:6 }}>Your details</div>
        <p style={{ color:"var(--ink-2)", marginBottom:20 }}>We'll call to confirm your appointment.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div style={{ gridColumn:"1/-1" }}><label style={lb}>Child's name</label><input style={fi} value={f.child} onChange={e=>set("child",e.target.value)} placeholder="First name" /></div>
          <div><label style={lb}>Parent / guardian name</label><input style={fi} value={f.name} onChange={e=>set("name",e.target.value)} placeholder="Full name" /></div>
          <div><label style={lb}>Phone number</label><input style={fi} value={f.phone} onChange={e=>set("phone",e.target.value)} placeholder="(555) 555-5555" /></div>
          <div style={{ gridColumn:"1/-1" }}><label style={lb}>Email (optional)</label><input style={fi} value={f.email} onChange={e=>set("email",e.target.value)} placeholder="For appointment reminder" /></div>
        </div>
      </div>
    );
  };

  return (
    <div className="v2-modal-scrim" onClick={onClose}>
      <div className="v2-modal" onClick={e=>e.stopPropagation()}>
        <div className="v2-modal-head">
          <h3>{step<5 ? "Book an Appointment" : "Appointment Requested"}</h3>
          <button className="v2-modal-close" onClick={onClose} aria-label="Close"><V2Icon name="x" size={18} /></button>
        </div>
        <div className="v2-modal-body">
          {step<5 && (
            <div className="v2-progress">
              {[1,2,3,4].map(n => <div key={n} className={"v2-prog-seg"+(n<=step?" done":"")} />)}
            </div>
          )}
          {renderStep()}
          {step<5 && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:22, borderTop:"1px solid var(--line)", marginTop:24 }}>
              {step>1 ? <button className="btn btn-outline" onClick={()=>setStep(step-1)}><V2Icon name="chevron-right" size={18} style={{ transform:"rotate(180deg)" }} /> Back</button> : <span/>}
              <button className="btn btn-primary" disabled={!canNext()} onClick={()=>setStep(step+1)}
                style={{ opacity:canNext()?1:.45, cursor:canNext()?"pointer":"not-allowed" }}>
                {step===TOTAL ? <><V2Icon name="check-circle" size={18} /> Request Appointment</> : <>Next <V2Icon name="chevron-right" size={18} /></>}
              </button>
            </div>
          )}
          {step<5 && <p style={{ fontSize:12.5, color:"var(--ink-3)", textAlign:"center", marginTop:12 }}>Prototype only — no real appointment booked.</p>}
        </div>
      </div>
    </div>
  );
}

/* ── Minimal sub-page wrapper for v2 (reuses v1 page components) ────────── */
function V2SubPage({ children }) {
  return <div style={{ minHeight:"60vh" }}>{children}</div>;
}

/* ── App root ──────────────────────────────────────────────────────────── */
function parseV2Hash() {
  const h = (location.hash || "").replace(/^#\/?/,"").split("/");
  return { page: h[0]||"home", param: h[1]||null };
}

function V2App() {
  const [route, setRoute] = React.useState(parseV2Hash);
  const [modal, setModal] = React.useState(null);
  const [lang, setLang] = React.useState(() => localStorage.getItem("kt_lang") || "en");

  React.useEffect(() => {
    const onHash = () => setRoute(parseV2Hash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const nav = React.useCallback((page, param) => {
    location.hash = "/" + page + (param ? "/" + param : "");
    setRoute({ page, param: param||null });
    window.scrollTo({ top:0, behavior:"auto" });
  }, []);

  const onBook = () => setModal("book");

  // sub-page rendering — reuse v1 components
  const t = (en) => en;
  const renderPage = () => {
    const { page, param } = route;
    const noop = () => {};
    switch (page) {
      case "care": { const C=window.CarePage; return C ? <C slug={param||"primary-care"} t={t} nav={nav} onBook={onBook} onLocations={()=>nav("locations")} /> : null; }
      case "locations": { const C=window.LocationsPage; return C ? <C tw={{locationsView:"grid"}} t={t} nav={nav} setTweak={noop} /> : null; }
      case "location": { const C=window.LocationDetail; return C ? <C slug={param} t={t} nav={nav} onBook={onBook} /> : null; }
      case "doctors": { const C=window.DoctorsPage; return C ? <C t={t} nav={nav} onBook={onBook} /> : null; }
      case "doctor": { const C=window.DoctorDetail; return C ? <C slug={param} t={t} nav={nav} onBook={onBook} /> : null; }
      case "about": { const C=window.AboutPage; return C ? <C t={t} nav={nav} onLocations={()=>nav("locations")} /> : null; }
      case "services": { const C=window.ServicesIndexPage; return C ? <C t={t} nav={nav} /> : null; }
      case "service": { const C=window.ServicePage; return C ? <C slug={param} t={t} nav={nav} onBook={onBook} /> : null; }
      case "careers": { const C=window.CareersPage; return C ? <C t={t} nav={nav} /> : null; }
      case "forms": { const C=window.FormsPage; return C ? <C t={t} nav={nav} onBook={onBook} /> : null; }
      case "resources": { const C=window.ParentResourcesPage; return C ? <C t={t} nav={nav} onBook={onBook} /> : null; }
      case "testimonials": { const C=window.TestimonialsPage; return C ? <C t={t} nav={nav} /> : null; }
      case "terms": { const C=window.TermsPage; return C ? <C t={t} nav={nav} /> : null; }
      case "privacy": { const C=window.PrivacyPage; return C ? <C t={t} nav={nav} /> : null; }
      case "search": { const C=window.SearchPage; return C ? <C initial={param?decodeURIComponent(param):""} t={t} nav={nav} onLocations={()=>nav("locations")} /> : null; }
      case "directory": { const C=window.DirectoryPage; return C ? <C t={t} nav={nav} onBook={onBook} /> : null; }
      case "contact": { const C=window.ContactDirectoryPage; return C ? <C t={t} nav={nav} /> : null; }
      case "patient-portal": { const C=window.PatientPortalPage; return C ? <C t={t} nav={nav} onBook={onBook} /> : null; }
      default: return <V2HomePage onBook={onBook} nav={nav} />;
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      <V2Header route={route.page} nav={nav} onBook={onBook} lang={lang} setLang={setLang} />
      <main style={{ flex:1 }}>{renderPage()}</main>
      <V2Footer nav={nav} />
      {modal === "book" && <V2BookingModal onClose={() => setModal(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("v2root")).render(<V2App />);
